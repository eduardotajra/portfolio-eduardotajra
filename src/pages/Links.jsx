import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code2, Box, FolderOpen, Globe, Blocks, ArrowUpRight, Mail } from 'lucide-react'
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
  XIcon,
  WhatsappIcon,
} from '../components/icons'
import { contato } from '../data/contato'

// Os dois primeiros são a razão de existir da página: pedir orçamento.
const acoes = [
  {
    icone: Code2,
    titulo: 'Quero criar um projeto',
    sub: 'site, jogo, experiência interativa',
    href: contato.whatsappDev,
    destaque: 'accent',
  },
  {
    icone: Box,
    titulo: 'Quero imprimir uma peça',
    sub: 'impressão 3D sob encomenda',
    href: contato.whatsapp3d,
    destaque: 'cyan',
  },
]

const navegacao = [
  { icone: FolderOpen, titulo: 'Meus projetos', to: '/projetos' },
  { icone: Blocks, titulo: 'Mods de Minecraft', to: '/mods' },
  { icone: Globe, titulo: 'Site completo', to: '/' },
]

const redes = [
  { Icone: WhatsappIcon, nome: 'WhatsApp', href: contato.whatsappGeral },
  { Icone: InstagramIcon, nome: 'Instagram', href: contato.instagram },
  { Icone: TiktokIcon, nome: 'TikTok', href: contato.tiktok },
  { Icone: YoutubeIcon, nome: 'YouTube', href: contato.youtube },
  { Icone: XIcon, nome: 'X', href: contato.x },
  { Icone: GithubIcon, nome: 'GitHub', href: contato.github },
  { Icone: LinkedinIcon, nome: 'LinkedIn', href: contato.linkedin },
]

export default function Links() {
  useEffect(() => {
    document.title = 'Eduardo Tajra · links'
    return () => {
      document.title = 'Eduardo Tajra · Dev'
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center px-5 py-12">
      <div className="w-full max-w-sm">
        {/* Identidade */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border-2 bg-surface font-mono text-xl font-bold text-accent">
            ET
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Eduardo Tajra</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Desenvolvimento web e impressão 3D
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border-2 bg-surface/60 px-3 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
              aceitando novos projetos
            </span>
          </div>
        </div>

        {/* Orçamento */}
        <div className="mb-3 flex flex-col gap-3">
          {acoes.map(({ icone: Icone, titulo, sub, href, destaque }) => {
            const ehAccent = destaque === 'accent'
            return (
              <a
                key={titulo}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 rounded-xl border p-4 transition-colors duration-200 ${
                  ehAccent
                    ? 'border-accent/30 bg-accent/10 hover:border-accent/70'
                    : 'border-cyan/30 bg-cyan/10 hover:border-cyan/70'
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    ehAccent ? 'bg-accent/15 text-accent' : 'bg-cyan/15 text-cyan'
                  }`}
                >
                  <Icone size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-text-primary">{titulo}</span>
                  <span className="block text-xs text-text-secondary">{sub}</span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            )
          })}
        </div>

        {/* Navegação interna */}
        <div className="mb-8 flex flex-col gap-3">
          {navegacao.map(({ icone: Icone, titulo, to }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors duration-200 hover:border-border-2"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-text-secondary">
                <Icone size={18} />
              </span>
              <span className="flex-1 text-sm font-semibold text-text-primary">{titulo}</span>
              <ArrowUpRight
                size={16}
                className="shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>

        {/* Redes */}
        {/* 8 itens em 4 colunas: duas fileiras iguais, sem sobra solta. */}
        <div className="grid grid-cols-4 gap-2">
          {redes.map(({ Icone, nome, href }) => (
            <a
              key={nome}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={nome}
              title={nome}
              className="flex h-11 w-full items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            >
              <Icone size={17} />
            </a>
          ))}
          <a
            href={`mailto:${contato.email}`}
            aria-label="Email"
            title="Email"
            className="flex h-11 w-full items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors duration-200 hover:border-accent/50 hover:text-accent"
          >
            <Mail size={17} />
          </a>
        </div>

        <p className="mt-10 text-center font-mono text-[11px] text-muted">
          eduardotajra.vercel.app
        </p>
      </div>
    </div>
  )
}
