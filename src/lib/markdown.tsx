import { Fragment, type ReactNode } from 'react'

/**
 * A deliberately tiny inline-Markdown renderer: **bold**, *italic*, `code`,
 * and [text](url). Nests, so [**bold link**](url) works.
 *
 * It returns React nodes rather than an HTML string, so there is no
 * `dangerouslySetInnerHTML` anywhere in the site and content can never inject
 * markup. If you outgrow this, swap in `react-markdown` -- but this keeps the
 * bundle small and covers what prose actually needs.
 */

const TOKEN = /(\[[^\]\n]+\]\([^)\s]+\))|(\*\*[^*\n]+\*\*)|(\*[^*\n]+\*)|(`[^`\n]+`)/

/**
 * @param inLink true while rendering a link's own label. Bold inside a link
 *   must inherit the link colour rather than forcing ink, or `[**text**](url)`
 *   renders bold but loses every visual cue that it is clickable.
 */
function renderInline(text: string, keyPrefix: string, inLink = false): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  let i = 0

  // A fresh regex per call: TOKEN is stateful under /g, and label rendering
  // recurses mid-loop, so a shared instance would have its lastIndex clobbered
  // by the inner call and the outer loop would skip text.
  const re = new RegExp(TOKEN.source, 'g')

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index))
    const token = match[0]
    const key = `${keyPrefix}-${i++}`

    if (token.startsWith('[')) {
      const split = token.indexOf('](')
      const label = token.slice(1, split)
      const href = token.slice(split + 2, -1)

      // Anchors cannot legally nest; render a nested link as just its label.
      if (inLink) {
        out.push(<Fragment key={key}>{renderInline(label, key, true)}</Fragment>)
      } else {
        const external = /^https?:\/\//.test(href)
        out.push(
          <a
            key={key}
            href={href}
            className="font-medium text-[var(--accent)] underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {renderInline(label, key, true)}
          </a>,
        )
      }
    } else if (token.startsWith('**')) {
      out.push(
        <strong key={key} className={`font-bold ${inLink ? '' : 'text-[var(--ink)]'}`}>
          {renderInline(token.slice(2, -2), key, inLink)}
        </strong>,
      )
    } else if (token.startsWith('*')) {
      out.push(<em key={key}>{renderInline(token.slice(1, -1), key, inLink)}</em>)
    } else {
      out.push(
        <code
          key={key}
          // color-mix keeps the chip tied to whichever theme the section is
          // using, instead of hardcoding a grey that fails on cobalt or ink.
          style={{ backgroundColor: 'color-mix(in srgb, currentColor 12%, transparent)' }}
          className={`rounded px-1.5 py-0.5 font-mono text-[0.9em] ${inLink ? '' : 'text-[var(--ink)]'}`}
        >
          {token.slice(1, -1)}
        </code>,
      )
    }
    last = match.index + token.length
  }

  if (last < text.length) out.push(text.slice(last))
  return out
}

/** Splits on blank lines into paragraphs, then renders inline formatting. */
export function Prose({ body }: { body: string }) {
  const paragraphs = body.trim().split(/\n\s*\n/)
  return (
    <div className="max-w-prose space-y-5 text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
      {paragraphs.map((p, i) => (
        <p key={i}>{renderInline(p.trim(), `p${i}`)}</p>
      ))}
    </div>
  )
}

/** Inline-only variant, for single-line strings like taglines. */
export function Inline({ text }: { text: string }) {
  return <Fragment>{renderInline(text, 'i')}</Fragment>
}
