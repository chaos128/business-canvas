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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4A7CFE",
        "primary-hover": "#739FFF",
        "primary-active": "#345DD9",
      },
      fontSize: {
        heading: [
          "1.6rem",
          { fontWeight: "600", lineHeight: "2.4rem", letterSpacing: "0%" },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
