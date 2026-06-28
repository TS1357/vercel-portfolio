import type { Project } from "./types";

/**
 * Projects — the single source of truth for the Arcade section.
 *
 * TODO (Tejas): once you make the Kubera and Compendium repos public, paste
 * their URLs into the empty `repoUrl` fields below. Cards hide the "View Code"
 * button automatically while the URL is empty, so nothing breaks meanwhile.
 */
export const projects: Project[] = [
  {
    id: "kubera",
    name: "Kubera",
    oneLiner:
      "An autonomous NSE stock scanner that detects high-probability trade setups, screens them through an LLM for adverse news, and delivers real-time Telegram alerts.",
    tech: [
      "Python",
      "yfinance",
      "LLM-agnostic",
      "Telegram Bot API",
      "APScheduler",
      "Docker",
      "Pydantic",
      "pandas",
      "jugaad-data",
      "nsepython",
    ],
    bullets: [
      "Scans 190+ NSE stocks daily across 3 signal modes: Swing, Positional, Post-Earnings Drift",
      "LLM news filter with plug-and-play support — swap in any self-hosted model (Gemma, LLaMA, Mistral)",
      "Full position lifecycle: entry signals → trailing stops → partial exits → P&L tracking",
      "Telegram-native interface — every alert, command, and portfolio view lives in chat",
      "Self-hosted + Dockerized, no subscriptions, no third-party dashboards",
    ],
    images: ["/kubera-scan.png", "/kubera-details.png"],
    repoUrl: "", // make public, then paste URL
    accent: "amber",
  },
  {
    id: "compendium",
    name: "Compendium",
    oneLiner:
      "A self-hosted AI journaling system that reads your entries and builds a living, structured wiki of your mind — your people, patterns, and themes — that grows smarter with every entry.",
    tech: [
      "Node.js",
      "Fastify",
      "SQLite",
      "Gemini 2.5 Pro",
      "Claude (Vertex)",
      "Ollama",
      "React 19",
      "Zustand",
      "CodeMirror 6",
      "react-force-graph",
      "Git",
      "Docker",
    ],
    bullets: [
      "Two-call LLM architecture — a cheap temp=0.0 gatekeeper filters pages, then a temp=0.4 deep pass processes them",
      "Index-as-discovery instead of RAG — the LLM sees a filtered map of the whole wiki, surfacing non-obvious cross-domain links",
      "Markdown + Git as source of truth — SQLite is a rebuildable index; every finalization auto-commits",
      "Zod validation on all LLM output — malformed JSON never crashes the pipeline",
      "Interactive constellation graph — your personal entities rendered as an explorable star map",
      "100% self-hosted via Docker + Tailscale — your journal never touches a third-party server",
    ],
    images: ["/compendium-home.png", "/compendium-codex.png"],
    repoUrl: "", // make public, then paste URL
    accent: "cyan",
  },
  {
    id: "huntai",
    name: "HuntAI",
    oneLiner:
      "A self-hosted AI job-search engine that tailors your resume, writes cover letters, finds hiring managers, and drafts personalized outreach — end to end, fully automated.",
    tech: [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "Tailwind",
      "SQLite",
      "Gemini 2.5 Flash",
      "Apollo API",
      "WeasyPrint",
      "LangChain",
      "Docker",
      "Tailscale",
    ],
    bullets: [
      "Parses your resume PDF directly — pulling hyperlinks and contact data automatically",
      "Rewrites your entire resume to match JD keywords and generates an aggressive 3-paragraph cover letter",
      "Injects a hidden ATS keyword block into the document footer to maximize recruiter screening scores",
      "Finds hiring-manager contacts via the Apollo API and drafts personalized LinkedIn/email outreach per contact",
      "Tracks the full pipeline on a Kanban board; every document exports to PDF or DOCX",
    ],
    images: ["/hunt-ai-dashboard.png", "/hunt-ai-resume-builder.png"],
    repoUrl: "https://github.com/TS1357/TS1357-HuntAI",
    accent: "magenta",
  },
  {
    id: "75hard",
    name: "75 Hard Tracker",
    oneLiner:
      "A self-hosted gamified fitness challenge tracker where your pixel-art character visually evolves every day you don't quit.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "SQLite",
      "Drizzle ORM",
      "Framer Motion",
      "Docker",
      "Tailscale",
      "Telegram Bot API",
    ],
    bullets: [
      "Tracks 7 daily tasks across 75 days — workouts, diet, reading, coding, hydration, steps, progress photos",
      "Completing tasks awards XP; your character evolves through 51 unique sprite forms across the challenge",
      "Lives system — miss a day and you lose a life; lose all 3 and the character dies and the challenge resets",
      "8PM Telegram cron reminders, optimistic UI for instant taps, and a full per-day photo upload system",
      "Deployed on Docker behind a Tailscale HTTPS proxy with zero cloud costs",
    ],
    images: ["/75-day-hard.png", "/75-day-hard-chars.png"],
    repoUrl: "https://github.com/TS1357/75-hard",
    accent: "cyan",
  },
];
