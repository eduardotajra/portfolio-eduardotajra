import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { useIdioma } from '../i18n'
import RaioX from '../motion/RaioX'

const rotulo = { clientes: ['cliente', 'client'], autorais: ['autoral', 'personal'], academicos: ['acadêmico', 'academic'] }

// Texto claro sobre cor escura e vice-versa.
const escuro = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return 0.299 * r + 0.587 * g + 0.114 * b < 140
}

// Projetos como índice: número, nome grande, o que é e para quem.
// No hover, a linha veste a cor do projeto e a prévia em raio-X acompanha o cursor.
export default function Projects() {
  const { t, tr, en } = useIdioma()
  const [ativo, setAtivo] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 240, damping: 26, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 240, damping: 26, mass: 0.5 })
  const giro = useTransform(useVelocity(sx), [-1600, 1600], [-10, 10], { clamp: true })

  const destaques = projects.filter((p) => p.featured)
  const restantes = projects.length - destaques.length
  const atual = destaques.find((p) => p.id === ativo)

  return (
    <section
      id="projects"
      className="relative px-5 py-24 sm:px-8 lg:py-32"
      onPointerMove={(e) => {
        x.set(e.clientX)
        y.set(e.clientY)
      }}
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mao text-2xl text-accent">{t('trabalho escolhido', 'selected work')}</p>
            <h2 className="titulo text-[clamp(3rem,7vw,6rem)] text-tinta">
              {t('Coisas que eu fiz', 'Things I made')}{' '}
              <span className="align-top font-sans text-lg text-muted">({destaques.length})</span>
            </h2>
          </div>
          <p className="max-w-sm text-text-secondary">
            {t(
              'Jogos, experiências e sites. Alguns encomendados, outros nascidos de uma ideia estranha que eu quis ver de pé.',
              'Games, experiences and websites. Some commissioned, others born from a strange idea I wanted to see standing.'
            )}
          </p>
        </div>

        <ul className="border-t border-tinta" onPointerLeave={() => setAtivo(null)}>
          {destaques.map((p, i) => {
            const link = p.links.demo || (!p.repoPrivate ? p.links.github : '')
            const on = ativo === p.id
            const claro = escuro(p.cor)
            const Tag = link ? 'a' : 'div'
            return (
              <li key={p.id} className="relative border-b border-tinta/15">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom"
                  style={{ backgroundColor: p.cor }}
                  initial={false}
                  animate={{ scaleY: on ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.7, 0, 0.2, 1] }}
                />
                <Tag
                  {...(link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onPointerEnter={() => setAtivo(p.id)}
                  className={`group relative grid grid-cols-[2.2rem_1fr_auto] items-baseline gap-x-4 gap-y-2 py-6 transition-colors duration-300 sm:grid-cols-[3rem_1fr_14rem_auto] sm:px-2 lg:py-7 ${
                    on && claro ? 'text-papel' : 'text-tinta'
                  }`}
                >
                  <span className={`font-mono text-xs ${on && claro ? 'text-papel/70' : 'text-muted'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="titulo text-[clamp(2rem,4.6vw,3.8rem)] transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-2">
                    {p.title}
                  </span>
                  <span className={`hidden text-sm sm:block ${on && claro ? 'text-papel/80' : 'text-text-secondary'}`}>
                    {en ? rotulo[p.category][1] : rotulo[p.category][0]} · {p.tags.slice(0, 2).join(', ')}
                  </span>
                  <span className="flex justify-end">
                    {link ? (
                      <ArrowUpRight size={22} className={`transition-transform duration-300 ${on ? 'translate-x-1 -translate-y-1' : ''}`} />
                    ) : (
                      <span className={`font-mono text-[10px] uppercase tracking-widest ${on && claro ? 'text-papel/70' : 'text-muted'}`}>
                        {t('privado', 'private')}
                      </span>
                    )}
                  </span>
                  <span className={`col-span-2 col-start-2 max-w-2xl text-[15px] leading-relaxed sm:col-span-3 ${on && claro ? 'text-papel/85' : 'text-text-secondary'}`}>
                    {tr(p, 'description')}
                  </span>
                  {/* No celular não tem cursor: a imagem aparece dentro da linha. */}
                  <span className="col-span-2 col-start-2 mt-2 block overflow-hidden rounded border border-tinta/15 sm:hidden">
                    <RaioX src={p.screenshot} alt={p.title} privado={p.confidencial} />
                  </span>
                </Tag>
              </li>
            )
          })}
        </ul>

        <div className="mt-10 flex justify-end">
          <Link to="/projetos" className="group inline-flex items-baseline gap-3 text-tinta">
            <span className="titulo text-3xl italic transition-colors group-hover:text-accent">
              {t('ver todos os projetos', 'see all projects')}
            </span>
            <span className="font-mono text-xs text-muted">+{restantes}</span>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {atual && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[360px] [@media(pointer:fine)]:block"
            style={{ x: sx, y: sy, rotate: giro, translateX: '18%', translateY: '-55%' }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.25 }}
          >
            <div className="sombra-papel overflow-hidden rounded-md bg-white p-1.5">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={atual.id}
                  initial={{ clipPath: 'inset(0 0 100% 0)' }}
                  animate={{ clipPath: 'inset(0 0 0% 0)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.7, 0, 0.2, 1] }}
                >
                  <RaioX src={atual.screenshot} alt={atual.title} privado={atual.confidencial} className="rounded-sm" />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
