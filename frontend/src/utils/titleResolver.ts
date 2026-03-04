import { RouteLocationNormalizedLoaded } from 'vue-router'

export interface I18nLike {
  t: (k: string) => string
  te: (k: string) => boolean
}

const SITE_TITLE = 'Jarno Mets'

/**
 * Resolve a human-friendly document.title for a given route using i18n keys.
 * Priority:
 * 1. route.meta.title (string key or literal)
 * 2. dynamic ProjectDetail -> projects.<id>.name (if present)
 * 3. known route name -> i18n keys (home.title, projects.title, contact.title, cv.title)
 * 4. fallback to SITE_TITLE
 */
export function resolveTitle(route: RouteLocationNormalizedLoaded, i18n: I18nLike, siteName = SITE_TITLE): string {
  try {
    // meta.title explicit override
    const metaTitle = (route.meta && (route.meta as any).title) as unknown
    if (metaTitle) {
      if (typeof metaTitle === 'string') {
        // translation key or literal
        if (i18n.te(metaTitle)) return `${i18n.t(metaTitle)} — ${siteName}`
        return `${String(metaTitle)} — ${siteName}`
      }
    }

    // Project detail special case: use localized project name when available
    if (route.name === 'ProjectDetail') {
      const id = String(route.params?.id || '')
      const key = `projects.${id}.name`
      const projectName = i18n.te(key) ? i18n.t(key) : id
      const projectsTitle = i18n.te('projects.title') ? i18n.t('projects.title') : 'Projects'
      return `${projectName} — ${projectsTitle} — ${siteName}`
    }

    // Known routes mapping
    const name = String(route.name || '')
    const mapping: Record<string, string> = {
      Home: 'home.title',
      Projects: 'projects.title',
      Contact: 'contact.title',
      CV: 'cv.title'
    }

    const key = mapping[name]
    if (key && i18n.te(key)) {
      const base = i18n.t(key)
      return `${base} — ${siteName}`
    }

    // fallback to site name
    return siteName
  } catch (err) {
    // best-effort: never throw
    // eslint-disable-next-line no-console
    console.warn('titleResolver error', err)
    return siteName
  }
}

export default resolveTitle
