import type { ThemeName } from './themes'

/**
 * Conversational, first person, no bullet lists of credentials.
 * Blank lines separate paragraphs. Inline `**bold**` and [links](url) work,
 * and they nest -- [**bold link**](url) renders as both.
 */
export const about = {
  heading: 'Hi, I’m Dan.',
  theme: 'bone' as ThemeName,
  body: `I’m a software engineer focused on building systems that people enjoy using. Oftentimes, I am one of those people.

I’m a co-founder and Head of Product at [**Launch Live Now**](https://www.launchlivenow.com), where we produce livestreams that look like television news - built for social media, with live chat and audience engagement part of the broadcast - for independent creators and enterprise clients. As Head of Product, I own our on-screen product and manage the software stack behind it, from broadcast software to graphical overlays and chat integrations.

Before this, I was a backend engineer and team lead building full-stack Ethereum blockchain applications for Fortune 500 clients - designing innovative, first-of-their-kind use cases that stayed approachable for non-technical users.

Outside of work: flight simulation enthusiast, non-famous simulation/gaming live streamer, Florida Panthers hockey fan, lifelong musician, and amateur league pool player.`,
  /** Optional: a small aside pinned beside the copy. Set to null to hide. */
  aside: null as string | null,
}
