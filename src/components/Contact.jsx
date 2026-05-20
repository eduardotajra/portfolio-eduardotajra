import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'eduardotajra2@hotmail.com',
    href: 'mailto:eduardotajra2@hotmail.com',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/eduardotajra',
    href: 'https://github.com/eduardotajra',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/eduardo-tajra',
    href: 'https://www.linkedin.com/in/eduardo-tajra/',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-sm text-accent mb-3 tracking-widest uppercase">
            04. contato
          </p>
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Vamos conversar?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-12">
            Estou aberto a novas oportunidades, projetos freelance ou apenas uma troca de ideia.
            Pode mandar mensagem, respondo sempre.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col gap-3 mb-12"
        >
          {links.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-surface border border-border rounded-xl px-6 py-4 hover:border-border-2 hover:bg-surface-2 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Icon size={16} className="text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted font-mono uppercase tracking-wider">{label}</p>
                  <p className="text-sm text-text-primary font-medium">{value}</p>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              />
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-mono text-xs text-muted"
        >
          Feito com React + Vite · {new Date().getFullYear()}
        </motion.p>
      </div>
    </section>
  )
}
