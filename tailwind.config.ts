import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1E3A8A", // primary
          light: "#3B82F6",
          dark: "#1E293B",
        },
        accent: {
          DEFAULT: "#F97316",
        },
      },
    },
  },
  plugins: [],
};

export default config;