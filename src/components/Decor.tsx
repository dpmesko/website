/**
 * Playful accent graphics.
 *
 * Flat geometric shapes in the section's accent colour -- the illustration
 * register bymarklange uses instead of photography. They are decorative only,
 * so every one is aria-hidden and none carry meaning a screen reader would
 * miss.
 *
 * All of them inherit `currentColor`, so placement decides the colour:
 * `<Squiggle className="text-[var(--accent)]" />`.
 */

type Props = { className?: string }

export function Squiggle({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 240 40" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2 20c20-24 40 24 60 0s40-24 60 0 40 24 60 0 40-24 56 0"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Sparkle({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <path
        d="M50 0c4 27 19 42 46 46-27 4-42 19-46 46-4-27-19-42-46-46 27-4 42-19 46-46z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Arc({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 200 100" fill="none" aria-hidden="true" className={className}>
      <path d="M0 100a100 100 0 01200 0" fill="currentColor" />
    </svg>
  )
}

export function Blob({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      <path
        d="M167 55c17 26 12 66-9 89s-58 28-86 14S22 111 27 82 55 26 85 20s65 9 82 35z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Dots({ className = '' }: Props) {
  const cells = Array.from({ length: 36 }, (_, i) => i)
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={className}>
      {cells.map((i) => (
        <circle
          key={i}
          cx={10 + (i % 6) * 20}
          cy={10 + Math.floor(i / 6) * 20}
          r="4"
          fill="currentColor"
        />
      ))}
    </svg>
  )
}

export function Ring({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={className}>
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="10" />
    </svg>
  )
}
