<template>
  <!-- Fixed full-screen background canvas -->
  <canvas ref="bgCanvas" class="bg-canvas" aria-hidden="true" />

  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { initSphereRenderer } from '@/webgpu/sphere-renderer';

const bgCanvas = ref<HTMLCanvasElement | null>(null);
let cleanup: (() => void) | null = null;

onMounted(async () => {
  if (!bgCanvas.value) return;
  try {
    cleanup = await initSphereRenderer(bgCanvas.value);
  } catch (err) {
    // WebGPU unavailable – canvas stays hidden, site still works
    console.warn('Background WebGPU renderer unavailable:', err);
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

/* ── App shell sits above the canvas ── */
#app {
  position: relative;
  z-index: 1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
