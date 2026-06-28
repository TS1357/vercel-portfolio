/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Colors reference CSS custom properties (design tokens) so a future
      // theme toggle only needs to change the token values, not these classes.
      colors: {
        bg: "var(--color-bg)",
        "bg-elevated": "var(--color-bg-elevated)",
        cyan: "var(--color-cyan)",
        magenta: "var(--color-magenta)",
        amber: "var(--color-amber)",
        text: "var(--color-text)",
        "text-dim": "var(--color-text-dim)",
        line: "var(--color-line)",
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "monospace"],
        mono: ["'JetBrains Mono'", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan": "var(--glow-cyan)",
        "neon-magenta": "var(--glow-magenta)",
        "neon-amber": "var(--glow-amber)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.7" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.85" },
          "97%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        flicker: "flicker 4s infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
