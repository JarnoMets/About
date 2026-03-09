// Standalone Canvas 2D dot renderer – used only by the Home page.
// Has no dependency on the WebGPU sphere-renderer.
import { sharedRotation } from '@/composables/useSharedRotation';

const IDLE_TIMEOUT     = 5.0;
const FADE_DURATION    = 1.5;
const CURSOR_EMA       = 0.06;
const MAX_CURSOR_SPEED = 2.8;

// Fixed visual settings matching the live site
const DOT_SPEED   = 1.0;
const DOT_OPACITY = 0.55;
const DOT_COLOR: [number, number, number] = [0.55, 0.75, 1.0];

// ── Quaternion helpers ────────────────────────────────────────────────────────

type Quat = [number, number, number, number]; // x y z w

function quatIdentity(): Quat { return [0, 0, 0, 1]; }

function quatMul(a: Quat, b: Quat): Quat {
  const [ax, ay, az, aw] = a;
  const [bx, by, bz, bw] = b;
  return [
    aw*bx + ax*bw + ay*bz - az*by,
    aw*by - ax*bz + ay*bw + az*bx,
    aw*bz + ax*by - ay*bx + az*bw,
    aw*bw - ax*bx - ay*by - az*bz,
  ];
}

function quatFromAxisAngle(ax: number, ay: number, az: number, angle: number): Quat {
  const s = Math.sin(angle / 2);
  return [ax * s, ay * s, az * s, Math.cos(angle / 2)];
}

function quatNorm(q: Quat): Quat {
  const len = Math.sqrt(q[0]*q[0] + q[1]*q[1] + q[2]*q[2] + q[3]*q[3]);
  return len > 1e-9 ? [q[0]/len, q[1]/len, q[2]/len, q[3]/len] : quatIdentity();
}

function quatToRotationMatrix(q: Quat) {
  const [x, y, z, w] = q;
  return [
    [1 - 2*(y*y + z*z), 2*(x*y - w*z), 2*(x*z + w*y)],
    [2*(x*y + w*z), 1 - 2*(x*x + z*z), 2*(y*z - w*x)],
    [2*(x*z - w*y), 2*(y*z + w*x), 1 - 2*(x*x + y*y)]
  ];
}

function matMul3(A: number[][], B: number[][]) {
  const C = [[0,0,0],[0,0,0],[0,0,0]];
  for(let i=0; i<3; i++)
    for(let j=0; j<3; j++)
      for(let k=0; k<3; k++)
        C[i][j] += A[i][k] * B[k][j];
  return C;
}

export function initBackgroundRenderer(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let rafId: number;
  let lastFrameMs = performance.now();
  
  let targetCX = 0;
  let targetCY = 0;
  let smoothCX = 0;
  let smoothCY = 0;
  let idleWeight = 1.0;

  const radialSegments = 70;
  const tubularSegments = 50;
  const R = 1.2; 
  const r = 0.45;
  const points: { u: number; v: number; size: number; phase: number }[] = [];
  
  for (let i = 0; i < radialSegments; i++) {
    for (let j = 0; j < tubularSegments; j++) {
      points.push({
        u: (i / radialSegments) * Math.PI * 2,
        v: (j / tubularSegments) * Math.PI * 2,
        size: 1.5 + Math.random() * 1.0,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  const observer = new ResizeObserver(() => {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;
    if (w !== canvas.width || h !== canvas.height) {
      canvas.width = w || 1;
      canvas.height = h || 1;
    }
  });
  observer.observe(canvas);

  function onMouseMove(e: MouseEvent) {
    sharedRotation.lastMoveMs = performance.now();
    targetCX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetCY = -(e.clientY / window.innerHeight - 0.5) * 2;
  }

  function onMouseLeave() {
    sharedRotation.lastMoveMs = -Infinity;
    targetCX = 0;
    targetCY = 0;
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseleave', onMouseLeave);

  function frame() {
    const nowMs = performance.now();
    const dt = Math.min((nowMs - lastFrameMs) / 1000, 0.1);
    lastFrameMs = nowMs;

    const idleSince = (nowMs - sharedRotation.lastMoveMs) / 1000;
    const targetIdle = idleSince >= IDLE_TIMEOUT ? 1.0 : 0.0;
    idleWeight += (targetIdle - idleWeight) * Math.min(dt / FADE_DURATION, 1.0);
    sharedRotation.autoSpinT += dt * DOT_SPEED * idleWeight;

    const effectiveTargetX = targetCX * (1 - idleWeight);
    const effectiveTargetY = targetCY * (1 - idleWeight);
    smoothCX += (effectiveTargetX - smoothCX) * CURSOR_EMA;
    smoothCY += (effectiveTargetY - smoothCY) * CURSOR_EMA;

    const curLen = Math.sqrt(smoothCX * smoothCX + smoothCY * smoothCY);
    if (curLen > 1e-4) {
      const dist = Math.min(curLen, 1.0);
      // sqrt mapping: fast near center, tapers off toward the edges
      const distMapped = Math.sqrt(dist);
      const axisX = -smoothCY / curLen;
      const axisY = smoothCX / curLen;
      // Normalise by screen diagonal so the feel is resolution-independent
      const diagPx  = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);
      const refDiag = 1920;
      const resScale = refDiag / Math.max(diagPx, 400);
      const speed = distMapped * MAX_CURSOR_SPEED * DOT_SPEED * (1 - idleWeight) * resScale;
      const dq = quatFromAxisAngle(axisX, axisY, 0, speed * dt);
      sharedRotation.cursorQuat = quatNorm(quatMul(dq, sharedRotation.cursorQuat));
    }

    const slantX = [[1,0,0],[0, Math.cos(Math.PI/6), -Math.sin(Math.PI/6)],[0, Math.sin(Math.PI/6), Math.cos(Math.PI/6)]];
    const slantZ = [[Math.cos(Math.PI/8), -Math.sin(Math.PI/8), 0], [Math.sin(Math.PI/8), Math.cos(Math.PI/8), 0], [0,0,1]];
    const spinY = [[Math.cos(sharedRotation.autoSpinT*1.2), 0, Math.sin(sharedRotation.autoSpinT*1.2)], [0,1,0], [-Math.sin(sharedRotation.autoSpinT*1.2), 0, Math.cos(sharedRotation.autoSpinT*1.2)]];
    
    let modelMat = matMul3(matMul3(spinY, slantX), slantZ);
    const cursorMat = quatToRotationMatrix(sharedRotation.cursorQuat);
    const finalMat = matMul3(cursorMat, modelMat);

    const { width, height } = canvas;
    ctx!.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const scaleFactor = Math.min(width, height) * 0.35;

    const [cr, cg, cb] = DOT_COLOR;
    ctx!.fillStyle = `rgb(${cr * 255}, ${cg * 255}, ${cb * 255})`;
    const inkWeight = DOT_OPACITY;

    const projected = points.map(p => {
      const lx = (R + r * Math.cos(p.v)) * Math.cos(p.u);
      const ly = (R + r * Math.cos(p.v)) * Math.sin(p.u);
      const lz = r * Math.sin(p.v);

      const wx = finalMat[0][0]*lx + finalMat[0][1]*ly + finalMat[0][2]*lz;
      const wy = finalMat[1][0]*lx + finalMat[1][1]*ly + finalMat[1][2]*lz;
      const wz = finalMat[2][0]*lx + finalMat[2][1]*ly + finalMat[2][2]*lz;

      const camZ = 5.0; // Distance of camera from origin
      const perspective = camZ / (camZ - wz); // minus wz because positive z is toward user
      
      // Calculate a local normal for backface culling approximation
      // In a torus (lx, ly, lz), the unit normal is (cos(v)cos(u), cos(v)sin(u), sin(v))
      const nx = Math.cos(p.v) * Math.cos(p.u);
      const ny = Math.cos(p.v) * Math.sin(p.u);
      const nz = Math.sin(p.v);
      
      // Rotate normal (only Z component is used for backface test so avoid
      // computing unused X/Y components to prevent unused-variable errors)
      const wnz = finalMat[2][0]*nx + finalMat[2][1]*ny + finalMat[2][2]*nz;

      // Camera vector is (0, 0, 1) if looking from +Z towards origin.
      // But we are in a coordinate system where viewer is at +Z.
      // Dot product with (0,0,1) is just wnz.
      const isVisible = wnz > -0.2; 

      return {
        x: wx * perspective,
        y: wy * perspective,
        z: wz,
        size: p.size * perspective,
        visible: isVisible,
        phase: p.phase
      };
    }).filter(p => p.visible).sort((a, b) => a.z - b.z); // Far side (negative Z) first

    for (const p of projected) {
        // Basic lighting (dot product with light [constant at +Z])
        // p.z is positive for things closer to camera. Normalize to [0,1]
        const lum = Math.max(0, (p.z + r) / (r * 2)) + 0.2;
        
        // Add a slight shimmer/activity based on position and time
        const shimmer = Math.sin(p.z * 1.5 + sharedRotation.autoSpinT * 1.2 + p.phase) * 0.12;
        const dotAlpha = Math.max(0, Math.min(1, (inkWeight * (0.4 + 0.6 * lum)) + shimmer));
        
        ctx!.globalAlpha = dotAlpha;
        ctx!.beginPath();
        // Slightly larger dots to fill gaps better
        const dotSize = Math.max(0.4, p.size * (1.1 + lum * 0.6));
        ctx!.arc(centerX + p.x * scaleFactor, centerY - p.y * scaleFactor, dotSize, 0, Math.PI * 2);
        ctx!.fill();
    }

    rafId = requestAnimationFrame(frame);
  }

  rafId = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(rafId);
    observer.disconnect();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
  };
}
