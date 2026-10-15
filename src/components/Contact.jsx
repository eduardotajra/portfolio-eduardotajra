import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Mail, Download, Code2, Box, Check } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'
import { Titulo } from '../motion/Tipografia'
import { BotaoMagnetico } from '../motion/Interacoes'
import Mascote from '../motion/Mascote'

// Discord é o canal comercial: fica em destaque e abre direto o meu perfil.
const orcamentos = [
  {
    icone: Code2,
    titulo: 'Quero criar um projeto',
    titulo_en: 'I want to build a project',
    href: contato.discord,
    cor: 'accent',
  },
  {
    icone: Box,
    titulo: 'Quero imprimir uma peça',
    titulo_en: 'I want something printed',
    href: contato.discord,
    cor: 'cyan',
  },
]

// Canais profissionais: continuam à mão, sem disputar a atenção com o orçamento.
const profissionais = [
  { Icone: GithubIcon, rotulo: 'GitHub', href: contato.github },
  { Icone: LinkedinIcon, rotulo: 'LinkedIn', href: contato.linkedin },
  { Icone: Download, rotulo: 'Currículo', rotulo_en: 'Résumé (PT)', href: '/cv.pdf', baixar: true },
]

// Microinteração: o e-mail é copiado com um clique e o ícone vira um "certo".
function CopiaEmail() {
  const { t } = useIdioma()
  const [copiado, setCopiado] = useState(false)
  const copia = async () => {
    try {
      await navigator.clipboard.writeText(contato.email)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 1800)
    } catch {
      window.location.href = `mailto:${contato.email}`
    }
  }
  return (
    <button
      type="button"
      onClick={copia}
      className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
    >
      <span className="relative h-[15px] w-[15px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={copiado ? 'ok' : 'mail'}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            className="absolute inset-0"
          >
            {copiado ? <Check size={15} className="text-emerald-400" /> : <Mail size={15} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copiado ? t('E-mail copiado!', 'Email copied!') : t('Copiar e-mail', 'Copy email')}</span>
    </button>
  )
}

export default function Contact() {
  const { t, tr } = useIdioma()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [animado, setAnimado] = useState(false)

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center pt-8">
            <Mascote feliz={animado} />
          </div>
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">
            {t('contato', 'contact')}
          </p>
          <Titulo className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
            {t('Me conta sua ideia', 'Tell me your idea')}
          </Titulo>
          <p className="mb-10 leading-relaxed text-text-secondary">
            {t('Você me diz o que precisa e eu retorno com prazo e preço, sem compromisso.', 'Tell me what you need and I will get back with a deadline and a price, no strings attached.')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-col justify-center gap-3 sm:flex-row"
          onPointerEnter={() => setAnimado(true)}
          onPointerLeave={() => setAnimado(false)}
        >
          {orcamentos.map((item) => {
            const { icone: Icone, href, cor } = item
            const ehAccent = cor === 'accent'
            return (
              <BotaoMagnetico
                key={item.titulo}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                corGota={ehAccent ? 'rgba(255,255,255,0.22)' : 'rgba(34,211,238,0.18)'}
                className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold ${
                  ehAccent ? 'bg-accent text-bg glow-accent' : 'border border-cyan/40 text-cyan'
                }`}
              >
                <Icone size={16} />
                {tr(item, 'titulo')}
              </BotaoMagnetico>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <CopiaEmail />
          {profissionais.map((item) => {
            const { Icone, href, baixar } = item
            return (
              <a
                key={item.rotulo}
                href={href}
                download={baixar || undefined}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
              >
                <Icone size={15} />
                {tr(item, 'rotulo')}
              </a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
