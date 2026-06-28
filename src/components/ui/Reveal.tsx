import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds, e.g. for cards in a grid. */
  delay?: number;
  className?: string;
}

/**
 * Reveal — fades + rises its children into view on first scroll-enter.
 *
 * Uses framer-motion's whileInView (IntersectionObserver under the hood, so no
 * per-frame scroll work). `once` means it animates a single time, not every
 * time it re-enters — calmer and cheaper. Honors reduced-motion by rendering
 * children with no animation.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
