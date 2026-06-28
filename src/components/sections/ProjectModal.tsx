import { useEffect, useState } from "react";
import type { Project } from "../../data/types";
import TechChip from "../ui/TechChip";
import NeonButton from "../ui/NeonButton";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// Static class map. Tailwind only keeps classes it can see as complete strings
// at build time, so we must NOT build them dynamically (e.g. `text-${accent}`).
const ACCENT = {
  cyan: { text: "text-cyan", border: "border-cyan", bullet: "text-cyan" },
  magenta: { text: "text-magenta", border: "border-magenta", bullet: "text-magenta" },
  amber: { text: "text-amber", border: "border-amber", bullet: "text-amber" },
} as const;

/**
 * ProjectModal — the "booted" detail view for a project cabinet.
 *
 * Accessibility: closes on Escape, locks body scroll while open, and the
 * backdrop click closes it. Renders nothing when no project is selected.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImg, setActiveImg] = useState(0);

  // Reset to first image whenever a new project opens.
  useEffect(() => {
    setActiveImg(0);
  }, [project]);

  // Escape to close + lock scroll while open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;
  const accent = project.accent;
  const a = ACCENT[accent];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} details`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-line bg-bg-elevated shadow-neon-cyan">
        {/* Title bar */}
        <div className="sticky top-0 flex items-center justify-between border-b border-line bg-bg-elevated/95 px-5 py-4 backdrop-blur">
          <h3 className={`font-pixel text-sm ${a.text} md:text-base`}>
            {project.name.toUpperCase()}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="font-pixel text-text-dim transition-colors hover:text-magenta"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          {/* Screenshot viewer */}
          <div className="overflow-hidden rounded-lg border border-line bg-black">
            <img
              src={project.images[activeImg]}
              alt={`${project.name} screenshot ${activeImg + 1}`}
              className="aspect-video w-full object-cover"
            />
          </div>
          {project.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {project.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`View screenshot ${i + 1}`}
                  className={`h-14 w-24 overflow-hidden rounded border transition-all ${
                    activeImg === i
                      ? `${a.border} opacity-100`
                      : "border-line opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* One-liner */}
          <p className="mt-5 font-mono text-sm leading-relaxed text-text">
            {project.oneLiner}
          </p>

          {/* Headline bullets */}
          <ul className="mt-5 space-y-2">
            {project.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-2 font-mono text-xs leading-relaxed text-text-dim"
              >
                <span className={a.bullet}>▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Tech */}
          <div className="mt-6">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-dim">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <TechChip key={t} label={t} accent={accent} />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap gap-3">
            {project.repoUrl ? (
              <NeonButton href={project.repoUrl} accent={accent} external>
                {"</> View Code"}
              </NeonButton>
            ) : (
              <span className="inline-flex items-center rounded-md border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-text-dim">
                🔒 Repo coming soon
              </span>
            )}
            {project.liveUrl && (
              <NeonButton
                href={project.liveUrl}
                accent="amber"
                variant="solid"
                external
              >
                ▶ Live Demo
              </NeonButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
