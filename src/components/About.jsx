import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useIdioma } from '../i18n'

const nomesCategoria = { Frontend: 'Frontend', Backend: 'Backend', Ferramentas: 'Tools' }

const skills = {
  Frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Zustand', 'Vite'],
  Backend: ['Node.js', 'Fastify', 'PostgreSQL', 'Drizzle ORM', 'Supabase', 'Firebase', 'Python', 'Django'],
  Ferramentas: ['Git', 'GitHub', 'Docker', 'Vercel', 'Cloudflare Workers', 'Figma', 'Sanity CMS'],
}

export default function About() {
  const { t, en } = useIdioma()
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
          {t('sobre mim', 'about me')}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              {t('Olá, sou o Eduardo', "Hi, I'm Eduardo")}
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                {t(
                  'Desenvolvedor full stack com foco em front end e pós-graduação em desenvolvimento fullstack pela Rocketseat. Construo desde extensões de navegador até plataformas gamificadas, o que importa é entregar experiências que as pessoas realmente querem usar.',
                  'Full stack developer focused on front end, with a postgraduate degree in full stack development from Rocketseat. I build anything from browser extensions to gamified platforms; what matters is delivering experiences people actually want to use.'
                )}
              </p>
              <p>
                {t(
                  'Meu TCC virou uma extensão real usada por pesquisadores do CNPq. Um projeto pessoal virou um estúdio de jogos. Gosto de levar ideias até o fim.',
                  'My final thesis became a real extension used by researchers funded by CNPq. A personal project became a game studio. I like taking ideas all the way.'
                )}
              </p>
              <p>
                {t(
                  'Hoje trabalho com projetos sob encomenda, de sites e jogos a peças impressas em 3D, e sigo',
                  'Today I work on commissioned projects, from websites and games to 3D printed parts, and I am still'
                )}{' '}
                <span className="text-accent">{t('disponível para novos trabalhos', 'available for new work')}</span>.
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
                  {en ? nomesCategoria[category] : category}
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
