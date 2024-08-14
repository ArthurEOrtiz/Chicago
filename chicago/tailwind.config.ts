import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "cta-red": "#c60c30",
        "cta-blue": "#00a1de",
        "cta-green": "#009b3a",
        "cta-brown": "#62361b",
        "cta-purple": "#522398",
        "cta-yellow": "#f9e300",
        "cta-orange": "#f9461c",
        "cta-pink": "#e27ea6",
        "cta-gray": "#a7a9ac",
        "cta-black": "#000000",
        "cta-white": "#ffffff",
        "cta-error-content": "#f8d7da",
        "cta-warning-content": "#fff3cd",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
