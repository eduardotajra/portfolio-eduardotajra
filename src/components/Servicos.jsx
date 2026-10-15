import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useIdioma } from '../i18n'
import { Pincel } from '../motion/Pincel'

// O que eu faço, como índice de caderno: três linhas grandes. Passando o mouse,
// a linha ganha um traço a pincel e uma prévia do trabalho acompanha o cursor.
const frentes = [
  {
    n: '01',
    titulo: 'Sites e experiências',
    titulo_en: 'Websites & experiences',
    resumo: 'sites, jogos diários, ARGs e dossiês interativos',
    resumo_en: 'websites, daily games, ARGs and interactive dossiers',
    imagem: '/screenshots/meiosangue.png',
    href: '#projects',
  },
  {
    n: '02',
    titulo: 'Mods de Minecraft',
    titulo_en: 'Minecraft mods',
    resumo: 'armas com poderes, chefes, chats e painéis',
    resumo_en: 'weapons with powers, bosses, chats and panels',
    imagem: '/mods/aurador-poster.jpg',
    href: '#mods',
  },
  {
    n: '03',
    titulo: 'Impressão 3D',
    titulo_en: '3D printing',
    resumo: 'peças sob encomenda, personalizadas e funcionais',
    resumo_en: 'made-to-order, personalized and functional parts',
    imagem: '/impressao3d/suporte-controle.jpg',
    href: '#impressao3d',
  },
]

export default function Servicos() {
  const { t, tr } = useIdioma()
  const [ativa, setAtiva] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })
  // A prévia inclina para o lado em que o mouse está indo.
  const giro = useTransform(useVelocity(sx), [-1600, 1600], [-12, 12], { clamp: true })

  const move = (e) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  return (
    <section id="servicos" className="relative px-5 py-24 sm:px-8 lg:py-32" onPointerMove={move}>
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 border-b border-tinta pb-4">
          <h2 className="titulo-serifa text-4xl text-tinta sm:text-5xl">
            {t('O que eu faço', 'What I do')}
          </h2>
          <p className="font-mao text-2xl text-tinta/70">{t('três frentes, o mesmo capricho', 'three fronts, the same care')}</p>
        </div>

        <ul onPointerLeave={() => setAtiva(null)}>
          {frentes.map((f, i) => (
            <li key={f.n} className="border-b border-tinta/15">
              <a
                href={f.href}
                onPointerEnter={() => setAtiva(i)}
                className="group grid items-center gap-x-6 gap-y-2 py-7 sm:grid-cols-[3rem_1fr_auto] lg:py-9"
              >
                <span className="font-mono text-xs text-muted">{f.n}</span>
                <span className="titulo-serifa text-[clamp(2.4rem,6.4vw,5.6rem)] text-tinta transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-3">
                  <Pincel tipo="sublinhado" ativo={ativa === i} semente={i + 21} duracao={0.45}>
                    {tr(f, 'titulo')}
                  </Pincel>
                </span>
                <span className="flex items-center gap-4 text-text-secondary sm:max-w-[16rem] sm:text-right">
                  <img src={f.imagem} alt="" loading="lazy" className="h-14 w-20 shrink-0 rounded object-cover sm:hidden" />
                  {tr(f, 'resumo')}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Prévia que acompanha o cursor (só onde existe cursor). */}
      <AnimatePresence>
        {ativa !== null && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[300px] [@media(pointer:fine)]:block"
            style={{ x: sx, y: sy, rotate: giro, translateX: '-50%', translateY: '-50%' }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.25 }}
          >
            <div className="sombra-papel overflow-hidden rounded-md bg-white p-1.5">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={ativa}
                  src={frentes[ativa].imagem}
                  className="aspect-[4/3] w-full rounded-sm object-cover"
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  animate={{ clipPath: 'inset(0% 0 0 0)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
