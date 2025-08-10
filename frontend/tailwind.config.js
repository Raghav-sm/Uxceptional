/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'playful-pink': '#ff7eb9',
        'creative-blue': '#7afcff',
        'vibrant-yellow': '#feff9c',
      },
      fontFamily: {
        'playful': ['"Comic Neue"', 'cursive'],
      }
    },
  },
  plugins: [],
}

