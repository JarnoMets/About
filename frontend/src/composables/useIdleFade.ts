import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Tracks mouse idle time and returns a reactive CSS opacity value (0..1).
 *
 * After `idleDelay` seconds of no mouse movement the opacity starts fading
 * from 1.0 down to `minOpacity` over `fadeDuration` seconds.
 * Any mouse movement instantly restores full opacity.
 *
 * @param idleDelay     Seconds of inactivity before fade begins (default 30)
 * @param fadeDuration  Seconds to fade from 1.0 → minOpacity (default 120)
 * @param minOpacity    Lowest opacity reached (default 0.2)
 */
export function useIdleFade(
  idleDelay   = 30,
  fadeDuration = 120,
  minOpacity  = 0.2,
) {
  const opacity = ref(1.0);

  let rafId: number;
  let lastMoveMs = performance.now();

  function onMove() {
    lastMoveMs = performance.now();
  }

  function tick() {
    const idleSec = (performance.now() - lastMoveMs) / 1000;
    if (idleSec <= idleDelay) {
      opacity.value = 1.0;
    } else {
      // How far into the fade window are we? 0 = just started, 1 = done
      const t = Math.min((idleSec - idleDelay) / fadeDuration, 1.0);
      opacity.value = 1.0 - t * (1.0 - minOpacity);
    }
    rafId = requestAnimationFrame(tick);
  }

  onMounted(() => {
    document.addEventListener('mousemove',   onMove, { passive: true });
    document.addEventListener('mousedown',   onMove, { passive: true });
    document.addEventListener('touchstart',  onMove, { passive: true });
    document.addEventListener('keydown',     onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
  });

  onUnmounted(() => {
    cancelAnimationFrame(rafId);
    document.removeEventListener('mousemove',  onMove);
    document.removeEventListener('mousedown',  onMove);
    document.removeEventListener('touchstart', onMove);
    document.removeEventListener('keydown',    onMove);
  });

  return { opacity };
}
