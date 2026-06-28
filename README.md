# Tejas Sharma — Arcade Portfolio

A retro-arcade themed personal portfolio for **Tejas Sharma**, AI/ML Engineer.
Premium dark neon aesthetic, an interactive 3D arcade-cabinet hero, and every
project presented as a playable arcade cabinet — all in one fast, single-page
scroll.

> "I build production AI systems — at work and for fun."

## Why

Most engineer portfolios look the same. This one is memorable (an arcade you can
interact with) **without** sacrificing the thing a portfolio actually needs to
do: get a recruiter to the work, fast. The 3D grabs attention; the content is
always one scroll away.

## Features

- **Interactive 3D hero** — a neon arcade cabinet (React Three Fiber) acting as
  a "monitor" with a clickable on-screen menu. Lazy-loaded so the page paints
  instantly.
- **Projects as arcade cabinets** — hover to "power on", click to "boot" a
  detail modal with screenshots, headline bullets, tech, and links.
- **Arcade-themed sections** — Player 1 (about), Power-Ups (skills), Levels
  Cleared (experience timeline), Continue? (contact).
- **GPU-cheap polish** — custom neon cursor, magnetic buttons/cabinets,
  scroll-reveal animations, and CRT "next level" transitions.
- **CRT overlay** — site-wide scanlines + vignette + subtle flicker.
- **Accessible & responsive** — honors `prefers-reduced-motion`, keyboard
  navigable, hides custom cursor on touch, mobile layouts throughout.

## Tech Stack

| Layer       | Tech                                                        |
| ----------- | ----------------------------------------------------------- |
| Framework   | React 18 + TypeScript + Vite                                |
| 3D          | three.js · @react-three/fiber · drei · postprocessing       |
| Styling     | Tailwind CSS + CSS custom-property design tokens            |
| Animation   | Framer Motion                                               |
| Deploy      | Vercel                                                      |

## Project Structure

```
src/
├── data/            # Single source of truth for all content
│   ├── profile.ts   #   name, bio, socials, stats, skills
│   ├── projects.ts  #   projects + repo links
│   ├── experience.ts#   work, education, achievements
│   └── types.ts
├── components/
│   ├── canvas/      # 3D hero (lazy-loaded)
│   ├── sections/    # Hero, About, Projects, Skills, Experience, Contact
│   └── ui/          # Reusable: NeonButton, TechChip, Nav, cursor, etc.
├── hooks/           # useMagnetic, useIsMobile, usePrefersReducedMotion
└── styles/          # tokens.css (theme) + index.css
```

## Editing Content

All content lives in `src/data/` — no need to touch components:

- **Personal info / skills** → `src/data/profile.ts`
- **Projects** → `src/data/projects.ts` (paste GitHub URLs into `repoUrl`)
- **Experience / education** → `src/data/experience.ts`
- **Resume PDF** → replace `public/resume/Tejas-Sharma-CV.pdf`
- **Project screenshots** → `public/*.png` (referenced in `projects.ts`)

## Local Development

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint     # type-check
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Vite (config is in `vercel.json`). Click **Deploy**.
4. (Optional) Add a custom domain in the Vercel dashboard.

## Theme

The visual theme is driven entirely by CSS custom properties in
`src/styles/tokens.css`. A light/alternate theme can be added later by
overriding those token values under a new selector — no component changes
required.
