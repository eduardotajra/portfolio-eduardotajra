/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Caderno de oficina: papel, tinta, caneta vermelha, caneta azul e marca-texto.
        bg: '#efe9dd',
        surface: '#f6f2e9',
        'surface-2': '#e6dfd1',
        border: '#d6ccb9',
        'border-2': '#b8ac95',
        accent: '#bb2e17',
        'accent-dark': '#b0260f',
        cyan: '#1f4fd8',
        muted: '#635b4d',
        'text-primary': '#17140f',
        'text-secondary': '#4a4338',
        tinta: '#17140f',
        papel: '#efe9dd',
        marca: '#ffd84a',
        noite: '#0e1410',
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
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
