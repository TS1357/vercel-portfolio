# Arcade Portfolio — Design Spec

**Author:** Tejas Sharma
**Date:** 2026-06-28
**Status:** Draft — awaiting approval

---

## 1. Goal

A single-page personal portfolio website for Tejas Sharma (AI/ML Engineer) with a
**premium dark neon "retro arcade" aesthetic** and a **hero-only interactive 3D scene**.
The site must look striking ("banger") while staying fast, mobile-friendly, and easy to
maintain. It will be hosted on Vercel and serve as a GitHub-worthy showcase.

**Positioning statement:** *"I build production AI systems — at work and for fun."*
The arcade is the delivery mechanism, not a gimmick. Tejas's credibility as an AI/ML
engineer (10k+ user production RAG chatbot at SBI Life + four self-hosted AI projects)
is the substance underneath the styling.

### Success criteria
- First impression delivers a clear "wow" via the hero 3D arcade cabinet.
- All four projects are presented clearly with code links and screenshots.
- Resume is downloadable.
- Loads fast (target Lighthouse performance ≥ 90 on desktop, graceful on mobile).
- Content is editable from data files without touching component code.
- Clean repo: README, `.gitignore`, no secrets, one-click Vercel deploy.

---

## 2. Aesthetic & Visual Language

**Theme:** Premium dark neon arcade. Not childish pixel-mush — a dark CRT-glow control
room where each project is a playable arcade cabinet.

- **Palette (dark, shipped first):**
  - Background: near-black `#0a0a0f`
  - Neon cyan (primary accent)
  - Neon magenta (secondary accent)
  - Warm amber/gold ("insert coin" highlight / CTA)
  - High contrast, glow on neon elements.
- **Typography:**
  - Headings: pixel/arcade display font (*Press Start 2P*), used sparingly for readability.
  - Body: clean mono/sans (*JetBrains Mono* and/or *Inter*).
- **Texture/FX:** subtle CRT scanlines + soft screen-curve vignette overlay site-wide;
  bloom/glow on neon elements (via postprocessing in hero, CSS elsewhere).
- **Sound (optional, OFF by default):** tiny arcade blips on hover/click with a mute
  toggle. Opt-in only.

**Theme toggle:** Dark-only ships first. Styling MUST be built on CSS custom properties /
design tokens so a light/alternate theme can be added later by swapping token values —
no component rewrites.

---

## 3. Page Structure & Flow

Single-page vertical scroll with a fixed arcade-style top nav (thin bar, neon tab labels,
a "coin/score" flourish), smooth-scroll to anchored sections.

**Design philosophy (revised):** "Cohesive arcade, content-first." The arcade is an
*interactive, cohesive experience*, not a 3D background behind a normal page. BUT it must
never gate content — a portfolio's job is to get recruiters to the work fast. So: big
arcade wow + zero-friction, scannable single scroll. No free-roam navigation required to
reach content; everything is reachable by scrolling.

1. **Hero (3D)** — Interactive WebGL scene with a **neon low-poly arcade cabinet** offset
   to one side so its glow never clashes with the foreground text (readability scrim behind
   text). The cabinet feels alive: screen powers on / cycles, joystick + buttons react to
   hover/click, "PRESS START" pulses. Clicking Start / View Projects triggers an
   "insert-coin → screen flash → scroll" boot transition. Overlaid: name, tagline, CTAs
   `[ View Projects ]` `[ Download Resume ]`, scroll cue.
2. **About** — "Player 1" character card: avatar slot, name, title, location
   (Kalyan / Mumbai), short bio (from resume summary), and a few "stats" (e.g. users
   served 10k+, projects shipped, GPA 9.17).
3. **Projects** — Core section. Each project IS an **arcade cabinet** (not a flat card):
   marquee shows the project name, the cabinet **screen displays the project's screenshot**,
   accent-colored glow per project. Laid out in a **scannable grid/row** (scroll, no
   hunting). Hover = the cabinet "powers on" (screen brightens, slight tilt, glow). Click =
   it "boots" into an expanded detail view with one-liner, headline bullets, tech chips,
   `[ View Code ]` and optional `[ Live Demo ]`, and a screenshot lightbox. Rendered as
   styled DOM (CSS 3D/perspective), not WebGL, to stay fast and mobile-friendly.
4. **Skills** — Gamified "power-ups / skill grid", grouped (AI/ML, Languages, Frameworks,
   Databases, DevOps, Document Processing, Integrations); each skill a glowing chip.
5. **Experience** — Vertical timeline ("level progression" styling): SBI Life role with
   its four sub-projects (MyBuddy, Analytics Dashboard, Legal Assist, PayGet) as
   expandable entries; Education; Achievements (GEM Award, etc.).
6. **Contact** — "Game Over? Continue →" framing. Email (mailto), GitHub, LinkedIn as
   neon arcade buttons. **No form** (links only).
7. **Footer** — Small: mute toggle, "built with React + R3F", arcade high-score flourish.

**Cohesion layer (ties it into one "world", not one page):**
- Section transitions themed as "LOADING NEXT LEVEL" / CRT screen-wipes.
- About = "PLAYER 1 SELECT" screen; Skills = power-up inventory; Experience =
  level-progression map; Contact = "CONTINUE? PRESS ANY KEY".
- Consistent CRT, coin/score UI language, and (Phase 8) arcade sounds.

**Mobile:** cabinets stack vertically and simplify; heavy 3D hero falls back gracefully;
still one fast scroll.

---

## 4. Content

### 4.1 Profile
- **Name:** Tejas Sharma
- **Title:** AI/ML Engineer
- **Location:** Kalyan, Maharashtra (works in Mumbai)
- **Email:** sharmatejas198@gmail.com
- **Phone:** +91-8452812608 (optional display)
- **LinkedIn:** https://www.linkedin.com/in/tejas-sharma12
- **GitHub:** https://github.com/TS1357
- **Bio:** adapted from resume summary (production RAG systems, agentic chatbots,
  10k+ users, BGE-M3 embeddings, custom document pipelines).
- **Stats:** users served 10k+, AI platforms built (3 at work + 4 personal), GPA 9.17,
  GEM Award.

### 4.2 Projects (4 total)
Stored in `src/data/projects.ts`. Each has a `repoUrl` field. **All four repos will be
made public by Tejas; links to be pasted into the data file once available.** Cards must
render gracefully whether or not `repoUrl`/`liveUrl` is present.

1. **Kubera — Algorithmic Trading Bot for Indian Equities**
   - One-liner: Autonomous NSE stock scanner detecting high-probability setups, screening
     them through an LLM for adverse news, delivering real-time Telegram alerts.
   - Tech: Python, yfinance, LLM-agnostic AI layer (Gemini/Gemma/LLaMA/OpenAI-compatible),
     Telegram Bot API, APScheduler, Docker, Pydantic, pandas, jugaad-data, nsepython.
   - Headline bullets: 190+ NSE stocks daily across 3 modes (Swing/Positional/Post-Earnings
     Drift); pluggable LLM news filter; full position lifecycle (entry → trailing stops →
     partial exits → P&L); Telegram-native; self-hosted + Dockerized.
   - Images: `kubera-scan.png`, `kubera-details.png`
   - repoUrl: TBD (public soon)

2. **75 Hard Tracker**
   - One-liner: Self-hosted gamified fitness challenge tracker where your character
     visually evolves every day you don't quit.
   - Tech: Next.js 15, TypeScript, SQLite, Drizzle ORM, Framer Motion, Docker, Tailscale,
     Telegram Bot API.
   - Details: 7 daily tasks across 75 days; XP + 51 sprite-form character evolution; lives
     system (miss a day lose a life; lose 3 = reset); 8PM Telegram cron reminder;
     optimistic UI; character codex; photo upload per day; Docker behind Tailscale HTTPS.
   - Images: `75-day-hard.png`, `75-day-hard-chars.png`
   - repoUrl: https://github.com/TS1357/75-hard

3. **Compendium**
   - One-liner: Self-hosted AI journaling system that reads your entries and builds a
     living, structured wiki of your mind that grows smarter with every entry.
   - Tech: Node.js 18, Fastify v5, SQLite (better-sqlite3); Gemini 2.5 Pro / Claude
     (Vertex AI) / Ollama; React 19, Vite, Tailwind, Zustand, CodeMirror 6; custom Canvas +
     react-force-graph; Markdown + Git source of truth (simple-git); Docker + Tailscale.
   - Headline bullets: two-call LLM architecture (cheap gatekeeper temp 0.0 + deep
     processing temp 0.4); index-as-discovery instead of RAG; Markdown+Git as source of
     truth (SQLite is rebuildable index); Zod validation on LLM output; multi-provider LLM;
     interactive constellation graph of personal entities; 100% self-hosted.
   - Images: `compendium-home.png`, `compendium-codex.png`
   - repoUrl: TBD (public soon)

4. **HuntAI**
   - One-liner: Self-hosted AI job-search engine that tailors your resume, writes cover
     letters, finds hiring managers, and drafts personalized outreach — end to end.
   - Tech: Python, FastAPI, React, Vite, Tailwind, SQLite, Docker, Gemini 2.5 Flash,
     Apollo API, WeasyPrint, LangChain, RAG concepts, Tailscale.
   - Details: parses resume PDF (links + contacts); JD-keyword resume rewrite; aggressive
     3-paragraph cover letter; hidden ATS keyword block in footer; hiring-manager lookup
     via Apollo; personalized LinkedIn/email outreach per contact; Kanban pipeline;
     PDF/DOCX export; self-hosted over Tailscale.
   - Images: `hunt-ai-dashboard.png`, `hunt-ai-resume-builder.png`
   - repoUrl: https://github.com/TS1357/TS1357-HuntAI

### 4.3 Experience (from resume)
Stored in `src/data/experience.ts`.
- **Senior Associate (AI/ML Engineer)** — SBI Life Insurance Co. Ltd., Mumbai
  (Jun 2024 – Present), with sub-projects:
  - MyBuddy WhatsApp Chatbot (10k+ users): agentic RAG across 3 domains (2k docs/domain
    Qdrant); BGE-M3 + custom PDF/DOCX chunking; pm2 on RHEL; 70% query-time reduction,
    95% accuracy.
  - Analytics Dashboard: real-time metrics from 10k+ MongoDB logs; nginx + PM2 on RHEL;
    85% manual reporting eliminated, 2x faster insights.
  - Legal Assist Platform: Angular/FastAPI document AI + bounding-box UI; nginx + PM2/
    FastAPI on RHEL; LLM change analysis (60% faster reviews, 98% accuracy).
  - PayGet PWA: premium calculator + automated PDF collateral; nginx + PM2/FastAPI on
    RHEL; 40% faster quoting, 3x daily proposals.
- **Education:** B.Tech in Information Technology, Vidyalankar Institute of Technology,
  Wadala, Maharashtra (2024). GPA 9.17, Honors in AI & ML.
- **Achievements:** GEM Award (SBI Life, Jan 2026); production RAG chatbot serving 10k+
  users; built 3 production AI platforms processing 1k+ documents monthly.

### 4.4 Skills (grouped)
- AI/ML: RAG pipelines, BGE-M3, SPLADE-V3 embeddings, Agentic workflows, LLM inference
- Languages: Python, JavaScript/TypeScript
- Frameworks: FastAPI, LangChain, Angular
- Databases: Qdrant, PostgreSQL, MongoDB, Faiss
- DevOps: Docker, nginx, PM2, RHEL server management, Google Cloud Hosting
- Document Processing: pdfplumber, python-docx, custom chunking pipelines
- Integrations: WhatsApp Business API

### 4.5 Resume
`public/resume/Tejas-Sharma-CV.pdf` (copied from provided `Tejas Sharma CV.pdf`).
"Download Resume" button links to it.

### 4.6 Images
All in `public/` (8 files, 2 per project): `kubera-scan.png`, `kubera-details.png`,
`75-day-hard.png`, `75-day-hard-chars.png`, `compendium-home.png`, `compendium-codex.png`,
`hunt-ai-dashboard.png`, `hunt-ai-resume-builder.png`.

---

## 5. Technical Architecture

### 5.1 Stack
- React + TypeScript + Vite
- Tailwind CSS + CSS custom-property design tokens
- `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` (bloom/scanlines)
- `framer-motion` for 2D animation
- Deploy: Vercel

### 5.2 Directory layout
```
Portfolio/
├── public/
│   ├── resume/Tejas-Sharma-CV.pdf
│   └── *.png                            # project screenshots
├── src/
│   ├── data/
│   │   ├── projects.ts                  # all project content + repo links
│   │   ├── experience.ts                # SBI Life, education, achievements
│   │   └── profile.ts                   # name, bio, socials, stats, skills
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── ArcadeCabinet.tsx
│   │   │   └── HeroScene.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/                          # NeonButton, TechChip, CRTOverlay, Nav, etc.
│   ├── styles/tokens.css                # design tokens
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── (vite/tailwind/ts config, README, .gitignore)
```

### 5.3 Key decisions (and rationale)
1. **Content in `src/data/*.ts`, separate from components** — edit content without
   touching UI; single place for repo links. Avoids hardcoded JSX text.
2. **3D isolated in `components/canvas/` and lazy-loaded** — keeps Three.js out of the
   main chunk; rest of site stays simple React; fast first paint.
3. **Design tokens via CSS custom properties** — future theme toggle = swap token values.
4. **Reusable `ui/` primitives** — consistency; change neon button once, applies everywhere.

### 5.4 Performance & accessibility
- Lazy-load the 3D canvas with a styled fallback.
- Respect `prefers-reduced-motion` (reduce/disable heavy animation).
- Lighter/static hero on weak or mobile devices.
- Semantic HTML, alt text on images, keyboard-navigable nav and buttons.
- Sound off by default, mute toggle persisted.

### 5.5 Repo hygiene
- README: problem → solution → setup/run → deploy.
- `.gitignore` from the start (node_modules, dist, env).
- No secrets/hardcoded keys (none needed — links-only contact).

---

## 6. Out of Scope (YAGNI)
- Contact form / backend.
- Blog/CMS.
- Multi-page routing.
- Light theme (deferred; tokens make it easy later).
- Heavy full-site 3D world (hero-only by design).

---

## 7. Open Items
- Paste public `repoUrl` for Kubera and Compendium once repos exist.
- Optional: provide an avatar/photo for the About card (otherwise stylized placeholder).
