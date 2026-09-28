# HumbertoDev

Humberto Villanueva's personal software-engineering portfolio, presented as an early-2000s pixel-football broadcast. The experience connects his work across AI systems, building intelligence, full-stack products, and cloud software.

Live site: [humbertovillanueva.dev](https://humbertovillanueva.dev)

## Experience

- A playable Peru number-7 football introduction with keyboard and touch controls
- An opt-in World Cup music-preview player; no catalog request is made until a visitor loads previews
- A clearly attributed summary of professional work on Specta
- Experience, projects, skills, personal story, and contact sections
- An engineering-writing hub with long-form technical articles
- A dedicated DispatchTrack Lite architecture case study
- Responsive layouts, keyboard navigation, reduced-motion support, and a custom 404 page
- Actual demo screenshots, engineering decisions, and prototype limits
- Resend contact delivery with validation and bot protection, plus email-draft and clipboard fallbacks

## Featured pages

- [Engineering writing](https://humbertovillanueva.dev/writing)
- [Designing Portable AI Integrations Without Model Lock-In](https://humbertovillanueva.dev/writing/designing-portable-ai-integrations)
- [DispatchTrack Lite case study](https://humbertovillanueva.dev/case-studies/dispatchtrack-lite)

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

Set `PREVIEW_URL` to test a different server. Page checks cover seven routes at 320, 390, 768, and 1440 pixels, image loading, canonical URLs, 404 recovery, and an automated WCAG A/AA scan. Automated accessibility checks do not replace manual keyboard and screen-reader review.

## Contact delivery

The contact form supports server-side delivery through Resend when its production configuration is enabled. It falls back to email-draft and clipboard options when unavailable. See [contact delivery setup and verification](docs/contact-delivery.md) for the required environment variables, safeguards, and delivery test.

## Project structure

```text
app/
  layout.tsx          Site metadata and document shell
  page.tsx            Portfolio content, music player, and football game
  globals.css         Visual system, responsive layout, and pixel artwork
  writing/            Engineering-writing hub and articles
  case-studies/       Long-form project case studies
public/               Static assets
```

## Publishing safety

The portfolio describes professional work only at an approved public level. Do not commit credentials, private employer code, customer names, proprietary screenshots, unpublished metrics, or unreleased product claims.

Production deploys from `main`. Work should be reviewed through a branch preview before merging.
