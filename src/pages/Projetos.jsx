import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { projects, categorias } from '../data/projects'
import { useIdioma } from '../i18n'
import { Pincel } from '../motion/Pincel'

export default function Projetos() {
  const [filtro, setFiltro] = useState('todos')
  const { t, tr, en } = useIdioma()

  useEffect(() => {
    document.title = en ? 'Projects · Eduardo Tajra' : 'Projetos · Eduardo Tajra'
    return () => {
      document.title = 'Eduardo Tajra · Dev'
    }
  }, [en])

  const contagem = useMemo(() => {
    const mapa = { todos: projects.length }
    categorias.forEach((c) => {
      mapa[c.id] = projects.filter((p) => p.category === c.id).length
    })
    return mapa
  }, [])

  const visiveis = useMemo(
    () => (filtro === 'todos' ? projects : projects.filter((p) => p.category === filtro)),
    [filtro]
  )

  const abas = [{ id: 'todos', label: 'Todos', label_en: 'All' }, ...categorias]

  return (
    <section className="min-h-screen px-5 pb-28 pt-28 sm:px-8">
      <div className="mx-auto max-w-[1320px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft size={15} />
            {t('Voltar para a home', 'Back to home')}
          </Link>

          <div className="grid items-end gap-8 border-b border-tinta pb-10 lg:grid-cols-[1fr_24rem]">
            <div>
              <p className="font-mao text-2xl text-accent">{t('a gaveta inteira', 'the whole drawer')}</p>
              <h1 className="titulo text-[clamp(3.4rem,9vw,8rem)] text-tinta">
                {t('Todos os ', 'All the ')}
                <Pincel tipo="marca" semente={44} atraso={0.3}>
                  <em>{t('projetos', 'projects')}</em>
                </Pincel>
              </h1>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              {t(
                'Tudo que já construí e está de pé, do trabalho encomendado ao projeto que existe só porque a ideia era boa demais para ficar na cabeça.',
                'Everything I have built that is still standing, from commissioned work to projects that exist only because the idea was too good to stay in my head.'
              )}
            </p>
          </div>
        </motion.div>

        {/* Filtros: a aba escolhida ganha um sublinhado a pincel. */}
        <div
          className="mb-14 mt-8 flex flex-wrap gap-x-8 gap-y-3"
          role="tablist"
          aria-label={t('Filtrar projetos por categoria', 'Filter projects by category')}
        >
          {abas.map((aba) => {
            const { id } = aba
            const ativo = filtro === id
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={ativo}
                onClick={() => setFiltro(id)}
                className={`py-2 text-xl transition-colors duration-200 ${ativo ? 'text-tinta' : 'text-text-secondary hover:text-tinta'}`}
              >
                <Pincel tipo="sublinhado" ativo={ativo} semente={id.length * 7} duracao={0.45}>
                  <span className="titulo italic">{tr(aba, 'label')}</span>
                </Pincel>
                <sup className="ml-1 font-mono text-[11px] text-muted">{contagem[id]}</sup>
              </button>
            )
          })}
        </div>

        {/* A key força a re-entrada das fichas a cada troca de filtro. */}
        <div key={filtro} className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
