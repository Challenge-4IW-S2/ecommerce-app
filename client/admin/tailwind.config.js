/** @type {import('tailwindcss').Config} */
module.exports ={
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./nodes_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'principal': '#C72C48',
      },
      fontFamily: {
        'body': ['League Spartan'],
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      maxWidth: {
        '125': '31.25rem',
      },
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('flowbite/plugin')
  ],
}

