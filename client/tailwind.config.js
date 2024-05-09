/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          red: '#C72C48',
          gray: '#B1B1B1',
          black: '#201F1F',
        },

      },
    },
  },
  plugins: [],
}

