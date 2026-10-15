import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import { GraduationCap, Briefcase, Download } from 'lucide-react'
import { useIdioma } from '../i18n'
import { Titulo } from '../motion/Tipografia'

const items = [
  {
    type: 'edu',
    title: 'Pós Graduação Full-Stack com IA',
    title_en: 'Postgraduate in Full Stack with AI',
    org: 'Rocketseat',
    period: '2026 — 2027',
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
    period: '2023 — 2024',
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
    period: '2021 — 2025',
    description:
      'TCC: qlattes,extensão para classificação automática de artigos do Lattes/CNPq segundo o Qualis CAPES.',
    description_en:
      'Thesis: qlattes, an extension that automatically ranks Lattes/CNPq papers by the CAPES Qualis rating.',
    tags: ['JavaScript', 'Extensões de Navegador', 'Pesquisa Acadêmica'],
    tags_en: ['JavaScript', 'Browser Extensions', 'Academic Research'],
  },
]

function TimelineItem({ item, index }) {
  const { tr } = useIdioma()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isEdu = item.type === 'edu'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Dot */}
      <div
        className={`absolute left-0 top-1 z-[1] w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center ${
          isEdu
            ? 'border-accent bg-[#151533]'
            : 'border-cyan bg-[#0b2530]'
        }`}
      >
        {isEdu
          ? <GraduationCap size={11} className="text-accent" />
          : <Briefcase size={11} className="text-cyan" />
        }
      </div>

      <div className="bg-surface border border-border rounded-xl p-5 hover:border-border-2 transition-colors duration-200">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="text-text-primary font-semibold text-sm">{tr(item, 'title')}</h3>
          <span className="font-mono text-xs text-muted shrink-0">{item.period}</span>
        </div>
        <p className={`text-xs font-medium mb-3 ${isEdu ? 'text-accent' : 'text-cyan'}`}>
          {item.org}
        </p>
        <p className="text-text-secondary text-sm leading-relaxed mb-3">
          {tr(item, 'description')}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tr(item, 'tags').map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] text-text-secondary bg-surface-2 border border-border rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { t } = useIdioma()
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })
  const linhaRef = useRef(null)
  // A linha da trajetória se desenha conforme a página rola.
  const { scrollYProgress } = useScroll({ target: linhaRef, offset: ['start 75%', 'end 55%'] })
  const linha = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section id="experience" className="py-32 px-6 bg-surface/20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-accent mb-3 tracking-widest uppercase">
            {t('formação', 'background')}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Titulo className="text-3xl sm:text-4xl font-bold text-text-primary">
              {t('Trajetória', 'Journey')}
            </Titulo>
            <a
              href="/cv.pdf"
              download
              className="flex items-center gap-2 rounded-lg border border-border-2 px-4 py-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Download size={14} />
              {t('Baixar currículo', 'Download résumé (PT)')}
            </a>
          </div>
        </motion.div>

        <div className="flex gap-6 mb-10">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="w-3 h-3 rounded-full border-2 border-accent bg-accent/10 inline-block" />
            {t('Formação', 'Education')}
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="w-3 h-3 rounded-full border-2 border-cyan bg-cyan/10 inline-block" />
            {t('Experiência', 'Experience')}
          </div>
        </div>

        <div ref={linhaRef} className="relative">
          <div aria-hidden="true" className="absolute bottom-2 left-[11px] top-3 w-px bg-border" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-2 left-[11px] top-3 w-px origin-top bg-gradient-to-b from-accent via-cyan to-accent shadow-[0_0_8px_rgba(129,140,248,0.8)]"
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
