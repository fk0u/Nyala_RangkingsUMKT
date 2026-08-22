import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nyala: {
          50: "#FFF8F5",
          100: "#FEECE5",
          200: "#FED7C7",
          300: "#FDB69A",
          400: "#F78A5F",
          500: "#EA580C", // Warm Terracotta / Soft Ember (Nyaman di mata)
          600: "#C2410C", // Deep Warm Ember (hover/active)
          700: "#9A3412",
          800: "#7C2D12",
          900: "#5A1E08",
        },
        navy: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B", // Soft Navy / Dark Card
          900: "#0F172A", // Deep Navy
          950: "#0B1120", // Dark Mode Background
        },
        cream: {
          50: "#FFFDF9",
          100: "#FFF7ED",
          200: "#FDEED9",
          300: "#FADBB3",
        },
        warm: {
          white: "#FAFAF9",
        }
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        "xl": "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        "soft": "0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)",
        "soft-lg": "0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)",
        "fire": "0 10px 25px -5px rgba(255, 90, 31, 0.3)",
        "fire-lg": "0 20px 35px -8px rgba(255, 90, 31, 0.4)",
        "dark-soft": "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(0.97) translateY(-2px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" },
        },
      },
      animation: {
        flicker: "flicker 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
