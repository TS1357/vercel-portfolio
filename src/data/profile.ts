import type { Profile } from "./types";

/**
 * Profile — the single source of truth for personal info, stats, and skills.
 * Edit here to update the About, Contact, and Skills sections.
 */
export const profile: Profile = {
  name: "Tejas Sharma",
  title: "AI/ML Engineer",
  location: "Kalyan, Maharashtra · Mumbai",
  email: "sharmatejas198@gmail.com",
  phone: "+91-8452812608",
  github: "https://github.com/TS1357",
  linkedin: "https://www.linkedin.com/in/tejas-sharma12",
  resumeUrl: "/resume/Tejas-Sharma-CV.pdf",

  tagline: "I build production AI systems — at work and for fun.",

  bio: "AI/ML Engineer who ships production RAG systems that actually solve real problems. I've engineered agentic chatbots serving 10k+ users across multiple domains using BGE-M3 embeddings and custom document pipelines — and I build self-hosted AI tools for fun in my spare time.",

  stats: [
    { value: "10k+", label: "Users served" },
    { value: "7", label: "AI systems built" },
    { value: "9.17", label: "B.Tech GPA" },
    { value: "95%", label: "Chatbot accuracy" },
  ],

  skills: [
    {
      category: "AI / ML",
      items: [
        "RAG Pipelines",
        "BGE-M3",
        "SPLADE-V3",
        "Agentic Workflows",
        "LLM Inference",
      ],
    },
    {
      category: "Languages",
      items: ["Python", "JavaScript", "TypeScript"],
    },
    {
      category: "Frameworks",
      items: ["FastAPI", "LangChain", "Angular", "React", "Next.js"],
    },
    {
      category: "Databases",
      items: ["Qdrant", "PostgreSQL", "MongoDB", "Faiss", "SQLite"],
    },
    {
      category: "DevOps",
      items: [
        "Docker",
        "nginx",
        "PM2",
        "RHEL",
        "Google Cloud",
        "Tailscale",
      ],
    },
    {
      category: "Document Processing",
      items: ["pdfplumber", "python-docx", "Custom Chunking"],
    },
    {
      category: "Integrations",
      items: ["WhatsApp Business API", "Telegram Bot API", "Apollo API"],
    },
  ],
};
