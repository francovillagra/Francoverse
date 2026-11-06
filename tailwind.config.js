/** @type {import('tailwindcss').Config} */
module.exports = {
  // El tema (día o noche) lo decide la clase `t-day` / `t-night` que next-themes pone en <html>.
  darkMode: ["selector", ".t-night"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Los valores viven en app/globals.css (una paleta para el día y otra para la noche).
      colors: {
        papel: "var(--papel)",
        papel2: "var(--papel2)",
        barra: "var(--barra)",
        tinta: "var(--tinta)",
        tinta2: "var(--tinta2)",
        accion: "var(--accion)",
        "sobre-accion": "var(--sobre-accion)",
        ok: "var(--ok)",
        rojo: "var(--rojo)",
        linea2: "var(--linea2)",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
