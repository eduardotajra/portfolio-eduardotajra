import { Link } from 'react-router-dom'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'
import Relogio from '../motion/Relogio'

// Mesmo conjunto e mesma ordem de /links, para os dois lugares nunca divergirem.
const redes = [
  { nome: 'Discord', href: contato.discord },
  { nome: 'Instagram', href: contato.instagram },
  { nome: 'TikTok', href: contato.tiktok },
  { nome: 'YouTube', href: contato.youtube },
  { nome: 'X', href: contato.x },
  { nome: 'GitHub', href: contato.github },
  { nome: 'LinkedIn', href: contato.linkedin },
]

const linkClaro = 'text-papel/70 transition-colors hover:text-marca'

export default function Footer() {
  const { t } = useIdioma()
  return (
    <footer className="bg-tinta px-5 pb-8 pt-12 text-papel sm:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 border-t border-papel/15 pt-10 sm:grid-cols-3">
          <div>
            <p className="font-mao text-2xl text-marca">{t('feito à mão em Fortaleza', 'handmade in Fortaleza')}</p>
            <Relogio className="mt-2 block text-sm text-papel/60" />
          </div>
          <nav className="flex flex-col gap-1.5 text-[15px]">
            <a href="/#servicos" className={linkClaro}>{t('O que eu faço', 'What I do')}</a>
            <a href="/#showreel" className={linkClaro}>{t('Showreel (1 min)', 'Showreel (1 min)')}</a>
            <Link to="/projetos" className={linkClaro}>{t('Todos os projetos', 'All projects')}</Link>
            <Link to="/mods" className={linkClaro}>{t('Mods de Minecraft', 'Minecraft mods')}</Link>
            <a href="/#contact" className={linkClaro}>{t('Pedir orçamento', 'Get a quote')}</a>
            <Link to="/links" className={linkClaro}>{t('Meus links', 'My links')}</Link>
          </nav>
          <div className="flex flex-col gap-1.5 text-[15px]">
            {redes.map(({ nome, href }) => (
              <a key={nome} href={href} target="_blank" rel="noopener noreferrer" className={linkClaro}>
                {nome} ↗
              </a>
            ))}
            <a href={`mailto:${contato.email}`} className={linkClaro}>{contato.email}</a>
          </div>
        </div>

        {/* Assinatura enorme no pé da página. */}
        <p
          aria-hidden="true"
          className="titulo mt-14 select-none whitespace-nowrap text-center text-[15.5vw] leading-[0.8] text-papel transition-colors duration-500 hover:text-marca lg:text-[13.2rem]"
        >
          Eduardo <em>Tajra</em>
        </p>
        <p className="mt-6 text-center font-mono text-[11px] text-papel/45">
          © {new Date().getFullYear()} · {t('sem template, feito do zero', 'no template, built from scratch')}
        </p>
      </div>
    </footer>
  )
}
