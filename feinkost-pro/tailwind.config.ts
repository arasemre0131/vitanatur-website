import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FEFCF8",
          100: "#FAF7F2",
          200: "#F5EFE6",
          300: "#E8DFD0",
          400: "#D4C5AE",
        },
        olive: {
          300: "#A3B576",
          400: "#8A9E5C",
          500: "#6B7F3B",
          600: "#556632",
          700: "#3F4C25",
        },
        brick: {
          300: "#C4876A",
          400: "#B06B4A",
          500: "#A0522D",
          600: "#834324",
          700: "#66341C",
        },
        espresso: {
          400: "#5C4033",
          500: "#3E2A1E",
          600: "#2C1810",
          700: "#1A0F0A",
        },
        sand: {
          100: "#F5F0E8",
          200: "#E8DFD0",
          300: "#D4C5AE",
          400: "#BCA88A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
      },
      aspectRatio: {
        "4/5": "4 / 5",
      },
      gridTemplateColumns: {
        catalog: "repeat(auto-fill, minmax(280px, 1fr))",
      },
      keyframes: {
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-in",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-in",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-up": "slide-up 0.3s ease-out forwards",
        "slide-down": "slide-down 0.25s ease-in forwards",
      },
    },
  },
  plugins: [],
};
export default config;
