import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SoundName = "hover" | "click" | "boot";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

const STORAGE_KEY = "arcade-sound-enabled";

/**
 * SoundProvider — synthesizes short retro blips with the Web Audio API (no
 * audio files to download). Sound is OFF by default and the choice is persisted
 * to localStorage.
 *
 * Why Web Audio over <audio> files:
 * - zero network cost / no asset management
 * - precise, tiny "arcade" tones via oscillators
 * - the AudioContext is created lazily on first enable, satisfying browser
 *   autoplay policies (audio can only start after a user gesture).
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  // Restore persisted preference.
  useEffect(() => {
    setEnabled(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      // Create/resume the context on the enabling gesture.
      if (next) {
        const ctx = ensureContext();
        if (ctx.state === "suspended") void ctx.resume();
      }
      return next;
    });
  }, [ensureContext]);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      const ctx = ensureContext();
      if (ctx.state === "suspended") void ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      // Distinct tone per event — short, quiet, square-wave = arcade.
      const presets: Record<SoundName, { freq: number; dur: number; vol: number }> = {
        hover: { freq: 660, dur: 0.05, vol: 0.04 },
        click: { freq: 880, dur: 0.08, vol: 0.06 },
        boot: { freq: 440, dur: 0.18, vol: 0.07 },
      };
      const { freq, dur, vol } = presets[name];

      osc.type = "square";
      osc.frequency.setValueAtTime(freq, now);
      if (name === "boot") {
        // Rising "power on" sweep.
        osc.frequency.exponentialRampToValueAtTime(freq * 2, now + dur);
      }

      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.start(now);
      osc.stop(now + dur);
    },
    [enabled, ensureContext],
  );

  const value = useMemo(
    () => ({ enabled, toggle, play }),
    [enabled, toggle, play],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

/** Access the sound API. Safe no-op `play` if used outside the provider. */
export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    return { enabled: false, toggle: () => {}, play: () => {} };
  }
  return ctx;
}
