import { heroTheme, site } from '@/content/site'
import { Arc, Sparkle, Squiggle } from './Decor'
import { Themed } from './Themed'

/**
 * Full-viewport opener. The name is the artwork -- it is set as large as the
 * viewport allows and everything else defers to it.
 */
export function Hero() {
  return (
    <Themed theme={heroTheme} id="top" className="flex min-h-[100svh] flex-col justify-between">
      {/* Decor sits behind the type and is clipped by the section. */}
      <Arc
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-24 w-[38vw] max-w-md rotate-12 text-[var(--accent)] opacity-15"
      />
      <Sparkle className="pointer-events-none absolute left-[6vw] top-[18vh] w-10 text-[var(--accent)] sm:w-14" />

      <div className="flex flex-1 flex-col justify-center px-[5vw] pb-16 pt-32">
        <p className="animate-rise text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)] sm:text-base">
          {site.role}
        </p>

        <h1 className="animate-rise [animation-delay:80ms] mt-4 font-display text-[clamp(3.5rem,15vw,17rem)] font-extrabold leading-[0.85] tracking-[-0.04em]">
          {site.name}
        </h1>

        <div className="animate-rise [animation-delay:160ms] mt-8 flex max-w-2xl items-start gap-5">
          <Squiggle className="mt-3 hidden w-24 flex-none text-[var(--accent)] sm:block" />
          <p className="text-lg leading-snug text-[var(--muted)] sm:text-2xl">{site.heroLine}</p>
        </div>
      </div>

      <ScrollCue />
    </Themed>
  )
}

function ScrollCue() {
  return (
    <a
      href="#about"
      className="group mx-auto mb-10 flex flex-col items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
    >
      <span className="text-xs font-medium uppercase tracking-[0.2em]">Scroll</span>
      <svg
        width="20" height="28" viewBox="0 0 20 28" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        className="animate-nudge"
      >
        <path d="M10 2v22M3 17l7 7 7-7" />
      </svg>
      <span className="sr-only">Skip to the about section</span>
    </a>
  )
}
