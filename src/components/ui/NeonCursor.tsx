import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * NeonCursor — a glowing ring that trails the real cursor with smooth lag and
 * grows/recolors when hovering interactive elements (links, buttons).
 *
 * Performance notes:
 * - One rAF loop lerps the ring toward the mouse; we write directly to the DOM
 *   node's transform (not React state) so there's no re-render per frame.
 * - Pointer position is captured in a ref, also avoiding re-renders.
 * - Only enabled on devices with a fine pointer (mouse). Touch devices and
 *   reduced-motion users skip it entirely.
 */
export default function NeonCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);

  // Only enable for fine pointers (mouse), not touch.
  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
  }, [reduced]);

  // While the neon cursor is active, hide the native OS cursor site-wide.
  // Scoped via a class on <html> so it's easy to reason about and revert.
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.classList.add("neon-cursor-active");
    return () => root.classList.remove("neon-cursor-active");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Detect hover over interactive targets to grow the ring.
      const el = e.target as HTMLElement | null;
      hovering.current = !!el?.closest(
        'a, button, [role="button"], input, textarea',
      );
    };

    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      // Smooth follow (lerp).
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;

      const ring = ringRef.current;
      if (ring) {
        const scale = hovering.current ? 1.8 : 1;
        ring.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ring.style.borderColor = hovering.current
          ? "var(--color-amber)"
          : "var(--color-cyan)";
      }
      // Dot tracks the exact pointer with no lag for click precision.
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Lagging ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300] h-7 w-7 rounded-full border-2 transition-[border-color] duration-200"
        style={{
          borderColor: "var(--color-cyan)",
          boxShadow: "0 0 12px rgba(45,226,230,0.6)",
          willChange: "transform",
        }}
      />
      {/* Precise center dot that tracks the exact pointer (no lag) */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300] h-1.5 w-1.5 rounded-full bg-amber"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
