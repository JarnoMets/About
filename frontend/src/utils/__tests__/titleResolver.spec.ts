import { describe, it, expect } from 'vitest'
import { resolveTitle } from '@/utils/titleResolver'

const makeI18n = (map: Record<string, string>) => ({
  t: (k: string) => map[k] ?? k,
  te: (k: string) => Object.prototype.hasOwnProperty.call(map, k)
})

describe('titleResolver', () => {
  it('uses meta.title translation when present', () => {
    const i18n = makeI18n({ 'home.title': 'About' })
    const route: any = { meta: { title: 'home.title' }, name: 'Home' }
    expect(resolveTitle(route, i18n as any, 'Site')).toBe('About — Site')
  })

  it('resolves project detail dynamic name when translation exists', () => {
    const i18n = makeI18n({ 'projects.cards.name': 'Cards', 'projects.title': 'Projects' })
    const route: any = { name: 'ProjectDetail', params: { id: 'cards' } }
    expect(resolveTitle(route, i18n as any, 'Site')).toBe('Cards — Projects — Site')
  })

  it('falls back to id when project name translation missing', () => {
    const i18n = makeI18n({ 'projects.title': 'Projects' })
    const route: any = { name: 'ProjectDetail', params: { id: 'unknown' } }
    expect(resolveTitle(route, i18n as any, 'Site')).toBe('unknown — Projects — Site')
  })

  it('falls back to site name when nothing else', () => {
    const i18n = makeI18n({})
    const route: any = { name: 'Unknown' }
    expect(resolveTitle(route, i18n as any, 'Site')).toBe('Site')
  })
})
