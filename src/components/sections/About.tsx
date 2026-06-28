import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { profile } from "../../data/profile";

/**
 * About — a "Player 1 Select" character card. Left: a stylized neon avatar
 * placeholder (swap for a photo later by dropping one in /public and pointing
 * the <img> here). Right: bio + a row of arcade "stat" readouts from data.
 */
export default function About() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading kicker="LEVEL 01" title="PLAYER 1" accent="cyan" />
      </Reveal>

      <Reveal delay={0.1} className="grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr] md:gap-12">
        {/* Avatar card */}
        <div className="mx-auto w-full max-w-[260px]">
          <div className="rounded-xl border border-cyan bg-bg-elevated p-4 shadow-neon-cyan">
            {/* Placeholder avatar — neon monogram in a CRT frame */}
            <div className="relative grid aspect-square place-items-center overflow-hidden rounded-lg border border-line bg-black">
              <span className="font-pixel text-4xl text-cyan drop-shadow-[0_0_12px_var(--color-cyan)]">
                TS
              </span>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px)",
                }}
              />
            </div>
            <p className="mt-4 text-center font-pixel text-xs text-amber">
              {profile.name.toUpperCase()}
            </p>
            <p className="mt-2 text-center font-mono text-[11px] text-text-dim">
              {profile.location}
            </p>
          </div>
        </div>

        {/* Bio + stats */}
        <div>
          <p className="font-mono text-sm leading-relaxed text-text md:text-base">
            {profile.bio}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-line bg-bg-elevated p-4 text-center transition-colors hover:border-cyan"
              >
                <p className="font-pixel text-lg text-cyan md:text-xl">
                  {s.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-text-dim">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
