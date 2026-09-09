import type { Statement as StatementType } from '@/content/statements'
import { useReveal } from '@/lib/useReveal'
import { Dots, Ring, Sparkle } from './Decor'
import { Themed } from './Themed'

/** Pick a decor shape per beat so consecutive statements do not look identical. */
const DECOR = [Ring, Dots, Sparkle]

/**
 * One scroll beat: a full viewport, one shouted phrase, nothing else competing.
 */
export function Statement({ statement, index }: { statement: StatementType; index: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  const Shape = DECOR[index % DECOR.length]
  const flip = index % 2 === 1

  return (
    <Themed theme={statement.theme} className="grid min-h-[85svh] place-items-center px-[5vw] py-24">
      <Shape
        className={`pointer-events-none absolute w-[30vw] max-w-xs text-[var(--accent)] opacity-20
                    ${flip ? 'bottom-[12%] left-[6%]' : 'right-[6%] top-[14%]'}`}
      />
      <div
        ref={ref}
        className={`relative max-w-[92vw] text-center transition-all duration-700 ease-out
                    ${shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        <p className="font-display text-[clamp(3rem,16vw,15rem)] font-extrabold leading-[0.85] tracking-[-0.045em]">
          {statement.word}
        </p>
        {statement.sub && (
          <p className="mx-auto mt-8 max-w-xl text-lg leading-snug text-[var(--muted)] sm:text-2xl">
            {statement.sub}
          </p>
        )}
      </div>
    </Themed>
  )
}
