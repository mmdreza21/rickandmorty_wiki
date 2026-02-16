tailwind.config.ts// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        gray: {
          50: '#F2F2F3',
          100: 'rgba(153, 156, 159, 0.18)',
          600: '#636669',
          800: '#2C2E30',
          900: '#0E0E0E',
        },
        yellow: {
          primary: '#B2DF28',
        },
        red: {
          status: '#FF1E00',
        },
        green: {
          status: '#00FF80',
        },
        dark: {
          bg: '#2C2E30',
          card: '#3B3D3F',
          border: '#404244',
        },
      },
    },
  },
  plugins: [],
}