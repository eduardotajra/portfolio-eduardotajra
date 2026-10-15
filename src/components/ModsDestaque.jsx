import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { mods } from '../data/mods'
import { contato } from '../data/contato'

// O vídeo só é baixado quando o mouse passa por cima: a home continua leve
// e, no celular (sem hover), fica a imagem de capa.
function Capa({ mod }) {
  const video = useRef(null)
  const temClipe = mod.video?.loop

  const tocar = () => video.current?.play().catch(() => {})
  const parar = () => {
    if (!video.current) return
    video.current.pause()
    video.current.currentTime = 0
  }

  return (
    <div
      className="relative aspect-video overflow-hidden bg-[#0b0b12]"
      onMouseEnter={temClipe ? tocar : undefined}
      onMouseLeave={temClipe ? parar : undefined}
    >
      {temClipe ? (
        <video
          ref={video}
          src={mod.video.src}
          poster={mod.capa.src}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`Clipe de ${mod.titulo}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={mod.capa.src}
          alt={`Imagem de ${mod.titulo}`}
          loading="lazy"
          className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
            mod.capa.pixel ? 'object-contain p-2 [image-rendering:pixelated]' : 'object-cover'
          }`}
        />
      )}
    </div>
  )
}

export default function ModsDestaque() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="mods" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">minecraft</p>
          <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
            Mods e sistemas para servidores
          </h2>
          <p className="max-w-xl text-text-secondary">
            Armas com poderes, chefes, chats, painéis e mecânicas que não existem no jogo. Tudo
            programado por mim e capturado no próprio Minecraft.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mods.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/mods#${mod.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-border-2 glow-accent-hover"
              >
                <Capa mod={mod} />
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{mod.tipo}</p>
                  <h3 className="mt-1.5 font-semibold text-text-primary">{mod.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{mod.chamada}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Link
            to="/mods"
            className="group inline-flex items-center gap-2 rounded-lg border border-border-2 px-6 py-3 text-sm font-semibold text-text-secondary transition-all duration-200 hover:border-accent hover:text-accent"
          >
            Ver vídeos e detalhes
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <a
            href={contato.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-text-secondary transition-colors hover:text-accent"
          >
            Me chama no Discord
          </a>
        </motion.div>
      </div>
    </section>
  )
}
