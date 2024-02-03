/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'fg': '#3B372E',
        'bg': '#EFEEEA',
      },
      textColor : {
        'fg': '#3B372E',
        'bg': '#EFEEEA',
      },
      fontSize: {
        '4xl': '3rem'
      }
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
      'pp': ['"Purple Purse"', 'sans-serif']
    },
    backgroundImage: {
      'up-arrow': "url('https://img.icons8.com/ios-filled/100/3B372E/circled-chevron-up.png')",
      'down-arrow': "url('https://img.icons8.com/ios-filled/100/3B372E/circled-chevron-down.png')",
    }
  },
  plugins: [],
}
