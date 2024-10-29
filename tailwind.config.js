/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:
      {
        darkblue: {
          DEFAULT: '#283E53'
        },
        lightblue: {
          DEFAULT: '#70B6BE'
        }
      }
    },
  },
  plugins: [],
}