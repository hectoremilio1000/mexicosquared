/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.463rem",
      "3xl": "1.553rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      colors: {
        primary: "#007BFF", // Azul GrowthSuite
        secondary: "#FFD700", // Dorado GrowthSuite
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      // Opcional si necesitas más personalización, por ejemplo:
      // gridTemplateColumns: {
      //   '3cards': 'repeat(3, minmax(0, 1fr))',
      // },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
