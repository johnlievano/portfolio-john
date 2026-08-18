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
      },
      // Opcional: Esto ayuda si quieres usar transiciones más suaves con GSAP o clases personalizadas
      boxShadow: {
        'sticker': '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}