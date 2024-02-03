#!/usr/bin/env bash

# tailwind config file
twconfig=$(ls tailwind.config.js 2> /dev/null)

if [ $# -eq 0 ]; then
    echo "provide a title for the index page as an argument"
elif [ $# -gt 1 ]; then
    echo "only 1 argument is required"
elif [ ! -e "$twconfig" ]; then
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
else
    echo "" > **/App.css
    echo "@tailwind base;
@tailwind components;
@tailwind utilities;" > **/index.css
    echo "/** @type {import('tailwindcss').Config} */
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
}" > "$twconfig"
    rm -rf **/*.svg
    sed -i "s/Vite + React/$1/g" index.html 
fi
