import { useState } from "react";
import type { Project } from "../../data/types";
import { useMagnetic } from "../../hooks/useMagnetic";
import { useSound } from "../../sound/SoundProvider";

interface ProjectCabinetProps {
  project: Project;
  onBoot: (project: Project) => void;
}

const ACCENT = {
  cyan: {
    text: "text-cyan",
    border: "border-cyan",
    glow: "group-hover:shadow-neon-cyan",
    marquee: "bg-cyan",
    ring: "ring-cyan/40",
  },
  magenta: {
    text: "text-magenta",
    border: "border-magenta",
    glow: "group-hover:shadow-neon-magenta",
    marquee: "bg-magenta",
    ring: "ring-magenta/40",
  },
  amber: {
    text: "text-amber",
    border: "border-amber",
    glow: "group-hover:shadow-neon-amber",
    marquee: "bg-amber",
    ring: "ring-amber/40",
  },
} as const;

/**
 * ProjectCabinet — a single project rendered as an arcade cabinet.
 *
 * Built with CSS (perspective + transforms), not WebGL, so the grid stays fast
 * and works on mobile. The cabinet "powers on" on hover (screen brightens,
 * slight tilt, neon glow) and "boots" into a detail modal on click.
 *
 * The whole cabinet is a single button for accessibility — keyboard users can
 * Tab to it and press Enter to open the detail view.
 */
export default function ProjectCabinet({ project, onBoot }: ProjectCabinetProps) {
  const [hovered, setHovered] = useState(false);
  const a = ACCENT[project.accent];
  // Gentle magnetic lean toward the cursor (subtle for large cards).
  const magneticRef = useMagnetic<HTMLButtonElement>(10);
  const { play } = useSound();

  return (
    <button
      ref={magneticRef}
      type="button"
      onClick={() => {
        play("boot");
        onBoot(project);
      }}
      onMouseEnter={() => {
        setHovered(true);
        play("hover");
      }}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`Open details for ${project.name}`}
      className="group relative block w-full text-left transition-transform duration-200 ease-out [perspective:1000px] focus-visible:outline-none"
    >
      <div
        className={`relative rounded-xl border ${a.border} bg-bg-elevated p-3 transition-all duration-300 ${a.glow} group-focus-visible:ring-2 ${a.ring}`}
        style={{
          transform: hovered
            ? "rotateX(4deg) rotateY(-3deg) translateY(-6px)"
            : "rotateX(0) rotateY(0)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Marquee */}
        <div
          className={`mb-3 rounded-md ${a.marquee} px-3 py-2 text-center font-pixel text-[10px] text-bg md:text-xs`}
        >
          {project.name.toUpperCase()}
        </div>

        {/* Screen showing the screenshot */}
        <div className="relative overflow-hidden rounded-md border border-line bg-black">
          <img
            src={project.images[0]}
            alt={`${project.name} screenshot`}
            loading="lazy"
            className={`aspect-video w-full object-cover transition-all duration-500 ${
              hovered ? "scale-105 brightness-100" : "brightness-[0.7]"
            }`}
          />
          {/* Screen scanline sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px)",
            }}
          />
          {/* "Power on" prompt */}
          <div
            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className={`font-mono text-[10px] tracking-widest ${a.text}`}>
              {"> PRESS START"}
            </span>
          </div>
        </div>

        {/* One-liner + control hint */}
        <p className="mt-3 line-clamp-2 px-1 font-mono text-xs leading-relaxed text-text-dim">
          {project.oneLiner}
        </p>

        {/* Faux control panel */}
        <div className="mt-3 flex items-center justify-between px-1">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan" />
            <span className="h-2 w-2 rounded-full bg-amber" />
            <span className="h-2 w-2 rounded-full bg-magenta" />
          </div>
          <span className={`font-mono text-[10px] tracking-widest ${a.text}`}>
            INSERT COIN ▸
          </span>
        </div>
      </div>
    </button>
  );
}
