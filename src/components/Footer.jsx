import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
  XIcon,
  DiscordIcon,
} from './icons'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'

// Mesmo conjunto e mesma ordem de /links, para os dois lugares nunca divergirem.
const redes = [
  { Icone: DiscordIcon, nome: 'Discord', href: contato.discord },
  { Icone: InstagramIcon, nome: 'Instagram', href: contato.instagram },
  { Icone: TiktokIcon, nome: 'TikTok', href: contato.tiktok },
  { Icone: YoutubeIcon, nome: 'YouTube', href: contato.youtube },
  { Icone: XIcon, nome: 'X', href: contato.x },
  { Icone: GithubIcon, nome: 'GitHub', href: contato.github },
  { Icone: LinkedinIcon, nome: 'LinkedIn', href: contato.linkedin },
]

export default function Footer() {
  const { t } = useIdioma()
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              to="/"
              className="font-mono text-sm font-medium tracking-wider text-accent transition-colors hover:text-text-primary"
            >
              ET<span className="text-text-secondary">.dev</span>
            </Link>
            <p className="mt-2 max-w-xs text-sm text-text-secondary">
              {t('Desenvolvimento web e impressão 3D, feitos sob encomenda.', 'Web development and 3D printing, made to order.')}
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-sm sm:text-right">
            <a href="/#servicos" className="text-text-secondary transition-colors hover:text-accent">
              {t('Serviços', 'Services')}
            </a>
            <Link to="/projetos" className="text-text-secondary transition-colors hover:text-accent">
              {t('Todos os projetos', 'All projects')}
            </Link>
            <Link to="/mods" className="text-text-secondary transition-colors hover:text-accent">
              {t('Mods de Minecraft', 'Minecraft mods')}
            </Link>
            <a href="/#contact" className="text-text-secondary transition-colors hover:text-accent">
              {t('Pedir orçamento', 'Get a quote')}
            </a>
            <Link to="/links" className="text-text-secondary transition-colors hover:text-accent">
              {t('Meus links', 'My links')}
            </Link>
          </nav>
        </div>

        <div className="flex flex-col-reverse gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-muted">
            Eduardo Tajra · {new Date().getFullYear()} · {t('feito com React e Vite', 'built with React and Vite')}
          </p>

          <div className="flex flex-wrap gap-2">
            {redes.map(({ Icone, nome, href }) => (
              <a
                key={nome}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={nome}
                title={nome}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Icone size={15} />
              </a>
            ))}
            <a
              href={`mailto:${contato.email}`}
              aria-label={t('E-mail', 'Email')}
              title={t('E-mail', 'Email')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
