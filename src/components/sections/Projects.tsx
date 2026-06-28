import { useState } from "react";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import ProjectCabinet from "./ProjectCabinet";
import ProjectModal from "./ProjectModal";
import Reveal from "../ui/Reveal";
import { projects } from "../../data/projects";
import type { Project } from "../../data/types";

/**
 * Projects — the arcade. Each project is a cabinet in a scannable grid; click
 * one to "boot" its detail modal. Selection state lives here so only one modal
 * is mounted at a time.
 */
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading kicker="LEVEL 02" title="THE ARCADE" accent="magenta" />
        <p className="-mt-6 mb-10 max-w-xl font-mono text-sm text-text-dim">
          Personal builds — pick a cabinet to power it on. Every one is
          self-hosted and built end to end.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.1}>
            <ProjectCabinet project={p} onBoot={setSelected} />
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
