/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: { 950: '#03120d', 900: '#06201a', 800: '#0a2c23', 700: '#103a2e' },
        gold: { DEFAULT: '#c9a45d', light: '#e0c07f', dark: '#a98539' },
        cream: '#f3ead7',
      },
      fontFamily: {
        serif: ['"Playfair Display Variable"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
