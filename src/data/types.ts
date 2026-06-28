/** Shared content types. All site content is typed against these. */

export interface SocialLink {
  label: string;
  href: string;
}

export interface StatItem {
  /** Big number/value, e.g. "10k+". */
  value: string;
  /** What it measures, e.g. "Users served". */
  label: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  tagline: string;
  bio: string;
  stats: StatItem[];
  skills: SkillGroup[];
}

export interface Project {
  /** Stable id / slug. */
  id: string;
  name: string;
  oneLiner: string;
  tech: string[];
  /** Headline bullets shown when a card is expanded. */
  bullets: string[];
  /** Paths under /public, e.g. "/kubera-scan.png". */
  images: string[];
  /** Empty string => "View Code" button is hidden until repo is public. */
  repoUrl: string;
  /** Optional live demo URL. */
  liveUrl?: string;
  /** Accent color used for this cabinet. */
  accent: "cyan" | "magenta" | "amber";
}

export interface ExperienceSubProject {
  name: string;
  points: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  subProjects: ExperienceSubProject[];
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  detail: string;
}
