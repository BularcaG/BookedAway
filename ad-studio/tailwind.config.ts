import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f6f5f3",
          100: "#e9e6e1",
          200: "#d3cec6",
          400: "#8b8279",
          600: "#4a423a",
          800: "#2a231d",
          900: "#1b1611"
        },
        brand: {
          50: "#fbf1f3",
          100: "#f5dde2",
          300: "#d49aa6",
          500: "#9c3b50",
          600: "#7e2c3f",
          700: "#5c2430",
          800: "#431a23"
        },
        gold: {
          400: "#c9a227",
          600: "#8a6d1f"
        }
      }
    }
  },
  plugins: []
};

export default config;
