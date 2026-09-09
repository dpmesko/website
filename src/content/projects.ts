import type { ThemeName } from './themes'

/**
 * Work / projects. Single column, visual, casual.
 *
 * `blurb` is the voice of the section -- write it like you're describing the
 * project to someone over coffee, not like a case study abstract.
 */
export interface Project {
  title: string
  /** Optional context line: year, role, or who it was for. */
  meta?: string
  blurb: string
  href?: string
  /** Text for the outbound link. Defaults to "Have a look". */
  linkLabel?: string
  /** Optional visual. Put files in public/images/ and reference "/images/x.jpg". */
  image?: { src: string; alt: string }
  /** Optional video instead of an image. Only the ID, not the whole URL:
   *  youtube.com/watch?v=ABC123 -> id: 'ABC123'. Takes precedence over image.
   *  `start` is seconds, matching a &t=112s in a share link. */
  video?: {
    provider: 'youtube' | 'vimeo'
    id: string
    title: string
    start?: number
  }
}

export const workSection = {
  heading: 'Things I’ve made',
  theme: 'sky' as ThemeName,
  /** Optional line under the heading. Set to '' to hide. */
  intro: 'A few things I’ve built, streamed, or otherwise had a hand in.',
}

// ---------------------------------------------------------------------------
// Only `title` and `blurb` are required. `meta`, `href`, `image` and `video`
// are optional and the layout adapts. Emptying this array hides the whole Work
// section rather than leaving a bare heading.
//
// Order here is the order on the page - still to be decided as more get added.
// ---------------------------------------------------------------------------
export const projects: Project[] = [
  {
    title: 'The J.D. Durkin Show',
    meta: '“Rally or Reckoning: Markets Celebrate But Recession Risks Rise” - April 9, 2026',
    blurb:
      'One of our shows at Launch Live Now, produced and streamed live every week from our remote control rooms in Brooklyn. I built the show’s on-screen product: a detail-rich lower third with headlines, tickers and an index “big board”, topic banners, side rundowns, guest feeds, and multiple shots to cut between. J.D. anchors live from the trading floor through an interface I built with the tech team at the New York Stock Exchange to connect us to their cameras and microphones.',
    video: {
      provider: 'youtube',
      id: 'xbrxihwEQOI',
      title: 'The J.D. Durkin Show, live from the New York Stock Exchange trading floor',
      // Matches the &t=112s on the share link Dan sent.
      start: 112,
    },
    href: 'https://www.youtube.com/watch?v=xbrxihwEQOI',
    linkLabel: 'Watch the full episode',
  },
]
