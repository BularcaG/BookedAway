import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dbe6fe",
          500: "#3b6ef6",
          600: "#2a55d8",
          700: "#1f42ab"
        }
      }
    }
  },
  plugins: []
};

export default config;
