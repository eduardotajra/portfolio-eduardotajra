import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { mods } from '../data/mods'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'
import { Titulo } from '../motion/Tipografia'
import { PicaretaStopMotion } from '../motion/IconesAnimados'
import { DiscordIcon } from './icons'

// O vídeo só é baixado quando o mouse passa por cima: a home continua leve
// e, no celular (sem hover), fica a imagem de capa.
function Capa({ mod }) {
  const { t, tr } = useIdioma()
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
      className="granulado relative aspect-video overflow-hidden bg-[#0b0b12]"
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
          aria-label={t(`Clipe de ${tr(mod, 'titulo')}`, `Clip of ${tr(mod, 'titulo')}`)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <img
          src={mod.capa.src}
          alt={t(`Imagem de ${tr(mod, 'titulo')}`, `Image of ${tr(mod, 'titulo')}`)}
          loading="lazy"
          className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
            mod.capa.pixel ? 'object-contain p-2 [image-rendering:pixelated]' : 'object-cover'
          }`}
        />
      )}
      <span className="vidro absolute left-3 top-3 z-10 rounded-full px-2.5 py-0.5 font-mono text-[10px] text-text-primary">
        {mod.plataforma}
      </span>
    </div>
  )
}

function Card({ mod, i }) {
  const { tr } = useIdioma()
  return (
    <Link
      to={`/mods#${mod.id}`}
      className="group borda-viva flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-border-2 glow-accent-hover sm:w-[360px] lg:w-[400px]"
    >
      <Capa mod={mod} />
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
          {String(i + 1).padStart(2, '0')} · {tr(mod, 'tipo')}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold text-text-primary">{tr(mod, 'titulo')}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{tr(mod, 'chamada')}</p>
      </div>
    </Link>
  )
}

export default function ModsDestaque() {
  const { t } = useIdioma()
  const secao = useRef(null)
  const trilho = useRef(null)
  const distancia = useMotionValue(0)
  const [altura, setAltura] = useState(null)
  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end end'] })
  const x = useTransform([scrollYProgress, distancia], ([p, d]) => -p * d)
  const barra = useTransform(scrollYProgress, [0, 1], [0.08, 1])

  // Rolagem horizontal: no desktop, a seção fica presa e a rolagem vertical
  // empurra os cards para o lado. No celular, é um carrossel de arrastar.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const mede = () => {
      const el = trilho.current
      if (!el) return
      if (!mq.matches) {
        distancia.set(0)
        setAltura(null)
        return
      }
      const d = Math.max(0, el.scrollWidth - el.parentElement.clientWidth)
      distancia.set(d)
      setAltura(window.innerHeight + d)
    }
    const ro = new ResizeObserver(mede)
    ro.observe(trilho.current)
    mq.addEventListener('change', mede)
    window.addEventListener('resize', mede)
    return () => {
      ro.disconnect()
      mq.removeEventListener('change', mede)
      window.removeEventListener('resize', mede)
    }
  }, [distancia])

  const preso = altura !== null

  return (
    <section id="mods" ref={secao} className="relative border-t border-border" style={preso ? { height: altura } : undefined}>
      <div className={preso ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : 'py-24'}>
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-accent">
                <PicaretaStopMotion />
                minecraft
              </p>
              <Titulo className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
                {t('Mods e sistemas para servidores', 'Mods and systems for servers')}
              </Titulo>
              <p className="max-w-xl text-text-secondary">
                {t(
                  'Armas com poderes, chefes, chats, painéis e mecânicas que não existem no jogo. Tudo programado por mim e capturado no próprio Minecraft.',
                  "Weapons with powers, bosses, chats, panels and mechanics the game doesn't have. All programmed by me and captured in Minecraft itself."
                )}
              </p>
            </div>
            <Link
              to="/mods"
              className="group inline-flex items-center gap-2 rounded-lg border border-border-2 px-5 py-2.5 text-sm font-semibold text-text-secondary transition-all duration-200 hover:border-accent hover:text-accent"
            >
              {t('Ver vídeos e detalhes', 'See videos and details')}
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className={preso ? '' : '-mx-6 snap-x snap-mandatory overflow-x-auto px-6 pb-4 [scrollbar-width:none]'}>
            <motion.div ref={trilho} style={preso ? { x } : undefined} className="flex w-max gap-5">
              {mods.map((mod, i) => (
                <Card key={mod.id} mod={mod} i={i} />
              ))}
              <a
                href={contato.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-[82vw] shrink-0 snap-start flex-col items-start justify-center gap-4 rounded-xl border border-dashed border-accent/40 bg-accent/[0.04] p-8 transition-colors hover:border-accent hover:bg-accent/10 sm:w-[300px]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform duration-300 group-hover:-rotate-[8deg] group-hover:scale-110">
                  <DiscordIcon size={22} />
                </span>
                <span className="text-lg font-semibold text-text-primary">
                  {t('O próximo pode ser o do seu servidor', 'The next one could be for your server')}
                </span>
                <span className="text-sm text-text-secondary">{t('Me chama no Discord', 'Message me on Discord')} →</span>
              </a>
            </motion.div>
          </div>

          {preso && (
            <div className="mt-8 h-px w-full overflow-hidden bg-border">
              <motion.div className="h-full origin-left bg-gradient-to-r from-accent to-cyan" style={{ scaleX: barra }} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
