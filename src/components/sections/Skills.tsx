import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import TechChip from "../ui/TechChip";
import Reveal from "../ui/Reveal";
import { profile } from "../../data/profile";

// Rotate accent colors across the groups for visual rhythm.
const ACCENTS = ["cyan", "magenta", "amber"] as const;

/**
 * Skills — a "power-up inventory". Each skill group is a panel; each skill is a
 * glowing chip. Accent colors rotate across groups for variety.
 */
export default function Skills() {
  return (
    <Section id="skills">
      <Reveal>
        <SectionHeading kicker="LEVEL 03" title="POWER-UPS" accent="amber" />
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <Reveal key={group.category} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-xl border border-line bg-bg-elevated p-5 transition-colors hover:border-amber">
                <h3 className="mb-4 font-pixel text-[10px] tracking-wide text-text md:text-xs">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechChip key={item} label={item} accent={accent} />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
