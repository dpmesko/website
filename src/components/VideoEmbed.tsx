import { useState } from 'react'

/**
 * Facade-style embed: renders a lightweight poster until clicked, then swaps in
 * the real iframe. This keeps YouTube's ~1MB of player JS (and its cookies) off
 * the page for visitors who never press play.
 */
export function VideoEmbed({
  provider,
  id,
  title,
  start,
}: {
  provider: 'youtube' | 'vimeo'
  id: string
  title: string
  /** Seconds to start playback at. Both providers spell this differently. */
  start?: number
}) {
  const [playing, setPlaying] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)

  const src =
    provider === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${
          start ? `&start=${start}` : ''
        }`
      : `https://player.vimeo.com/video/${id}?autoplay=1${start ? `#t=${start}s` : ''}`

  // maxresdefault is a true 16:9 frame, but YouTube only generates it for HD
  // uploads. hqdefault always exists, so fall back to it if the first 404s.
  const poster =
    provider !== 'youtube'
      ? undefined
      : posterFailed
        ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
        : `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

  return (
    <figure className="overflow-hidden rounded-2xl border-2 border-[var(--ink)]/10">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {poster && (
              <img
                src={poster}
                alt=""
                loading="lazy"
                onError={() => setPosterFailed(true)}
                className="h-full w-full object-cover"
              />
            )}
            <span className="absolute inset-0 grid place-items-center bg-black/30 transition-colors group-hover:bg-black/45">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#111" aria-hidden="true" className="ml-1">
                  <path d="M5 3l16 9-16 9V3z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-1 pt-3 text-sm text-[var(--muted)]">{title}</figcaption>
    </figure>
  )
}
