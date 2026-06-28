import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  /** Hero is full-height and centered; content sections use standard padding. */
  full?: boolean;
  className?: string;
}

/**
 * Section wrapper — gives every page section a consistent id anchor,
 * max-width, and vertical rhythm.
 *
 * Anchor offset: the fixed nav is ~64px tall. We add a scroll-margin-top of
 * that height so jumping to a section lands the heading just below the nav
 * (not hidden behind it, and not pushed too far down). scroll-mt is kept small
 * and intentional — the section's own top padding provides visual breathing
 * room, so we must NOT double-count nav height in both.
 */
export default function Section({ id, children, full, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      style={{ scrollMarginTop: "64px" }}
      className={`relative ${
        full ? "min-h-screen" : "pb-20 pt-12 md:pb-28 md:pt-16"
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">{children}</div>
    </section>
  );
}
