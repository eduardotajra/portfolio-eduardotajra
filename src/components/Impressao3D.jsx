import { motion } from 'framer-motion'
import { Upload, Sparkles, Wrench, PenTool } from 'lucide-react'
import { contato } from '../data/contato'
import { useIdioma } from '../i18n'
import ImpressoraIsometrica from '../motion/ImpressoraIsometrica'
import { Pincel } from '../motion/Pincel'
import { BotaoTinta } from '../motion/Botoes'

// Fotos de peças reais, como polaroids presas com fita, com anotação à mão por cima.
const pecas = [
  {
    arquivo: '/impressao3d/trofeu.jpg', legenda: 'Réplica de troféu com acabamento metálico', legenda_en: 'Trophy replica with a metallic finish',
    nota: 'metálico!', nota_en: 'metallic!', circulo: { left: '16%', top: '4%', width: '68%', height: '38%' }, posNota: { right: '6%', top: '47%' }, rot: -3,
  },
  {
    arquivo: '/impressao3d/suporte-controle.jpg', legenda: 'Suporte de controle em formato de tentáculo', legenda_en: 'Tentacle-shaped controller stand',
    nota: 'tentáculo!', nota_en: 'tentacle!', circulo: { left: '22%', top: '46%', width: '62%', height: '34%' }, posNota: { left: '6%', top: '6%' }, rot: 2,
  },
  {
    arquivo: '/impressao3d/dinossauro.jpg', legenda: 'Dinossauro com textura de tricô', legenda_en: 'Dinosaur with a knitted texture',
    nota: 'tricô', nota_en: 'knitted', circulo: { left: '38%', top: '16%', width: '54%', height: '30%' }, posNota: { left: '5%', bottom: '10%' }, rot: -1.5,
  },
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
    texto: 'Quando o arquivo pronto não resolve, eu modelo ou adapto a peça no Fusion. Meu foco é em peças funcionais e personalizações.',
    texto_en: 'When a ready-made file does not solve it, I model or adapt the part in Fusion. My focus is functional parts and personalization.',
  },
]

export default function Impressao3D() {
  const { t, tr } = useIdioma()

  return (
    <section id="impressao3d" className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="font-mao text-2xl text-accent">{t('a outra bancada', 'the other workbench')}</p>
            <h2 className="titulo-serifa text-[clamp(3rem,7vw,6rem)] text-tinta">
              {t('Você manda o arquivo.', 'You send the file.')}
              <br />
              <em>
                {t('Ou só a ', 'Or just the ')}
                <Pincel tipo="circulo" semente={14}>
                  {t('ideia', 'idea')}
                </Pincel>
                .
              </em>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
              {t(
                'Imprimo peças sob encomenda: o modelo que você já tem, um que a gente escolhe junto, ou um que eu desenho quando não existe pronto.',
                'I print made-to-order pieces: the model you already have, one we pick together, or one I design when nothing ready exists.'
              )}
            </p>
          </div>
          <ImpressoraIsometrica className="mx-auto h-64 w-72" />
        </div>

        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {comoFunciona.map((item, i) => {
            const Icone = item.icone
            return (
              <motion.div
                key={item.titulo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-5 border-t border-tinta/15 pt-6"
              >
                {/* Claymorphism: peças fofas de plástico, que amassam ao toque. */}
                <motion.div
                  whileHover={{ scaleX: 1.14, scaleY: 0.86, rotate: -4 }}
                  whileTap={{ scaleX: 0.9, scaleY: 1.1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 12 }}
                  className={`${i % 2 ? 'argila argila-azul' : 'argila'} flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center`}
                >
                  <Icone size={22} strokeWidth={2.3} />
                </motion.div>
                <div>
                  <h3 className="titulo-serifa text-3xl text-tinta">{tr(item, 'titulo')}</h3>
                  <p className="mt-2 leading-relaxed text-text-secondary">{tr(item, 'texto')}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Mixed media: foto real, fita adesiva, granulado e anotação a pincel. */}
        <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
          {pecas.map((peca, i) => (
            <motion.figure
              key={peca.arquivo}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: peca.rot }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 120, damping: 16, delay: i * 0.12 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className={`sombra-papel relative bg-white p-2.5 pb-3 sm:p-3 ${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <span className="fita -top-3 left-1/2 z-10 -translate-x-1/2 rotate-[3deg]" />
              <div className="granulado relative aspect-[3/4] overflow-hidden">
                <img
                  src={peca.arquivo}
                  alt={tr(peca, 'legenda')}
                  loading="lazy"
                  width="900"
                  height="1200"
                  className="h-full w-full object-cover"
                />
                <Pincel tipo="circulo" semente={i * 5 + 3} atraso={0.4 + i * 0.25} className="!absolute block" style={peca.circulo} cor="#ffd84a" />
                <span
                  aria-hidden="true"
                  className="font-mao absolute z-[2] -rotate-6 text-2xl font-bold text-marca [text-shadow:0_2px_8px_rgba(0,0,0,0.85)] sm:text-[1.7rem]"
                  style={peca.posNota}
                >
                  {tr(peca, 'nota')}
                </span>
              </div>
              <figcaption className="font-mao px-1 pt-2 text-xl leading-tight text-tinta/80">{tr(peca, 'legenda')}</figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span>{t('cerca de 2 anos com impressão 3D', 'about 2 years of 3D printing')}</span>
          <span aria-hidden="true">/</span>
          <span>{t('aprendizado com conteúdos da STLFLIX / STL Academy', 'learned through STLFLIX / STL Academy content')}</span>
          <span aria-hidden="true">/</span>
          <span>Bambu Lab P1S</span>
        </div>

        <div className="mt-14 flex flex-col items-start gap-5 border-t border-tinta pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="titulo-serifa text-4xl text-tinta">{t('Me conta o que você quer imprimir', 'Tell me what you want printed')}</p>
            <p className="mt-2 text-text-secondary">
              {t('Manda o arquivo ou a ideia pelo Discord que eu retorno com prazo e preço.', 'Send the file or the idea on Discord and I will get back with a deadline and a price.')}
            </p>
          </div>
          <BotaoTinta href={contato.discord} target="_blank" rel="noopener noreferrer">
            {t('Pedir orçamento', 'Get a quote')}
          </BotaoTinta>
        </div>
      </div>
    </section>
  )
}
