import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * useMagnetic — returns a ref; the attached element gently translates toward the
 * cursor while the pointer is over it, then springs back on leave.
 *
 * Cheap: only listens to mousemove WHILE hovering the element (not globally),
 * and writes transform directly to the node (no React re-render). Disabled for
 * reduced-motion and on coarse (touch) pointers.
 *
 * @param strength how far it leans, in px-ish units (default 18)
 */
export function useMagnetic<T extends HTMLElement>(strength = 18) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Offset from center, normalized by half-size, scaled by strength.
      const dx = ((e.clientX - cx) / (rect.width / 2)) * strength;
      const dy = ((e.clientY - cy) / (rect.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const onLeave = () => {
      el.style.transform = "translate(0px, 0px)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, strength]);

  return ref;
}
