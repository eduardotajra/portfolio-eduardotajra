import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

const roles = ['Front End Developer', 'Full Stack Developer', 'UI Engineer']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = roles[roleIndex]
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        return () => clearTimeout(t)
      } else {
        setRoleIndex((i) => (i + 1) % roles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIndex])

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center grid-bg overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(129,140,248,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p
          {...fadeUp(0.1)}
          className="font-mono text-sm text-accent mb-6 tracking-widest uppercase"
        >
          Olá, eu sou
        </motion.p>

        <motion.h1
          {...fadeUp(0.2)}
          className="text-6xl sm:text-7xl font-extrabold tracking-tight text-text-primary leading-none mb-4"
        >
          Eduardo{' '}
          <span className="text-gradient">Tajra</span>
        </motion.h1>

        <motion.div {...fadeUp(0.35)} className="h-12 flex items-center justify-center mb-8">
          <span className="font-mono text-xl sm:text-2xl text-text-secondary">
            {displayed}
            <span className="text-accent animate-blink">|</span>
          </span>
        </motion.div>

        <motion.p
          {...fadeUp(0.45)}
          className="text-text-secondary text-lg leading-relaxed max-w-xl mx-auto mb-10"
        >
          Crio interfaces que as pessoas adoram usar, com atenção a detalhes, performance e código limpo.
        </motion.p>

        <motion.div {...fadeUp(0.55)} className="flex flex-wrap gap-4 justify-center mb-16">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-accent/90 transition-all duration-200 glow-accent"
          >
            Ver projetos
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-border-2 text-text-secondary font-semibold text-sm hover:border-accent hover:text-text-primary transition-all duration-200"
          >
            Entre em contato
          </a>
        </motion.div>

        <motion.div {...fadeUp(0.65)} className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/eduardotajra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-accent transition-colors duration-200"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/eduardo-tajra/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-accent transition-colors duration-200"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="mailto:eduardotajra2@hotmail.com"
            aria-label="Email"
            className="text-muted hover:text-accent transition-colors duration-200"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#projects" className="text-muted hover:text-accent transition-colors">
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
