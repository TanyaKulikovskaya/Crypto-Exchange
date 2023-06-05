/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      margin: {
        '60px': '60px',
      },
      colors: {
        'custom-gray': '#282828',
      },
    },
    fontFamily: {
      sans: ['Vollkorn', 'serif'],
    },
    fontSize: {
      'xl': '1.25rem',
      '5xl': '3.125rem',
    },
  },
  plugins: [],
}

