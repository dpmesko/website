import { About } from '@/components/About'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Nav } from '@/components/Nav'
import { Statement } from '@/components/Statement'
import { Work } from '@/components/Work'
import { statements } from '@/content/statements'

/**
 * The whole site, top to bottom.
 *
 * Reordering the page means reordering these lines. The statement beats are
 * split around the About section so the page alternates between loud and quiet
 * rather than front-loading all the shouting.
 */
export default function App() {
  const [first, ...rest] = statements

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                   focus:rounded-full focus:bg-black focus:px-5 focus:py-2.5 focus:text-white"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />

        {first && <Statement statement={first} index={0} />}

        <About />

        {rest.map((statement, i) => (
          <Statement key={statement.word} statement={statement} index={i + 1} />
        ))}

        <Work />
      </main>

      <Footer />
    </>
  )
}
