/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#31A7E7",
        primary: "#314CE2",
        secondary: "#6830D0",
        accent: "#C140D7",
        alert: "#DD239C",
      },
    },
  },
  plugins: [],
};
