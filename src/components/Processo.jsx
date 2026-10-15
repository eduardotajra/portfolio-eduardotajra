import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useIdioma } from '../i18n'
import { TracoLivre } from '../motion/Pincel'
import { aleatorio } from '../motion/tracos'

// Scrollytelling: a rolagem conta a história de um projeto. Primeiro o rabisco
// a pincel, depois a planta limpa por cima, a cor e as linhas de código e, no
// fim, o site de verdade com o carimbo de "no ar".

const blocos = [
  { x: 30, y: 40, w: 340, h: 26, cor: '#17140f' },
  { x: 30, y: 80, w: 200, h: 90, cor: '#ffd84a' },
  { x: 245, y: 80, w: 125, h: 90, cor: '#9db4f5' },
  { x: 30, y: 185, w: 105, h: 80, cor: '#e5e3da' },
  { x: 147, y: 185, w: 105, h: 80, cor: '#e5e3da' },
  { x: 264, y: 185, w: 105, h: 80, cor: '#e5e3da' },
]

// Contorno tremido de cada bloco, como quem desenha rápido numa folha.
// Cada lado ganha pontos no meio: a curva passa por eles e não estufa nos cantos.
const rabiscos = blocos.map((b, i) => {
  const r = aleatorio(i * 17 + 3)
  const j = (n = 3.5) => (r() - 0.5) * n
  const cantos = [
    [b.x, b.y],
    [b.x + b.w, b.y],
    [b.x + b.w, b.y + b.h],
    [b.x, b.y + b.h],
    [b.x + 8, b.y - 1],
  ]
  const pontos = []
  cantos.forEach(([x, y], k) => {
    pontos.push([x + j(), y + j()])
    const prox = cantos[k + 1]
    if (!prox) return
    for (const f of [0.33, 0.66]) pontos.push([x + (prox[0] - x) * f + j(2), y + (prox[1] - y) * f + j(2)])
  })
  return pontos
})
const opcoesRabisco = { largura: 2.4, inicio: 0.04, fim: 0.15, tremor: 0.25, cerdas: 3, secura: 0.4, passos: 5 }

const etapas = [
  { pt: 'Conversa', en: 'Talk', textoPt: 'Você me conta a ideia, mesmo que ainda seja um rabisco.', textoEn: "You tell me the idea, even if it's just a scribble." },
  { pt: 'Protótipo', en: 'Prototype', textoPt: 'Organizo a estrutura e te mostro antes de construir.', textoEn: 'I lay out the structure and show you before building.' },
  { pt: 'Construção', en: 'Build', textoPt: 'Programo, testo e mando versões de teste no caminho.', textoEn: 'I code, test and send test builds along the way.' },
  { pt: 'No ar', en: 'Live', textoPt: 'Entrego funcionando, com uma rodada de ajustes inclusa.', textoEn: 'I ship it working, with one round of tweaks included.' },
]

function Rabisco({ i, progresso }) {
  const p = useTransform(progresso, [0.03 + i * 0.03, 0.18 + i * 0.03], [0, 1])
  return <TracoLivre pontos={rabiscos[i]} opcoes={opcoesRabisco} cor="#45423a" progresso={p} opacidade={0.85} />
}

function Bloco({ b, i, progresso }) {
  const linha = useTransform(progresso, [0.3 + i * 0.02, 0.44 + i * 0.02], [0, 1])
  const preenche = useTransform(progresso, [0.5 + i * 0.02, 0.62 + i * 0.02], [0, 1])
  return (
    <>
      <motion.rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill={b.cor} style={{ opacity: preenche }} />
      <motion.rect
        x={b.x}
        y={b.y}
        width={b.w}
        height={b.h}
        rx="3"
        fill="none"
        stroke="#17140f"
        strokeWidth="1.3"
        style={{ pathLength: linha }}
      />
    </>
  )
}

function LinhaDeCodigo({ x, y, w, cor, inicio, progresso }) {
  const escala = useTransform(progresso, [inicio, inicio + 0.06], [0, 1])
  return <motion.rect x={x} y={y} width={w} height="5" rx="2.5" fill={cor} style={{ scaleX: escala, originX: 0 }} />
}

export default function Processo() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [atual, setAtual] = useState(0)
  const { t, en } = useIdioma()

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(etapas.length - 1, Math.floor(v * etapas.length * 0.999))
    if (i !== atual) setAtual(i)
  })

  const moldura = useTransform(scrollYProgress, [0, 0.05], [0, 1])
  const rabiscoSome = useTransform(scrollYProgress, [0.42, 0.52], [1, 0.12])
  const site = useTransform(scrollYProgress, [0.76, 0.9], [0, 1])
  const corte = useTransform(scrollYProgress, [0.76, 0.9], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
  const carimbo = useTransform(scrollYProgress, [0.89, 0.93], [0, 1])
  const carimboEscala = useTransform(scrollYProgress, [0.89, 0.93], [1.8, 1])

  const codigo = [
    [44, 98, 120, '#17140f'], [44, 110, 150, '#45423a'], [56, 122, 90, '#bb2e17'],
    [56, 134, 130, '#45423a'], [44, 146, 70, '#1f4fd8'],
    [42, 200, 70, '#45423a'], [159, 200, 60, '#45423a'], [276, 200, 75, '#45423a'],
  ]

  return (
    <section id="processo" ref={ref} className="relative h-[280vh] lg:h-[340vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-5 sm:px-8">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="font-mao mb-1 text-2xl text-accent">{t('como eu trabalho', 'how I work')}</p>
            <h2 className="titulo mb-8 text-5xl text-tinta sm:text-6xl">{t('Do rabisco ao ar', 'From scribble to live')}</h2>

            <ol className="space-y-5 border-l-2 border-accent/70 pl-6">
              {etapas.map((e, i) => {
                const ativo = i === atual
                return (
                  <li key={e.pt}>
                    <p className={`flex items-baseline gap-3 transition-colors duration-300 ${ativo ? 'text-tinta' : 'text-muted'}`}>
                      <span className="titulo text-3xl italic">{i + 1}.</span>
                      <span className="titulo text-3xl">{en ? e.en : e.pt}</span>
                    </p>
                    <motion.p
                      animate={{ opacity: ativo ? 1 : 0.45, x: ativo ? 0 : -4 }}
                      className={`mt-1 leading-relaxed text-text-secondary ${ativo ? '' : 'hidden sm:block'}`}
                    >
                      {en ? e.textoEn : e.textoPt}
                    </motion.p>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="order-1 lg:order-2">
            <svg viewBox="0 0 400 300" className="w-full" aria-hidden="true">
              <defs>
                <clipPath id="proc-janela">
                  <rect x="12" y="30" width="376" height="258" rx="6" />
                </clipPath>
              </defs>
              <motion.rect
                x="10" y="10" width="380" height="280" rx="10"
                fill="#f8f7f2"
                stroke="#17140f"
                strokeWidth="1.6"
                style={{ pathLength: moldura }}
              />
              <motion.g style={{ opacity: moldura }}>
                <circle cx="26" cy="21" r="3.2" fill="#17140f" fillOpacity="0.25" />
                <circle cx="37" cy="21" r="3.2" fill="#17140f" fillOpacity="0.25" />
                <circle cx="48" cy="21" r="3.2" fill="#17140f" fillOpacity="0.25" />
              </motion.g>

              <motion.g style={{ opacity: rabiscoSome }}>
                {blocos.map((_, i) => (
                  <Rabisco key={i} i={i} progresso={scrollYProgress} />
                ))}
              </motion.g>
              {blocos.map((b, i) => (
                <Bloco key={i} b={b} i={i} progresso={scrollYProgress} />
              ))}
              {codigo.map(([x, y, w, cor], i) => (
                <LinhaDeCodigo key={i} x={x} y={y} w={w} cor={cor} inicio={0.56 + i * 0.022} progresso={scrollYProgress} />
              ))}

              <motion.g clipPath="url(#proc-janela)" style={{ opacity: site }}>
                <motion.image
                  href="/screenshots/meiosangue.png"
                  x="12" y="30" width="376" height="258"
                  preserveAspectRatio="xMidYMin slice"
                  style={{ clipPath: corte }}
                />
              </motion.g>

              {/* Carimbo de borracha: bate com força e fica torto. */}
              <motion.g style={{ opacity: carimbo, scale: carimboEscala, rotate: -9, originX: 0.5, originY: 0.5 }}>
                <rect x="262" y="226" width="112" height="44" rx="5" fill="none" stroke="#bb2e17" strokeWidth="3" />
                <rect x="267" y="231" width="102" height="34" rx="3" fill="none" stroke="#bb2e17" strokeWidth="1.2" />
                <text x="318" y="255" textAnchor="middle" fill="#bb2e17" fontSize="17" fontWeight="700" letterSpacing="2" fontFamily="Instrument Sans, sans-serif">
                  {t('NO AR ✓', 'LIVE ✓')}
                </text>
              </motion.g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
