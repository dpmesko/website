import type { Project } from '@/content/projects'
import { projects, workSection } from '@/content/projects'
import { Prose } from '@/lib/markdown'
import { useReveal } from '@/lib/useReveal'
import { Themed } from './Themed'
import { VideoEmbed } from './VideoEmbed'

export function Work() {
  // An empty list should remove the section, not render a heading over nothing.
  if (projects.length === 0) return null

  return (
    <Themed theme={workSection.theme} id="work" className="px-[5vw] py-28 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.035em]">
          {workSection.heading}
        </h2>
        {workSection.intro && (
          <p className="mt-5 max-w-xl text-lg text-[var(--muted)] sm:text-xl">{workSection.intro}</p>
        )}

        {/* Single column, generous spacing -- reads as a scroll, not a table. */}
        <ul className="mt-20 space-y-24 sm:space-y-32">
          {projects.map((project, i) => (
            <ProjectItem key={project.title} project={project} index={i} />
          ))}
        </ul>
      </div>
    </Themed>
  )
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const { ref, shown } = useReveal<HTMLLIElement>()

  return (
    <li
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-display text-2xl font-extrabold text-[var(--accent)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-display text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          {project.title}
        </h3>
      </div>

      {project.meta && (
        <p className="mt-3 max-w-2xl pl-[calc(1.5rem+1ch)] text-sm font-semibold tracking-wide text-[var(--muted)]">
          {project.meta}
        </p>
      )}

      {project.video ? (
        <div className="mt-8">
          <VideoEmbed {...project.video} />
        </div>
      ) : project.image ? (
        <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[var(--ink)]/10">
          <img
            src={project.image.src}
            alt={project.image.alt}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="mt-7 max-w-2xl">
        <Prose body={project.blurb} />
      </div>

      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-2 border-b-2 border-[var(--accent)] pb-1
                     text-lg font-semibold text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
        >
          {project.linkLabel ?? 'Have a look'}
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <path d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </a>
      )}
    </li>
  )
}
