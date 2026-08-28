# HumbertoDev

Humberto Villanueva's personal software-engineering portfolio, presented as an early-2000s pixel-football broadcast. The experience connects Humberto's story—from Peru to Utah—with his work across AI systems, building intelligence, full-stack products, and cloud software.

Live site: [humbertovillanueva.dev](https://humbertovillanueva.dev)

## Experience

- A playable Peru number-7 football introduction with keyboard and touch controls
- A compact World Cup music-preview player powered by Apple's public preview catalog
- A featured Specta building-intelligence case study
- Experience, projects, skills, personal story, and contact sections
- Responsive layouts and reduced-motion support

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
public/               Static assets
```

## Publishing safety

The portfolio describes professional work only at an approved public level. Do not commit credentials, private employer code, customer names, proprietary screenshots, unpublished metrics, or unreleased product claims.

Production deploys from `main`. Work should be reviewed through a branch preview before merging.
