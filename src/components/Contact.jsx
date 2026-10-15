import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Download, Code2, Box, Check } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'
import { Pincel } from '../motion/Pincel'
import Mascote from '../motion/Mascote'

// Discord é o canal comercial: fica em destaque e abre direto o meu perfil.
const orcamentos = [
  {
    icone: Code2,
    titulo: 'Quero criar um projeto',
    titulo_en: 'I want to build a project',
    href: contato.discord,
      },
  {
    icone: Box,
    titulo: 'Quero imprimir uma peça',
    titulo_en: 'I want something printed',
    href: contato.discord,
      },
]

// Canais profissionais: continuam à mão, sem disputar a atenção com o orçamento.
const profissionais = [
  { Icone: GithubIcon, rotulo: 'GitHub', href: contato.github },
  { Icone: LinkedinIcon, rotulo: 'LinkedIn', href: contato.linkedin },
  { Icone: Download, rotulo: 'Currículo', rotulo_en: 'Résumé (PT)', href: '/cv.pdf', baixar: true },
]

// Microinteração: o e-mail é copiado com um clique e o ícone vira um "certo".
function CopiaEmail() {
  const { t } = useIdioma()
  const [copiado, setCopiado] = useState(false)
  const copia = async () => {
    try {
      await navigator.clipboard.writeText(contato.email)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 1800)
    } catch {
      window.location.href = `mailto:${contato.email}`
    }
  }
  return (
    <button
      type="button"
      onClick={copia}
      className="flex items-center gap-2 text-[15px] text-papel/75 transition-colors hover:text-marca"
    >
      <span className="relative h-[15px] w-[15px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={copiado ? 'ok' : 'mail'}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            className="absolute inset-0"
          >
            {copiado ? <Check size={15} className="text-emerald-400" /> : <Mail size={15} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copiado ? t('E-mail copiado!', 'Email copied!') : t('Copiar e-mail', 'Copy email')}</span>
    </button>
  )
}

export default function Contact() {
  const { t, tr } = useIdioma()
  const [animado, setAnimado] = useState(false)

  return (
    <section id="contact" className="relative overflow-hidden bg-tinta px-5 pb-6 pt-24 text-papel sm:px-8 lg:pt-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mao text-2xl text-marca">{t('última página', 'last page')}</p>
            <h2 className="titulo text-[clamp(3.6rem,11vw,10rem)] leading-[0.88]">
              {t('Me conta', 'Tell me')}
              <br />
              <em>
                {t('a ', 'the ')}
                <Pincel tipo="circulo" semente={41} cor="#ffd84a" atraso={0.3}>
                  {t('ideia', 'idea')}
                </Pincel>
                .
              </em>
            </h2>
            <p className="mt-12 max-w-xl text-lg leading-relaxed text-papel/75">
              {t(
                'Você me diz o que precisa e eu retorno com prazo e preço, sem compromisso. Site, jogo, mod ou peça impressa.',
                'Tell me what you need and I will get back with a deadline and a price, no strings attached. Website, game, mod or printed part.'
              )}
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Mascote feliz={animado} />
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-3 sm:flex-row"
          onPointerEnter={() => setAnimado(true)}
          onPointerLeave={() => setAnimado(false)}
        >
          {orcamentos.map((item) => {
            const { icone: Icone, href } = item
            return (
              <a
                key={item.titulo}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 border border-papel/25 px-6 py-5 text-lg transition-colors duration-300 hover:border-marca hover:bg-marca hover:text-tinta sm:flex-1"
              >
                <span className="flex items-center gap-3">
                  <Icone size={18} />
                  {tr(item, 'titulo')}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            )
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-papel/15 pt-8">
          <CopiaEmail />
          {profissionais.map((item) => {
            const { Icone, href, baixar } = item
            return (
              <a
                key={item.rotulo}
                href={href}
                download={baixar || undefined}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[15px] text-papel/75 transition-colors hover:text-marca"
              >
                <Icone size={15} />
                {tr(item, 'rotulo')}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
