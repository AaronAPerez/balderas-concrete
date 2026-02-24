import type { Config } from "tailwindcss";

const config: Config = {
  /* Dark mode follows user's system preference automatically */
  darkMode: "media",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Background and foreground - uses CSS variables for dark mode */
        background: "var(--background)",
        foreground: "var(--foreground)",

        /* Primary brand color - Bold Orange from logo */
        brand: {
          DEFAULT: "#F26522",
          light: "#F5833D",
          dark: "#D94E0F",
        },
        /* Orange alias for convenience - same as brand */
        orange: {
          DEFAULT: "#F26522",
          light: "#F5833D",
          dark: "#D94E0F",
        },
        /* Secondary color - Concrete Gray from logo */
        concrete: {
          DEFAULT: "#6B6B6B",
          light: "#8C8C8C",
          dark: "#4A4A4A",
        },
        /* Accent colors for UI elements */
        accent: {
          DEFAULT: "#F26522",
          hover: "#D94E0F",
        },
        /* Black for text and dark elements */
        black: {
          DEFAULT: "#000000",
          soft: "#1a1a1a",
        },
      },
      /* Background color for body - references CSS variable */
      // backgroundColor: {
      //   DEFAULT: "var(--background)",
      // },
      /* Text color - references CSS variable */
      textColor: {
        DEFAULT: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      minHeight: {
        "touch": "44px",
        "150": "37.5rem",  /* 600px - Hero section mobile */
        "175": "43.75rem", /* 700px - Hero section desktop */
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
