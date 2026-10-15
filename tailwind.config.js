/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Caderno de oficina: papel, tinta, caneta vermelha, caneta azul e marca-texto.
        bg: '#f1f0ea',
        surface: '#f8f7f2',
        'surface-2': '#e5e3da',
        border: '#d3d0c4',
        'border-2': '#ada99b',
        accent: '#bb2e17',
        'accent-dark': '#b0260f',
        cyan: '#1f4fd8',
        muted: '#5d594f',
        'text-primary': '#17140f',
        'text-secondary': '#45423a',
        tinta: '#17140f',
        papel: '#f1f0ea',
        marca: '#ffd84a',
        noite: '#0e1410',
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        display: ['Archivo', '"Arial Narrow"', 'sans-serif'],
        mao: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        blink: 'blink 1s step-end infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
