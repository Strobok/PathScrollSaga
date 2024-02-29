/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      strokeWidth: {
        '2': '8px',
      }

    },
  },
  plugins: [],
}