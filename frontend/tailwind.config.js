/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f5f4f0',
          100: '#e8e6df',
          200: '#d0ccbf',
          300: '#b0aa98',
          400: '#8f8772',
          500: '#736b57',
          600: '#5c5444',
          700: '#474036',
          800: '#2e2b24',
          900: '#1a1814',
        },
        amber: {
          400: '#f59e0b',
          500: '#d97706',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
