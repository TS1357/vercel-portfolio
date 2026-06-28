# Arcade Portfolio — Implementation Plan

**Spec:** `2026-06-28-arcade-portfolio-design.md`
**Date:** 2026-06-28

This plan is ordered. Each phase ends in a verifiable state. After each major phase the
site should still run (`npm run dev`) so we can review incrementally.

---

## Phase 0 — Scaffold & tooling
**Goal:** A running Vite + React + TS app with Tailwind, deps installed, repo hygiene.

1. `npm create vite@latest` (react-ts) in place.
2. Install deps:
   - 3D: `three @react-three/fiber @react-three/drei @react-three/postprocessing`
   - Animation: `framer-motion`
   - Styling: `tailwindcss @tailwindcss/postcss postcss autoprefixer`
3. Configure Tailwind + PostCSS.
4. Add `.gitignore` (node_modules, dist, .env, .vercel).
5. Add fonts (Press Start 2P, JetBrains Mono, Inter) via index.html / CSS.
6. Move assets:
   - `public/*.png` stay where they are (already in public).
   - Copy `Tejas Sharma CV.pdf` → `public/resume/Tejas-Sharma-CV.pdf`.
7. Verify: `npm run dev` serves a blank styled page; `npm run build` passes.

**Checkpoint:** dev server runs, Tailwind classes apply.

---

## Phase 1 — Design tokens & global shell
**Goal:** Theme foundation + CRT overlay + base layout.

1. `src/styles/tokens.css` — CSS custom properties for palette (bg, cyan, magenta, amber),
   font families, glow/shadow values, spacing. (Dark theme values; structured for future
   toggle.)
2. Global styles: background, scanline + vignette CRT overlay (`ui/CRTOverlay.tsx`),
   base typography, smooth scroll.
3. `App.tsx` skeleton: Nav + section placeholders + Footer + CRT overlay.
4. Respect `prefers-reduced-motion` baseline.

**Checkpoint:** Dark page with scanlines, fonts, and section anchors visible.

---

## Phase 2 — Data layer
**Goal:** Single source of truth for all content.

1. `src/data/profile.ts` — name, title, location, email, github, linkedin, bio, stats, skills (grouped).
2. `src/data/projects.ts` — 4 projects (title, one-liner, tech[], bullets[], images[], repoUrl, liveUrl?).
   - Kubera/Compendium repoUrl = empty string (cards handle missing gracefully).
3. `src/data/experience.ts` — SBI Life role + sub-projects, education, achievements.
4. Define TS types/interfaces for each.

**Checkpoint:** Typed data imports without errors.

---

## Phase 3 — Reusable UI primitives
**Goal:** Consistent building blocks.

1. `ui/NeonButton.tsx` — variants (primary cyan, accent amber), glow + hover, optional href.
2. `ui/TechChip.tsx` — glowing tech tag.
3. `ui/Nav.tsx` — fixed top arcade nav, smooth-scroll links, coin/score flourish, mobile menu.
4. `ui/SectionHeading.tsx` — arcade-styled section titles.
5. (Sound deferred to Phase 8.)

**Checkpoint:** Primitives render in isolation / placeholder usage.

---

## Phase 4 — Hero + 3D arcade cabinet
**Goal:** The headline "wow".

1. `components/canvas/ArcadeCabinet.tsx` — low-poly cabinet from primitives, neon emissive
   materials, name on screen, idle float/rotate.
2. `components/canvas/HeroScene.tsx` — `<Canvas>`, OrbitControls (drag to orbit, limited),
   lighting, Bloom + scanline postprocessing.
3. `sections/Hero.tsx` — overlay: name, tagline, CTAs (View Projects / Download Resume),
   insert-coin scroll cue. Lazy-load canvas with styled fallback; lighter/static fallback
   on weak/mobile devices and under reduced-motion.

**Checkpoint:** Hero loads fast, cabinet is interactive, CTAs work.

---

## Phase 5 — Content sections
**Goal:** All remaining sections built from data.

1. `sections/About.tsx` — Player 1 character card (avatar slot, bio, stats).
2. `sections/Projects.tsx` — 4 arcade-cabinet cards, hover/expand detail, screenshots,
   tech chips, View Code / Live Demo buttons (hide button if URL empty).
3. `sections/Skills.tsx` — grouped power-up grid of glowing chips.
4. `sections/Experience.tsx` — vertical level-progression timeline; SBI sub-projects
   expandable; education + achievements.
5. `sections/Contact.tsx` — neon link buttons (email/GitHub/LinkedIn), "Continue?" framing.
6. `Footer.tsx` — mute toggle slot, build credit, high-score flourish.

**Checkpoint:** Full page scrolls with all real content.

---

## Phase 6 — Motion & polish
**Goal:** Buttery micro-interactions.

1. framer-motion scroll-reveal for sections.
2. Hover/tap states on cards, chips, buttons.
3. Project card expand/collapse animation + image lightbox/preview.
4. Nav active-section highlight.

**Checkpoint:** Animations feel smooth, no jank.

---

## Phase 7 — Responsive & accessibility pass
**Goal:** Great on phone, accessible.

1. Mobile layouts for every section; nav collapses to menu.
2. Hero falls back to static/light scene on small/weak devices.
3. Keyboard nav, focus states, alt text, color-contrast check.
4. `prefers-reduced-motion` fully honored.

**Checkpoint:** Looks/works well at 375px width and with keyboard.

---

## Phase 8 — Optional sound + final FX
**Goal:** Personality, opt-in.

1. Tiny arcade blips on hover/click; mute toggle (off by default, persisted to localStorage).
2. Final glow/bloom tuning.

**Checkpoint:** Sound is opt-in and non-annoying.

---

## Phase 9 — README, build, deploy
**Goal:** Ship it.

1. README: problem → solution → setup → run → deploy, screenshots.
2. `npm run build` clean; preview check.
3. Lighthouse pass (target perf ≥ 90 desktop); fix regressions.
4. Vercel deploy config; instructions for connecting GitHub + custom domain (optional).

**Checkpoint:** Live URL on Vercel.

---

## Post-launch follow-ups (Tejas)
- Make all 4 repos public; paste Kubera & Compendium `repoUrl` into `projects.ts`.
- (Optional) add avatar/photo for About card.
