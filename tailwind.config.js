/** @type {import("tailwindcss").Config} */
const plugin = require("tailwindcss/plugin");
const config = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.63rem",
        xxl: "1.38rem"
      },
      colors: {
        primary: {
          DEFAULT: "#B21A45",
          50: "#FEC9EE",
          100: "#F6D2DC",
          200: "#F2A6BB",
          300: "#EC799A",
          400: "#E54D78",
          500: "#D01E50",
          600: "#B21A45",
          700: "#861334",
          800: "#590D22",
          900: "#2D0611"
        },
        secondary: {
          50: "#E8FAFC",
          100: "#D2F5F9",
          200: "#A4ECF4",
          300: "#77E2EE",
          400: "#49D9E9",
          500: "#0E6973",
          600: "#16A6B6",
          700: "#117C88",
          800: "#0B535B",
          900: "#06292D"
        },
        darkblue: {
          50: "#EEF2F7",
          100: "#DCE5EF",
          200: "#B9CBDF",
          300: "#97B1CE",
          400: "#3E878F",
          500: "#0E6973",
          600: "#41648B",
          700: "#314B68",
          800: "#203246",
          900: "#101923"
        },
        grey: {
          50: "#F2F2F2",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#3E878F",
          500: "#A0A0A0",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A"
        }
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn-primary": {
          backgroundColor: `${config.theme.extend.colors.primary["600"]} !important`,
          color: "#fff !important",
          borderColor: `${config.theme.extend.colors.primary["600"]} !important`,
          "&:hover": {
            backgroundColor: `${config.theme.extend.colors.primary["600"]} !important`
          }
        }
      });
    }),
    require("daisyui")
  ],
  daisyui: {
    themes: ["light"]
  }
};

module.exports = config;
