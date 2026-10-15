import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { useIdioma } from '../i18n'

// Flipbook: os quadros da gravação viram páginas de um caderninho.
// A página vira em 3D pela borda esquerda; dá para clicar, arrastar,
// usar o controle deslizante ou deixar folheando sozinho.
const viragem = {
  entra: (dir) => (dir > 0 ? { rotateY: 0, zIndex: 1 } : { rotateY: -180, zIndex: 2 }),
  fica: { rotateY: 0, zIndex: 1 },
  sai: (dir) => (dir > 0 ? { rotateY: -180, zIndex: 2 } : { rotateY: 0, zIndex: 0 }),
}

export default function Flipbook({ quadros, legenda }) {
  const [pagina, setPagina] = useState(0)
  const [dir, setDir] = useState(1)
  const [tocando, setTocando] = useState(true)
  const ref = useRef(null)
  const visivel = useInView(ref, { margin: '-80px' })
  const parado = useReducedMotion()
  const arrasto = useRef(null)
  const { t } = useIdioma()
  const total = quadros.length

  const vai = (nova) => {
    const alvo = (nova + total) % total
    setDir(alvo > pagina || (pagina === total - 1 && alvo === 0) ? 1 : -1)
    setPagina(alvo)
  }

  // Folheia sozinho enquanto está na tela, como passar o dedão nas páginas.
  useEffect(() => {
    if (!tocando || !visivel || parado) return
    const id = setInterval(() => {
      setDir(1)
      setPagina((p) => (p + 1) % total)
    }, pagina === total - 1 ? 1400 : 420)
    return () => clearInterval(id)
  }, [tocando, visivel, parado, pagina, total])

  return (
    <div ref={ref} className="select-none">
      <div
        className="relative mx-auto aspect-[456/528] w-full max-w-[300px] touch-pan-y"
        style={{ perspective: 1400 }}
        onPointerDown={(e) => {
          arrasto.current = e.clientX
        }}
        onPointerUp={(e) => {
          if (arrasto.current === null) return
          const dx = e.clientX - arrasto.current
          arrasto.current = null
          if (Math.abs(dx) > 30) {
            setTocando(false)
            vai(pagina + (dx < 0 ? 1 : -1))
          }
        }}
      >
        {/* páginas de baixo, dando volume ao caderno */}
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-r-lg bg-[#d9d4c7]" />
        <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-r-lg bg-[#e8e3d6]" />

        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={pagina}
            custom={dir}
            variants={viragem}
            initial="entra"
            animate="fica"
            exit="sai"
            transition={{ duration: 0.38, ease: [0.45, 0, 0.25, 1] }}
            className="absolute inset-0 overflow-hidden rounded-r-lg border-[6px] border-[#f5f1e6] bg-[#f5f1e6] shadow-xl"
            style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
          >
            <img src={quadros[pagina]} alt="" draggable="false" className="h-full w-full rounded-sm object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-white/10" />
            <span className="absolute bottom-1.5 right-2 font-mono text-[10px] text-white/80 drop-shadow">
              {String(pagina + 1).padStart(2, '0')}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* espiral */}
        <div className="pointer-events-none absolute -left-2 top-3 bottom-3 z-10 flex flex-col justify-between">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="h-2 w-4 rounded-full border-2 border-[#9ca3af] bg-[#1a1a2e]" />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-5 flex max-w-[300px] items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setTocando(false)
            vai(pagina - 1)
          }}
          className="vidro rounded-lg p-2 text-text-secondary transition-colors hover:text-accent"
          aria-label={t('Página anterior', 'Previous page')}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => setTocando((v) => !v)}
          className="vidro rounded-lg p-2 text-text-secondary transition-colors hover:text-accent"
          aria-label={tocando ? t('Pausar', 'Pause') : t('Folhear', 'Flip through')}
        >
          {tocando ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max={total - 1}
          value={pagina}
          onChange={(e) => {
            setTocando(false)
            vai(Number(e.target.value))
          }}
          aria-label={t('Escolher página', 'Pick a page')}
          className="h-1 flex-1 cursor-pointer accent-[#818cf8]"
        />
        <button
          type="button"
          onClick={() => {
            setTocando(false)
            vai(pagina + 1)
          }}
          className="vidro rounded-lg p-2 text-text-secondary transition-colors hover:text-accent"
          aria-label={t('Próxima página', 'Next page')}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      {legenda && <p className="mt-3 text-center font-mono text-[11px] text-muted">{legenda}</p>}
    </div>
  )
}
