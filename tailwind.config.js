/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
   theme: {
    extend: {
      // colors: {
      //   ...colors,
      //   blue: "#0a2455",
      //   "white-smoke": "#A6AEBF",
      //   "template-1": "#1A1A1D",
      //   grey: "#f5f6fa",
      //   white: "#ffffff",
      //   "dark-blue": "#081d45",
      //   "sky-blue": "#2697ff",
      //   red: "#dc3545",
      //   bg: "#b4c6d0",
      //   green: "#a3ffb4",
      //   primary: "#1E40AF",
      //   secondary: "#1E3A8A",
      //   accent: "#2563EB",
      //   background: "#F3F4F6",
      //   border: "#E5E7EB",
      //   black: "#000000",
      //   "dark-blue-1": "#1E3A8A",
      //   "light-blue": "#3B82F6",
      //   "dark-gray": "#374151",
      //   "light-gray": "#D1D5DB",
      //   "red-700": "#6c0c02",
      //   "red-100": "#c2857f",
      //   "green-100": "#a7e4aa",
      //   "green-700": "#03a10b",
      //   "slate-500": "#64748b",
      //   "slate-300": "#cbd5e1",
      //   "btn-color": "#3B3030",
      //   "txt-color": "#173B45",
      //   bannar: "#2F3645",
      //   "tbl-odd": "#DDDDDD",
      //   "tbl-even": "#D0D4CA",
      // },
    },
  },
  plugins: [],
};
