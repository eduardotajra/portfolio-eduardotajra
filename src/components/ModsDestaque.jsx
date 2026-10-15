import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { mods } from '../data/mods'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'
import { PicaretaStopMotion } from '../motion/IconesAnimados'
import PixelRevela from '../motion/PixelRevela'
import { DiscordIcon } from './icons'

// Moldura em pixel: cantos recortados em degrau, como um slot de inventário.
const molduraPixel = (cor) => ({
  boxShadow: `0 -4px 0 0 ${cor}, 0 4px 0 0 ${cor}, -4px 0 0 0 ${cor}, 4px 0 0 0 ${cor}`,
})

// Borda de cima da seção em degraus de bloco: a página "anoitece" em pixels.
const degraus = Array.from({ length: 24 }, (_, i) => {
  const alturas = [3, 1, 2, 4, 2, 3, 1, 2, 3, 2, 4, 1, 2, 3, 1, 3, 2, 4, 2, 1, 3, 2, 1, 2]
  return alturas[i] * 14
})

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
      className="relative aspect-video overflow-hidden bg-[#0b120d]"
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
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={mod.capa.src}
          alt={t(`Imagem de ${tr(mod, 'titulo')}`, `Image of ${tr(mod, 'titulo')}`)}
          loading="lazy"
          className={`h-full w-full ${mod.capa.pixel ? 'pixelado object-contain p-2' : 'object-cover'}`}
        />
      )}
      <PixelRevela src={mod.capa.src} />
      <span className="absolute left-2 top-2 bg-black/70 px-2 py-0.5 font-mono text-[10px] text-[#c8f0a0]">{mod.plataforma}</span>
    </div>
  )
}

function Card({ mod, i }) {
  const { tr } = useIdioma()
  return (
    <Link
      to={`/mods#${mod.id}`}
      className="group flex w-[80vw] shrink-0 snap-start flex-col bg-[#16211a] transition-transform duration-300 hover:-translate-y-1.5 sm:w-[360px] lg:w-[400px]"
      style={molduraPixel('#2c4433')}
    >
      <Capa mod={mod} />
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-[#8fd16a]">
          {String(i + 1).padStart(2, '0')} · {tr(mod, 'tipo')}
        </p>
        <h3 className="titulo mt-2 text-4xl text-[#eef7e2]">{tr(mod, 'titulo')}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#b9c9b0]">{tr(mod, 'chamada')}</p>
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
  const barra = useTransform(scrollYProgress, [0, 1], [0.04, 1])

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
    <section id="mods" className="relative mt-16">
      {/* Degraus de bloco: a transição do papel para a noite. */}
      <div aria-hidden="true" className="flex h-14 items-end">
        {degraus.map((h, i) => (
          <span key={i} className="flex-1 bg-noite" style={{ height: h }} />
        ))}
      </div>

      <div
        ref={secao}
        className="relative bg-noite text-[#eef7e2]"
        style={{
          ...(preso ? { height: altura } : {}),
          backgroundImage:
            'radial-gradient(1.5px 1.5px at 12% 18%, #e8f5d0 50%, transparent 51%), radial-gradient(1px 1px at 68% 12%, #e8f5d0 50%, transparent 51%), radial-gradient(1.5px 1.5px at 84% 34%, #e8f5d0 50%, transparent 51%), radial-gradient(1px 1px at 33% 8%, #e8f5d0 50%, transparent 51%), radial-gradient(1px 1px at 52% 28%, #c8f0a0 50%, transparent 51%)',
          backgroundSize: '520px 380px',
        }}
      >
        <div className={preso ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : 'py-20'}>
          <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="mb-2 flex items-center gap-2 font-mono text-sm text-[#8fd16a]">
                  <PicaretaStopMotion />
                  {t('enquanto isso, no Minecraft', 'meanwhile, in Minecraft')}
                </p>
                <h2 className="titulo text-[clamp(3rem,7vw,6rem)]">{t('Mods e sistemas', 'Mods & systems')}</h2>
                <p className="mt-3 max-w-xl text-lg text-[#b9c9b0]">
                  {t(
                    'Armas com poderes, chefes, chats e mecânicas que o jogo não tem. Tudo programado por mim e gravado no próprio Minecraft.',
                    "Weapons with powers, bosses, chats and mechanics the game doesn't have. All programmed by me and recorded in Minecraft itself."
                  )}
                </p>
              </div>
              <Link
                to="/mods"
                className="bg-[#e8f5d0] px-5 py-3 font-mono text-sm text-noite transition-colors hover:bg-white"
                style={molduraPixel('#e8f5d0')}
              >
                {t('ver vídeos e detalhes →', 'videos & details →')}
              </Link>
            </div>

            <div className={preso ? '' : '-mx-5 snap-x snap-mandatory overflow-x-auto px-5 pb-6 pt-2 [scrollbar-width:none] sm:-mx-8 sm:px-8'}>
              <motion.div ref={trilho} style={preso ? { x } : undefined} className="flex w-max gap-7 px-1 py-1">
                {mods.map((mod, i) => (
                  <Card key={mod.id} mod={mod} i={i} />
                ))}
                <a
                  href={contato.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-[80vw] shrink-0 snap-start flex-col items-start justify-center gap-4 border-2 border-dashed border-[#8fd16a]/50 p-8 transition-colors hover:border-[#8fd16a] hover:bg-[#8fd16a]/10 sm:w-[300px]"
                >
                  <span className="flex h-12 w-12 items-center justify-center bg-[#8fd16a] text-noite transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <DiscordIcon size={22} />
                  </span>
                  <span className="titulo text-3xl">{t('O próximo pode ser o do seu servidor', 'The next one could be for your server')}</span>
                  <span className="font-mono text-sm text-[#b9c9b0]">{t('me chama no Discord →', 'message me on Discord →')}</span>
                </a>
              </motion.div>
            </div>

            {preso && (
              <div className="mt-10 h-2 w-full bg-[#16211a]">
                <motion.div className="h-full origin-left bg-[#8fd16a]" style={{ scaleX: barra }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* E de volta ao papel, pelos degraus de baixo. */}
      <div aria-hidden="true" className="flex h-14 items-start">
        {degraus.map((h, i) => (
          <span key={i} className="flex-1 bg-noite" style={{ height: degraus[(i + 7) % degraus.length] }} />
        ))}
      </div>
    </section>
  )
}
