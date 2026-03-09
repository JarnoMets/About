<template>
  <!-- WebGPU background canvas – hidden on the home page (which has its own 2D canvas) -->
  <canvas ref="bgCanvas" class="bg-canvas" :class="{ hidden: isHome }" aria-hidden="true" />

  <div id="app" :style="isHome ? {} : { opacity: contentOpacity }">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import { initSphereRenderer } from '@/webgpu/sphere-renderer';
import { useIdleFade } from '@/composables/useIdleFade';

const bgCanvas = ref<HTMLCanvasElement | null>(null);
let cleanup: (() => void) | null = null;

const route  = useRoute();
const isHome = computed(() => route.name === 'Home');

// Idle fade for non-home pages: 30 s delay, 2 min fade, 20% floor
const { opacity: contentOpacity } = useIdleFade(30, 120, 0.2);

onMounted(async () => {
  if (!bgCanvas.value) return;
  try {
    cleanup = await initSphereRenderer(bgCanvas.value);
  } catch (err) {
    console.warn('WebGPU background renderer unavailable:', err);
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
  z-index: -1;
  pointer-events: none;
}
.bg-canvas.hidden {
  display: none;
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
