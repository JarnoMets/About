<template>
  <div class="thumbnail-wrap">
    <img
      v-if="thumbnail && !imgError"
      :src="thumbnail"
      :alt="`${projectId} thumbnail`"
      class="thumbnail-img"
      draggable="false"
      @error="imgError = true"
    />
    <div v-else class="image-placeholder">
      <span class="placeholder-icon">{{ fallbackIcon }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProjectImages } from '@/composables/useProjectImages'

const props = defineProps<{
  projectId: string
  fallbackIcon: string
}>()

const { thumbnail } = useProjectImages(props.projectId)
const imgError = ref(false)
</script>

<style scoped>
.thumbnail-wrap {
  width: 100%;
  height: 100%;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  display: block;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #323848, #2e3440);
}

.placeholder-icon {
  font-size: 2.5rem;
  font-weight: 700;
  color: #6878a8;
  opacity: 0.5;
  letter-spacing: 0.05em;
  user-select: none;
}

@media (prefers-color-scheme: light) {
  .image-placeholder {
    background: linear-gradient(135deg, #e4e8f0, #eaecf2);
  }

  .placeholder-icon {
    color: #8090b8;
  }
}
</style>
