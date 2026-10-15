import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Blocks } from 'lucide-react'
import { GithubIcon, DiscordIcon } from '../components/icons'
import { mods, extras, servicos, servicos_en } from '../data/mods'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'
import Flipbook from '../motion/Flipbook'
import { ImagemEsqueleto } from '../motion/Interacoes'
import { Titulo } from '../motion/Tipografia'

const entrada = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

// Clipes curtos rodam sozinhos, mudos, só enquanto estão na tela.
// O vídeo longo (com som) fica parado até a pessoa dar play.
function Video({ video, titulo }) {
  const { t } = useIdioma()
  const ref = useRef(null)
  const visivel = useInView(ref, { margin: '-15% 0px' })
  const reduzirMovimento =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const automatico = video.loop && !reduzirMovimento

  useEffect(() => {
    const el = ref.current
    if (!el || !automatico) return
    if (visivel) el.play().catch(() => {})
    else el.pause()
  }, [visivel, automatico])

  return (
    <video
      ref={ref}
      src={video.src}
      poster={video.poster}
      muted={video.loop}
      loop={video.loop}
      playsInline
      controls={!automatico}
      preload={automatico ? 'metadata' : 'none'}
      aria-label={t(`Vídeo de ${titulo}`, `Video of ${titulo}`)}
      className="aspect-video w-full rounded-xl border border-border-2 bg-black object-cover"
    />
  )
}

function Galeria({ itens, titulo }) {
  const { tr } = useIdioma()
  const colunas = itens.length === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-4'
  return (
    <div className={`mt-6 grid gap-3 ${colunas}`}>
      {itens.map((item) => (
        <a
          key={item.src}
          href={item.src}
          target="_blank"
          rel="noopener noreferrer"
          className="group overflow-hidden rounded-lg border border-border bg-[#0b0b12] transition-colors duration-200 hover:border-border-2"
        >
          <div className={itens.length === 1 ? '' : 'aspect-video'}>
            <ImagemEsqueleto
              src={item.src}
              alt={`${titulo}: ${tr(item, 'legenda')}`}
              loading="lazy"
              className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
                item.contain ? 'object-contain' : 'object-cover'
              } ${item.pixel ? '[image-rendering:pixelated]' : ''}`}
            />
          </div>
          <p className="px-3 py-2 font-mono text-[11px] text-text-secondary">{tr(item, 'legenda')}</p>
        </a>
      ))}
    </div>
  )
}

function Mod({ mod }) {
  const { t, tr } = useIdioma()
  const capa = mod.galeria[0]
  const titulo = tr(mod, 'titulo')
  return (
    <motion.article
      {...entrada}
      id={mod.id}
      className="scroll-mt-24 rounded-2xl border border-border bg-surface p-5 sm:p-8"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {tr(mod, 'tipo')} · {mod.plataforma}
      </p>
      <h2 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">{titulo}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-text-secondary">{tr(mod, 'resumo')}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        {mod.video ? (
          <Video video={mod.video} titulo={titulo} />
        ) : (
          <img
            src={capa.src}
            alt={`${titulo}: ${tr(capa, 'legenda')}`}
            loading="lazy"
            className={`w-full rounded-xl border border-border-2 bg-[#0b0b12] ${
              capa.pixel ? '[image-rendering:pixelated]' : ''
            }`}
          />
        )}

        <div>
          <ul className="space-y-2.5">
            {tr(mod, 'destaques').map((d) => (
              <li key={d} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-accent" />
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {tr(mod, 'numeros').map((n) => (
              <span
                key={n}
                className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-secondary"
              >
                {n}
              </span>
            ))}
          </div>
          {mod.credito && <p className="mt-4 text-xs leading-relaxed text-muted">{tr(mod, 'credito')}</p>}
        </div>
      </div>

      {mod.flipbook && (
        <div className="mt-8 rounded-xl border border-border bg-bg/40 px-4 py-8">
          <Flipbook
            quadros={mod.flipbook}
            legenda={t('folheie o eco construindo o pilar, quadro a quadro', 'flip through the echo building the pillar, frame by frame')}
          />
        </div>
      )}

      {/* Sem vídeo, a imagem principal já é a galeria. */}
      {mod.video && <Galeria itens={mod.galeria} titulo={titulo} />}
    </motion.article>
  )
}

export default function Mods() {
  const { hash } = useLocation()
  const { t, tr, en } = useIdioma()

  useEffect(() => {
    document.title = en ? 'Minecraft mods · Eduardo Tajra' : 'Mods de Minecraft · Eduardo Tajra'
    return () => {
      document.title = 'Eduardo Tajra · Dev'
    }
  }, [en])

  // Os cards da home apontam para /mods#id: rola até o mod depois da montagem.
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' }), 120)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <section className="min-h-screen px-6 pb-24 pt-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft size={15} />
            {t('Voltar para a home', 'Back to home')}
          </Link>

          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">minecraft</p>
          <Titulo as="h1" className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
            {t('Mods e sistemas para servidores', 'Mods and systems for servers')}
          </Titulo>
          <p className="max-w-2xl text-text-secondary">
            {t(
              'Programo o que o servidor precisa: mecânicas, chefes, itens, chats, painéis e interfaces. Tudo abaixo foi capturado no próprio jogo.',
              'I program what the server needs: mechanics, bosses, items, chats, panels and interfaces. Everything below was captured in the game itself.'
            )}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={contato.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-dark hover:text-text-primary"
            >
              <DiscordIcon size={16} />
              {t('Quero um mod', 'I want a mod')}
            </a>
            <Link
              to="/projetos"
              className="inline-flex items-center gap-2 rounded-lg border border-border-2 px-5 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              {t('Ver sites e outros projetos', 'See websites and other projects')}
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label={t('O que eu faço em Minecraft', 'What I do in Minecraft')}>
            {(en ? servicos_en : servicos).map((s) => (
              <li
                key={s}
                className="rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-secondary"
              >
                {s}
              </li>
            ))}
          </ul>

          <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label={t('Ir para um mod', 'Jump to a mod')}>
            {mods.map((m) => (
              <a key={m.id} href={`#${m.id}`} className="text-text-secondary transition-colors hover:text-accent">
                {tr(m, 'titulo')}
              </a>
            ))}
          </nav>
        </motion.div>

        <div className="mt-12 flex flex-col gap-8">
          {mods.map((mod) => (
            <Mod key={mod.id} mod={mod} />
          ))}
        </div>

        <motion.div {...entrada} className="mt-8 grid gap-4 sm:grid-cols-2">
          {extras.map((e) => (
            <a
              key={e.titulo}
              href={e.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-2"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-text-secondary">
                <Blocks size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-semibold text-text-primary">
                  {e.titulo}
                  <GithubIcon size={14} />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-text-secondary">{tr(e, 'descricao')}</span>
              </span>
              <ArrowUpRight size={16} className="shrink-0 text-muted transition-colors group-hover:text-accent" />
            </a>
          ))}
          <a
            href={contato.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-center rounded-xl border border-accent/30 bg-accent/10 p-5 transition-colors hover:border-accent/70"
          >
            <span className="font-semibold text-text-primary">{t('Tem uma ideia para o seu servidor?', 'Got an idea for your server?')}</span>
            <span className="mt-1 text-sm text-text-secondary">
              {t('Me chama no Discord e eu digo como dá para fazer.', 'Message me on Discord and I will tell you how it can be done.')}
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
