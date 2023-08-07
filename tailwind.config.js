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
        x: "0.6rem" // 10px
      },
      fontSize: {
        xxs: "0.6rem", // 10px
        15: "0.94rem", // 15px
        21: "1.31rem", // 21px
        22: "1.38rem", // 22px
        28: "1.75rem", // 28px
        42: "2.63rem", // 42px
        54: "3.37rem" // 54px
      },
      colors: {
        primary: {
          DEFAULT: "#D01E50",
          25: "#FFF6F9",
          50: "#FCE9EE",
          100: "#FAE9EE",
          200: "#F6D2DC",
          300: "#ECA5B9",
          400: "#E37896",
          500: "#D94B73",
          600: "#D01E50",
          700: "#A61840",
          800: "#7D1230",
          900: "#530C20"
        },
        secondary: {
          DEFAULT: "#0E6973",
          50: "#F1F7F8",
          100: "#E7F0F1",
          200: "#CFE1E3",
          300: "#9FC3C7",
          400: "#6EA5AB",
          500: "#3E878F",
          600: "#0E6973",
          700: "#0B545C",
          800: "#083F45",
          900: "#062A2E"
        },
        darkblue: {
          DEFAULT: "#0F3156",
          50: "#F2F4F6",
          100: "#E7EAEE",
          200: "#CFD6DD",
          300: "#9FADBB",
          400: "#6F839A",
          500: "#3F5A78",
          600: "#0F3156",
          700: "#0C2745",
          800: "#091D34",
          900: "#061422"
        },
        gray: {
          DEFAULT: "#75828A",
          50: "#F9F9F9",
          100: "#F1F3F3",
          200: "#E3E6E8",
          300: "#C8CDD0",
          400: "#ACB4B9",
          500: "#919BA1",
          600: "#75828A",
          700: "#5E686E",
          800: "#464E53",
          900: "#2F3437"
        },
        "green-light": {
          DEFAULT: "#E4F0E9"
        },
        "yellow-light": {
          DEFAULT: "#FEF0C7"
        },
        "red-light": {
          DEFAULT: "#F7E7E7"
        },
        "success-green": {
          DEFAULT: "#48BB78"
        },
        "warning-yellow": {
          DEFAULT: "#F4B616"
        },
        "error-red": {
          DEFAULT: "#E44646"
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
        },
        ".btn-white": {
          backgroundColor: `white !important`,
          color: `${config.theme.extend.colors.primary["600"]} !important`,
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
