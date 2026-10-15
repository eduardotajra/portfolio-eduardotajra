import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Download, Code2, Box } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { contato } from '../data/contato'

// Discord é o canal comercial: fica em destaque e abre direto o meu perfil.
const orcamentos = [
  {
    icone: Code2,
    titulo: 'Quero criar um projeto',
    href: contato.discord,
    cor: 'accent',
  },
  {
    icone: Box,
    titulo: 'Quero imprimir uma peça',
    href: contato.discord,
    cor: 'cyan',
  },
]

// Canais profissionais: continuam à mão, sem disputar a atenção com o orçamento.
const profissionais = [
  { Icone: Mail, rotulo: 'E-mail', href: `mailto:${contato.email}` },
  { Icone: GithubIcon, rotulo: 'GitHub', href: contato.github },
  { Icone: LinkedinIcon, rotulo: 'LinkedIn', href: contato.linkedin },
  { Icone: Download, rotulo: 'Currículo', href: '/cv.pdf', baixar: true },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">
            contato
          </p>
          <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
            Me conta sua ideia
          </h2>
          <p className="mb-10 leading-relaxed text-text-secondary">
            Você me diz o que precisa e eu retorno com prazo e preço, sem compromisso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-col justify-center gap-3 sm:flex-row"
        >
          {orcamentos.map(({ icone: Icone, titulo, href, cor }) => {
            const ehAccent = cor === 'accent'
            return (
              <a
                key={titulo}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  ehAccent
                    ? 'bg-accent text-bg hover:bg-accent/90 glow-accent'
                    : 'border border-cyan/40 text-cyan hover:border-cyan hover:bg-cyan/10'
                }`}
              >
                <Icone size={16} />
                {titulo}
              </a>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {profissionais.map(({ Icone, rotulo, href, baixar }) => (
            <a
              key={rotulo}
              href={href}
              download={baixar || undefined}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
            >
              <Icone size={15} />
              {rotulo}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
