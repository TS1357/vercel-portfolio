interface TechChipProps {
  label: string;
  accent?: "cyan" | "magenta" | "amber";
}

const ACCENT = {
  cyan: "border-cyan/40 text-cyan hover:bg-cyan/10",
  magenta: "border-magenta/40 text-magenta hover:bg-magenta/10",
  amber: "border-amber/40 text-amber hover:bg-amber/10",
} as const;

/** Small glowing tech tag used in project cards and the skills grid. */
export default function TechChip({ label, accent = "cyan" }: TechChipProps) {
  return (
    <span
      className={`inline-block rounded border px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors ${ACCENT[accent]}`}
    >
      {label}
    </span>
  );
}
