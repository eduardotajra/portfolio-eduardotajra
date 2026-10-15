import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Download } from 'lucide-react'
import { useIdioma } from '../i18n'

const items = [
  {
    type: 'edu',
    title: 'Pós Graduação Full-Stack com IA',
    title_en: 'Postgraduate in Full Stack with AI',
    org: 'Rocketseat',
    period: '2026–2027',
    description:
      'Especialização com foco em Node.js, React, TypeScript, arquitetura de APIs REST e práticas de desenvolvimento profissional.',
    description_en:
      'Specialization focused on Node.js, React, TypeScript, REST API architecture and professional development practices.',
    tags: ['Node.js', 'React', 'TypeScript', 'PostgreSQL'],
  },
  {
    type: 'work',
    title: 'Software Developer',
    org: 'BANCO DO NORDESTE DO BRASIL',
    period: '2024',
    description: 'Desenvolvimento e manutenção de um aplicativo para o Gabinete da Presidência utilizando React(TypeScript) e C#. Participação em rituais ágeis, como Scrum e Kanban',
    description_en: "Built and maintained an app for the President's Office using React (TypeScript) and C#. Took part in agile rituals such as Scrum and Kanban.",
    tags: ['React', 'TypeScript', 'C#', 'Scrum', 'Kanban'],
  },
  {
    type: 'edu',
    title: 'Full-Stack Development Course',
    org: 'Infinity School',
    period: '2023–2024',
    description:
      'Curso presencial com metodologia americana cobrindo desenvolvimento web completo, do zero ao mercado de trabalho.',
    description_en:
      'In-person course with an American methodology covering full web development, from zero to job-ready.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
  },
  {
    type: 'edu',
    title: 'Bacharel em Ciência da Computação',
    title_en: "Bachelor's in Computer Science",
    org: 'UNIFOR',
    period: '2021–2025',
    description:
      'TCC: qlattes,extensão para classificação automática de artigos do Lattes/CNPq segundo o Qualis CAPES.',
    description_en:
      'Thesis: qlattes, an extension that automatically ranks Lattes/CNPq papers by the CAPES Qualis rating.',
    tags: ['JavaScript', 'Extensões de Navegador', 'Pesquisa Acadêmica'],
    tags_en: ['JavaScript', 'Browser Extensions', 'Academic Research'],
  },
]

function TimelineItem({ item, index }) {
  const { tr, t } = useIdioma()
  const isEdu = item.type === 'edu'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid gap-x-10 gap-y-2 border-b border-tinta/15 py-8 pl-8 sm:grid-cols-[9rem_1fr]"
    >
      <span aria-hidden="true" className={`absolute left-[3px] top-10 h-[11px] w-[11px] rounded-full border-2 ${isEdu ? 'border-tinta bg-bg' : 'border-accent bg-accent'}`} />
      <div>
        <p className="font-mono text-sm text-tinta">{item.period}</p>
        <p className="font-mao text-xl text-muted">{isEdu ? t('estudo', 'study') : t('trabalho', 'work')}</p>
      </div>
      <div>
        <h3 className="titulo-serifa text-3xl text-tinta sm:text-4xl">{tr(item, 'title')}</h3>
        <p className="mt-1 text-sm font-medium uppercase tracking-wide text-accent">{item.org}</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-text-secondary">{tr(item, 'description')}</p>
        <p className="mt-3 text-sm text-muted">{tr(item, 'tags').join(' · ')}</p>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { t } = useIdioma()
  const linhaRef = useRef(null)
  // A linha da trajetória se desenha a tinta conforme a página rola.
  const { scrollYProgress } = useScroll({ target: linhaRef, offset: ['start 75%', 'end 55%'] })
  const linha = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section id="experience" className="px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-tinta pb-4">
          <div>
            <p className="font-mao text-2xl text-accent">{t('de onde eu venho', 'where I come from')}</p>
            <h2 className="titulo-serifa text-[clamp(3rem,6vw,5rem)] text-tinta">{t('Trajetória', 'Journey')}</h2>
          </div>
          <a
            href="/cv.pdf"
            download
            className="group inline-flex items-center gap-2 border-b border-tinta/40 pb-0.5 text-[15px] text-tinta transition-colors hover:border-accent hover:text-accent"
          >
            <Download size={15} />
            {t('Baixar currículo', 'Download résumé (PT)')}
          </a>
        </div>

        <div ref={linhaRef} className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-[8px] top-0 w-px bg-tinta/15" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-[7.5px] top-0 w-[2px] origin-top bg-accent"
            style={{ scaleY: linha }}
          />
          {items.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
