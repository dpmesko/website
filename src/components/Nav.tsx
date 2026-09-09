import { useEffect, useMemo, useState } from 'react'
import { navLinks } from '@/content/nav'
import { site } from '@/content/site'
import { useActiveSection, useActiveTheme } from '@/lib/useActiveTheme'

/**
 * Fixed anchor nav.
 *
 * It floats over sections whose backgrounds swing from bone to cobalt, so it
 * reads the theme underneath it and recolours to match rather than picking one
 * colour and losing against half the page.
 */
export function Nav() {
  const theme = useActiveTheme()
  const ids = useMemo(() => navLinks.map((l) => l.id), [])
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{ color: theme.ink }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'backdrop-blur-[2px]' : ''
      }`}
    >
      <div className="flex items-center justify-between px-[5vw] py-5">
        <a
          href="#top"
          className="font-display text-lg font-extrabold tracking-tight transition-opacity hover:opacity-60"
        >
          {site.name}
        </a>

        <nav aria-label="Sections" className="hidden gap-7 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'true' : undefined}
              style={{ color: active === link.id ? theme.accent : undefined }}
              className="text-sm font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="sm:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 7h18M3 17h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          aria-label="Sections"
          style={{ backgroundColor: theme.bg }}
          className="flex flex-col gap-1 px-[5vw] pb-6 sm:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="py-2 font-display text-2xl font-extrabold tracking-tight"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
