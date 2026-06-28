import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import NeonButton from "../ui/NeonButton";
import Reveal from "../ui/Reveal";
import { profile } from "../../data/profile";

/**
 * Contact — "CONTINUE?" end screen. Link buttons only (no form by design):
 * email, GitHub, LinkedIn. Email uses mailto; socials open in a new tab.
 */
export default function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <SectionHeading kicker="LEVEL 05" title="CONTINUE?" accent="magenta" />
      </Reveal>

      <Reveal delay={0.1} className="rounded-xl border border-line bg-bg-elevated p-8 text-center md:p-12">
        <p className="font-pixel text-xs leading-relaxed text-amber animate-pulse-glow md:text-sm">
          PRESS ANY KEY TO CONNECT
        </p>
        <p className="mx-auto mt-5 max-w-md font-mono text-sm text-text-dim">
          Building something with AI, or hiring for it? Let's talk. I'm always
          up for a good systems problem.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <NeonButton href={`mailto:${profile.email}`} accent="cyan" variant="solid">
            ✉ Email
          </NeonButton>
          <NeonButton href={profile.github} accent="magenta" external>
            {"</> GitHub"}
          </NeonButton>
          <NeonButton href={profile.linkedin} accent="amber" external>
            in LinkedIn
          </NeonButton>
        </div>

        <p className="mt-8 font-mono text-xs text-text-dim">{profile.email}</p>
      </Reveal>
    </Section>
  );
}
