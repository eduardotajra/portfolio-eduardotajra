import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../components/icons'
import { mods, extras, servicos, servicos_en } from '../data/mods'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'
import Flipbook from '../motion/Flipbook'
import { ImagemEsqueleto } from '../motion/Interacoes'
import { Pincel } from '../motion/Pincel'
import { BotaoTinta } from '../motion/Botoes'

const entrada = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

// Moldura de slot de inventário, a mesma da seção noturna da home.
const molduraPixel = { boxShadow: '0 -4px 0 0 #2c4433, 0 4px 0 0 #2c4433, -4px 0 0 0 #2c4433, 4px 0 0 0 #2c4433' }

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
      className="aspect-video w-full bg-black object-cover"
    />
  )
}

// Capturas como fotos soltas na mesa, com a legenda escrita à mão.
function Galeria({ itens, titulo }) {
  const { tr } = useIdioma()
  const colunas = itens.length === 1 ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'
  return (
    <div className={`mt-10 grid gap-x-5 gap-y-8 ${colunas}`}>
      {itens.map((item, i) => (
        <a
          key={item.src}
          href={item.src}
          target="_blank"
          rel="noopener noreferrer"
          className="sombra-papel group block bg-white p-1.5 pb-2 transition-transform duration-300 hover:-translate-y-1 hover:rotate-0"
          style={{ rotate: `${[-1.4, 1, -0.6, 1.3][i % 4]}deg` }}
        >
          <div className={`overflow-hidden bg-[#0b120d] ${itens.length === 1 ? '' : 'aspect-video'}`}>
            <ImagemEsqueleto
              src={item.src}
              alt={`${titulo}: ${tr(item, 'legenda')}`}
              loading="lazy"
              className={`h-full w-full ${item.contain ? 'object-contain' : 'object-cover'} ${item.pixel ? 'pixelado' : ''}`}
            />
          </div>
          <p className="font-mao px-1 pt-1.5 text-lg leading-tight text-tinta/80">{tr(item, 'legenda')}</p>
        </a>
      ))}
    </div>
  )
}

function Mod({ mod, i }) {
  const { t, tr } = useIdioma()
  const capa = mod.galeria[0]
  const titulo = tr(mod, 'titulo')
  return (
    <motion.article {...entrada} id={mod.id} className="scroll-mt-24 border-t border-tinta pt-10">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="titulo-serifa text-7xl text-tinta/15 lg:text-8xl">{String(i + 1).padStart(2, '0')}</p>
          <p className="mt-2 text-sm text-text-secondary">{tr(mod, 'tipo')}</p>
          <p className="font-mono text-xs text-muted">{mod.plataforma}</p>
        </div>

        <div className="min-w-0">
          <h2 className="titulo-serifa text-[clamp(2.6rem,5.5vw,4.6rem)] text-tinta">{titulo}</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-text-secondary">{tr(mod, 'resumo')}</p>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.3fr_1fr] xl:items-start">
            <div className="bg-[#0b120d] p-1" style={molduraPixel}>
              {mod.video ? (
                <Video video={mod.video} titulo={titulo} />
              ) : (
                <img
                  src={capa.src}
                  alt={`${titulo}: ${tr(capa, 'legenda')}`}
                  loading="lazy"
                  className={`w-full ${capa.pixel ? 'pixelado' : ''}`}
                />
              )}
            </div>

            <div>
              <ul className="space-y-3">
                {tr(mod, 'destaques').map((d) => (
                  <li key={d} className="flex gap-3 leading-relaxed text-text-secondary">
                    <span aria-hidden="true" className="mt-[0.7em] h-[3px] w-4 shrink-0 -rotate-6 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {tr(mod, 'numeros').map((n, k) => (
                  <span
                    key={n}
                    className="border-[1.5px] border-tinta/70 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-tinta"
                    style={{ rotate: `${[-2, 1.5, -1, 2.5, 0][k % 5]}deg` }}
                  >
                    {n}
                  </span>
                ))}
              </div>
              {mod.credito && <p className="font-mao mt-6 text-xl leading-snug text-accent">{tr(mod, 'credito')}</p>}
            </div>
          </div>

          {mod.flipbook && (
            <div className="pauta mt-12 border border-tinta/10 bg-[#f6f1e6] px-4 py-10">
              <Flipbook
                quadros={mod.flipbook}
                legenda={t('folheie o eco construindo o pilar, quadro a quadro', 'flip through the echo building the pillar, frame by frame')}
              />
            </div>
          )}

          {/* Sem vídeo, a imagem principal já é a galeria. */}
          {mod.video && <Galeria itens={mod.galeria} titulo={titulo} />}
        </div>
      </div>
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
    <section className="min-h-screen px-5 pb-28 pt-28 sm:px-8">
      <div className="mx-auto max-w-[1320px]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft size={15} />
            {t('Voltar para a home', 'Back to home')}
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_26rem]">
            <div>
              <p className="font-mao text-2xl text-accent">{t('a bancada de blocos', 'the block workbench')}</p>
              <h1 className="titulo-serifa text-[clamp(3.2rem,8vw,7.4rem)] text-tinta">
                {t('Mods e sistemas para ', 'Mods and systems for ')}
                <Pincel tipo="sublinhado" semente={52} atraso={0.4}>
                  <em>{t('servidores', 'servers')}</em>
                </Pincel>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                {t(
                  'Programo o que o servidor precisa: mecânicas, chefes, itens, chats, painéis e interfaces. Tudo abaixo foi capturado no próprio jogo.',
                  'I program what the server needs: mechanics, bosses, items, chats, panels and interfaces. Everything below was captured in the game itself.'
                )}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <BotaoTinta href={contato.discord} target="_blank" rel="noopener noreferrer">
                  {t('Quero um mod', 'I want a mod')}
                </BotaoTinta>
                <Link to="/projetos" className="titulo-serifa text-2xl italic text-tinta transition-colors hover:text-accent">
                  {t('ou ver os sites', 'or see the websites')}
                </Link>
              </div>
            </div>

            {/* Índice dos mods, como o sumário de um caderno. */}
            <nav aria-label={t('Ir para um mod', 'Jump to a mod')} className="self-end">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{t('sumário', 'contents')}</p>
              <ol className="border-t border-tinta">
                {mods.map((m, i) => (
                  <li key={m.id} className="border-b border-tinta/15">
                    <a href={`#${m.id}`} className="group flex items-baseline gap-4 py-3 text-tinta">
                      <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                      <span className="titulo-serifa text-2xl transition-transform duration-300 group-hover:translate-x-1.5">{tr(m, 'titulo')}</span>
                      <span className="ml-auto font-mono text-[11px] text-muted">{m.plataforma}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <p className="mt-14 max-w-5xl text-xl leading-[1.8] text-text-secondary" aria-label={t('O que eu faço em Minecraft', 'What I do in Minecraft')}>
            <span className="font-mao mr-2 text-2xl text-tinta">{t('o que eu faço:', 'what I do:')}</span>
            {(en ? servicos_en : servicos).map((s, i, todos) => (
              <span key={s}>
                {s}
                {i < todos.length - 1 && <span className="mx-2 text-accent">/</span>}
              </span>
            ))}
          </p>
        </motion.div>

        <div className="mt-20 flex flex-col gap-24">
          {mods.map((mod, i) => (
            <Mod key={mod.id} mod={mod} i={i} />
          ))}
        </div>

        <motion.div {...entrada} className="mt-24 grid gap-10 border-t border-tinta pt-10 lg:grid-cols-2">
          <div>
            <p className="font-mao text-2xl text-accent">{t('código aberto', 'open source')}</p>
            <ul className="mt-4 border-t border-tinta/15">
              {extras.map((e) => (
                <li key={e.titulo} className="border-b border-tinta/15">
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 py-5">
                    <GithubIcon size={18} className="mt-1.5 shrink-0 text-tinta" />
                    <span className="min-w-0 flex-1">
                      <span className="titulo-serifa block text-3xl text-tinta">{e.titulo}</span>
                      <span className="mt-1 block leading-relaxed text-text-secondary">{tr(e, 'descricao')}</span>
                    </span>
                    <ArrowUpRight size={20} className="mt-1.5 shrink-0 text-tinta transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-8 bg-tinta p-8 text-papel sm:p-10">
            <p className="titulo-serifa text-[clamp(2.4rem,4.5vw,3.8rem)]">
              {t('Tem uma ideia para o seu ', 'Got an idea for your ')}
              <em className="text-marca">{t('servidor?', 'server?')}</em>
            </p>
            <div>
              <p className="mb-6 text-papel/75">
                {t('Me chama no Discord e eu digo como dá para fazer.', 'Message me on Discord and I will tell you how it can be done.')}
              </p>
              <BotaoTinta href={contato.discord} target="_blank" rel="noopener noreferrer" variante="noite">
                {t('Chamar no Discord', 'Message on Discord')}
              </BotaoTinta>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
