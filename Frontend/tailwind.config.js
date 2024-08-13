/** @type {import('tailwindcss').Config} */
export default {
  content: [
        "./index.html", "./src/**/*.{js,ts,jsx,tsx}" ],
  theme: {
    extend: {
      colors:  {
        'dark': '#121212',
      },
      fontFamily: {
        inter: ['Inter', 'san-serif'],
        play: ['Playfair Display','serif'],
      },
    },
  },
  plugins: [],
}

