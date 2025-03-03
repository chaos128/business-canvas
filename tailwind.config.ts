import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-active": "#345DD9",
        error: "#FF4D4F",
        tertiary: "#00000073",
        "border-secondary": "#F0F0F0",
        "control-item-bg-hover": "#0000000A",
        "control-item-bg-active": "#F0F7FF",
      },
      fontSize: {
        heading: [
          "1.6rem",
          { fontWeight: "600", lineHeight: "2.4rem", letterSpacing: "0%" },
        ],
        base: [
          "1.4rem",
          { fontWeight: "600", lineHeight: "2.2rem", letterSpacing: "0%" },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
