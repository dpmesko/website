import type { ThemeName } from './themes'

export interface Social {
  label: string
  href: string
}

export interface SiteConfig {
  /** Rendered as the hero's oversized display type. */
  name: string
  /** Small line above the name. */
  role: string
  /** One personality-forward sentence under the name. Not a mission statement. */
  heroLine: string
  email: string
  socials: Social[]
  /** Canonical origin. The <title> and meta tags themselves live in
   *  index.html, which is what crawlers read. */
  siteUrl: string
}

export const site: SiteConfig = {
  name: 'Dan Mesko',
  role: 'Software Engineer, Livestream Producer',
  heroLine: 'I build software and use it to do cool things.',
  email: 'dpmesko@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/dpmesko' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-mesko-495a42156/' },
  ],

  siteUrl: 'https://danmesko.com',
}

export const heroTheme: ThemeName = 'bone'
