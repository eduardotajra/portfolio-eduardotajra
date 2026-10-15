import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useIdioma } from '../i18n'

// Personagem: uma cabeça em pixel art no estilo Minecraft (cabelo roxo, como
// a minha skin de testes). Os olhos seguem o mouse, pisca sozinho, balança em
// stop-motion e, se clicar ou passar o mouse nos botões, fica feliz e fala.
const PELE = '#c68a5e'
const PELE_SOMBRA = '#a86f47'
const CABELO = '#7c3aed'
const CABELO_CLARO = '#a78bfa'

const cabelo = [
  [0, 0, 8, 1], [0, 1, 8, 1], [0, 2, 1, 2], [7, 2, 1, 2], [1, 2, 2, 1], [5, 2, 2, 1],
]

export default function Mascote({ feliz = false }) {
  const ref = useRef(null)
  const [olhar, setOlhar] = useState(0)
  const [piscando, setPiscando] = useState(false)
  const [falando, setFalando] = useState(false)
  const { t } = useIdioma()

  // Olhos acompanham o cursor: -1 (esquerda), 0 (frente), 1 (direita).
  useEffect(() => {
    let quadro = 0
    const move = (e) => {
      if (quadro) return
      quadro = requestAnimationFrame(() => {
        quadro = 0
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        const dx = e.clientX - (r.left + r.width / 2)
        setOlhar(dx < -60 ? -1 : dx > 60 ? 1 : 0)
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  // Piscadas em intervalos irregulares.
  useEffect(() => {
    let t1
    let t2
    const agenda = () => {
      t1 = setTimeout(() => {
        setPiscando(true)
        t2 = setTimeout(() => {
          setPiscando(false)
          agenda()
        }, 140)
      }, 2200 + Math.random() * 2600)
    }
    agenda()
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const contente = feliz || falando
  const fala = () => {
    setFalando(true)
    setTimeout(() => setFalando(false), 2200)
  }

  return (
    <div ref={ref} className="relative inline-flex flex-col items-center">
      <AnimatePresence>
        {contente && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute -top-11 whitespace-nowrap rounded-md border-2 border-[#3b2a12] bg-[#2a1f0e] px-2.5 py-1 font-mono text-[11px] text-[#fde68a] shadow-lg"
          >
            {t('me chama no Discord!', 'message me on Discord!')}
            <span className="absolute -bottom-[7px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-[#3b2a12]" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={fala}
        aria-label={t('Personagem: clique para ele falar', 'Character: click to make it talk')}
        animate={contente ? { y: [0, -14, 0, -6, 0] } : { y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="stop-motion-pula cursor-pointer rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <svg width="72" height="72" viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
          <rect width="8" height="8" fill={PELE} />
          <rect x="0" y="6" width="8" height="2" fill={PELE_SOMBRA} />
          {cabelo.map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill={i === 1 ? CABELO_CLARO : CABELO} />
          ))}
          {piscando ? (
            <>
              <rect x="1" y="4" width="2" height="0.5" fill="#3b2410" />
              <rect x="5" y="4" width="2" height="0.5" fill="#3b2410" />
            </>
          ) : contente ? (
            <>
              <rect x="1" y="3.5" width="1" height="1" fill="#3b2410" />
              <rect x="2" y="3" width="1" height="1" fill="#3b2410" />
              <rect x="5" y="3" width="1" height="1" fill="#3b2410" />
              <rect x="6" y="3.5" width="1" height="1" fill="#3b2410" />
            </>
          ) : (
            <>
              <rect x="1" y="3" width="2" height="2" fill="#fff" />
              <rect x="5" y="3" width="2" height="2" fill="#fff" />
              <rect x={olhar < 0 ? 1 : olhar > 0 ? 2 : 1.5} y="3.5" width="1" height="1.5" fill="#1e1b4b" />
              <rect x={olhar < 0 ? 5 : olhar > 0 ? 6 : 5.5} y="3.5" width="1" height="1.5" fill="#1e1b4b" />
            </>
          )}
          <rect x="3" y="6" width="2" height={contente ? 1 : 0.6} fill="#5b2c1a" />
        </svg>
      </motion.button>
    </div>
  )
}
