import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useIdioma, SeletorIdioma } from '../i18n'
import Logo from '../motion/Logo'
import Relogio from '../motion/Relogio'
import { BotaoTinta } from '../motion/Botoes'
import { contato } from '../data/contato'

const links = [
  { hash: '#projects', label: 'Projetos', label_en: 'Work' },
  { hash: '#mods', label: 'Mods', label_en: 'Mods' },
  { hash: '#impressao3d', label: 'Impressão 3D', label_en: '3D printing' },
  { hash: '#about', label: 'Sobre', label_en: 'About' },
  { hash: '#contact', label: 'Contato', label_en: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const { t, tr } = useIdioma()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Destaque da seção ativa só faz sentido na home, onde as seções existem.
  useEffect(() => {
    if (!isHome) return
    const sections = ['projects', 'mods', 'impressao3d', 'about', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isHome])

  // O menu do celular cobre a tela, mas não trava o scroll do body
  // (travar cancelaria o scroll suave da âncora ao clicar num item).
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Fora da home não há seção observada: o destaque fica sempre vazio.
  const activeSection = isHome ? active : ''

  // Na home o link é âncora nativa (reclicável); fora dela, volta para a home na âncora.
  const navLink = (hash, label, onClick, className) =>
    isHome ? (
      <a href={hash} onClick={onClick} className={className}>
        {label}
      </a>
    ) : (
      <Link to={{ pathname: '/', hash }} onClick={onClick} className={className}>
        {label}
      </Link>
    )

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-bg/95 border-b border-tinta/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[calc(1320px+4rem)] items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          aria-label="Eduardo Tajra"
          className="transition-opacity hover:opacity-90"
        >
          <Logo />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((item) => {
            const { hash } = item
            const label = tr(item, 'label')
            const isActive = activeSection === hash.replace('#', '')
            return (
              <li key={hash} className="relative">
                {navLink(
                  hash,
                  label,
                  undefined,
                  `relative text-[15px] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-tinta after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                )}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
                  />
                )}
              </li>
            )
          })}
          <li>
            <SeletorIdioma />
          </li>
        </ul>

        {/* Mobile trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <SeletorIdioma />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t('Fechar menu', 'Close menu') : t('Abrir menu', 'Open menu')}
          aria-expanded={open}
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-1 -mr-1"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        </div>
      </div>

      {/* Menu do celular: uma folha inteira, com os links no tamanho dos títulos. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 flex flex-col justify-between overflow-y-auto overscroll-contain bg-bg px-6 pb-8 pt-4 md:hidden"
          >
            <ul>
              {links.map((item, i) => (
                <li key={item.hash} className="overflow-hidden border-b border-tinta/15">
                  <motion.div
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.55, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {navLink(
                      item.hash,
                      <>
                        {tr(item, 'label')}
                      </>,
                      () => setOpen(false),
                      'titulo flex items-baseline py-3 text-[2.75rem] text-tinta transition-colors active:text-accent'
                    )}
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 flex flex-col items-start gap-4"
            >
              {navLink(
                '#showreel',
                <>
                  <span aria-hidden="true">▶</span> {t('assistir o showreel', 'watch the showreel')}
                  <span className="font-mono text-[11px] text-muted">1:06</span>
                </>,
                () => setOpen(false),
                'flex items-center gap-2 text-[15px] font-medium text-tinta'
              )}
              <BotaoTinta href={contato.discord} target="_blank" rel="noopener noreferrer">
                {t('Me conta a ideia', 'Tell me the idea')}
              </BotaoTinta>
              <Relogio className="text-sm text-muted" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
