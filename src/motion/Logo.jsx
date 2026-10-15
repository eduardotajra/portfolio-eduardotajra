import { useState } from 'react'
import { motion } from 'framer-motion'

// Assinatura do site: o monograma ET se desenha a tinta ao abrir e de novo
// quando o mouse passa; ao lado, o nome em letra condensada.
export default function Logo({ nome = true }) {
  const [volta, setVolta] = useState(0)

  return (
    <span className="inline-flex items-center gap-2.5" onPointerEnter={() => setVolta((v) => v + 1)}>
      <svg key={volta} width="24" height="22" viewBox="0 0 26 24" fill="none" aria-hidden="true">
        {['M10 4H3v16h7', 'M3 12h6', 'M13 4h9', 'M17.5 4v16'].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke={i === 3 ? '#bb2e17' : '#17140f'}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: i * 0.12, ease: 'easeInOut' }}
          />
        ))}
      </svg>
      {nome && <span className="titulo text-[1.45rem] leading-none text-tinta">Eduardo Tajra</span>}
    </span>
  )
}
