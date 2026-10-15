import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'
import BolhaLiquida from '../motion/BolhaLiquida'
import { LetrasVivas } from '../motion/Tipografia'
import MorphIcone from '../motion/Morph'
import { Sublinhado, SetaMao } from '../motion/Rabiscos'
import { BotaoMagnetico } from '../motion/Interacoes'

// Coisas que ele realmente entregou — nada genérico, e a impressão 3D
// aparece já na primeira dobra.
const construo = [
  'caça-palavras diários',
  'ARGs de investigação',
  'sites de estúdios de games',
  'extensões de navegador',
  'mods de Minecraft',
  'peças em impressão 3D',
]

const construoEn = [
  'daily word puzzles',
  'investigation ARGs',
  'game studio websites',
  'browser extensions',
  'Minecraft mods',
  '3D printed parts',
]

export default function Hero() {
  const { t, en } = useIdioma()
  const palavras = en ? construoEn : construo
  const [indice, setIndice] = useState(0)
  const [texto, setTexto] = useState('')
  const [digitando, setDigitando] = useState(true)

  useEffect(() => {
    const alvo = palavras[indice]

    if (digitando) {
      if (texto.length < alvo.length) {
        const t = setTimeout(() => setTexto(alvo.slice(0, texto.length + 1)), 55)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setDigitando(false), 1800)
      return () => clearTimeout(t)
    }

    if (texto.length > 0) {
      const t = setTimeout(() => setTexto(texto.slice(0, -1)), 28)
      return () => clearTimeout(t)
    }

    // Também agendado: trocar a palavra sem setState síncrono no efeito.
    const t = setTimeout(() => {
      setIndice((v) => (v + 1) % palavras.length)
      setDigitando(true)
    }, 320)
    return () => clearTimeout(t)
  }, [texto, digitando, indice, palavras])

  const surge = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center grid-bg overflow-hidden px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(129,140,248,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Movimento ambiente: orbes de luz que flutuam devagar. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          style={{ animation: 'orbe-flutua 18s ease-in-out infinite' }}
        />
        <div
          className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-cyan/10 blur-3xl"
          style={{ animation: 'orbe-flutua 22s ease-in-out infinite reverse' }}
        />
      </div>

      {/* Renderização em tempo real: metal líquido calculado na GPU. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(115vw,820px)] -translate-x-1/2 -translate-y-[54%]"
      >
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.3 }}
        >
          <BolhaLiquida className="h-full w-full opacity-[0.38] mix-blend-screen" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          {...surge(0.05)}
          className="vidro vidro-brilho inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-8"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
            {t('aceitando novos projetos', 'open for new projects')}
          </span>
        </motion.div>

        <h1
          aria-label="Eduardo Tajra"
          className="text-[clamp(2.25rem,11vw,4.5rem)] font-extrabold tracking-tight text-text-primary leading-none mb-5"
        >
          <LetrasVivas texto="Eduardo" atraso={0.15} />{' '}
          <LetrasVivas texto="Tajra" gradiente atraso={0.5} />
        </h1>

        <motion.p
          {...surge(0.3)}
          className="font-mono text-base sm:text-xl text-text-secondary min-h-[3.5rem] sm:min-h-[2rem] flex items-center justify-center flex-wrap gap-x-2"
        >
          <MorphIcone indice={indice} className="h-6 w-6 shrink-0" />
          <span>{t('eu construo', 'I build')}</span>
          <span className="text-accent">
            {texto}
            <span className="animate-blink">|</span>
          </span>
        </motion.p>

        <motion.p
          {...surge(0.4)}
          className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-lg mx-auto mt-4 mb-9"
        >
          {t('Projetos web sob medida e impressão 3D sob encomenda.', 'Custom web projects and made-to-order 3D printing.')}
          <br className="hidden sm:block" />{' '}
          {en ? (
            <>
              The <Sublinhado atraso={1.4}>stranger</Sublinhado> the idea, the better.
            </>
          ) : (
            <>
              Quanto mais <Sublinhado atraso={1.4}>incomum</Sublinhado> a ideia, melhor.
            </>
          )}
        </motion.p>

        <motion.div {...surge(0.5)} className="relative flex flex-col sm:flex-row gap-3 justify-center mb-10">
          {/* Rabisco à mão apontando o primeiro botão (só onde cabe). */}
          <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-12 hidden w-40 lg:block">
            <span className="font-mao block -rotate-6 text-2xl text-amber-300/90">
              {t('começa por aqui', 'start here')}
            </span>
            <SetaMao className="ml-12 h-12 w-16" cor="rgba(252,211,77,0.9)" atraso={1.8} />
          </div>
          <BotaoMagnetico
            href={contato.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-accent text-bg font-semibold text-sm glow-accent"
          >
            {t('Tenho uma ideia', 'I have an idea')}
          </BotaoMagnetico>
          <BotaoMagnetico
            href={contato.discord}
            target="_blank"
            rel="noopener noreferrer"
            corGota="rgba(34,211,238,0.18)"
            className="px-6 py-3 rounded-lg border border-cyan/40 text-cyan font-semibold text-sm"
          >
            {t('Quero imprimir uma peça', 'I want something printed')}
          </BotaoMagnetico>
        </motion.div>

        <motion.div
          {...surge(0.6)}
          className="flex items-center justify-center gap-5 text-text-secondary"
        >
          <a href="#projects" className="text-sm hover:text-text-primary transition-colors">
            {t('Ver projetos', 'See projects')}
          </a>
          <span className="h-3 w-px bg-border-2" />
          <a
            href={contato.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-accent hover:-translate-y-0.5 transition-all duration-200"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={contato.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-accent hover:-translate-y-0.5 transition-all duration-200"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${contato.email}`}
            aria-label="Email"
            className="text-muted hover:text-accent hover:-translate-y-0.5 transition-all duration-200"
          >
            <Mail size={18} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#servicos" aria-label={t('Ver serviços', 'See services')} className="text-muted hover:text-accent transition-colors">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
