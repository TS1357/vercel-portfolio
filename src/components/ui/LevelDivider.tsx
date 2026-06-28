import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface LevelDividerProps {
  label?: string;
}

/**
 * LevelDivider — an arcade "loading next level" flourish placed between
 * sections for cohesion. A neon line scans across as it enters view, with small
 * CRT-style label text. Purely decorative (aria-hidden). Static for
 * reduced-motion users.
 */
export default function LevelDivider({ label = "LOADING NEXT LEVEL" }: LevelDividerProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div aria-hidden className="mx-auto flex max-w-6xl items-center gap-4 px-4 md:px-6">
      <Line reduced={reduced} from="left" />
      <span className="shrink-0 font-mono text-[9px] tracking-[0.3em] text-text-dim">
        {label}
      </span>
      <Line reduced={reduced} from="right" />
    </div>
  );
}

function Line({ reduced, from }: { reduced: boolean; from: "left" | "right" }) {
  if (reduced) {
    return <div className="h-px flex-1 bg-line" />;
  }
  return (
    <motion.div
      className="h-px flex-1 origin-left bg-gradient-to-r from-transparent via-cyan to-transparent"
      style={{ transformOrigin: from === "left" ? "left" : "right" }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.6 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}
