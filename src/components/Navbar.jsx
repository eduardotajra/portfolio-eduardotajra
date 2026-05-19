import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#projects', label: 'Projetos' },
  { href: '#about', label: 'Sobre' },
  { href: '#contact', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['projects', 'about', 'contact']
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
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-sm text-accent font-medium tracking-wider hover:text-text-primary transition-colors"
        >
          ET<span className="text-text-secondary">.dev</span>
        </a>

        <ul className="flex items-center gap-8">
          {links.map(({ href, label }) => {
            const id = href.replace('#', '')
            const isActive = active === id
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </motion.nav>
  )
}
