import { useEffect, useState } from 'react'
import { themes, type ThemeName } from '@/content/themes'

/**
 * Reports which themed section currently sits under the top bar.
 *
 * The nav floats over sections that swing from bone to cobalt to lime, so a
 * fixed ink-coloured nav would vanish against half of them. Instead the nav
 * adopts the ink and accent of whatever it is currently overlapping.
 */
export function useActiveTheme(probeOffset = 40) {
  const [name, setName] = useState<ThemeName>('bone')

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const nodes = document.querySelectorAll<HTMLElement>('[data-theme-name]')
      for (const node of nodes) {
        const { top, bottom } = node.getBoundingClientRect()
        if (top <= probeOffset && bottom > probeOffset) {
          const next = node.dataset.themeName as ThemeName
          if (next && next in themes) setName(next)
          return
        }
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [probeOffset])

  return themes[name]
}

/** Which section id is currently in view, for highlighting the nav. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (ids.length === 0) return
    let frame = 0

    const measure = () => {
      frame = 0
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top, bottom } = el.getBoundingClientRect()
        // Count a section as active once it covers the upper third of the
        // viewport -- the spot the eye actually reads from.
        if (top <= window.innerHeight / 3 && bottom > window.innerHeight / 3) {
          current = id
        }
      }
      setActive(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
