import { useEffect, useRef, useState } from 'react'

const YT_ORIGIN = 'https://www.youtube-nocookie.com'

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
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const src =
    provider === 'youtube'
      ? `${YT_ORIGIN}/embed/${id}?` +
        [
          'autoplay=1',
          'rel=0',
          // Documented as "use the user's preference" rather than a hard off,
          // so this alone is not enough -- see turnOffCaptions below.
          'cc_load_policy=0',
          'iv_load_policy=3',
          // Lets iOS play inline instead of hijacking into fullscreen.
          'playsinline=1',
          // Required before the player will accept postMessage commands.
          'enablejsapi=1',
          start ? `start=${start}` : '',
        ]
          .filter(Boolean)
          .join('&')
      : `https://player.vimeo.com/video/${id}?autoplay=1&texttrack=false${
          start ? `#t=${start}s` : ''
        }`

  // maxresdefault is a true 16:9 frame, but YouTube only generates it for HD
  // uploads. hqdefault always exists, so fall back to it if the first 404s.
  const poster =
    provider !== 'youtube'
      ? undefined
      : posterFailed
        ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
        : `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

  /**
   * Videos with auto-generated caption tracks turn subtitles on by themselves,
   * and no URL parameter reliably switches them back off. The iframe API does,
   * via postMessage -- which needs no extra script, only enablejsapi=1 above.
   *
   * The player is not necessarily ready the moment the document fires load, so
   * the command is repeated a few times and then given up on. Failing to land
   * costs nothing worse than the captions staying visible.
   */
  const turnOffCaptions = (frame: HTMLIFrameElement | null) => {
    if (provider !== 'youtube' || !frame) return

    const send = () => {
      const win = frame.contentWindow
      if (!win) return
      for (const mod of ['captions', 'cc']) {
        win.postMessage(
          JSON.stringify({ event: 'command', func: 'unloadModule', args: [mod] }),
          YT_ORIGIN,
        )
      }
    }

    send()
    timers.current.push(
      window.setTimeout(send, 400),
      window.setTimeout(send, 1200),
      window.setTimeout(send, 2500),
    )
  }

  return (
    <figure className="overflow-hidden rounded-2xl border-2 border-[var(--ink)]/10">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            src={src}
            title={title}
            onLoad={(e) => turnOffCaptions(e.currentTarget)}
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
