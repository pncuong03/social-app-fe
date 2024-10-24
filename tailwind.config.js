const { keyframes } = require("@emotion/react");

module.exports = {
  media: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          100: "#1B1B1B",
          200: "#141411",
          300: "#242526",
          700: "#2B2B2B",
          800: "#181818",
          900: "#0D0D0D",
        },
        primary: "#1877f2",
        neutral: {
          100: "#141411",
          200: "#75757C",
          300: "#A5AAB0",
          400: "#F1F1F1",
        },

        gray: {
          500: "#D9D9D9",
        },
        dark: "#151515",
        light: "#F0F2F5",
      },

      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        fadein: "fade-in 1s ease-in-out 0.25s 1",
      },
    },
  },
  plugins: [],
};
