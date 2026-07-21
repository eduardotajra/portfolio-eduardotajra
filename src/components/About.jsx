import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = {
  Frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Zustand', 'Vite'],
  Backend: ['Node.js', 'Fastify', 'PostgreSQL', 'Drizzle ORM', 'Supabase', 'Firebase', 'Python', 'Django'],
  Ferramentas: ['Git', 'GitHub', 'Docker', 'Vercel', 'Cloudflare Workers', 'Figma', 'Sanity CMS'],
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-32 px-6 bg-surface/30">
      <div className="max-w-5xl mx-auto">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-accent mb-3 tracking-widest uppercase"
        >
          02. sobre mim
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Olá, sou o Eduardo
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Desenvolvedor full stack com foco em front end e pós-graduação em
                desenvolvimento fullstack pela Rocketseat. Construo desde extensões de
                navegador até plataformas gamificadas, o que importa é entregar
                experiências que as pessoas realmente querem usar.
              </p>
              <p>
                Meu TCC virou uma extensão real usada por pesquisadores do CNPq. Um projeto
                pessoal virou um estúdio de jogos. Gosto de levar ideias até o fim.
              </p>
              <p>
                Atualmente aberto a oportunidades{' '}
                <span className="text-accent">full time ou freelance</span>.
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p className="font-mono text-xs text-muted uppercase tracking-wider mb-3">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs text-text-secondary bg-surface border border-border rounded px-3 py-1.5 hover:border-accent/40 hover:text-accent transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
