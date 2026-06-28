import type { ReactNode } from "react";
import { useSound } from "../../sound/SoundProvider";

type Accent = "cyan" | "magenta" | "amber";

interface NeonButtonProps {
  children: ReactNode;
  /** If provided, renders an <a>; otherwise a <button>. */
  href?: string;
  onClick?: () => void;
  accent?: Accent;
  /** Solid (filled) vs outline style. */
  variant?: "solid" | "outline";
  /** For external links. */
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

const ACCENT: Record<Accent, { border: string; text: string; glow: string; solidBg: string }> = {
  cyan: {
    border: "border-cyan",
    text: "text-cyan",
    glow: "hover:shadow-neon-cyan",
    solidBg: "bg-cyan",
  },
  magenta: {
    border: "border-magenta",
    text: "text-magenta",
    glow: "hover:shadow-neon-magenta",
    solidBg: "bg-magenta",
  },
  amber: {
    border: "border-amber",
    text: "text-amber",
    glow: "hover:shadow-neon-amber",
    solidBg: "bg-amber",
  },
};

/**
 * NeonButton — the one button used everywhere (CTAs, links, contact).
 *
 * Renders as <a> when `href` is set, else <button>. Centralizing this means a
 * style change applies site-wide and keeps accent/variant logic in one place.
 */
export default function NeonButton({
  children,
  href,
  onClick,
  accent = "cyan",
  variant = "outline",
  external = false,
  className = "",
  ariaLabel,
}: NeonButtonProps) {
  const a = ACCENT[accent];
  const { play } = useSound();

  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const styles =
    variant === "solid"
      ? `${a.solidBg} text-bg font-semibold ${a.glow} hover:-translate-y-0.5`
      : `border ${a.border} ${a.text} ${a.glow} hover:-translate-y-0.5`;

  const cls = `${base} ${styles} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        onClick={() => play("click")}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        play("click");
        onClick?.();
      }}
      className={cls}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
