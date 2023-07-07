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
      borderRadius: {
        x: "0.6 rem" // 10px
      },
      fontSize: {
        xxs: "0.63rem",
        xxl: "1.38rem",
        22: "1.37rem",
        21: "1.36rem",
        42: "2.63rem",
        54: "3.39rem"
      },
      colors: {
        primary: {
          DEFAULT: "#B21A45",
          50: "#FEC9EE",
          100: "#F6D2DC",
          200: "#F2A6BB",
          300: "#EC799A",
          400: "#E37896",
          500: "#D01E50",
          600: "#D01E50",
          700: "#A61840",
          800: "#590D22",
          900: "#2D0611"
        },
        secondary: {
          50: "#E8FAFC",
          100: "#D2F5F9",
          200: "#A4ECF4",
          300: "#77E2EE",
          400: "#6EA5AB",
          500: "#0E6973",
          600: "#0E6973",
          700: "#0B545C",
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
        gray: {
          50: "#F2F2F2",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#ACB4B9",
          500: "#A0A0A0",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A"
        }
      },
      fontFamily: {
        "mi-sans": ["Missafir-Sans"],
        "mi-sans-semi-bold": ["Missafir-Sans-Semi-bold"],
        "bariol-bold": ["Bariol-bold-webfont"],
        "bariol-bold-italic": ["Bariol-bold-italic-webfont"],
        "bariol-bold-light": ["Bariol-bold-light-webfont"],
        "bariol-bold-light-italic": ["Bariol-bold-light-italic-webfont"],
        "bariol-bold-regular": ["Bariol-bold-regular-webfont"],
        "bariol-bold-regular-italic": ["Bariol-bold-regular-italic-webfont"],
        "bariol-bold-thin": ["Bariol-bold-thin-webfont"],
        "bariol-bold-thin-italic": ["Bariol-bold-thin-italic-webfont"]
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
          "&.btn-outline": {
            backgroundColor: `transparent !important`,
            color: `${config.theme.extend.colors.primary["600"]} !important`,
            borderWidth: "2px !important"
          },
          "&:hover": {
            backgroundColor: `${config.theme.extend.colors.primary["400"]} !important`,
            borderColor: `${config.theme.extend.colors.primary["400"]} !important`,
            "&.btn-outline": {
              backgroundColor: `transparent !important`,
              color: `${config.theme.extend.colors.primary["400"]} !important`
            }
          },
          "&:active": {
            backgroundColor: `${config.theme.extend.colors.primary["700"]} !important`,
            borderColor: `${config.theme.extend.colors.primary["700"]} !important`,
            "&.btn-outline": {
              backgroundColor: `transparent !important`,
              color: `${config.theme.extend.colors.primary["700"]} !important`
            }
          },
          "&:disabled": {
            backgroundColor: `${config.theme.extend.colors.gray["100"]} !important`,
            borderColor: `${config.theme.extend.colors.gray["100"]} !important`,
            "&.btn-outline": {
              backgroundColor: `transparent !important`,
              color: `${config.theme.extend.colors.gray["100"]} !important`
            }
          }
        },
        ".btn-secondary": {
          backgroundColor: `${config.theme.extend.colors.secondary["600"]} !important`,
          color: "#fff !important",
          borderColor: `${config.theme.extend.colors.secondary["600"]} !important`,
          "&:hover": {
            backgroundColor: `${config.theme.extend.colors.secondary["400"]} !important`,
            borderColor: `${config.theme.extend.colors.secondary["400"]} !important`
          },
          "&:active": {
            backgroundColor: `${config.theme.extend.colors.secondary["700"]} !important`,
            borderColor: `${config.theme.extend.colors.secondary["700"]} !important`
          },
          "&:disabled": {
            backgroundColor: `${config.theme.extend.colors.gray["100"]} !important`,
            borderColor: `${config.theme.extend.colors.gray["100"]} !important`
          }
        },
        ".btn-darkblue": {
          backgroundColor: `${config.theme.extend.colors.darkblue["600"]} !important`,
          color: "#fff !important",
          borderColor: `${config.theme.extend.colors.darkblue["600"]} !important`,
          "&:hover": {
            backgroundColor: `${config.theme.extend.colors.darkblue["400"]} !important`,
            borderColor: `${config.theme.extend.colors.darkblue["400"]} !important`
          },
          "&:active": {
            backgroundColor: `${config.theme.extend.colors.darkblue["700"]} !important`,
            borderColor: `${config.theme.extend.colors.darkblue["700"]} !important`
          },
          "&:disabled": {
            backgroundColor: `${config.theme.extend.colors.gray["100"]} !important`,
            borderColor: `${config.theme.extend.colors.gray["100"]} !important`
          }
        },
        ".btn-ghost": {
          backgroundColor: `transparent !important`,
          color: `${config.theme.extend.colors.primary["600"]} !important`,
          border: `none !important`,
          "&:hover": {
            backgroundColor: `transparent !important`,
            color: `${config.theme.extend.colors.primary["400"]} !important`
          },
          "&:active": {
            backgroundColor: `transparent !important`,
            color: `${config.theme.extend.colors.primary["700"]} !important`
          },
          "&:disabled": {
            backgroundColor: `transparent !important`,
            color: `${config.theme.extend.colors.gray["100"]} !important`
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
