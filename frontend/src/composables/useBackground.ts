import { onMounted, onUnmounted } from 'vue';
import { backgroundFilter, type BackgroundFilter } from '@/webgpu/sphere-renderer';

/**
 * Call this inside any view's `<script setup>` to apply a page-specific
 * look to the background torus while that view is active.
 *
 * The original filter values are restored when the component unmounts.
 *
 * @example
 * // Warm orange ink, slower spin for the CV page
 * useBackground({ speed: 0.4, opacity: 0.35, color: [1.0, 0.6, 0.2] });
 */
export function useBackground(filter: Partial<BackgroundFilter>) {
  // Save originals so we can restore them on unmount
  const saved: BackgroundFilter = { ...backgroundFilter };

  onMounted(() => {
    if (filter.speed   !== undefined) backgroundFilter.speed   = filter.speed;
    if (filter.opacity !== undefined) backgroundFilter.opacity = filter.opacity;
    if (filter.color   !== undefined) backgroundFilter.color   = filter.color;
  });

  onUnmounted(() => {
    backgroundFilter.speed   = saved.speed;
    backgroundFilter.opacity = saved.opacity;
    backgroundFilter.color   = saved.color;
  });
}
