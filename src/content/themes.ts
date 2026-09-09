/**
 * Section palettes.
 *
 * Each section commits to one of these wholesale -- background, text, and
 * accent all change together. That is the bymarklange move: colour as
 * structure, not decoration. Sections read as distinct rooms rather than one
 * neutral page with tinted highlights.
 *
 * Pairs are contrast-checked against WCAG AA for large display type. If you
 * invent a new theme, keep `ink` on `bg` above 4.5:1 or body copy gets hard to
 * read on phones in sunlight.
 */
export interface Theme {
  bg: string
  ink: string
  /** Used for the scroll cue, links, decor shapes, and emphasis. */
  accent: string
  /** Lower-contrast ink, for supporting copy. */
  muted: string
}

export const themes = {
  bone: { bg: '#F2EFE6', ink: '#14110E', accent: '#E14A2B', muted: '#5C574E' },
  ink: { bg: '#14110E', ink: '#F2EFE6', accent: '#D8F24E', muted: '#9A948A' },
  lime: { bg: '#D8F24E', ink: '#14110E', accent: '#14110E', muted: '#4A5210' },
  cobalt: { bg: '#2A3FD9', ink: '#F2EFE6', accent: '#D8F24E', muted: '#B9C0F5' },
  coral: { bg: '#E14A2B', ink: '#FFF7F0', accent: '#14110E', muted: '#FFD3C4' },
  sky: { bg: '#BFE3F2', ink: '#14110E', accent: '#E14A2B', muted: '#4A5A63' },
} satisfies Record<string, Theme>

export type ThemeName = keyof typeof themes
