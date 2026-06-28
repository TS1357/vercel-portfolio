import type { ReactNode } from "react";
import { useMagnetic } from "../../hooks/useMagnetic";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Magnetic — wraps any element so it leans toward the cursor on hover. Uses an
 * inline-block span with a smooth transition; the hook drives the transform.
 */
export default function Magnetic({ children, strength, className }: MagneticProps) {
  const ref = useMagnetic<HTMLSpanElement>(strength);
  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-200 ease-out ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
