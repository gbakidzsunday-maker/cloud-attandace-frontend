/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#16233F",
          50: "#EEF1F6",
          100: "#D6DCE8",
          600: "#233459",
          700: "#1B2A48",
          900: "#0F1830",
        },
        gold: {
          DEFAULT: "#C9A227",
          50: "#FBF6E6",
          600: "#A9861A",
        },
        plum: {
          DEFAULT: "#5B2A5E",
          50: "#F3EAF3",
          600: "#4A2150",
        },
        canvas: "#FAF8F4",
        ink: "#242A35",
        rejected: "#B23A3A",
        present: "#2F7A52",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
