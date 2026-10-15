import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'
import { IconeCodigo, IconeCamadas } from '../motion/IconesAnimados'
import { seguirMouse } from '../motion/mouse'
import { Titulo } from '../motion/Tipografia'

const frentes = [
  {
    icone: IconeCodigo,
    titulo: 'Desenvolvimento web',
    titulo_en: 'Web development',
    resumo:
      'Sites, jogos e experiências feitos do zero, do jeito que a ideia pede. Se não existe pronto, eu construo.',
    resumo_en:
      'Websites, games and experiences built from scratch, the way the idea asks for. If it does not exist yet, I build it.',
    exemplos_en: [
      'games and quizzes',
      'business websites',
      'ARGs and puzzles',
      'portfolios and personal pages',
      'browser extensions',
      'Minecraft mods and plugins',
    ],
    exemplos: [
      'jogos e quizzes',
      'sites institucionais',
      'ARGs e enigmas',
      'portfólios e páginas pessoais',
      'extensões de navegador',
      'mods e plugins de Minecraft',
    ],
    cta: 'Tenho uma ideia',
    cta_en: 'I have an idea',
    href: contato.discord,
    cor: 'accent',
  },
  {
    icone: IconeCamadas,
    titulo: 'Impressão 3D',
    titulo_en: '3D printing',
    resumo:
      'Bambu Lab P1S. Imprimo o arquivo que você mandar ou modelo a peça do zero no Fusion.',
    resumo_en: 'Bambu Lab P1S. I print the file you send or model the part from scratch in Fusion.',
    exemplos_en: [
      'made-to-order parts',
      'my own modeling',
      'prototyping',
      'functional parts',
      'keychains and gifts',
      'personalized objects',
    ],
    exemplos: [
      'peças sob encomenda',
      'modelagem própria',
      'prototipagem',
      'peças funcionais',
      'chaveiros e brindes',
      'objetos personalizados',
    ],
    cta: 'Quero imprimir uma peça',
    cta_en: 'I want something printed',
    href: contato.discord,
    cor: 'cyan',
  },
]

function Frente({ frente, index }) {
  const { tr } = useIdioma()
  const [ativo, setAtivo] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icone = frente.icone
  const ehAccent = frente.cor === 'accent'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={seguirMouse}
      onPointerEnter={() => setAtivo(true)}
      onPointerLeave={() => setAtivo(false)}
      className={`holofote group relative flex flex-col overflow-hidden rounded-xl border bg-surface p-7 transition-colors duration-300 [&>*]:relative [&>*]:z-[1] ${
        ehAccent
          ? 'border-accent/25 hover:border-accent/60'
          : 'border-cyan/25 hover:border-cyan/60'
      }`}
    >
      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-lg border ${
          ehAccent
            ? 'border-accent/25 bg-accent/10 text-accent'
            : 'border-cyan/25 bg-cyan/10 text-cyan'
        }`}
      >
        <Icone ativo={ativo} />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-text-primary">{tr(frente, 'titulo')}</h3>
      <p className="mb-6 text-sm leading-relaxed text-text-secondary">{tr(frente, 'resumo')}</p>

      <ul className="mb-7 flex flex-wrap gap-2">
        {tr(frente, 'exemplos').map((ex) => (
          <li
            key={ex}
            className="rounded border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-text-secondary"
          >
            {ex}
          </li>
        ))}
      </ul>

      <a
        href={frente.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto inline-flex items-center gap-2 self-start rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
          ehAccent
            ? 'bg-accent text-bg hover:bg-accent/90'
            : 'border border-cyan/40 text-cyan hover:bg-cyan/10 hover:border-cyan'
        }`}
      >
        {tr(frente, 'cta')}
        <ArrowRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </a>
    </motion.div>
  )
}

export default function Servicos() {
  const { t } = useIdioma()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="servicos" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">
            {t('o que eu faço', 'what I do')}
          </p>
          <Titulo className="text-3xl sm:text-4xl font-bold text-text-primary">
            {t('Duas frentes, o mesmo jeito de trabalhar', 'Two fronts, one way of working')}
          </Titulo>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {frentes.map((frente, i) => (
            <Frente key={frente.titulo} frente={frente} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
