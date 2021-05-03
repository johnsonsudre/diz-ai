module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brand': '#c83771',
        'brand-light': '#ff408c',
        'brand-dark': '#ab0044',
        'primary': '#eef',
        'secondary': '#ccd',
        'tertiary': '#99a',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ]
}
