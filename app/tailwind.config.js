/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'fg': '#f1f1f1',
        'bg': '#1c1c1e',
      },
      textColor : {
        'fg': '#f1f1f1',
        'bg': '#1c1c1e',
      },
      fontSize: {
        '4xl': '3rem'
      }
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
    }
  },
  plugins: [],
}
