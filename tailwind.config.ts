import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12181F",
        paper: "#F7F8FA",
        steel: {
          50: "#EEF3F8",
          100: "#D9E3EE",
          300: "#93AFC9",
          500: "#3D6690",
          700: "#1E3A5F",
          900: "#101E31",
        },
        signal: {
          DEFAULT: "#0E7C86",
          light: "#12A0AC",
          dark: "#0A5B62",
        },
        muted: "#5B6472",
        line: "#E2E5EA",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(18,24,31,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
