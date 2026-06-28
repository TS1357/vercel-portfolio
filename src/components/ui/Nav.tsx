import { useEffect, useState } from "react";

/** Section anchors used by both the nav and the page sections. */
export const SECTIONS = [
  { id: "hero", label: "START" },
  { id: "about", label: "PLAYER 1" },
  { id: "projects", label: "ARCADE" },
  { id: "skills", label: "POWER-UPS" },
  { id: "experience", label: "LEVELS" },
  { id: "contact", label: "CONTINUE" },
] as const;

/**
 * Fixed top arcade nav.
 *
 * - Smooth-scrolls to section anchors (CSS scroll-behavior handles smoothing).
 * - Tracks the active section via IntersectionObserver to highlight the tab.
 * - Collapses to a hamburger menu on mobile.
 *
 * Active-section tracking via IntersectionObserver (not scroll listeners) is
 * the performant choice: it doesn't fire on every scroll frame.
 */
export default function Nav() {
  const [active, setActive] = useState<string>("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Trigger when a section's middle band is in view.
      { rootMargin: "-45% 0px -45% 0px" },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo / coin flourish */}
        <a
          href="#hero"
          className="group flex items-center gap-2 font-pixel text-xs text-amber"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full border border-amber text-amber shadow-neon-amber transition-transform group-hover:rotate-180">
            ◉
          </span>
          <span className="hidden sm:inline tracking-tight">TS</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`font-mono text-xs tracking-widest transition-colors hover:text-cyan ${
                  active === id ? "text-cyan" : "text-text-dim"
                }`}
              >
                {active === id && <span className="text-magenta">▸ </span>}
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="font-pixel text-cyan md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-line bg-bg-elevated/95 px-4 py-3 backdrop-blur md:hidden">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={`block py-2 font-mono text-sm tracking-widest ${
                  active === id ? "text-cyan" : "text-text-dim"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
