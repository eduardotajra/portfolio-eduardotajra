import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useIdioma } from '../i18n'

// Personagem: eu em pixel art, no estilo Minecraft. O rosto é uma grade 8×8
// (deslocada uma célula) e a camada de cima passa da borda: os cachos e o headset.
// Os olhos seguem o mouse, pisca sozinho, balança em stop-motion e, se clicar ou
// passar o mouse nos botões, fica feliz e fala.
const C = {
  pele: '#e2b59a',
  peleSombra: '#c9967e',
  cabelo: '#2b1e17',
  cabeloClaro: '#5b4231',
  cabeloEscuro: '#170f0b',
  sobrancelha: '#1d140f',
  oculos: '#0f0f10',
  olho: '#3a2418',
  branco: '#fbfbf7',
  boca: '#b8766b',
  bocaEscura: '#7a3b33',
  fone: '#1c1c1f',
  foneClaro: '#3b3b41',
}

// [x, y, largura, altura, cor] numa grade 10×10.
const ROSTO = [
  [1, 1, 8, 8, C.pele],
  [1, 8.2, 8, 0.8, C.peleSombra],
  [1, 7.6, 1, 0.6, C.peleSombra],
  [8, 7.6, 1, 0.6, C.peleSombra],
  [4.6, 5.9, 0.8, 0.7, C.peleSombra],
  [4.4, 6.5, 1.2, 0.25, C.peleSombra],
]
const CABELO = [
  [1, 1, 8, 1.4, C.cabelo], [1, 2.4, 1.6, 0.9, C.cabelo], [7.2, 2.4, 1.8, 1, C.cabelo],
  [3.2, 2.4, 1.2, 0.5, C.cabelo], [5.4, 2.4, 0.9, 0.4, C.cabelo],
  [1, 3.3, 0.7, 1.2, C.cabelo], [8.3, 3.4, 0.7, 1.1, C.cabelo],
  [0.4, 0.4, 2.2, 1, C.cabelo], [2.8, 0, 1.6, 1, C.cabelo], [4.6, 0.3, 1.8, 1, C.cabelo], [6.6, 0, 1.6, 1, C.cabelo], [8.2, 0.5, 1.4, 1.2, C.cabelo],
  [0, 1.2, 1, 2.6, C.cabelo], [9, 1.4, 1, 2.4, C.cabelo], [0.6, 3.6, 0.8, 0.8, C.cabelo], [8.6, 3.6, 0.8, 0.8, C.cabelo],
  [1.4, 0.6, 0.6, 0.5, C.cabeloClaro], [3.4, 0.3, 0.5, 0.5, C.cabeloClaro], [5.2, 0.7, 0.6, 0.5, C.cabeloClaro], [7.2, 0.4, 0.5, 0.5, C.cabeloClaro],
  [2.2, 1.6, 0.6, 0.5, C.cabeloClaro], [6.2, 1.5, 0.6, 0.5, C.cabeloClaro], [0.3, 2.2, 0.5, 0.6, C.cabeloClaro], [9.2, 2.1, 0.5, 0.5, C.cabeloClaro],
  [4.2, 1.6, 0.5, 0.5, C.cabeloEscuro], [8, 1.8, 0.5, 0.5, C.cabeloEscuro], [1.8, 2.6, 0.5, 0.5, C.cabeloEscuro],
  [1.7, 3.55, 2.1, 0.55, C.sobrancelha], [6.2, 3.55, 2.1, 0.55, C.sobrancelha],
]
// Óculos redondos de armação preta: barras encurtadas e cantos chanfrados.
const lente = (x) => [
  [x + 0.35, 4, 2.1, 0.3], [x + 0.35, 5.75, 2.1, 0.3], [x - 0.25, 4.45, 0.3, 1.2], [x + 2.75, 4.45, 0.3, 1.2],
  [x, 4.2, 0.4, 0.35], [x + 2.4, 4.2, 0.4, 0.35], [x, 5.55, 0.4, 0.35], [x + 2.4, 5.55, 0.4, 0.35],
]
const OCULOS = [...lente(1.5), ...lente(5.7), [4.6, 4.45, 0.8, 0.3], [1, 4.4, 0.3, 0.3], [8.7, 4.4, 0.3, 0.3]].map((r) => [...r, C.oculos])
const FONE = [
  [0, 4.2, 1.1, 3.2, C.fone], [8.9, 4.2, 1.1, 3.2, C.fone],
  [0.15, 4.5, 0.35, 2.4, C.foneClaro], [9.5, 4.5, 0.35, 2.4, C.foneClaro],
  [0.25, 3.3, 0.5, 1, C.fone], [9.25, 3.3, 0.5, 1, C.fone],
]

const Pixels = ({ lista }) => lista.map(([x, y, w, h, c], i) => <rect key={i} x={x} y={y} width={w} height={h} fill={c} />)

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
        <svg width="84" height="84" viewBox="0 0 10 10" shapeRendering="crispEdges" aria-hidden="true">
          <Pixels lista={ROSTO} />
          <Pixels lista={CABELO} />
          {piscando ? (
            <Pixels lista={[[2, 4.9, 1.8, 0.35, C.olho], [6.2, 4.9, 1.8, 0.35, C.olho]]} />
          ) : contente ? (
            <Pixels
              lista={[
                [2, 4.9, 0.6, 0.4, C.olho], [2.6, 4.55, 0.6, 0.4, C.olho], [3.2, 4.9, 0.6, 0.4, C.olho],
                [6.2, 4.9, 0.6, 0.4, C.olho], [6.8, 4.55, 0.6, 0.4, C.olho], [7.4, 4.9, 0.6, 0.4, C.olho],
              ]}
            />
          ) : (
            <Pixels
              lista={[
                [2, 4.5, 1.8, 0.9, C.branco], [6.2, 4.5, 1.8, 0.9, C.branco],
                [2 + (olhar < 0 ? 0 : olhar > 0 ? 0.9 : 0.45), 4.5, 0.9, 0.9, C.olho],
                [6.2 + (olhar < 0 ? 0 : olhar > 0 ? 0.9 : 0.45), 4.5, 0.9, 0.9, C.olho],
              ]}
            />
          )}
          <Pixels lista={OCULOS} />
          {contente ? (
            <Pixels lista={[[3.8, 6.85, 2.4, 0.55, C.bocaEscura], [3.4, 6.6, 0.4, 0.4, C.bocaEscura], [6.2, 6.6, 0.4, 0.4, C.bocaEscura]]} />
          ) : (
            <Pixels lista={[[3.9, 6.95, 2.2, 0.45, C.boca]]} />
          )}
          <Pixels lista={FONE} />
        </svg>
      </motion.button>
    </div>
  )
}
