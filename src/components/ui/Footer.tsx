import { useSound } from "../../sound/SoundProvider";

/**
 * Footer — small arcade flourish with the sound mute toggle.
 */
export default function Footer() {
  const { enabled, toggle, play } = useSound();

  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center md:flex-row md:justify-between md:px-6">
        <p className="font-mono text-xs text-text-dim">
          © {new Date().getFullYear()} Tejas Sharma · Built with React + R3F
        </p>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => {
              toggle();
              // Play a confirmation blip when turning sound ON.
              if (!enabled) play("click");
            }}
            aria-pressed={enabled}
            className="font-mono text-[11px] uppercase tracking-widest text-text-dim transition-colors hover:text-cyan"
          >
            {enabled ? "🔊 Sound: On" : "🔇 Sound: Off"}
          </button>

          <p className="font-pixel text-[10px] text-amber">HIGH SCORE: 999999</p>
        </div>
      </div>
    </footer>
  );
}
