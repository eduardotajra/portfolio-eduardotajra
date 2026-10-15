import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useIdioma } from '../i18n'
import { Pincel } from '../motion/Pincel'

// Borda de papel que vira noite em degraus, como na seção de mods.
const degraus = [3, 1, 2, 4, 2, 3, 1, 2, 3, 2, 4, 1, 2, 3, 1, 3, 2, 4, 2, 1, 3, 2, 1, 2].map((a) => a * 14)

// Blocos que se soltam do papel e caem no vazio, sem parar.
const blocos = [
  { x: '8%', tipo: 'grama', tam: 34, atraso: 0, dur: 3.4, giro: 200 },
  { x: '23%', tipo: 'pedra', tam: 22, atraso: 1.3, dur: 2.8, giro: -150 },
  { x: '41%', tipo: 'terra', tam: 28, atraso: 0.6, dur: 3.9, giro: 120 },
  { x: '63%', tipo: 'grama', tam: 20, atraso: 2.1, dur: 3.1, giro: -220 },
  { x: '78%', tipo: 'pedra', tam: 30, atraso: 0.9, dur: 3.6, giro: 170 },
  { x: '91%', tipo: 'terra', tam: 18, atraso: 1.8, dur: 2.6, giro: -110 },
]
const cores = {
  grama: 'linear-gradient(#5ea83a 0 28%, #8b5a2b 28%)',
  terra: '#8b5a2b',
  pedra: '#7d7d7d',
}

const estrelas = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37) % 100,
  y: (i * 53) % 90,
  atraso: (i % 7) * 0.4,
  grande: i % 5 === 0,
}))

// Botão de pedra do Minecraft: chanfro claro em cima, escuro embaixo, azulado no hover.
const botao =
  'inline-block min-w-[15rem] border-2 border-black bg-[#8b8b8b] px-6 py-3 text-center font-mono text-[15px] text-white [text-shadow:2px_2px_0_#3f3f3f] shadow-[inset_2px_2px_0_#c6c6c6,inset_-2px_-3px_0_#555] transition-colors hover:bg-[#8f99d6] hover:shadow-[inset_2px_2px_0_#c9d0ff,inset_-2px_-3px_0_#4b56a0] active:translate-y-px'

export default function NaoEncontrada() {
  const { pathname } = useLocation()
  const { t, en } = useIdioma()

  useEffect(() => {
    document.title = en ? 'Page not found · Eduardo Tajra' : 'Página não encontrada · Eduardo Tajra'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)
    return () => {
      document.title = 'Eduardo Tajra · Dev'
      meta.remove()
    }
  }, [en])

  return (
    <section className="flex min-h-[100svh] flex-col">
      {/* No papel, a caneta vermelha risca o endereço que não existe. */}
      <div className="px-5 pb-12 pt-32 sm:px-8">
        <div className="mx-auto max-w-[1320px]">
          <p className="font-mao text-2xl text-accent">{t('erro 404', 'error 404')}</p>
          <p className="mt-2 break-all font-mono text-lg text-tinta sm:text-2xl">
            <Pincel tipo="risca" atraso={0.5} semente={9}>
              <span>eduardotajra.com{pathname}</span>
            </Pincel>
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="flex h-14 items-end">
        {degraus.map((h, i) => (
          <span key={i} className="flex-1 bg-noite" style={{ height: h }} />
        ))}
      </div>

      <div className="relative flex-1 overflow-hidden bg-noite px-5 pb-24 pt-14 text-[#eef7e2] sm:px-8">
        {estrelas.map((e, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`absolute bg-[#e8f5d0] ${e.grande ? 'h-1.5 w-1.5' : 'h-1 w-1'}`}
            style={{ left: `${e.x}%`, top: `${e.y}%`, animation: `pisca 2.4s ${e.atraso}s steps(2) infinite` }}
          />
        ))}
        {blocos.map((b, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute -top-10 block"
            style={{
              left: b.x,
              width: b.tam,
              height: b.tam,
              background: cores[b.tipo],
              boxShadow: 'inset -3px -3px 0 rgba(0,0,0,0.25)',
              '--giro': `${b.giro}deg`,
              animation: `bloco-cai ${b.dur}s ${b.atraso}s cubic-bezier(0.55, 0, 1, 0.45) infinite both`,
            }}
          />
        ))}

        <div className="relative mx-auto max-w-[1320px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="titulo text-[clamp(3.6rem,12vw,10.5rem)] text-papel"
          >
            {t('Essa página', 'This page')}
            <br />
            <em>{t('caiu do mundo.', 'fell out of the world.')}</em>
          </motion.h1>
          <p className="mt-8 font-mono text-sm text-[#8fd16a]">
            {t('Pontuação', 'Score')}: <span className="text-marca">404</span>
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-papel/75">
            {t(
              'O endereço não existe ou mudou de lugar. Acontece até com quem constrói mundos.',
              'The address does not exist or has moved. It happens even to people who build worlds.'
            )}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
            <Link to="/" className={botao}>
              {t('Renascer', 'Respawn')}
            </Link>
            <Link to="/projetos" className={botao}>
              {t('Ver os projetos', 'See the projects')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
