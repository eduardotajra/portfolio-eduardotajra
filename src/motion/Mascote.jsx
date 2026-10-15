import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useIdioma } from '../i18n'

// Personagem: eu em pixel art, numa grade fixa 20×21 (todo pixel do mesmo
// tamanho): cabelo cacheado volumoso, sobrancelhas grossas, óculos redondos e headset.
// Os olhos seguem o mouse, pisca sozinho, balança em stop-motion e, se clicar ou
// passar o mouse nos botões, fica feliz e fala.
const PALETA = {
  K: '#1b191b', H: '#2f2a2a', h: '#574a42', // cabelo
  S: '#dcb196', s: '#c69780', d: '#ad7d65', L: '#ebc6ae', // pele
  B: '#211c1d', G: '#111113', W: '#f7f3ee', E: '#3a2c26', e: '#5a463d', // sobrancelha, óculos, olho
  m: '#8c5450', n: '#c08278', T: '#f7f3ee', // boca
  P: '#1f2229', p: '#3d424d', // headset
}
const GRADE = [
  '...KK..KKK..KKK..K..',
  '..KhhK.KhhhKKhhhKhK.',
  '.KHHHhKHHHHHhKHHHhK.',
  'KHhhHHHhhKHHhhHHHhHK',
  'KHHHKhhHHHHKHhhHHHHK',
  'HhhHHHHKhhHHHHKHhhHH',
  'HHHhKHHSSSSSSKHhhHHH',
  'KHhHHSSSSSSSSSSHHhHK',
  'HhPHsBBBBLLBBBBsHPhH',
  'hHPHsSSSSSSSSSSsHPHh',
  'HKPHsGGGSSSSGGGsHPKH',
  'KHPGGSSSGGGGSSSGGPHK',
  'HPPPGWEWGSsGWEWGPPPH',
  '.pPPGWEWGSsGWEWGPPp.',
  '.pPPsGGGSSsSGGGsPPp.',
  '.pPPsSSSSssSSSSsPPp.',
  '.PPPsSSSSSSSSSSsPPP.',
  '.....sSSmmmmSSs.....',
  '.....sSSSnnSSSs.....',
  '......sSSssSSs......',
  '.......dssssd.......',
]

// Monta a grade do estado atual e junta pixels vizinhos da mesma cor em retângulos.
function retrato({ olhar, piscando, contente }) {
  const g = GRADE.map((l) => l.split(''))
  for (const x0 of [5, 12]) {
    for (let i = 0; i < 3; i++) {
      g[12][x0 + i] = piscando || contente ? 'S' : 'W'
      g[13][x0 + i] = piscando ? 'e' : contente ? 'S' : 'W'
    }
    if (contente) {
      g[12][x0 + 1] = 'E'
      g[13][x0] = 'E'
      g[13][x0 + 2] = 'E'
    } else if (!piscando) {
      g[12][x0 + 1 + olhar] = 'E'
      g[13][x0 + 1 + olhar] = 'E'
    }
  }
  if (contente) {
    for (let x = 8; x <= 11; x++) {
      g[17][x] = 'T'
      g[18][x] = 'm'
    }
    g[17][7] = 'm'
    g[17][12] = 'm'
  }
  const ret = []
  g.forEach((linha, y) => {
    let x = 0
    while (x < linha.length) {
      let f = x
      while (f + 1 < linha.length && linha[f + 1] === linha[x]) f++
      if (PALETA[linha[x]]) ret.push([x, y, f - x + 1, PALETA[linha[x]]])
      x = f + 1
    }
  })
  return ret
}

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
        {/* 4px por pixel da grade: múltiplo inteiro, para nenhum pixel sair torto. */}
        <svg width="80" height="84" viewBox="0 0 20 21" shapeRendering="crispEdges" aria-hidden="true">
          {retrato({ olhar, piscando, contente }).map(([x, y, w, cor], i) => (
            <rect key={i} x={x} y={y} width={w} height="1" fill={cor} />
          ))}
        </svg>
      </motion.button>
    </div>
  )
}
