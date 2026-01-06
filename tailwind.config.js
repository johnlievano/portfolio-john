/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#050505", 
          gold: "#FCD34D",
          gray: "#9CA3AF"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
}