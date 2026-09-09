import type { ThemeName } from './themes'

/**
 * The scroll "beats".
 *
 * Each one owns a full viewport and says exactly one thing at enormous scale.
 * They are punctuation between the real sections -- the reason to keep
 * scrolling. Keep `word` to one or two words; it is set at up to ~16vw and
 * anything longer stops being punchy and starts wrapping.
 *
 * `sub` is optional and currently unused -- these land harder bare. Add one if
 * you ever want to hang a joke or a qualifier off a beat.
 */
export interface Statement {
  /** The huge phrase. One or two words. Shouted. */
  word: string
  /** Optional smaller line underneath. */
  sub?: string
  theme: ThemeName
}

export const statements: Statement[] = [
  { word: 'I build', theme: 'ink' },
  { word: 'I stream', theme: 'coral' },
  { word: 'I play', theme: 'cobalt' },
]
