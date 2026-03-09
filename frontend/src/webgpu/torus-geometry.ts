// Lightweight TypeScript torus geometry generator fallback.
// Produces interleaved vertex data: [x,y,z, nx,ny,nz, ...]

export function torus_vertices(radialSegments: number, tubularSegments: number, radius: number, tube: number): Float32Array {
  const verts: number[] = [];
  for (let j = 0; j <= radialSegments; j++) {
    const v = (j / radialSegments) * Math.PI * 2;
    const cosV = Math.cos(v), sinV = Math.sin(v);
    for (let i = 0; i <= tubularSegments; i++) {
      const u = (i / tubularSegments) * Math.PI * 2;
      const cosU = Math.cos(u), sinU = Math.sin(u);

      // Parametric torus position
      const x = (radius + tube * cosV) * cosU;
      const y = (radius + tube * cosV) * sinU;
      const z = tube * sinV;

      // Compute normal
      // vector from torus centerline to surface point: (cosV*cosU, cosV*sinU, sinV)
      const nx = cosV * cosU;
      const ny = cosV * sinU;
      const nz = sinV;
      const len = Math.hypot(nx, ny, nz) || 1;

      verts.push(x, y, z, nx / len, ny / len, nz / len);
    }
  }
  return new Float32Array(verts);
}

export function torus_indices(radialSegments: number, tubularSegments: number): Uint32Array {
  const inds: number[] = [];
  for (let j = 0; j < radialSegments; j++) {
    for (let i = 0; i < tubularSegments; i++) {
      const a = (tubularSegments + 1) * j + i;
      const b = (tubularSegments + 1) * (j + 1) + i;
      const c = (tubularSegments + 1) * (j + 1) + (i + 1);
      const d = (tubularSegments + 1) * j + (i + 1);

      // two triangles (a, b, d) and (b, c, d)
      inds.push(a, b, d);
      inds.push(b, c, d);
    }
  }
  return new Uint32Array(inds);
}
