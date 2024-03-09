/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens: {
      ipadmini: { max: "768px" },
    },
    gridTemplateColumns: {
      // Simple 16 column grid
      20: "repeat(20, minmax(0, 1fr))",
    },
    gridColumn: {
      "span-16": "span 16 / span 20",
      "span-4": "span 4 / span 20",
    },
  },
  plugins: [require("@tailwindcss/forms")({})],
};
