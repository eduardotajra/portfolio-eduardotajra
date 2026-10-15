import { motion } from 'framer-motion'

const curva = [0.22, 1, 0.36, 1]

// Tipografia expressiva: cada letra entra de baixo, girando e saindo do
// desfoque. Passando o mouse, a letra pula e muda de peso (Inter variável).
export function LetrasVivas({ texto, className = '', gradiente = false, atraso = 0 }) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`} aria-hidden="true">
      {[...texto].map((letra, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block cursor-default ${gradiente ? 'gradiente-vivo' : ''}`}
            style={gradiente ? { animationDelay: `${-i * 0.35}s` } : undefined}
            initial={{ y: '110%', rotate: 12, opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: '0%', rotate: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: atraso + i * 0.045, ease: curva }}
            whileHover={{ y: -10, fontWeight: 300, transition: { type: 'spring', stiffness: 400, damping: 12 } }}
          >
            {letra === ' ' ? ' ' : letra}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Títulos de seção revelados palavra por palavra, de dentro de uma máscara.
export function Titulo({ children, as = 'h2', className = '' }) {
  const Tag = motion[as]
  const palavras = String(children).split(' ')
  return (
    <Tag
      className={className}
      aria-label={String(children)}
      initial="fora"
      whileInView="dentro"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.06 }}
    >
      {palavras.map((p, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ fora: { y: '105%' }, dentro: { y: '0%' } }}
            transition={{ duration: 0.65, ease: curva }}
          >
            {p}
          </motion.span>
          {i < palavras.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
