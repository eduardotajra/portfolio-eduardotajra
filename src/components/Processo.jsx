import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useIdioma } from '../i18n'

// Scrollytelling: a rolagem conta a história de um projeto. O rabisco se
// desenha sozinho, vira wireframe limpo (morphing), ganha cor e código
// (animação de linhas) e, no fim, aparece um site de verdade.

// Cada bloco é um polígono de 8 pontos: versão "rabisco" (tremida) e versão
// limpa, com o mesmo número de pontos para uma virar a outra.
const blocos = [
  { x: 30, y: 40, w: 340, h: 26, cor: '#1a1a2e' },
  { x: 30, y: 80, w: 200, h: 90, cor: 'rgba(129,140,248,0.18)' },
  { x: 245, y: 80, w: 125, h: 90, cor: 'rgba(34,211,238,0.16)' },
  { x: 30, y: 185, w: 105, h: 80, cor: '#151526' },
  { x: 147, y: 185, w: 105, h: 80, cor: '#151526' },
  { x: 264, y: 185, w: 105, h: 80, cor: '#151526' },
]

const tremido = (seed) => {
  const s = Math.sin(seed * 12.9898) * 43758.5453
  return (s - Math.floor(s) - 0.5) * 9
}

const contorno = ({ x, y, w, h }, i, rabisco) => {
  const p = [
    [x, y], [x + w / 2, y], [x + w, y], [x + w, y + h / 2],
    [x + w, y + h], [x + w / 2, y + h], [x, y + h], [x, y + h / 2],
  ]
  const d = p.map(([px, py], k) => {
    const dx = rabisco ? tremido(i * 31 + k * 7) : 0
    const dy = rabisco ? tremido(i * 17 + k * 13) : 0
    return `${(px + dx).toFixed(1)} ${(py + dy).toFixed(1)}`
  })
  return `M${d.join('L')}Z`
}

const etapas = [
  { pt: 'Conversa', en: 'Talk', textoPt: 'Você me conta a ideia, mesmo que ainda seja um rabisco.', textoEn: "You tell me the idea, even if it's just a scribble." },
  { pt: 'Protótipo', en: 'Prototype', textoPt: 'Organizo a estrutura e te mostro antes de construir.', textoEn: 'I lay out the structure and show you before building.' },
  { pt: 'Construção', en: 'Build', textoPt: 'Programo, testo e mando versões de teste no caminho.', textoEn: 'I code, test and send test builds along the way.' },
  { pt: 'No ar', en: 'Live', textoPt: 'Entrego funcionando, com uma rodada de ajustes inclusa.', textoEn: 'I ship it working, with one round of tweaks included.' },
]

function Bloco({ b, i, progresso }) {
  const d = useTransform(progresso, [0.3, 0.5], [contorno(b, i, true), contorno(b, i, false)])
  const traco = useTransform(progresso, [0.04 + i * 0.035, 0.2 + i * 0.035], [0, 1])
  const preenche = useTransform(progresso, [0.5 + i * 0.02, 0.62 + i * 0.02], [0, 1])
  const corTraco = useTransform(progresso, [0.3, 0.5], ['#e2e8f0', '#2a2a3e'])
  return (
    <>
      <motion.path d={d} fill={b.cor} style={{ fillOpacity: preenche }} stroke="none" />
      <motion.path
        d={d}
        fill="none"
        style={{ pathLength: traco, stroke: corTraco }}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
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

  const moldura = useTransform(scrollYProgress, [0, 0.06], [0, 1])
  const site = useTransform(scrollYProgress, [0.76, 0.9], [0, 1])
  const corte = useTransform(scrollYProgress, [0.76, 0.9], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
  const selo = useTransform(scrollYProgress, [0.88, 0.95], [0, 1])
  const linhaLateral = useTransform(scrollYProgress, [0, 1], [0, 1])

  const codigo = [
    [44, 98, 120, '#818cf8'], [44, 110, 150, '#94a3b8'], [56, 122, 90, '#22d3ee'],
    [56, 134, 130, '#94a3b8'], [44, 146, 70, '#c084fc'],
    [42, 200, 70, '#94a3b8'], [159, 200, 60, '#94a3b8'], [276, 200, 75, '#94a3b8'],
  ]

  return (
    <section id="processo" ref={ref} className="relative h-[280vh] border-t border-border lg:h-[340vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">{t('processo', 'process')}</p>
            <h2 className="mb-6 text-3xl font-bold text-text-primary sm:text-4xl">
              {t('Do rabisco ao ar', 'From scribble to live')}
            </h2>

            <div className="relative pl-6">
              <div className="absolute bottom-1 left-[5px] top-1 w-px bg-border" />
              <motion.div
                className="absolute left-[5px] top-1 w-px origin-top bg-gradient-to-b from-accent to-cyan"
                style={{ scaleY: linhaLateral, height: 'calc(100% - 8px)' }}
              />
              <ol className="space-y-4 sm:space-y-5">
                {etapas.map((e, i) => {
                  const ativo = i === atual
                  return (
                    <li key={e.pt} className="relative">
                      <span
                        className={`absolute -left-6 top-1.5 h-[11px] w-[11px] rounded-full border-2 transition-colors duration-300 ${
                          i <= atual ? 'border-accent bg-accent' : 'border-border-2 bg-bg'
                        }`}
                      />
                      <p
                        className={`font-mono text-xs uppercase tracking-wider transition-colors duration-300 ${
                          ativo ? 'text-accent' : 'text-muted'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')} · {en ? e.en : e.pt}
                      </p>
                      <motion.p
                        animate={{ opacity: ativo ? 1 : 0.35, x: ativo ? 0 : -4 }}
                        className={`mt-1 text-sm leading-relaxed sm:text-base ${ativo ? 'text-text-primary' : 'text-text-secondary'} ${
                          ativo ? '' : 'hidden sm:block'
                        }`}
                      >
                        {en ? e.textoEn : e.textoPt}
                      </motion.p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <svg viewBox="0 0 400 300" className="w-full drop-shadow-[0_20px_60px_rgba(129,140,248,0.15)]" aria-hidden="true">
              <defs>
                <clipPath id="proc-janela">
                  <rect x="12" y="30" width="376" height="258" rx="8" />
                </clipPath>
              </defs>
              <motion.rect
                x="10" y="10" width="380" height="280" rx="12"
                fill="#0f0f1a"
                stroke="#2a2a3e"
                strokeWidth="2"
                style={{ pathLength: moldura }}
              />
              <motion.g style={{ opacity: moldura }}>
                <circle cx="28" cy="22" r="3.5" fill="#ef4444" fillOpacity="0.7" />
                <circle cx="40" cy="22" r="3.5" fill="#eab308" fillOpacity="0.7" />
                <circle cx="52" cy="22" r="3.5" fill="#22c55e" fillOpacity="0.7" />
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

              <motion.g style={{ opacity: selo, scale: selo, originX: '330px', originY: '262px' }}>
                <rect x="286" y="250" width="92" height="26" rx="13" fill="rgba(8,8,16,0.75)" stroke="rgba(34,211,238,0.5)" />
                <circle cx="302" cy="263" r="4" fill="#22c55e" />
                <text x="312" y="267.5" fill="#e2e8f0" fontSize="12" fontFamily="JetBrains Mono, monospace">
                  {t('no ar', 'live')}
                </text>
              </motion.g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
