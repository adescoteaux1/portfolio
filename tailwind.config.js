/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#5C6D63',
        'medium-green': '#8BA888',
        'light-green': '#C2D6C0',
        'dark-brown': '#6D5C50',
        'medium-brown': '#A3917A',
        'light-brown': '#E0D6C8',
        'off-white': '#F8F7F4',
      },
    },
  },
  plugins: [],
}