/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './src/**/*.{html,js}' ],
  theme: {
    fontSize: {
      base: '18px',
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [ {
      mytheme: {
        'primary': '#194DFA',
        'neutral': '#fff'
      }
    } ]
  }
}