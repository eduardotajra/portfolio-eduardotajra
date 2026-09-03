import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { projects, categorias } from '../data/projects'

export default function Projetos() {
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    document.title = 'Projetos · Eduardo Tajra'
    return () => {
      document.title = 'Eduardo Tajra · Dev'
    }
  }, [])

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

  const abas = [{ id: 'todos', label: 'Todos' }, ...categorias]

  return (
    <section className="min-h-screen px-6 pb-24 pt-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft size={15} />
            Voltar para a home
          </Link>

          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">
            arquivo
          </p>
          <h1 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
            Todos os projetos
          </h1>
          <p className="mb-10 max-w-xl text-text-secondary">
            Tudo que já construí e está de pé, do trabalho encomendado ao projeto que
            existe só porque a ideia era boa demais para ficar na cabeça.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filtrar projetos por categoria"
        >
          {abas.map(({ id, label }) => {
            const ativo = filtro === id
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={ativo}
                onClick={() => setFiltro(id)}
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  ativo
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border text-text-secondary hover:border-border-2 hover:text-text-primary'
                }`}
              >
                {label}
                <span className="ml-2 font-mono text-[11px] text-muted">{contagem[id]}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Grade — a key força a re-entrada da animação a cada troca de filtro */}
        <div key={filtro} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
