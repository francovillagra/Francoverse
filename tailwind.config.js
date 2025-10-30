/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 👈 habilita modo oscuro por clase
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cedarville: ['var(--font-cedarville)', 'cursive'],
      },
    },
  },
  plugins: [],
}

