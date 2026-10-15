import { useState } from 'react'
import { motion } from 'framer-motion'

// Logo animado: o monograma ET se desenha ao abrir o site e se redesenha
// quando o mouse passa por cima; ".dev" entra depois, letra a letra.
export default function Logo() {
  const [volta, setVolta] = useState(0)

  return (
    <span className="inline-flex items-center gap-1.5" onPointerEnter={() => setVolta((v) => v + 1)}>
      <svg key={volta} width="22" height="20" viewBox="0 0 26 24" fill="none" aria-hidden="true">
        {['M10 4H3v16h7', 'M3 12h6', 'M13 4h9', 'M17.5 4v16'].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="url(#logo-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: i * 0.12, ease: 'easeInOut' }}
          />
        ))}
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="26" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#818cf8" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-mono text-sm font-medium tracking-wider text-text-secondary">
        {'.dev'.split('').map((c, i) => (
          <motion.span
            key={`${volta}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.06 }}
          >
            {c}
          </motion.span>
        ))}
      </span>
      <span className="sr-only">Eduardo Tajra</span>
    </span>
  )
}
