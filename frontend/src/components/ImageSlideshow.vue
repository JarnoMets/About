<template>
  <div v-if="images.length > 0" class="slideshow">
    <!-- Main image area -->
    <div class="slideshow-stage" @click="handleStageClick">
      <transition :name="transitionName" mode="out-in">
        <img
          :key="currentIndex"
          :src="imageUrl(images[currentIndex].file)"
          :alt="images[currentIndex].caption || `Image ${currentIndex + 1}`"
          class="slideshow-image"
          draggable="false"
        />
      </transition>

      <!-- Left / right hit zones -->
      <button
        v-if="images.length > 1"
        class="nav-zone nav-zone--left"
        aria-label="Previous image"
        @click.stop="() => prev()"
      >
        <span class="nav-arrow">&#8249;</span>
      </button>
      <button
        v-if="images.length > 1"
        class="nav-zone nav-zone--right"
        aria-label="Next image"
        @click.stop="() => next()"
      >
        <span class="nav-arrow">&#8250;</span>
      </button>

      <!-- Caption -->
      <div
        v-if="config.showCaptions && images[currentIndex].caption"
        class="slideshow-caption"
      >
        {{ images[currentIndex].caption }}
      </div>

      <!-- Progress indicator -->
      <div v-if="images.length > 1" class="slideshow-counter">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>

      <!-- Auto-transition progress bar -->
      <div v-if="config.autoTransition && images.length > 1" class="progress-bar">
        <div class="progress-fill" :style="{ animationDuration: config.autoTransitionInterval + 'ms' }" :key="progressKey"></div>
      </div>
    </div>

    <!-- Thumbnail strip -->
    <div v-if="config.showThumbnailStrip && images.length > 1" class="thumbnail-strip" ref="stripRef">
      <button
        v-for="(img, i) in images"
        :key="i"
        class="thumb-btn"
        :class="{ active: i === currentIndex }"
        :aria-label="`Go to image ${i + 1}`"
        @click="goTo(i)"
      >
        <img
          :src="imageUrl(img.file)"
          :alt="img.caption || `Thumbnail ${i + 1}`"
          class="thumb-img"
          draggable="false"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { ProjectImageEntry, ProjectSlideshowConfig } from '@/composables/useProjectImages'
import { projectImageUrl } from '@/composables/useProjectImages'

const props = defineProps<{
  projectId: string
  images: ProjectImageEntry[]
  config: Required<ProjectSlideshowConfig>
}>()

const currentIndex = ref(0)
const transitionName = ref<'slide-left' | 'slide-right'>('slide-left')
const progressKey = ref(0)
const stripRef = ref<HTMLElement | null>(null)

let autoTimer: ReturnType<typeof setInterval> | null = null

function imageUrl(file: string): string {
  return projectImageUrl(props.projectId, file)
}

function goTo(index: number, direction?: 'left' | 'right', resetTimer = true) {
  if (index === currentIndex.value) return
  transitionName.value = direction === 'right' || (direction === undefined && index > currentIndex.value)
    ? 'slide-left'
    : 'slide-right'
  currentIndex.value = index
  progressKey.value++
  scrollThumbIntoView(index)
  // Only reset the auto timer for manual navigation; when auto-advancing
  // we avoid restarting the timer to prevent clearing/setting the interval
  // inside the interval callback which could cause subtle timing issues.
  if (resetTimer) startAuto()
}

function next(resetTimer = true) {
  const nextIdx = (currentIndex.value + 1) % props.images.length
  goTo(nextIdx, 'left', resetTimer)
}

function prev(resetTimer = true) {
  const prevIdx = (currentIndex.value - 1 + props.images.length) % props.images.length
  goTo(prevIdx, 'right', resetTimer)
}

function handleStageClick(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const x = e.clientX - target.getBoundingClientRect().left
  if (x < target.offsetWidth / 2) {
    prev()
  } else {
    next()
  }
}

function scrollThumbIntoView(index: number) {
  nextTick(() => {
    const strip = stripRef.value
    if (!strip) return
    const thumb = strip.children[index] as HTMLElement | undefined
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  })
}

function startAuto() {
  stopAuto()
  if (props.config.autoTransition && props.images.length > 1) {
    autoTimer = setInterval(() => {
      // Advance without resetting the timer again (automatic)
      next(false)
    }, props.config.autoTransitionInterval)
  }
}

function stopAuto() {
  if (autoTimer !== null) {
    clearInterval(autoTimer)
    autoTimer = null
  }
}

// Restart auto-transition whenever config changes
watch(
  () => [props.config.autoTransition, props.config.autoTransitionInterval],
  () => startAuto(),
  { immediate: false }
)

// Reset when images list changes (different project)
watch(
  () => props.images,
  () => {
    currentIndex.value = 0
    progressKey.value++
    startAuto()
  }
)

onMounted(() => {
  startAuto()
})

onUnmounted(() => {
  stopAuto()
})
</script>

<style scoped>
/* ─── Slide transitions ────────────────────────────────────── */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.slide-left-enter-from  { transform: translateX(100%); opacity: 0; }
.slide-left-leave-to    { transform: translateX(-100%); opacity: 0; }
.slide-right-enter-from { transform: translateX(-100%); opacity: 0; }
.slide-right-leave-to   { transform: translateX(100%); opacity: 0; }

/* ─── Slideshow container ──────────────────────────────────── */
.slideshow {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

/* ─── Main stage ───────────────────────────────────────────── */
.slideshow-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #1a1d24;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #3a3d46;
  cursor: pointer;
  user-select: none;
}

.slideshow-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* ─── Navigation zones ─────────────────────────────────────── */
.nav-zone {
  position: absolute;
  top: 0;
  height: 100%;
  width: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease, background 0.2s ease;
  z-index: 2;
  padding: 0;
}

.nav-zone--left  { left: 0; }
.nav-zone--right { right: 0; }

.slideshow-stage:hover .nav-zone {
  opacity: 1;
  background: linear-gradient(
    to var(--grad-dir, right),
    rgba(0, 0, 0, 0.35) 0%,
    transparent 100%
  );
}

.nav-zone--left  { --grad-dir: right; }
.nav-zone--right { --grad-dir: left; }

.nav-arrow {
  font-size: 2.5rem;
  line-height: 1;
  color: #fff;
  text-shadow: 0 1px 6px rgba(0,0,0,0.6);
  pointer-events: none;
}

/* ─── Caption ──────────────────────────────────────────────── */
.slideshow-caption {
  position: absolute;
  bottom: 2.2rem;
  left: 0;
  right: 0;
  text-align: center;
  padding: 0.4rem 1.2rem;
  font-size: 0.82rem;
  color: #e8eaf0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  pointer-events: none;
}

/* ─── Counter ──────────────────────────────────────────────── */
.slideshow-counter {
  position: absolute;
  top: 0.6rem;
  right: 0.8rem;
  font-size: 0.72rem;
  color: #c8ccd8;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.2rem 0.55rem;
  border-radius: 20px;
  pointer-events: none;
  z-index: 3;
}

/* ─── Progress bar ─────────────────────────────────────────── */
.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255,255,255,0.15);
  overflow: hidden;
  z-index: 3;
}

.progress-fill {
  height: 100%;
  background: #5568b4;
  animation: progress-fill linear forwards;
  transform-origin: left center;
}

@keyframes progress-fill {
  from { width: 0%; }
  to   { width: 100%; }
}

/* ─── Thumbnail strip ──────────────────────────────────────── */
.thumbnail-strip {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.25rem 0.1rem;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #3a3d46 transparent;
}

.thumbnail-strip::-webkit-scrollbar {
  height: 4px;
}
.thumbnail-strip::-webkit-scrollbar-track {
  background: transparent;
}
.thumbnail-strip::-webkit-scrollbar-thumb {
  background: #3a3d46;
  border-radius: 4px;
}

.thumb-btn {
  flex: 0 0 auto;
  width: 72px;
  height: 48px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  background: #1a1d24;
  transition: border-color 0.2s ease, opacity 0.2s ease;
  opacity: 0.55;
}

.thumb-btn:hover {
  opacity: 0.85;
  border-color: #505664;
}

.thumb-btn.active {
  border-color: #5568b4;
  opacity: 1;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}

/* ─── Light mode overrides ─────────────────────────────────── */
@media (prefers-color-scheme: light) {
  .slideshow-stage {
    background: #e4e8f0;
    border-color: #dde0e6;
  }

  .thumbnail-strip {
    scrollbar-color: #c0c6d0 transparent;
  }
  .thumbnail-strip::-webkit-scrollbar-thumb {
    background: #c0c6d0;
  }

  .thumb-btn {
    background: #eaecf2;
    border-color: transparent;
  }

  .thumb-btn:hover {
    border-color: #b0b6c4;
  }

  .thumb-btn.active {
    border-color: #4a5ca0;
  }

  .progress-fill {
    background: #4a5ca0;
  }
}
</style>
