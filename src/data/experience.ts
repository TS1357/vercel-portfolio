import type { EducationItem, ExperienceItem } from "./types";

/** Work experience — drives the "Levels Cleared" timeline. */
export const experience: ExperienceItem[] = [
  {
    role: "Senior Associate (AI/ML Engineer)",
    company: "SBI Life Insurance Co. Ltd., Mumbai",
    period: "Jun 2024 – Present",
    subProjects: [
      {
        name: "MyBuddy WhatsApp Chatbot (10k+ users)",
        points: [
          "Agentic RAG across 3 domains (2k docs/domain in Qdrant)",
          "BGE-M3 embeddings + custom PDF/DOCX chunking pipeline",
          "Deployed backend with PM2 on RHEL server",
          "70% query-time reduction, 95% accuracy",
        ],
      },
      {
        name: "Analytics Dashboard",
        points: [
          "Real-time metrics from 10k+ MongoDB conversation logs",
          "Deployed frontend + backend via nginx + PM2 on RHEL",
          "85% manual reporting eliminated, 2x faster insights",
        ],
      },
      {
        name: "Legal Assist Platform",
        points: [
          "Angular/FastAPI document AI with bounding-box UI",
          "nginx frontend + PM2/FastAPI backend on RHEL",
          "LLM change analysis: 60% faster reviews, 98% accuracy",
        ],
      },
      {
        name: "PayGet PWA",
        points: [
          "Premium calculator + automated PDF collateral generator",
          "nginx frontend + PM2/FastAPI backend on RHEL",
          "40% faster quoting, 3x daily policy proposals",
        ],
      },
    ],
  },
];

/** Education — shown alongside the experience timeline. */
export const education: EducationItem[] = [
  {
    degree: "B.Tech in Information Technology",
    school: "Vidyalankar Institute of Technology, Wadala, Maharashtra",
    period: "2024",
    detail: "GPA: 9.17 · Honors in Artificial Intelligence and Machine Learning",
  },
];

/** Achievements — shown as unlocked "trophies". */
export const achievements: string[] = [
  "GEM Award for outstanding performance, SBI Life Insurance (Jan 2026)",
  "Production RAG chatbot serving 10k+ users (70% query-time reduction)",
  "Built 3 production AI platforms processing 1k+ documents monthly",
];
