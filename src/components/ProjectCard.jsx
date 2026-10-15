import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Lock } from 'lucide-react'
import { GithubIcon } from './icons'
import { useIdioma } from '../i18n'
import { Inclina, ImagemEsqueleto } from '../motion/Interacoes'

const estiloCategoria = {
  clientes: 'text-accent border-accent/30 bg-accent/10',
  autorais: 'text-cyan border-cyan/30 bg-cyan/10',
  academicos: 'text-text-secondary border-border-2 bg-surface-2',
}

const rotuloCategoria = {
  clientes: 'cliente',
  autorais: 'autoral',
  academicos: 'acadêmico',
}

const rotuloCategoriaEn = {
  clientes: 'client',
  autorais: 'personal',
  academicos: 'academic',
}

const gradientes = [
  'from-violet-900/40 to-indigo-900/40',
  'from-slate-800/60 to-zinc-900/60',
  'from-cyan-900/40 to-teal-900/40',
  'from-emerald-900/40 to-green-900/40',
  'from-rose-900/40 to-pink-900/40',
]

export default function ProjectCard({ project, index = 0 }) {
  const { t, tr, en } = useIdioma()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const temCodigo = Boolean(project.links.github) && !project.repoPrivate

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Inclina className="group borda-viva flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[border-color,box-shadow] duration-300 hover:border-border-2 glow-accent-hover">
      {/* Prévia */}
      <div className="relative overflow-hidden bg-surface-2" style={{ height: '180px' }}>
        <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 border-b border-border bg-[#0d0d18] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          {project.links.demo && (
            <span className="ml-2 truncate font-mono text-[10px] text-muted">
              {project.links.demo.replace('https://', '').replace(/\/$/, '')}
            </span>
          )}
        </div>

        {project.screenshot ? (
          <ImagemEsqueleto
            src={project.screenshot}
            alt={t(`Prévia de ${project.title}`, `Preview of ${project.title}`)}
            loading="lazy"
            classeCaixa="pt-7"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br pt-7 ${
              gradientes[index % gradientes.length]
            }`}
          >
            <span className="select-none font-mono text-5xl font-bold text-white/10">
              {project.title[0]}
            </span>
          </div>
        )}

        <span
          className={`absolute bottom-2 right-2 z-20 rounded border px-1.5 py-0.5 font-mono text-[10px] backdrop-blur-sm ${
            estiloCategoria[project.category]
          }`}
        >
          {(en ? rotuloCategoriaEn : rotuloCategoria)[project.category]}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-base font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">
          {project.title}
        </h3>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-text-secondary">
          {tr(project, 'description')}
        </p>

        {/* Stack em segundo plano: importa para quem procura, não atrapalha quem não procura */}
        <p className="mb-4 font-mono text-[11px] leading-relaxed text-muted">
          {project.tags.join(' · ')}
        </p>

        <div className="mt-auto flex items-center gap-4 border-t border-border pt-3">
          {temCodigo && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-secondary transition-colors hover:text-text-primary"
            >
              <GithubIcon size={13} />
              {t('Código', 'Code')}
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1.5 text-xs text-text-secondary transition-colors hover:text-accent"
            >
              <ExternalLink size={13} />
              {t('Ver ao vivo', 'Live demo')}
            </a>
          )}
          {!temCodigo && !project.links.demo && (
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
              <Lock size={11} />
              {project.confidencial ? t('projeto privado do cliente', 'private client project') : t('código fechado', 'closed source')}
            </span>
          )}
        </div>
      </div>
      </Inclina>
    </motion.article>
  )
}
