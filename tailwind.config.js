/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      fontFamily: {
        'austein': ['Austein', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      extend: {
        colors: {
          projectBlue: 'hsl(216, 24%, 26%)',
          projectBlack: '	hsl(0, 0%, 23%)',
          projectWhite: 'hsl(0, 0%, 97%)',
          projectCyan: 'hsl(190, 29%, 64%)',
        },
      },
  },
  variants: {},
  plugins: [],
}
