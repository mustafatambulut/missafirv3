/** @type {import("tailwindcss").Config} */
module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
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
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"]
  }
};
