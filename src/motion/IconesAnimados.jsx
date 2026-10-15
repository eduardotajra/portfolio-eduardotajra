import { motion } from 'framer-motion'

// Ícones animados: mudam de estado quando o card pai (group) recebe o mouse.

// Código: as chaves se afastam, a barra gira e um cursor pisca no meio.
export function IconeCodigo({ ativo }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <motion.path
        d="M8 6 L3 12 L8 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ x: ativo ? -1.5 : 0 }}
      />
      <motion.path
        d="M16 6 L21 12 L16 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ x: ativo ? 1.5 : 0 }}
      />
      <motion.path
        d="M14 5 L10 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ originX: '12px', originY: '12px' }}
        animate={{ rotate: ativo ? 90 : 0, opacity: ativo ? 0 : 1 }}
      />
      <motion.rect
        x="11"
        y="8"
        width="2"
        height="8"
        rx="1"
        fill="currentColor"
        animate={ativo ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
        transition={ativo ? { duration: 0.9, repeat: Infinity, times: [0, 0.1, 0.6, 0.7] } : {}}
      />
    </svg>
  )
}

// Impressora 3D: camadas empilham de baixo para cima, como numa impressão.
export function IconeCamadas({ ativo }) {
  const camadas = [18, 14.5, 11, 7.5]
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {camadas.map((y, i) => (
        <motion.rect
          key={y}
          x={6 - i * 0.5}
          y={y}
          width={12 + i}
          height="2.4"
          rx="1"
          fill="currentColor"
          initial={false}
          animate={ativo ? { opacity: [0, 0, 1], scaleX: [0, 0, 1] } : { opacity: 1, scaleX: 1 }}
          style={{ originX: 0 }}
          transition={ativo ? { duration: 1.6, delay: i * 0.25, repeat: Infinity, repeatDelay: 0.4 } : { duration: 0.2 }}
        />
      ))}
      <motion.path
        d="M10 3h4l-2 2.5z"
        fill="currentColor"
        animate={ativo ? { x: [-5, 5, -5] } : { x: 0 }}
        transition={ativo ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } : {}}
      />
    </svg>
  )
}

// Picareta em stop-motion: poucos quadros por golpe, como animação antiga.
export function PicaretaStopMotion({ className = '' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 8 8" className={`stop-motion-balanca ${className}`} shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="0" width="5" height="1" fill="#67e8f9" />
      <rect x="0" y="1" width="2" height="1" fill="#67e8f9" />
      <rect x="5" y="1" width="2" height="1" fill="#67e8f9" />
      <rect x="0" y="2" width="1" height="1" fill="#67e8f9" />
      <rect x="6" y="2" width="1" height="1" fill="#67e8f9" />
      <rect x="3" y="1" width="1" height="7" fill="#a16207" />
    </svg>
  )
}
