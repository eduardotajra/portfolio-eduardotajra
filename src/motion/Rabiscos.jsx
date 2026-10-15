import { motion } from 'framer-motion'

// Rabiscos feitos à mão que se desenham sozinhos (self-drawing + doodle).
const desenha = (atraso = 0, duracao = 0.9) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: '-40px' },
  transition: { pathLength: { duration: duracao, delay: atraso, ease: 'easeInOut' }, opacity: { duration: 0.01, delay: atraso } },
})

// Sublinhado tremido embaixo de uma palavra.
export function Sublinhado({ children, cor = '#22d3ee', atraso = 0.2 }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 14"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-2 left-[-4%] h-3 w-[108%] overflow-visible"
      >
        <motion.path
          d="M3 9 C 22 3, 40 12, 60 7 S 98 4, 117 8"
          fill="none"
          stroke={cor}
          strokeWidth="3"
          strokeLinecap="round"
          {...desenha(atraso)}
        />
      </svg>
    </span>
  )
}

// Círculo à mão em volta de algo, e uma seta curva com legenda.
export function CirculoMao({ className = '', cor = '#fbbf24', atraso = 0, style }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 80" style={style} className={`pointer-events-none overflow-visible ${className}`}>
      <motion.path
        d="M52 6 C 22 4, 4 22, 8 44 C 12 66, 44 76, 70 70 C 94 63, 98 36, 84 20 C 72 7, 50 3, 34 10"
        fill="none"
        stroke={cor}
        strokeWidth="3.2"
        strokeLinecap="round"
        {...desenha(atraso, 1.1)}
      />
    </svg>
  )
}

export function SetaMao({ className = '', cor = '#fbbf24', atraso = 0, invertida = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 60"
      className={`pointer-events-none overflow-visible ${className}`}
      style={invertida ? { transform: 'scaleX(-1)' } : undefined}
    >
      <motion.path
        d="M6 8 C 30 4, 58 14, 66 44"
        fill="none"
        stroke={cor}
        strokeWidth="3"
        strokeLinecap="round"
        {...desenha(atraso, 0.7)}
      />
      <motion.path
        d="M54 36 L 66 46 L 74 32"
        fill="none"
        stroke={cor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...desenha(atraso + 0.6, 0.3)}
      />
    </svg>
  )
}
