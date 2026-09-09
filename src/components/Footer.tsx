import { useState } from 'react'
import { site } from '@/content/site'
import { Squiggle } from './Decor'
import { Themed } from './Themed'

/**
 * Everything contact-related in one place at the bottom -- email and socials
 * grouped together, no separate contact page.
 */
export function Footer() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (insecure origin or denied permission). The
      // address is on screen and the mailto link still works, so do nothing.
      setCopied(false)
    }
  }

  return (
    <Themed theme="ink" id="contact" className="px-[5vw] pb-14 pt-28 sm:pt-40">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-[clamp(2.5rem,9vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.04em]">
          Say hello.
        </h2>

        <Squiggle className="mt-8 w-40 text-[var(--accent)] sm:w-56" />

        <div className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Email
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="break-all font-display text-[clamp(1.5rem,5vw,3rem)] font-extrabold
                         leading-tight tracking-[-0.03em] underline decoration-[var(--accent)]
                         decoration-4 underline-offset-[0.15em] transition-colors hover:text-[var(--accent)]"
            >
              {site.email}
            </a>
            <button
              onClick={copy}
              className="rounded-full border-2 border-[var(--muted)] px-4 py-1.5 text-sm font-semibold
                         transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Elsewhere
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {site.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-[var(--muted)]
                             px-5 py-2.5 text-base font-semibold transition-colors
                             hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {social.label}
                  <svg
                    width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    <path d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-24 text-sm text-[var(--muted)]">
          &copy; {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </Themed>
  )
}
