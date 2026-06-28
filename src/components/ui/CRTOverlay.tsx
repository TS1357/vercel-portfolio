/**
 * CRTOverlay — a site-wide retro-monitor effect layered above all content.
 *
 * Three stacked layers:
 *   1. scanlines  — thin horizontal dark lines (the classic CRT look)
 *   2. vignette   — darkened corners to mimic screen curvature
 *   3. flicker    — a very subtle global opacity flicker
 *
 * Pointer-events are disabled so it never blocks interaction. It's purely
 * decorative, so it is aria-hidden. Honors prefers-reduced-motion (the
 * flicker animation is neutralized globally via index.css).
 */
export default function CRTOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.18] animate-flicker"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Vignette / screen curvature */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
