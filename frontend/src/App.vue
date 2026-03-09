<template>
  <!-- Fixed full-screen background canvas -->
  <canvas ref="bgCanvas" class="bg-canvas" aria-hidden="true" />

  <div id="app" :style="{ opacity: contentOpacity }">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { initBackgroundRenderer } from '@/utils/background-renderer';
import { initSphereRenderer } from '@/webgpu/sphere-renderer';
import { useIdleFade } from '@/composables/useIdleFade';

const bgCanvas = ref<HTMLCanvasElement | null>(null);
let cleanup: (() => void) | null = null;

// Content fades to 20% after 30 s idle, over 2 minutes
const { opacity: contentOpacity } = useIdleFade(30, 120, 0.2);

onMounted(async () => {
  if (!bgCanvas.value) return;

  // Always start with the Canvas 2D dot renderer — this matches the live site
  // look exactly and works in every browser.
  cleanup = initBackgroundRenderer(bgCanvas.value);

  // Silently try to upgrade to WebGPU in the background.
  // If it succeeds, swap renderers; pages that set style='noise-dither' or
  // 'wireframe' will then get the richer GPU look automatically.
  try {
    const gpuCleanup = await initSphereRenderer(bgCanvas.value);
    // GPU renderer started successfully — retire the 2D renderer
    cleanup?.();
    cleanup = gpuCleanup;
  } catch {
    // WebGPU unavailable or failed — stay on Canvas 2D, nothing to do
  }
});

onUnmounted(() => {
  cleanup?.();
});
</script>

<style>
/* ── Full-screen WebGPU background ── */
.bg-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  /* ensure the animated canvas stays behind all UI chrome */
  z-index: -1;
  pointer-events: none;
}

@media print {
  .bg-canvas {
    display: none !important;
  }
}

/* ── App shell sits above the canvas ── */
#app {
  position: relative;
  z-index: 1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Smooth the per-frame opacity update so it doesn't flicker */
  transition: opacity 1s linear;
}

@media print {
  #app { opacity: 1 !important; }
}
</style>
