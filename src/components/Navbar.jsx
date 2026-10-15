import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { hash: '#servicos', label: 'Serviços' },
  { hash: '#projects', label: 'Projetos' },
  { hash: '#mods', label: 'Mods' },
  { hash: '#about', label: 'Sobre' },
  { hash: '#experience', label: 'Trajetória' },
  { hash: '#contact', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Destaque da seção ativa só faz sentido na home, onde as seções existem.
  useEffect(() => {
    if (!isHome) return
    const sections = ['servicos', 'projects', 'mods', 'about', 'experience', 'contact']
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

  // O painel é um dropdown curto, não um overlay: não travamos o scroll do body
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
          ? 'bg-bg/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-mono text-sm text-accent font-medium tracking-wider hover:text-text-primary transition-colors"
        >
          ET<span className="text-text-secondary">.dev</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ hash, label }) => {
            const isActive = activeSection === hash.replace('#', '')
            return (
              <li key={hash} className="relative">
                {navLink(
                  hash,
                  label,
                  undefined,
                  `relative text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                )}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-1 -mr-1"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-border bg-bg/95 backdrop-blur-md"
          >
            <ul className="px-6 py-2">
              {links.map(({ hash, label }) => (
                <li key={hash} className="border-b border-border last:border-0">
                  {navLink(
                    hash,
                    label,
                    () => setOpen(false),
                    'block py-4 text-sm font-medium text-text-secondary hover:text-accent transition-colors'
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
