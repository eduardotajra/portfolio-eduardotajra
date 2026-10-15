import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Upload, Sparkles, Wrench, PenTool, ArrowRight } from 'lucide-react'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'

const pecas = [
  { arquivo: '/impressao3d/trofeu.jpg', legenda: 'Réplica de troféu com acabamento metálico', legenda_en: 'Trophy replica with a metallic finish' },
  { arquivo: '/impressao3d/suporte-controle.jpg', legenda: 'Suporte de controle em formato de tentáculo', legenda_en: 'Tentacle-shaped controller stand' },
  { arquivo: '/impressao3d/dinossauro.jpg', legenda: 'Dinossauro com textura de tricô', legenda_en: 'Dinosaur with a knitted texture' },
]

const comoFunciona = [
  {
    icone: Upload,
    titulo: 'Você manda o arquivo',
    titulo_en: 'You send the file',
    texto: 'Tem um STL ou 3MF pronto? Combino cor e acabamento com você e imprimo.',
    texto_en: 'Got an STL or 3MF ready? We agree on color and finish and I print it.',
  },
  {
    icone: Sparkles,
    titulo: 'Peças personalizadas',
    titulo_en: 'Personalized pieces',
    texto: 'Nome, cor, tamanho: peças feitas para uma pessoa, um evento ou um grupo.',
    texto_en: 'Name, color, size: pieces made for one person, an event or a group.',
  },
  {
    icone: Wrench,
    titulo: 'Peças funcionais',
    titulo_en: 'Functional parts',
    texto: 'Suportes, encaixes, organizadores e reposição daquela peça que quebrou.',
    texto_en: 'Stands, fittings, organizers and a replacement for that part that broke.',
  },
  {
    icone: PenTool,
    titulo: 'Modelagem e adaptação',
    titulo_en: 'Modeling and adapting',
    texto_en:
      'When a ready-made file does not solve it, I model or adapt the part in Fusion. My focus is functional parts and personalization.',
    texto:
      'Quando o arquivo pronto não resolve, eu modelo ou adapto a peça no Fusion. Meu foco é em peças funcionais e personalizações.',
  },
]

function Item({ item, index }) {
  const { tr } = useIdioma()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icone = item.icone

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan/25 bg-cyan/10 text-cyan">
        <Icone size={18} />
      </div>
      <div>
        <h3 className="mb-1 text-sm font-semibold text-text-primary">{tr(item, 'titulo')}</h3>
        <p className="text-sm leading-relaxed text-text-secondary">{tr(item, 'texto')}</p>
      </div>
    </motion.div>
  )
}

export default function Impressao3D() {
  const { t, tr } = useIdioma()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="impressao3d" className="border-t border-border bg-surface/20 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-cyan">
            {t('impressão 3D', '3D printing')}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
            {t('Você manda o arquivo. Ou só a ideia.', 'You send the file. Or just the idea.')}
          </h2>
          <p className="text-text-secondary">
            {t(
              'Imprimo peças sob encomenda: o modelo que você já tem, um que a gente escolhe junto, ou um que eu desenho quando não existe pronto.',
              'I print made-to-order pieces: the model you already have, one we pick together, or one I design when nothing ready exists.'
            )}
          </p>
        </motion.div>

        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {comoFunciona.map((item, i) => (
            <Item key={item.titulo} item={item} index={i} />
          ))}
        </div>

        {/* Galeria */}
        <div className="mt-14">
          {/* No mobile a primeira ocupa a linha inteira e as outras duas dividem a
              seguinte: composição cheia, sem célula vazia. No desktop, 3 colunas. */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {pecas.map((peca, i) => (
              <motion.figure
                key={peca.arquivo}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                className={`overflow-hidden rounded-xl border border-border bg-surface ${
                  i === 0 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <img
                  src={peca.arquivo}
                  alt={tr(peca, 'legenda')}
                  loading="lazy"
                  width="900"
                  height="1200"
                  className="aspect-[3/4] w-full border-b border-border object-cover"
                />
                <figcaption className="px-3 py-2.5 text-xs text-text-secondary">
                  {tr(peca, 'legenda')}
                </figcaption>
              </motion.figure>
            ))}
          </div>

          {/* Credibilidade em tom de ficha técnica, não de currículo. */}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
            <span>{t('cerca de 2 anos com impressão 3D', 'about 2 years of 3D printing')}</span>
            <span className="text-border-2">·</span>
            <span>{t('aprendizado com conteúdos da STLFLIX / STL Academy', 'learned through STLFLIX / STL Academy content')}</span>
            <span className="text-border-2">·</span>
            <span>Bambu Lab P1S</span>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-12 flex flex-col items-start gap-4 rounded-xl border border-cyan/25 bg-surface p-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="mb-1 text-base font-semibold text-text-primary">
              {t('Me conta o que você quer imprimir', 'Tell me what you want printed')}
            </p>
            <p className="text-sm text-text-secondary">
              {t('Manda o arquivo ou a ideia pelo Discord que eu retorno com prazo e preço.', 'Send the file or the idea on Discord and I will get back with a deadline and a price.')}
            </p>
          </div>
          <a
            href={contato.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-cyan px-5 py-3 text-sm font-semibold text-bg transition-all duration-200 hover:bg-cyan/90"
          >
            {t('Pedir orçamento', 'Get a quote')}
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
