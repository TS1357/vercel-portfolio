import { Suspense, lazy } from "react";
import NeonButton from "../ui/NeonButton";
import Magnetic from "../ui/Magnetic";
import { profile } from "../../data/profile";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

// Lazy-load the 3D scene so Three.js is fetched only when the hero renders.
const HeroScene = lazy(() => import("../canvas/HeroScene"));

/** Clickable menu items shown ON the cabinet screen. */
const SCREEN_MENU = [
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
] as const;

/**
 * Hero — split layout: info on the LEFT, the interactive arcade monitor on the
 * RIGHT. The cabinet renders in a fixed-camera 3D canvas; an HTML menu overlay
 * sits on top of the screen area so the menu items are real, accessible,
 * clickable links (not fragile 3D-raycast text).
 *
 * On mobile the columns stack: text first, then the cabinet+menu.
 * Reduced-motion users skip WebGL entirely and get the menu on a static panel.
 */
export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 py-24 md:grid-cols-2 md:gap-10 md:px-6">
        {/* LEFT: identity */}
        <div className="text-center md:text-left">
          <p className="mb-4 font-mono text-xs tracking-[0.4em] text-amber animate-pulse-glow">
            ◉ INSERT COIN ◉
          </p>
          <h1 className="font-pixel text-2xl leading-[1.4] text-text drop-shadow-[0_0_18px_rgba(45,226,230,0.5)] md:text-4xl md:leading-[1.35]">
            {profile.name.toUpperCase()}
          </h1>
          <p className="mt-6 font-mono text-sm text-cyan md:text-base">
            {profile.title}
          </p>
          <p className="mt-2 max-w-md font-mono text-sm text-text-dim md:text-base">
            {profile.tagline}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Magnetic>
              <NeonButton href="#projects" accent="cyan" variant="solid">
                ▶ View Projects
              </NeonButton>
            </Magnetic>
            <Magnetic>
              <NeonButton href={profile.resumeUrl} accent="amber" external>
                ⤓ Download Resume
              </NeonButton>
            </Magnetic>
          </div>
        </div>

        {/* RIGHT: arcade monitor (3D cabinet + HTML screen menu overlay).
            Capped width on mobile so it never dominates the small viewport. */}
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[260px] sm:max-w-xs md:max-w-sm">
          {/* 3D cabinet behind */}
          <div className="absolute inset-0">
            {reducedMotion ? (
              <StaticCabinet />
            ) : (
              <Suspense fallback={<SceneLoading />}>
                <HeroScene />
              </Suspense>
            )}
          </div>

          {/* HTML menu positioned over the cabinet's screen.
              Percentages are tuned to sit on the screen panel. */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[26%] w-[58%] -translate-x-1/2">
              <ScreenMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-xs text-text-dim animate-float hover:text-cyan"
      >
        ▼ scroll to continue ▼
      </a>
    </section>
  );
}

/** The interactive menu shown on the cabinet screen. */
function ScreenMenu() {
  return (
    <div className="pointer-events-auto select-none text-center">
      <p className="font-pixel text-[8px] leading-relaxed text-amber animate-pulse-glow md:text-[9px]">
        SELECT MODE
      </p>
      <ul className="mt-3 space-y-1.5">
        {SCREEN_MENU.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="group flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-widest text-cyan transition-colors hover:text-amber md:text-xs"
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100">
                ▸
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-pixel text-[7px] text-magenta md:text-[8px]">
        ▲▼ SELECT
      </p>
    </div>
  );
}

function SceneLoading() {
  return (
    <div className="grid h-full w-full place-items-center">
      <p className="font-pixel text-xs text-cyan animate-pulse-glow">LOADING…</p>
    </div>
  );
}

/** Static CSS cabinet for reduced-motion users (no WebGL). */
function StaticCabinet() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="aspect-[3/4] w-3/4 rounded-xl border-2 border-magenta bg-bg-elevated shadow-neon-magenta">
        <div className="m-3 aspect-square rounded-md border border-cyan bg-black shadow-neon-cyan" />
      </div>
    </div>
  );
}
