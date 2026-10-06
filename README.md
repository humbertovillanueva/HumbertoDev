# HumbertoDev

Humberto Villanueva's personal software-engineering portfolio. Visitors can switch the whole site between three designs: a 1986 pixel-football game, a 2000 personal desktop, and a 2026 studio. The content connects his work across AI systems, building intelligence, full-stack products, and cloud software.

Live site: [humbertovillanueva.dev](https://humbertovillanueva.dev)

## Experience

- A year picker (1986, 2000, 2026) that restyles every page and remembers the visitor's choice
- A playable Peru number-7 football mini-game on the About page, with keyboard and touch controls
- An opt-in World Cup music-preview player; no catalog request is made until a visitor loads previews
- A clearly attributed summary of professional work on Specta, with public-level highlights
- Experience, projects, skills, personal story, and contact sections
- An engineering-writing hub with long-form technical articles
- Case studies for Reality Commit, DispatchTrack Lite and AWS Cloud Quest
- A portfolio search directory
- Profile links with each network's own logo (Font Awesome Free brand icons, CC BY 4.0)
- Responsive layouts, keyboard navigation, reduced-motion support, and a custom 404 page
- Actual demo screenshots, engineering decisions, and prototype limits
- Resend contact delivery with validation and bot protection, plus email-draft and clipboard fallbacks

## Featured pages

- [Engineering writing](https://humbertovillanueva.dev/writing)
- [Designing Portable AI Integrations Without Model Lock-In](https://humbertovillanueva.dev/writing/designing-portable-ai-integrations)
- [Make Document Pipelines Fail Loudly](https://humbertovillanueva.dev/writing/make-document-pipelines-fail-loudly)
- [Reality Commit case study](https://humbertovillanueva.dev/case-studies/reality-commit)
- [DispatchTrack Lite case study](https://humbertovillanueva.dev/case-studies/dispatchtrack-lite)
- [AWS Cloud Quest case study](https://humbertovillanueva.dev/case-studies/aws-cloud-quest)

## Stack

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- CSS-drawn pixel artwork and animation
- Vercel deployment through GitHub

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Before committing a change:

```bash
npm run lint
npm run build
git diff --check
```

For browser checks, start the production build with `npm start` in another terminal, then run:

```bash
npx playwright install chromium
node automation/smoke.mjs
node automation/interactions.mjs
node automation/pages.mjs
python3 automation/test_sync.py
```

Set `PREVIEW_URL` to test a different server. Page checks cover all ten routes at 320, 390, 768, and 1440 pixels, image loading, canonical URLs, 404 recovery, and an automated WCAG A/AA scan. Automated accessibility checks do not replace manual keyboard and screen-reader review.

## Search presence

- Structured data (Person, WebSite, articles, case studies, breadcrumbs) on every page
- A link-preview image for every page, drawn in the 1986 style with `app/og-card.tsx`
- `sitemap.xml`, `robots.txt`, an RSS feed at `/writing/feed.xml`, and `llms.txt`
- The **Notify search engines** GitHub Action pings IndexNow after each production deploy

## Contact delivery

The contact form supports server-side delivery through Resend when its production configuration is enabled. It falls back to email-draft and clipboard options when unavailable. See [contact delivery setup and verification](docs/contact-delivery.md) for the required environment variables, safeguards, and delivery test.

## Project structure

```text
app/
  layout.tsx          Site metadata and document shell
  page.tsx            Portfolio content, music player, and football game
  globals.css         Visual system, responsive layout, and pixel artwork
  studio-*.tsx        The 2026 edition: navigation, homepage, motion and shader
  seo-page-shell.tsx  Shared layout for every subpage in every era
  og-card.tsx         Link-preview image template
  writing/            Engineering-writing hub, articles and RSS feed
  case-studies/       Long-form project case studies
automation/           Browser, accessibility and contact tests
public/               Static assets
```

## Publishing safety

The portfolio describes professional work only at an approved public level. Do not commit credentials, private employer code, customer names, proprietary screenshots, unpublished metrics, or unreleased product claims.

Production deploys from `main`. Work should be reviewed through a branch preview before merging.
