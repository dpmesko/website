import { about } from '@/content/about'
import { Prose } from '@/lib/markdown'
import { useReveal } from '@/lib/useReveal'
import { Blob } from './Decor'
import { Themed } from './Themed'

export function About() {
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <Themed theme={about.theme} id="about" className="px-[5vw] py-28 sm:py-40">
      <Blob className="pointer-events-none absolute -left-24 bottom-0 w-[34vw] max-w-sm text-[var(--accent)] opacity-10" />

      <div
        ref={ref}
        className={`relative mx-auto max-w-4xl transition-all duration-700 ease-out
                    ${shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.035em]">
          {about.heading}
        </h2>

        <div className="mt-10 grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <Prose body={about.body} />
          {about.aside && (
            <aside className="max-w-xs border-l-4 border-[var(--accent)] pl-5 text-[var(--muted)]">
              {about.aside}
            </aside>
          )}
        </div>
      </div>
    </Themed>
  )
}
