import { motion } from 'framer-motion'
import { ArrowUpRight, Lock } from 'lucide-react'
import { GithubIcon } from './icons'
import { useIdioma } from '../i18n'
import { ImagemEsqueleto } from '../motion/Interacoes'
import RaioX from '../motion/RaioX'

const rotulo = { clientes: ['cliente', 'client'], autorais: ['autoral', 'personal'], academicos: ['acadêmico', 'academic'] }

// Cada ficha fica um tiquinho torta, como papel solto na mesa.
const inclinacoes = [-1.2, 0.8, -0.4, 1.1, -0.9, 0.5]

// Ficha de arquivo: captura presa com fita, carimbo da categoria e anotações.
// No hover a ficha se endireita e a captura vira planta (o mesmo raio-X da home).
export default function ProjectCard({ project, index = 0 }) {
  const { t, tr, en } = useIdioma()
  const temCodigo = Boolean(project.links.github) && !project.repoPrivate
  const escuro = (() => {
    const n = parseInt((project.cor || '#e5e3da').slice(1), 16)
    return 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) < 140
  })()
  const giro = inclinacoes[index % inclinacoes.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: giro }}
      whileHover={{ rotate: 0, y: -6 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 150, damping: 18, delay: (index % 3) * 0.06 }}
      className="sombra-papel group relative flex h-full flex-col bg-[#fbfbf7] p-3"
    >
      <span className="fita -top-3 left-6 z-10 -rotate-[4deg]" />

      <div className="relative overflow-hidden border border-tinta/10">
        {project.confidencial ? (
          <RaioX privado alt={project.title} />
        ) : !project.screenshot ? (
          // Projeto sem captura: capa tipográfica na cor do projeto.
          <div
            className={`relative flex aspect-[16/10] items-end overflow-hidden p-5 ${escuro ? 'text-papel' : 'text-tinta'}`}
            style={{ backgroundColor: project.cor || '#e5e3da' }}
          >
            <span aria-hidden="true" className="titulo absolute -right-3 -top-10 text-[11rem] italic leading-none opacity-15">
              {project.title[0]}
            </span>
            <span className="titulo relative text-4xl italic">{project.title}</span>
          </div>
        ) : (
          <div className="relative aspect-[16/10] bg-surface-2">
            <ImagemEsqueleto
              src={project.screenshot}
              alt={t(`Prévia de ${project.title}`, `Preview of ${project.title}`)}
              loading="lazy"
              classeCaixa="absolute inset-0"
              className="h-full w-full object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="milimetrado absolute inset-0 bg-[#e9eefb] transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
            >
              <img
                src={project.screenshot}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top opacity-80 mix-blend-multiply"
                style={{ filter: 'grayscale(1) invert(1) contrast(1.4) brightness(1.1) sepia(1) hue-rotate(180deg) saturate(2.4)' }}
              />
            </div>
          </div>
        )}
        <span className="absolute right-2 top-2 rotate-[5deg] border-2 border-accent bg-papel/85 px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          {rotulo[project.category]?.[en ? 1 : 0]}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="titulo text-[2rem] text-tinta">{project.title}</h3>
        </div>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-text-secondary">{tr(project, 'description')}</p>
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">{project.tags.join(' · ')}</p>

        <div className="mt-4 flex items-center gap-4 border-t border-dashed border-tinta/20 pt-3 text-sm">
          {temCodigo && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-text-secondary transition-colors hover:text-tinta"
            >
              <GithubIcon size={14} />
              {t('Código', 'Code')}
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link ml-auto flex items-center gap-1 font-medium text-tinta transition-colors hover:text-accent"
            >
              {t('Ver ao vivo', 'Live')}
              <ArrowUpRight size={16} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
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
    </motion.article>
  )
}
