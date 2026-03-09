<template>
  <!-- Home page owns its own full-screen canvas for the 2D dot renderer -->
  <canvas ref="dotCanvas" class="home-canvas" aria-hidden="true" />

  <div class="home">
    <section class="hero">
      <h1 class="hero-title">Jarno Mets</h1>
      <p class="hero-sub">Software Developer</p>
      <div class="hero-actions">
        <router-link to="/projects" class="btn btn-primary">Projects</router-link>
        <router-link to="/contact"  class="btn btn-outline">Get in touch</router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { initBackgroundRenderer } from '@/utils/background-renderer';

const dotCanvas = ref<HTMLCanvasElement | null>(null);
let cleanup: (() => void) | null = null;

onMounted(() => {
  if (dotCanvas.value) {
    cleanup = initBackgroundRenderer(dotCanvas.value);
  }
});

onUnmounted(() => {
  cleanup?.();
});
</script>

<style scoped>
.home-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.home {
  min-height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero {
  text-align: center;
  padding: 2rem 1rem;
}

.hero-title {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #e8eaf0;
  margin-bottom: 0.5rem;
}

.hero-sub {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: #a0a8b8;
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #5568b4;
  color: #fff;
}
.btn-primary:hover { background: #6478c4; transform: translateY(-1px); }

.btn-outline {
  background: transparent;
  color: #b0b8c8;
  border: 1px solid #484e5c;
}
.btn-outline:hover {
  border-color: #6a7288;
  background: rgba(255,255,255,0.05);
  color: #d0d4dc;
  transform: translateY(-1px);
}
</style>
