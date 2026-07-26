// MILLA ABOGADOS — Tailwind config with brand colors.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#111923', 900: '#182330', 800: '#1f2a37', 700: '#2d3b4b' },
        ivory: { 50: '#fffdf8', 100: '#f7f2e9', 200: '#eee5d7' },
        gold: { 300: '#e7c66f', 500: '#c59632', 700: '#8d621d' },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Times New Roman', 'serif'],
        sans: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
