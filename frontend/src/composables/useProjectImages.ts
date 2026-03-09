import { ref, computed, watch, isRef } from 'vue'
import type { Ref } from 'vue'

export interface ProjectImageEntry {
  file: string
  caption?: string
}

export interface ProjectSlideshowConfig {
  autoTransition?: boolean
  autoTransitionInterval?: number // ms
  showCaptions?: boolean
  showThumbnailStrip?: boolean
}

export interface ProjectImageConfig {
  thumbnail?: string
  images?: ProjectImageEntry[]
  slideshow?: ProjectSlideshowConfig
}

const DEFAULT_SLIDESHOW: Required<ProjectSlideshowConfig> = {
  autoTransition: false,
  autoTransitionInterval: 4000,
  showCaptions: true,
  showThumbnailStrip: true,
}

/**
 * Resolves the public URL for a project image file.
 * Images live at: /images/projects/<projectId>/<file>
 */
export function projectImageUrl(projectId: string, file: string): string {
  return `/images/projects/${projectId}/${file}`
}

/**
 * Loads the config.json from /images/projects/<projectId>/config.json.
 * Accepts a plain string or a reactive Ref<string> — re-fetches automatically
 * when the id changes.
 */
export function useProjectImages(projectIdSource: string | Ref<string>) {
  const config = ref<ProjectImageConfig | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  function load(id: string) {
    if (!id) return
    loading.value = true
    error.value = null
    config.value = null
    fetch(`/images/projects/${id}/config.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<ProjectImageConfig>
      })
      .then((data) => {
        config.value = data
      })
      .catch((e) => {
        error.value = String(e)
      })
      .finally(() => {
        loading.value = false
      })
  }

  if (isRef(projectIdSource)) {
    watch(projectIdSource, (id) => load(id), { immediate: true })
  } else {
    load(projectIdSource)
  }

  const thumbnail = computed<string | null>(() => {
    const id = isRef(projectIdSource) ? projectIdSource.value : projectIdSource
    if (!config.value?.thumbnail) return null
    return projectImageUrl(id, config.value.thumbnail)
  })

  const images = computed<ProjectImageEntry[]>(() => {
    return config.value?.images ?? []
  })

  const slideshowConfig = computed<Required<ProjectSlideshowConfig>>(() => ({
    ...DEFAULT_SLIDESHOW,
    ...(config.value?.slideshow ?? {}),
  }))

  return { config, loading, error, thumbnail, images, slideshowConfig }
}
