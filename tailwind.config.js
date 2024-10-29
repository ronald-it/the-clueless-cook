/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      boxShadow: {
        '3xl': 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      },
      colors: {
        darkblue: {
          DEFAULT: '#283E53',
        },
        lightblue: {
          DEFAULT: '#70B6BE',
        },
      },
    },
  },
  plugins: [],
};
