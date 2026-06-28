import { useState } from "react";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { experience, education, achievements } from "../../data/experience";

/**
 * Experience — a "levels cleared" timeline. The work role expands to reveal its
 * sub-projects (each one a mini "stage"). Education + achievements follow as
 * unlocked entries. Sub-projects are collapsible to keep the section scannable.
 */
export default function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <SectionHeading kicker="LEVEL 04" title="LEVELS CLEARED" accent="cyan" />
      </Reveal>

      <Reveal delay={0.1} className="relative border-l-2 border-line pl-6 md:pl-8">
        {experience.map((job) => (
          <JobEntry key={job.company} job={job} />
        ))}

        {/* Education */}
        {education.map((ed) => (
          <div key={ed.school} className="relative mb-10">
            <Dot accent="magenta" />
            <p className="font-mono text-[11px] tracking-widest text-magenta">
              {ed.period}
            </p>
            <h3 className="mt-1 font-pixel text-xs text-text md:text-sm">
              {ed.degree}
            </h3>
            <p className="mt-2 font-mono text-sm text-text-dim">{ed.school}</p>
            <p className="mt-1 font-mono text-xs text-text-dim">{ed.detail}</p>
          </div>
        ))}

        {/* Achievements */}
        <div className="relative">
          <Dot accent="amber" />
          <h3 className="font-pixel text-xs text-amber md:text-sm">
            ACHIEVEMENTS
          </h3>
          <ul className="mt-3 space-y-2">
            {achievements.map((a) => (
              <li
                key={a}
                className="flex gap-2 font-mono text-xs leading-relaxed text-text-dim"
              >
                <span className="text-amber">★</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

function JobEntry({
  job,
}: {
  job: (typeof experience)[number];
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative mb-10">
      <Dot accent="cyan" />
      <p className="font-mono text-[11px] tracking-widest text-cyan">
        {job.period}
      </p>
      <h3 className="mt-1 font-pixel text-xs text-text md:text-sm">
        {job.role}
      </h3>
      <p className="mt-2 font-mono text-sm text-text-dim">{job.company}</p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-3 font-mono text-[11px] uppercase tracking-widest text-cyan hover:text-amber"
        aria-expanded={open}
      >
        {open ? "▾ Hide stages" : "▸ Show stages"}
      </button>

      {open && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {job.subProjects.map((sp) => (
            <div
              key={sp.name}
              className="rounded-lg border border-line bg-bg-elevated p-4"
            >
              <h4 className="font-mono text-xs font-semibold text-cyan">
                {sp.name}
              </h4>
              <ul className="mt-2 space-y-1.5">
                {sp.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex gap-2 font-mono text-[11px] leading-relaxed text-text-dim"
                  >
                    <span className="text-magenta">▸</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** A glowing node on the timeline line. */
function Dot({ accent }: { accent: "cyan" | "magenta" | "amber" }) {
  const map = {
    cyan: "bg-cyan shadow-neon-cyan",
    magenta: "bg-magenta shadow-neon-magenta",
    amber: "bg-amber shadow-neon-amber",
  } as const;
  return (
    <span
      className={`absolute -left-[31px] top-1 h-3 w-3 rounded-full md:-left-[39px] ${map[accent]}`}
    />
  );
}
