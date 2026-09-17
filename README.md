# HumbertoDev

Humberto Villanueva's personal software-engineering portfolio, presented as an early-2000s pixel-football broadcast. The experience connects Humberto's story—from Peru to Utah—with his work across AI systems, building intelligence, full-stack products, and cloud software.

Live site: [humbertovillanueva.dev](https://humbertovillanueva.dev)

## Experience

- A playable Peru number-7 football introduction with keyboard and touch controls
- A compact World Cup music-preview player powered by Apple's public preview catalog
- A featured Specta building-intelligence case study
- Experience, projects, skills, personal story, and contact sections
- An engineering-writing hub with long-form technical articles
- A dedicated DispatchTrack Lite architecture case study
- Responsive layouts and reduced-motion support

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
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Before committing a change:

```bash
npm run lint
npm run build
git diff --check
```

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
