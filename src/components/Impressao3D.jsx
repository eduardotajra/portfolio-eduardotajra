import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Upload, Sparkles, Wrench, PenTool, ArrowRight, ImageOff } from 'lucide-react'
import { contato } from '../data/contato'

/* ------------------------------------------------------------------ *
 * ⚠️  PLACEHOLDER — TROCAR ANTES DE PUBLICAR
 *
 * As fotos desta seção ainda não existem. Enquanto FOTOS_PENDENTES for
 * `true`, a galeria mostra molduras vazias marcadas como "foto pendente".
 *
 * Para publicar:
 *   1. salve as fotos reais em  public/impressao3d/
 *   2. confira se os nomes batem com os `arquivo` da lista `pecas`
 *   3. troque FOTOS_PENDENTES para false
 *
 * Não publicar esta seção com as molduras vazias.
 * ------------------------------------------------------------------ */
const FOTOS_PENDENTES = true

const pecas = [
  { arquivo: '/impressao3d/chaveiros.jpg', legenda: 'Chaveiros personalizados' },
  { arquivo: '/impressao3d/suporte.jpg', legenda: 'Suporte com QR code e NFC' },
  { arquivo: '/impressao3d/organizador.jpg', legenda: 'Organizador de mesa' },
  { arquivo: '/impressao3d/peca-funcional.jpg', legenda: 'Peça funcional sob medida' },
]

const comoFunciona = [
  {
    icone: Upload,
    titulo: 'Você manda o arquivo',
    texto: 'Tem um STL ou 3MF pronto? Combino cor e acabamento com você e imprimo.',
  },
  {
    icone: Sparkles,
    titulo: 'Peças personalizadas',
    texto: 'Nome, cor, tamanho: peças feitas para uma pessoa, um evento ou um grupo.',
  },
  {
    icone: Wrench,
    titulo: 'Peças funcionais',
    texto: 'Suportes, encaixes, organizadores e reposição daquela peça que quebrou.',
  },
  {
    icone: PenTool,
    titulo: 'Modelagem e adaptação',
    texto:
      'Quando o arquivo pronto não resolve, eu modelo ou adapto a peça no Fusion. Meu foco é em peças funcionais e personalizações.',
  },
]

function Item({ item, index }) {
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
        <h3 className="mb-1 text-sm font-semibold text-text-primary">{item.titulo}</h3>
        <p className="text-sm leading-relaxed text-text-secondary">{item.texto}</p>
      </div>
    </motion.div>
  )
}

export default function Impressao3D() {
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
            impressão 3D
          </p>
          <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
            Você manda o arquivo. Ou só a ideia.
          </h2>
          <p className="text-text-secondary">
            Imprimo peças sob encomenda: o modelo que você já tem, um que a gente escolhe
            junto, ou um que eu desenho quando não existe pronto.
          </p>
        </motion.div>

        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {comoFunciona.map((item, i) => (
            <Item key={item.titulo} item={item} index={i} />
          ))}
        </div>

        {/* Galeria */}
        <div className="mt-14">
          {FOTOS_PENDENTES && (
            <p className="mb-4 inline-flex items-center gap-2 rounded border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 font-mono text-[11px] text-yellow-500/90">
              <ImageOff size={12} />
              placeholder: trocar pelas fotos reais antes de publicar
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {pecas.map((peca, i) => (
              <motion.figure
                key={peca.arquivo}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                className="overflow-hidden rounded-xl border border-border bg-surface"
              >
                {FOTOS_PENDENTES ? (
                  <div className="flex aspect-square flex-col items-center justify-center gap-2 border-b border-dashed border-border-2 bg-surface-2 text-muted">
                    <ImageOff size={20} />
                    <span className="font-mono text-[10px]">foto pendente</span>
                  </div>
                ) : (
                  <img
                    src={peca.arquivo}
                    alt={peca.legenda}
                    loading="lazy"
                    className="aspect-square w-full border-b border-border object-cover"
                  />
                )}
                <figcaption className="px-3 py-2.5 text-xs text-text-secondary">
                  {peca.legenda}
                </figcaption>
              </motion.figure>
            ))}
          </div>

          {/* Credibilidade em tom de ficha técnica, não de currículo. */}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
            <span>cerca de 2 anos com impressão 3D</span>
            <span className="text-border-2">·</span>
            <span>aprendizado com conteúdos da STLFLIX / STL Academy</span>
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
              Me conta o que você quer imprimir
            </p>
            <p className="text-sm text-text-secondary">
              Manda o arquivo ou a ideia pelo WhatsApp que eu retorno com prazo e preço.
            </p>
          </div>
          <a
            href={contato.whatsapp3d}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-cyan px-5 py-3 text-sm font-semibold text-bg transition-all duration-200 hover:bg-cyan/90"
          >
            Pedir orçamento
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
