import type { CSSProperties, ReactNode } from 'react'
import { themes, type ThemeName } from '@/content/themes'

/**
 * Wraps a section and publishes its palette as CSS variables, so everything
 * inside can just say `text-[var(--accent)]` without knowing which theme it is
 * in. The `data-theme-name` attribute is what the nav reads to recolour itself.
 */
export function Themed({
  theme,
  id,
  className = '',
  children,
}: {
  theme: ThemeName
  id?: string
  className?: string
  children: ReactNode
}) {
  const t = themes[theme]
  const style = {
    '--bg': t.bg,
    '--ink': t.ink,
    '--accent': t.accent,
    '--muted': t.muted,
    backgroundColor: t.bg,
    color: t.ink,
  } as CSSProperties

  return (
    <section
      id={id}
      data-theme-name={theme}
      style={style}
      className={`relative overflow-hidden scroll-mt-0 ${className}`}
    >
      {children}
    </section>
  )
}
