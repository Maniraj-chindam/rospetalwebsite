import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rosepetal: {
          bg: "#FCECEE",
          surface: "#FFF5F6",
          card: "#FDE8EB",
          cardAlt: "#FDF0F2",
          border: "#F3D5D8",
          wine: "#681A2A",
          wineHover: "#53121F",
          wineLight: "#852638",
          blush: "#E8A7AF",
          blushLight: "#FCE5E8",
          gold: "#C5A880",
          text: "#292122",
          muted: "#786768",
          subtle: "#A39293",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        script: ["var(--font-alex-brush)", "Alex Brush", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
