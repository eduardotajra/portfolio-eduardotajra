import { motion } from 'framer-motion'
import { useIdioma } from '../i18n'
import { Pincel } from '../motion/Pincel'

// Ferramentas em frase corrida, como alguém contaria, e não numa nuvem de etiquetas.
const ferramentas = [
  { pt: 'No front', en: 'On the front', itens: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Framer Motion', 'GSAP'] },
  { pt: 'no back', en: 'on the back', itens: ['Node.js', 'Fastify', 'PostgreSQL', 'Drizzle', 'Supabase', 'Firebase', 'Python', 'Django'] },
  { pt: 'nos mods', en: 'for mods', itens: ['Java', 'Forge', 'NeoForge', 'Fabric', 'Paper', 'KubeJS'] },
  { pt: 'e no resto', en: 'and for the rest', itens: ['Git', 'Docker', 'Vercel', 'Cloudflare Workers', 'Figma', 'Sanity'] },
]

function Lista({ itens, en }) {
  return itens.map((n, i) => (
    <span key={n}>
      <span className="cursor-default bg-[linear-gradient(transparent_55%,#ffd84a_55%)] bg-[length:0%_100%] bg-no-repeat text-tinta transition-[background-size] duration-500 hover:bg-[length:100%_100%]">
        {n}
      </span>
      {i < itens.length - 2 ? ', ' : i === itens.length - 2 ? (en ? ' and ' : ' e ') : ''}
    </span>
  ))
}

export default function About() {
  const { t, en } = useIdioma()

  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 lg:py-32">
      {/* Margem vermelha de caderno. */}
      <div aria-hidden="true" className="absolute bottom-0 left-[max(1.25rem,calc(50%-660px))] top-0 hidden w-px bg-accent/50 lg:block" />
      <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:pl-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mao text-2xl text-accent">{t('quem escreve isso', 'who writes this')}</p>
          <h2 className="titulo mb-8 text-[clamp(3rem,7vw,6rem)] text-tinta">
            {t('Olá, sou o ', "Hi, I'm ")}
            <Pincel tipo="marca" semente={31}>
              <em>Eduardo.</em>
            </Pincel>
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-text-secondary">
            <p>
              {t(
                'Sou desenvolvedor full stack, com mais prática no front end, e estou cursando a pós-graduação Full-Stack com IA da Rocketseat. Já fiz extensão de navegador, jogo diário, ARG com login para cada jogador e plataforma com ranking de usuários.',
                'I am a full stack developer with most of my practice on the front end, currently doing the Full Stack with AI postgraduate program at Rocketseat. I have built a browser extension, daily games, an ARG with a login for every player and a platform with a user leaderboard.'
              )}
            </p>
            <p>
              {t(
                'Meu TCC virou uma extensão usada de verdade por pesquisadores do CNPq. Um projeto pessoal virou um estúdio de jogos.',
                'My final thesis became an extension that CNPq researchers actually use. A personal project became a game studio.'
              )}
            </p>
            <p>
              {t(
                'Hoje trabalho com projetos sob encomenda, de sites e jogos a mods e peças impressas em 3D, e sigo',
                'Today I work on commissioned projects, from websites and games to mods and 3D printed parts, and I am still'
              )}{' '}
              <Pincel tipo="sublinhado" semente={33} atraso={0.4}>
                <span className="text-tinta">{t('disponível para novos trabalhos', 'available for new work')}</span>
              </Pincel>
              .
            </p>
          </div>

          {/* Assinatura que se desenha sozinha: o traço corre e depois a tinta preenche. */}
          <svg viewBox="0 0 340 80" className="mt-10 h-16 w-64 overflow-visible" aria-hidden="true">
            <motion.text
              x="4"
              y="58"
              className="font-mao"
              fontSize="58"
              fontWeight="700"
              stroke="#17140f"
              strokeWidth="1.1"
              strokeDasharray="1200"
              initial={{ strokeDashoffset: 1200, fillOpacity: 0 }}
              whileInView={{ strokeDashoffset: 0, fillOpacity: 1 }}
              viewport={{ once: true }}
              transition={{ strokeDashoffset: { duration: 2.4, ease: 'easeInOut' }, fillOpacity: { duration: 0.8, delay: 1.9 } }}
              fill="#17140f"
            >
              Eduardo Tajra
            </motion.text>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pt-24"
        >
          <h3 className="titulo mb-6 border-b border-tinta pb-3 text-3xl text-tinta">{t('Com o que eu trabalho', 'What I work with')}</h3>
          <p className="text-xl leading-[1.75] text-text-secondary">
            {ferramentas.map((g, i) => (
              <span key={g.pt}>
                {en ? g.en : g.pt}: <Lista itens={g.itens} en={en} />
                {i < ferramentas.length - 1 ? '; ' : '.'}{' '}
              </span>
            ))}
          </p>
          {/* Só faz sentido onde existe mouse: em tela de toque a dica some. */}
          <p className="font-mao mt-6 hidden text-2xl text-tinta/70 [@media(hover:hover)]:block">{t('passa o mouse nos nomes ↑', 'hover the names ↑')}</p>
        </motion.div>
      </div>
    </section>
  )
}
