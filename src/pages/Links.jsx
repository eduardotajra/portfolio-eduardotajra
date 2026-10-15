import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
  XIcon,
  DiscordIcon,
} from '../components/icons'
import { contato } from '../data/contato'
import { useIdioma, SeletorIdioma } from '../i18n'

// Os dois primeiros são a razão de existir da página: pedir orçamento.
const acoes = [
  {
    titulo: 'Quero criar um projeto',
    titulo_en: 'I want to build a project',
    sub: 'site, jogo, mod, experiência interativa',
    sub_en: 'website, game, mod, interactive experience',
    href: contato.discord,
  },
  {
    titulo: 'Quero imprimir uma peça',
    titulo_en: 'I want something printed',
    sub: 'impressão 3D sob encomenda',
    sub_en: 'made-to-order 3D printing',
    href: contato.discord,
  },
]

const navegacao = [
  { titulo: 'Meus projetos', titulo_en: 'My projects', to: '/projetos' },
  { titulo: 'Mods de Minecraft', titulo_en: 'Minecraft mods', to: '/mods' },
  { titulo: 'Site completo', titulo_en: 'Full website', to: '/' },
]

const redes = [
  { Icone: DiscordIcon, nome: 'Discord', href: contato.discord },
  { Icone: InstagramIcon, nome: 'Instagram', href: contato.instagram },
  { Icone: TiktokIcon, nome: 'TikTok', href: contato.tiktok },
  { Icone: YoutubeIcon, nome: 'YouTube', href: contato.youtube },
  { Icone: XIcon, nome: 'X', href: contato.x },
  { Icone: GithubIcon, nome: 'GitHub', href: contato.github },
  { Icone: LinkedinIcon, nome: 'LinkedIn', href: contato.linkedin },
]

const seta = (
  <ArrowUpRight size={18} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
)

// Página leve de propósito (sem framer-motion): só CSS para o movimento.
export default function Links() {
  const { t, tr } = useIdioma()
  useEffect(() => {
    document.title = 'Eduardo Tajra · links'
    return () => {
      document.title = 'Eduardo Tajra · Dev'
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-end">
          <SeletorIdioma />
        </div>

        {/* Identidade: monograma a tinta, nome em serifa e uma nota à mão. */}
        <div className="mb-10 text-center">
          <svg width="56" height="52" viewBox="0 0 26 24" fill="none" aria-hidden="true" className="mx-auto mb-4">
            <path d="M10 4H3v16h7M3 12h6M13 4h9" stroke="#17140f" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.5 4v16" stroke="#bb2e17" strokeWidth="2.3" strokeLinecap="round" />
          </svg>
          <h1 className="titulo-serifa text-5xl text-tinta">
            Eduardo <em>Tajra</em>
          </h1>
          <p className="mt-2 text-text-secondary">
            {t('Sites, jogos, mods e impressão 3D', 'Websites, games, mods and 3D printing')}
          </p>
          <p className="font-mao mt-3 inline-block -rotate-2 bg-marca px-2 text-xl text-tinta">
            {t('aceitando novos projetos', 'open for new projects')}
          </p>
        </div>

        {/* Orçamento */}
        <div className="flex flex-col gap-3">
          {acoes.map((acao, i) => (
            <a
              key={acao.titulo}
              href={acao.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 rounded-2xl px-5 py-4 transition-colors duration-300 ${
                i === 0 ? 'bg-tinta text-papel hover:bg-accent' : 'border-[1.5px] border-tinta text-tinta hover:bg-tinta hover:text-papel'
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="titulo-serifa block text-2xl">{tr(acao, 'titulo')}</span>
                <span className="block text-sm opacity-70">{tr(acao, 'sub')}</span>
              </span>
              {seta}
            </a>
          ))}
        </div>

        {/* Navegação interna, como linhas de um índice. */}
        <ul className="mb-10 mt-8 border-t border-tinta">
          {navegacao.map(({ to, ...item }, i) => (
            <li key={to} className="border-b border-tinta/15">
              <Link to={to} className="group flex items-baseline gap-4 py-3.5 text-tinta">
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-lg transition-transform duration-300 group-hover:translate-x-1">{tr(item, 'titulo')}</span>
                {seta}
              </Link>
            </li>
          ))}
        </ul>

        {/* Redes: 8 itens em 4 colunas, duas fileiras iguais. */}
        <div className="grid grid-cols-4 gap-2">
          {redes.map(({ Icone, nome, href }) => (
            <a
              key={nome}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={nome}
              title={nome}
              className="flex h-12 w-full items-center justify-center rounded-xl border border-tinta/20 text-tinta transition-colors duration-200 hover:border-tinta hover:bg-tinta hover:text-papel"
            >
              <Icone size={18} />
            </a>
          ))}
          <a
            href={`mailto:${contato.email}`}
            aria-label={t('E-mail', 'Email')}
            title={t('E-mail', 'Email')}
            className="flex h-12 w-full items-center justify-center rounded-xl border border-tinta/20 text-tinta transition-colors duration-200 hover:border-tinta hover:bg-tinta hover:text-papel"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="font-mao mt-10 text-center text-xl text-tinta/60">eduardotajra.com</p>
      </div>
    </div>
  )
}
