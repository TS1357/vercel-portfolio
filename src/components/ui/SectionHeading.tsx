import { motion } from "framer-motion";

interface SectionHeadingProps {
  /** Small label above the title, e.g. "LEVEL 02". */
  kicker?: string;
  title: string;
  /** Accent color for the kicker + underline. */
  accent?: "cyan" | "magenta" | "amber";
}

const ACCENT = {
  cyan: { text: "text-cyan", bg: "bg-cyan", shadow: "shadow-neon-cyan" },
  magenta: { text: "text-magenta", bg: "bg-magenta", shadow: "shadow-neon-magenta" },
  amber: { text: "text-amber", bg: "bg-amber", shadow: "shadow-neon-amber" },
} as const;

/**
 * Arcade-styled section heading: a small "LEVEL XX" kicker, a pixel title, and
 * a neon underline that "scans" outward when the heading enters view (the CRT
 * next-level flourish). The underline width animates from 0, reading as a quick
 * power-on sweep — cheap (transform/width on one element) and on-theme.
 */
export default function SectionHeading({
  kicker,
  title,
  accent = "cyan",
}: SectionHeadingProps) {
  const a = ACCENT[accent];
  return (
    <div className="mb-12">
      {kicker && (
        <p className={`mb-3 font-mono text-xs tracking-[0.3em] ${a.text}`}>
          {kicker}
        </p>
      )}
      <h2 className="font-pixel text-xl leading-relaxed text-text md:text-3xl">
        {title}
      </h2>
      <motion.div
        className={`mt-4 h-1 rounded ${a.bg} ${a.shadow}`}
        initial={{ width: 0 }}
        whileInView={{ width: "4rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
    </div>
  );
}
