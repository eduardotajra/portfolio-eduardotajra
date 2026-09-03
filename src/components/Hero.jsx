import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { contato } from '../data/contato'

// Coisas que ele realmente entregou — nada genérico, e a impressão 3D
// aparece já na primeira dobra.
const construo = [
  'caça-palavras diários',
  'ARGs de investigação',
  'sites de estúdios de games',
  'extensões de navegador',
  'plugins de Minecraft',
  'peças em impressão 3D',
]

export default function Hero() {
  const [indice, setIndice] = useState(0)
  const [texto, setTexto] = useState('')
  const [digitando, setDigitando] = useState(true)

  useEffect(() => {
    const alvo = construo[indice]

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
      setIndice((v) => (v + 1) % construo.length)
      setDigitando(true)
    }, 320)
    return () => clearTimeout(t)
  }, [texto, digitando, indice])

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

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          {...surge(0.05)}
          className="inline-flex items-center gap-2 rounded-full border border-border-2 bg-surface/60 px-3 py-1.5 mb-8"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
            aceitando novos projetos
          </span>
        </motion.div>

        <motion.h1
          {...surge(0.15)}
          className="text-[clamp(2.25rem,11vw,4.5rem)] font-extrabold tracking-tight text-text-primary leading-none mb-5"
        >
          Eduardo <span className="text-gradient">Tajra</span>
        </motion.h1>

        <motion.p
          {...surge(0.3)}
          className="font-mono text-base sm:text-xl text-text-secondary min-h-[3.5rem] sm:min-h-[2rem] flex items-center justify-center flex-wrap gap-x-2"
        >
          <span>eu construo</span>
          <span className="text-accent">
            {texto}
            <span className="animate-blink">|</span>
          </span>
        </motion.p>

        <motion.p
          {...surge(0.4)}
          className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-lg mx-auto mt-4 mb-9"
        >
          Projetos web sob medida e impressão 3D sob encomenda.
          <br className="hidden sm:block" /> Quanto mais incomum a ideia, melhor.
        </motion.p>

        <motion.div {...surge(0.5)} className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a
            href={contato.whatsappDev}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-accent/90 transition-all duration-200 glow-accent"
          >
            Tenho uma ideia
          </a>
          <a
            href={contato.whatsapp3d}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-cyan/40 text-cyan font-semibold text-sm hover:border-cyan hover:bg-cyan/5 transition-all duration-200"
          >
            Quero imprimir uma peça
          </a>
        </motion.div>

        <motion.div
          {...surge(0.6)}
          className="flex items-center justify-center gap-5 text-text-secondary"
        >
          <a href="#projects" className="text-sm hover:text-text-primary transition-colors">
            Ver projetos
          </a>
          <span className="h-3 w-px bg-border-2" />
          <a
            href={contato.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-accent transition-colors duration-200"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={contato.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-accent transition-colors duration-200"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${contato.email}`}
            aria-label="Email"
            className="text-muted hover:text-accent transition-colors duration-200"
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
        <a href="#servicos" aria-label="Ver serviços" className="text-muted hover:text-accent transition-colors">
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
