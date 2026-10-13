# Personal website

## ⚠️ Before you go live - still to do

- [ ] **Projects** in [src/content/projects.ts](src/content/projects.ts) are
      still placeholders.

Run `grep -rn TODO src/ index.html` any time to see what is left.

Single-page site. Vite + React + TypeScript + Tailwind, building to static files
in `dist/`. No router, no server runtime - the whole page is one scroll with
anchor-link navigation.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build locally
```

## Design direction

Two ideas drive the layout, and it's worth knowing them before you change things:

**Type is the artwork.** The hero name, the statement beats, and every section
heading are set with `clamp()` against viewport width, so they scale to fill the
screen at any size rather than sitting at a fixed point size. That's why they
stay punchy on a phone and enormous on a monitor.

**Colour is structure, not decoration.** Each section commits to a full palette
- background, text, accent - from [src/content/themes.ts](src/content/themes.ts).
Sections read as distinct rooms. The nav floats on top and *recolours itself* to
match whatever section is underneath it, which is why it never disappears
against cobalt or lime.

## Where the content lives

Everything you'd edit is in `src/content/`. You shouldn't need to touch the
components.

| File | What it holds |
| --- | --- |
| `site.ts` | Name, role, hero line, email, socials |
| `statements.ts` | The big one-word scroll beats |
| `about.ts` | The conversational about copy |
| `projects.ts` | The work list |
| `themes.ts` | The six colour palettes |
| `nav.ts` | Which anchors appear in the top nav |

Page order lives in [src/App.tsx](src/App.tsx) - reordering the page means
reordering those lines.

### Statement beats

These are the full-viewport punctuation between real sections:

```ts
{ word: 'I build.', sub: 'Optional smaller line.', theme: 'coral' }
```

Keep `word` to one or two words. It's set at up to 16vw, so anything longer
stops being punchy and starts wrapping into a paragraph. Add or remove entries
freely - the first one renders before the About section and the rest after, so
the page alternates loud/quiet instead of front-loading all the shouting.

### Projects

```ts
{
  title: 'Thing I made',
  meta: '2024',                                   // optional
  blurb: 'A couple of casual sentences.',
  href: 'https://…',                              // optional
  linkLabel: 'Have a look',                       // optional
  image: { src: '/images/x.jpg', alt: '…' },      // optional
  video: { provider: 'youtube', id: 'ABC', title: '…' },  // optional, beats image
}
```

Only `title` and `blurb` are required. Images go in `public/images/` and are
referenced as `/images/your-file.jpg` - the leading slash matters. For video you
need just the **ID**: `youtube.com/watch?v=dQw4w9WgXcQ` → `id: 'dQw4w9WgXcQ'`.
Videos render as a thumbnail and only load the real player on click, so an
unwatched embed costs nothing.

`blurb` and the about copy support `**bold**`, `*italic*`, `` `code` `` and
`[links](https://example.com)`.

### Themes

Six palettes ship in `themes.ts`. Assign one per section via its `theme` field.
To add your own, add an entry with `bg` / `ink` / `accent` / `muted` - keep
`ink` on `bg` above 4.5:1 contrast or body copy gets hard to read outdoors.

## Typography

Display type is **Bricolage Grotesque**, loaded from Google Fonts in
`index.html`. It has slightly odd proportions that stay charming at 15vw where a
neutral grotesk would look generic. Body copy is Inter.

Changing the `display` entry in [tailwind.config.js](tailwind.config.js) restyles
the site's whole voice in one line. If you'd rather not depend on Google's CDN,
self-host: download the woff2, drop it in `public/fonts/`, and swap the `<link>`
for an `@font-face` rule.

## Deploying to your server

```bash
./deploy/deploy.sh user@your-server.com:/var/www/website
```

Builds and rsyncs `dist/` up. `deploy/nginx.conf` has a working server block
with cache headers - copy the relevant parts into your real config and update
the domain and cert paths.

Because this is now a single page, the SPA fallback rule matters far less than
it did: there's only one real URL. The config still includes it, which costs
nothing and means deep links keep working if you ever add routes back.

## Notes

- **Node 18** is what this is pinned against; Vite 5 is the newest major
  supporting it. Upgrading Node lets you move up and clears an `npm audit`
  advisory in esbuild that only affects the dev server, never the built site.
- **SEO**: the `<title>` and meta description in `index.html` are the real ones
  crawlers read. They currently say TODO - worth writing, since they're what
  shows up when someone pastes your link into Slack.
