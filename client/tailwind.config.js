/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '125': '31.25rem' // 1 unit of space = 0.25rem (=4px), here 31.25 * 16 (1rem) = 500px
      },
      colors: {
        primary: "#C72C48",
        black: "#201F1F",
        white: "#FAFAFA"

      },
    },
  },
  plugins: [],
  purge: {
    options: {
      safelist: ['fill-primary']
    }
  }
}

