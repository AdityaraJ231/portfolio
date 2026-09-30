/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#08080A',
          card: '#121215',
          border: '#232327'
        },
        accent: {
          red: '#E31C3D',
          redSoft: '#FF4D66',
          purple: '#A855F7',
          magenta: '#C026D3'
        }
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      },
      boxShadow: {
        glowRed: '0 0 40px -10px rgba(227,28,61,0.45)',
        glowPurple: '0 0 40px -10px rgba(168,85,247,0.4)'
      }
    }
  },
  plugins: []
}
