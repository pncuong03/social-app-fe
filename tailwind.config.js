const { keyframes } = require("@emotion/react");

module.exports = {
  media: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // color custom
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
        yellow: {
          100: "rgba(255, 200, 77, 0.16)",
          500: "#FFC84D",
        },
        green: {
          400: "#3CB455",
          100: "rgba(60, 180, 85, 0.16)",
          500: "#3ED35D",
        },
        gray: {
          500: "#D9D9D9",
        },
        //333333
        dark: "#151515",
        light: "#F0F2F5",
      },
      // E4E6EB
      backgroundImage: {
        "gradient-primary": "linear-gradient(0deg, rgba(29, 31, 47, 0) 18.23%, rgba(37, 188, 208, 0.38) 100%)",
        "gradient-yellow": "linear-gradient(180deg, #FF824D 0%, #FFC84D 100%), linear-gradient(0deg, #181818, #181818)",
        "gradient-blue": "linear-gradient(180deg, #4E7BF1 0%, #25BCD0 100%), linear-gradient(0deg, #181818, #181818)",
        vector: "url('/public/img/vector.png')",
        default: "url('/public/img/bg-default.png')",

        linear: "linear-gradient(180deg, #1A3437 0%, #181818 100%)",
      },
      backgroundColor: {
        darkblue: "rgba(37, 188, 208, 0.08)",
      },
      fontSize: {
        // font size custom
      },
      boxShadow: {
        // box shadow custom
        main: "0px 5px 15px rgba(0, 0, 0, 0.1)",
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
  plugins: [
    // function ({ addComponents }) {
    //   addComponents({
    //     ".container": {
    //       maxWidth: "100%",
    //       "@screen sm": {
    //         maxWidth: "640px",
    //       },
    //       "@screen md": {
    //         maxWidth: "768px",
    //       },
    //       "@screen lg": {
    //         maxWidth: "1280px",
    //       },
    //     },
    //   });
    // },
  ],
};
