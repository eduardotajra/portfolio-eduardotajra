import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'
import { useIdioma } from '../i18n'

export default function Projects() {
  const { t } = useIdioma()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const destaques = projects.filter((p) => p.featured)
  const restantes = projects.length - destaques.length

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">
            {t('projetos', 'projects')}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
            {t('Ideias que viraram coisas de verdade', 'Ideas that became real things')}
          </h2>
          <p className="max-w-xl text-text-secondary">
            {t(
              'Jogos, experiências interativas, sites e ferramentas. Alguns foram encomendados, outros nasceram de uma ideia estranha que eu quis ver de pé.',
              'Games, interactive experiences, websites and tools. Some were commissioned, others came from a strange idea I wanted to see standing.'
            )}
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/projetos"
            className="group inline-flex items-center gap-2 rounded-lg border border-border-2 px-6 py-3 text-sm font-semibold text-text-secondary transition-all duration-200 hover:border-accent hover:text-accent"
          >
            {t('Ver todos os projetos', 'See all projects')}
            <span className="font-mono text-xs text-muted">+{restantes}</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
