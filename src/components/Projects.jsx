import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './icons'
import { projects } from '../data/projects'

const gradients = [
  'from-violet-900/40 to-indigo-900/40',
  'from-slate-800/60 to-zinc-900/60',
  'from-amber-900/40 to-yellow-900/30',
  'from-cyan-900/40 to-teal-900/40',
  'from-emerald-900/40 to-green-900/40',
  'from-rose-900/40 to-pink-900/40',
  'from-orange-900/40 to-red-900/40',
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-surface border border-border rounded-xl overflow-hidden hover:border-border-2 transition-all duration-300 glow-accent-hover"
    >
      {/* Preview */}
      <div className="relative overflow-hidden bg-surface-2" style={{ height: '180px' }}>
        {/* Browser chrome */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 px-3 py-2 bg-[#0d0d18] border-b border-border">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          {project.links.demo && (
            <span className="ml-2 font-mono text-[10px] text-muted truncate max-w-[200px]">
              {project.links.demo.replace('https://', '')}
            </span>
          )}
        </div>

        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={`Preview de ${project.title}`}
            className="w-full h-full object-cover object-top pt-7 group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full pt-7 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}>
            <span className="font-mono text-5xl font-bold text-white/10 select-none">
              {project.title[0]}
            </span>
          </div>
        )}

        {project.featured && (
          <span className="absolute bottom-2 right-2 z-10 font-mono text-[10px] text-accent border border-accent/30 rounded px-1.5 py-0.5 bg-bg/80 backdrop-blur-sm">
            destaque
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-text-primary font-semibold text-base mb-2 group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] text-accent/70 bg-accent/5 border border-accent/10 rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-3 border-t border-border">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              <GithubIcon size={13} />
              Código
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent transition-colors ml-auto"
            >
              <ExternalLink size={13} />
              Demo ao vivo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })

  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-accent mb-3 tracking-widest uppercase">
            01. projetos
          </p>
          <h2 className="text-4xl font-bold text-text-primary">
            O que já construí
          </h2>
        </motion.div>

        {/* Featured — 3 cols */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Others — 4 cols */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={featured.length + i} />
          ))}
        </div>
      </div>
    </section>
  )
}
