import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'
import TintaViva from '../motion/TintaViva'
import { Pincel } from '../motion/Pincel'
import { BotaoTinta } from '../motion/Botoes'
import Relogio from '../motion/Relogio'
import Mesa from './Mesa'

// O que eu construo, em ordem: a caneta vermelha risca uma e escreve a próxima.
const palavras = ['sites', 'jogos diários', 'ARGs', 'mods de Minecraft', 'extensões', 'peças em 3D']
const palavrasEn = ['websites', 'daily games', 'ARGs', 'Minecraft mods', 'extensions', '3D prints']

function PalavraCorrigida() {
  const { en } = useIdioma()
  const lista = en ? palavrasEn : palavras
  const [i, setI] = useState(0)
  const [riscando, setRiscando] = useState(false)

  // Ciclo: mostra a palavra, risca com a caneta vermelha, troca pela próxima.
  useEffect(() => {
    const risca = setTimeout(() => setRiscando(true), 2600)
    const troca = setTimeout(() => {
      setRiscando(false)
      setI((v) => (v + 1) % lista.length)
    }, 3400)
    return () => {
      clearTimeout(risca)
      clearTimeout(troca)
    }
  }, [i, lista.length])

  return (
    <span className="relative inline-block whitespace-nowrap">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${en}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: '0.25em', rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: '-0.15em', transition: { duration: 0.2 } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Pincel tipo="risca" ativo={riscando} semente={i + 2} duracao={0.35}>
            <Pincel tipo="marca" semente={i + 9} atraso={0.1} duracao={0.55}>
              <em className="px-[0.06em] italic">{lista[i % lista.length]}</em>
            </Pincel>
          </Pincel>
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const { t, en } = useIdioma()

  const surge = (delay = 0) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:min-h-[100svh] lg:pb-10 lg:pt-32">
      {/* Renderização em tempo real: tinta que escorre no papel. */}
      <TintaViva className="pointer-events-none absolute inset-0 h-full w-full" />

      <div className="relative mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-6">
        <div className="flex flex-col justify-center">
          <motion.p {...surge(0.05)} className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary">
            <span className="font-medium text-tinta">Eduardo Tajra</span>
            <span aria-hidden="true">/</span>
            <span>{t('dev full stack', 'full stack dev')}</span>
            <span aria-hidden="true">/</span>
            <Relogio />
          </motion.p>

          <motion.h1 {...surge(0.15)} className="titulo-serifa text-[clamp(3.1rem,8.4vw,7.4rem)] text-tinta">
            {t('Eu construo', 'I build')}
            <br />
            <PalavraCorrigida />
          </motion.h1>

          <motion.p {...surge(0.35)} className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            {en ? (
              <>
                Custom websites, games and experiences, mods for Minecraft servers and made-to-order 3D printing. The{' '}
                <Pincel tipo="sublinhado" atraso={1.2}>
                  stranger
                </Pincel>{' '}
                the idea, the better.
              </>
            ) : (
              <>
                Sites, jogos e experiências sob medida, mods para servidores de Minecraft e impressão 3D sob encomenda.
                Quanto mais{' '}
                <Pincel tipo="sublinhado" atraso={1.2}>
                  incomum
                </Pincel>{' '}
                a ideia, melhor.
              </>
            )}
          </motion.p>

          <motion.div {...surge(0.5)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <BotaoTinta href={contato.discord} target="_blank" rel="noopener noreferrer">
              {t('Me conta a ideia', 'Tell me the idea')}
            </BotaoTinta>
            <a href="#projects" className="group text-[15px] font-medium text-tinta">
              <span className="border-b border-tinta/30 pb-0.5 transition-colors group-hover:border-accent group-hover:text-accent">
                {t('ou veja o que eu já fiz', 'or see what I made')}
              </span>{' '}
              ↓
            </a>
          </motion.div>
        </div>

        <motion.div {...surge(0.3)} className="relative lg:min-h-[640px]">
          <Mesa />
        </motion.div>
      </div>
    </section>
  )
}
