import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useIdioma } from '../i18n'
import { contato } from '../data/contato'
import Mascote from '../motion/Mascote'

// A mesa: coisas que eu fiz de verdade, espalhadas e arrastáveis.
// Polaroid de uma peça impressa, a janela de um site, o cartão de uma arma do
// Aurador, um bilhete e o boneco de pixel. Quem pega um objeto traz ele pra cima.
function Objeto({ children, className, rot, atraso, limite, topo, aoPegar, z }) {
  return (
    <motion.div
      drag
      dragConstraints={limite}
      dragElastic={0.18}
      dragMomentum={false}
      onPointerDown={aoPegar}
      initial={{ opacity: 0, y: -60, rotate: rot - 12 }}
      animate={{ opacity: 1, y: 0, rotate: rot }}
      transition={{ type: 'spring', stiffness: 160, damping: 14, delay: atraso }}
      whileDrag={{ scale: 1.06, rotate: rot * 0.4, cursor: 'grabbing' }}
      whileHover={{ scale: 1.02 }}
      style={{ zIndex: z === topo ? 30 : z }}
      className={`absolute cursor-grab touch-none select-none ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Mesa() {
  const { t } = useIdioma()
  const limite = useRef(null)
  const [topo, setTopo] = useState(0)
  const pega = (z) => () => setTopo(z)

  return (
    <div ref={limite} className="relative h-[420px] w-full sm:h-[480px] lg:h-full">
      <Objeto limite={limite} topo={topo} z={1} aoPegar={pega(1)} rot={-7} atraso={0.5} className="left-[2%] top-[4%] w-[44%] sm:w-[200px]">
        <div className="sombra-papel relative bg-white p-2.5 pb-10">
          <span className="fita -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
          <img src="/impressao3d/trofeu.jpg" alt={t('Troféu impresso em 3D', '3D printed trophy')} draggable="false" className="aspect-[4/5] w-full object-cover" />
          <span className="font-mao absolute bottom-1.5 left-3 text-xl text-tinta/80">{t('impresso aqui ✓', 'printed here ✓')}</span>
        </div>
      </Objeto>

      <Objeto limite={limite} topo={topo} z={2} aoPegar={pega(2)} rot={4} atraso={0.65} className="right-[2%] top-0 w-[58%] sm:w-[300px]">
        <div className="sombra-papel overflow-hidden rounded-lg border border-tinta/20 bg-surface">
          <div className="flex items-center gap-1.5 border-b border-tinta/15 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-tinta/25" />
            <span className="h-2 w-2 rounded-full bg-tinta/25" />
            <span className="h-2 w-2 rounded-full bg-tinta/25" />
            <span className="ml-2 truncate font-mono text-[10px] text-muted">efemeride-alpha.vercel.app</span>
          </div>
          <img src="/screenshots/efemeride.png" alt={t('Site Efeméride', 'Efeméride website')} draggable="false" className="aspect-[16/10] w-full object-cover object-top" />
        </div>
      </Objeto>

      <Objeto limite={limite} topo={topo} z={3} aoPegar={pega(3)} rot={3} atraso={0.8} className="left-[6%] top-[50%] w-[46%] sm:w-[230px]">
        <div className="sombra-papel rounded-md bg-[#1a140c] p-1">
          <img src="/mods/aurador-orgulho.jpg" alt={t('Cartão de arma do mod Aurador', 'Weapon card from the Aurador mod')} draggable="false" className="w-full rounded-sm" />
        </div>
      </Objeto>

      <Objeto limite={limite} topo={topo} z={4} aoPegar={pega(4)} rot={-4} atraso={0.95} className="right-[6%] top-[52%] w-[42%] sm:w-[190px]">
        <a
          href={contato.discord}
          target="_blank"
          rel="noopener noreferrer"
          draggable="false"
          className="sombra-papel block bg-marca px-4 pb-5 pt-4 text-tinta"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 90% 100%, 0 100%)' }}
        >
          <span className="font-mao block text-[1.55rem] leading-[1.05]">
            {t('aberto pra projetos!', 'open for projects!')}
          </span>
          <span className="font-mao mt-2 block text-xl leading-tight text-tinta/80">
            {t('me chama no Discord →', 'message me on Discord →')}
          </span>
        </a>
      </Objeto>

      <Objeto limite={limite} topo={topo} z={5} aoPegar={pega(5)} rot={0} atraso={1.1} className="left-[46%] top-[30%] hidden sm:block">
        <Mascote />
      </Objeto>

      <p aria-hidden="true" className="font-mao pointer-events-none absolute -bottom-2 left-2 -rotate-2 text-lg text-tinta/60 sm:text-xl">
        {t('pode mexer nas coisas da mesa', 'go ahead, move my stuff around')}
      </p>
    </div>
  )
}
