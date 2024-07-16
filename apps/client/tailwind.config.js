/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        menlo: ['Menlo', 'snas-serif']
      }
    }
  },

  plugins: [],
  darkMode: 'selector'
};
