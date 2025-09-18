/** @type {import('tailwindcss').Config} */
module.exports = {


  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '576px',
        md: '768px',
        lg: '1024px',
        xl: '1380px',
        '2xl': '1600px',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'staatliches': ['Staatliches', 'sans-serif'],
        'abril-fatface': ['Abril Fatface', 'sans-serif']
      },
      colors: {
        'hero-title': '#323131',
        'title-work-card': '#161616',
        'sub-work-card': '#474747',
        'orange-primary': '#FF5E01',
        'sky-primary': '#ABECFB',
        'sky-badge': '#6ACFE7',
        'gray-primary': '#F6F6F6',
        'gray-secondary': '#D9D9D9',
        'footer-feature': '#D3F4FD',
        'black-primary': '#141414',
        'border-primary': '#7A7E92',
        'yellow-primary': '#FFE000',
        'category-inactive': '#E8E8E8',
        'option-bg': '#E3E3E3',
        'select-option-bg': '#2C2C31',
        'custom-search-focus': '#CCAB00'
      }
    }
  },
  plugins: [],
};