import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009E60", // Green
        secondary: "#F77F00", // Orange
        background: "#F9FAFB", // Off-white
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-roboto)", "sans-serif"],
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("daisyui")],
};
export default config;
