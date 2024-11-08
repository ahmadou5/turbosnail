import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // You can add custom colors here if needed
      colors: {
        gradient: {
          start: "#0f172a",
          middle: "#1e3a8a",
          end: "#0f766e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
