import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
} satisfies Config;

export default config;
