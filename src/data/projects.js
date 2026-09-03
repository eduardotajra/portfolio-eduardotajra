// Categorias exibidas nos filtros. A ordem aqui é a ordem dos botões.
export const categorias = [
  { id: 'clientes', label: 'Projetos para clientes' },
  { id: 'autorais', label: 'Projetos autorais' },
  { id: 'academicos', label: 'Acadêmicos' },
]

// `repoPrivate` esconde o botão "Código": repositório fechado não vira link quebrado.
// `featured` é o que aparece na home; o resto vive em /projetos.
// A descrição vem primeiro e fala do que o projeto faz — a stack é secundária.
export const projects = [
  {
    id: 1,
    title: 'Efeméride',
    description:
      'Um site que envelhece junto com quem o visita. Você diz sua data de nascimento e a página escurece, amarela e se desgasta até alcançar a sua idade.',
    category: 'autorais',
    tags: ['JavaScript', 'Canvas', 'CSS'],
    screenshot: '/screenshots/efemeride.png',
    repoPrivate: false,
    links: {
      demo: 'https://efemeride-alpha.vercel.app',
      github: 'https://github.com/eduardotajra/efemeride',
    },
    featured: true,
  },
  {
    id: 2,
    title: 'Openingdle',
    description:
      'Jogo diário de adivinhar aberturas de anime pelo trecho da música. Três modos de jogo e faixas separadas em vocal e instrumental para as fases difíceis.',
    category: 'clientes',
    tags: ['Next.js', 'React', 'TypeScript', 'Python'],
    screenshot: '/screenshots/openingdle.png',
    repoPrivate: false,
    links: {
      demo: 'https://openingdle.vercel.app',
      github: 'https://github.com/eduardotajra/openingdle',
    },
    featured: true,
  },
  {
    id: 3,
    title: 'Hexatombe: Abaixo de Zero',
    description:
      'Experiência interativa encomendada: o visitante começa diante de uma TV antiga e é levado até um computador retrô, onde a história se revela. Site privado do cliente.',
    category: 'clientes',
    tags: ['JavaScript', 'HTML', 'CSS'],
    // Site privado do cliente: sem print e sem link público, por decisão dele.
    screenshot: null,
    repoPrivate: true,
    confidencial: true,
    links: {
      demo: '',
      github: 'https://github.com/eduardotajra/hexatombe-abaixo-de-zero',
    },
    featured: true,
  },
  {
    id: 4,
    title: 'Team Staircase',
    description:
      'Site institucional de um estúdio de games. O time publica jogos e novidades sozinho, por um painel, sem precisar mexer no código.',
    category: 'clientes',
    tags: ['Next.js', 'TypeScript', 'Sanity CMS'],
    screenshot: '/screenshots/mandora.png',
    repoPrivate: false,
    links: {
      demo: 'https://teamstaircase.vercel.app/',
      github: 'https://github.com/eduardotajra/Mandora',
    },
    featured: true,
  },
  {
    id: 5,
    title: 'Projeto Fratura',
    description:
      'ARG de investigação sobre o desaparecimento de uma garota. Cada jogador tem login próprio, coleta provas e vê os medidores de confiança, suspeita e risco mudarem conforme escolhe.',
    category: 'autorais',
    tags: ['JavaScript', 'Firebase', 'Web Audio API'],
    screenshot: '/screenshots/fratura.png',
    repoPrivate: true,
    links: {
      demo: 'https://projeto-fratura.vercel.app',
      github: 'https://github.com/eduardotajra/projeto-fratura',
    },
    featured: true,
  },
  {
    id: 6,
    title: 'Arquivo da Célula',
    description:
      'O material de RPG de uma mesa virou um dossiê interno navegável: bestiário filtrável, grimório de rituais, decodificador de cifra e painel colaborativo em tempo real.',
    category: 'autorais',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'GSAP'],
    screenshot: '/screenshots/ordem.png',
    repoPrivate: true,
    links: {
      demo: 'https://ordem-arquivo-celula.vercel.app',
      github: 'https://github.com/eduardotajra/ordem-arquivo-celula',
    },
    featured: true,
  },
  {
    id: 7,
    title: 'Arquivo Meio-Sangue',
    description:
      'Atlas de leitura do universo de Percy Jackson: 50 livros, 60 deuses e 43 personagens catalogados, com controle de spoilers e mapas interativos.',
    category: 'autorais',
    tags: ['Next.js', 'React', 'Drizzle ORM', 'Cloudflare'],
    screenshot: '/screenshots/meiosangue.png',
    repoPrivate: true,
    links: {
      demo: 'https://arquivo-meio-sangue.vercel.app',
      github: 'https://github.com/eduardotajra/arquivo-meio-sangue',
    },
    featured: true,
  },
  {
    id: 8,
    title: 'Jornal Atlas',
    description:
      'Caça-palavras diário com cara de jornal antigo. Tema novo todo dia, enigmas escondidos na grade, histórico de resultados e placar para dividir com os amigos.',
    category: 'autorais',
    tags: ['JavaScript', 'Firebase', 'CSS'],
    screenshot: '/screenshots/atlas.png',
    repoPrivate: false,
    links: {
      demo: 'https://cacapalavras-atlas.vercel.app/',
      github: 'https://github.com/eduardotajra/cacapalavras-atlas',
    },
    featured: true,
  },
  {
    id: 9,
    title: 'FocusFM',
    description:
      'Timer Pomodoro que virou rotina de estudo: ranking entre usuários, estatísticas de foco, player de música e planos de tarefa gerados por IA.',
    category: 'autorais',
    tags: ['React', 'TypeScript', 'Supabase', 'Gemini'],
    screenshot: '/screenshots/focusfm.png',
    repoPrivate: false,
    links: {
      demo: 'https://focus-fm.vercel.app/',
      github: 'https://github.com/eduardotajra/FocusFM',
    },
    featured: false,
  },
  {
    id: 10,
    title: 'AtlasOS: Sonho',
    description:
      'Um sistema operacional que nunca existiu. O visitante explora arquivos, logs e um terminal para remontar uma história fragmentada.',
    category: 'autorais',
    tags: ['JavaScript', 'HTML', 'CSS'],
    screenshot: '/screenshots/atlasos.png',
    repoPrivate: true,
    links: {
      demo: 'https://atlasos-sonho.vercel.app',
      github: 'https://github.com/eduardotajra/atlasos-sonho',
    },
    featured: false,
  },
  {
    id: 12,
    title: 'Mapa Sistema Atlas',
    description:
      'Visualização de topologia de rede: os nós e as conexões de um sistema desenhados de forma navegável, em vez de uma planilha.',
    category: 'autorais',
    tags: ['JavaScript', 'SVG'],
    screenshot: '/screenshots/mapaatlas.png',
    repoPrivate: true,
    links: {
      demo: 'https://mapa-sistema-atlas.vercel.app',
      github: 'https://github.com/eduardotajra/mapa-sistema-atlas',
    },
    featured: false,
  },
  {
    id: 14,
    title: 'Onze de Ouro',
    description:
      'Jogo de draft e simulação de torneio com acervo fictício próprio. A mesma semente sempre gera o mesmo campeonato, então dá para repetir e comparar partidas.',
    category: 'autorais',
    tags: ['TypeScript'],
    screenshot: null,
    repoPrivate: false,
    links: {
      demo: '',
      github: 'https://github.com/eduardotajra/onze-de-ouro',
    },
    featured: false,
  },
  {
    id: 15,
    title: 'BackPex',
    description:
      'Plugin de Minecraft que adiciona mochilas evolutivas: 12 níveis, ritual de criação, itens que persistem entre sessões e dono registrado por mochila.',
    category: 'autorais',
    tags: ['Java', 'Spigot/Paper'],
    screenshot: null,
    repoPrivate: false,
    links: {
      demo: '',
      github: 'https://github.com/eduardotajra/BackPex',
    },
    featured: false,
  },
  {
    id: 16,
    title: 'Monitor de Cotação',
    description:
      'Robô que busca a cotação do dólar sozinho, guarda o histórico e serve os dados para um painel — sem ninguém abrir o site do banco.',
    category: 'autorais',
    tags: ['Node.js', 'Puppeteer', 'PostgreSQL', 'Next.js'],
    screenshot: null,
    repoPrivate: false,
    links: {
      demo: '',
      github: 'https://github.com/eduardotajra/monitor-cotacao-rpa',
    },
    featured: false,
  },
  {
    id: 17,
    title: 'qlattes',
    description:
      'Extensão de navegador que lê o currículo Lattes e classifica automaticamente cada artigo pelo Qualis da CAPES. Trabalho de conclusão de curso, usada por pesquisadores de verdade.',
    category: 'academicos',
    tags: ['JavaScript', 'Chrome', 'Firefox'],
    screenshot: '/screenshots/qlattes.png',
    repoPrivate: false,
    links: {
      demo: '',
      github: 'https://github.com/eduardotajra/qlattes',
    },
    featured: false,
  },
  {
    id: 18,
    title: 'brev.ly',
    description:
      'Encurtador de links com painel de gerenciamento e relatório exportável em CSV. Projeto da pós-graduação em desenvolvimento fullstack.',
    category: 'academicos',
    tags: ['Node.js', 'Fastify', 'React', 'PostgreSQL'],
    screenshot: null,
    repoPrivate: false,
    links: {
      demo: '',
      github: 'https://github.com/eduardotajra/brev.ly',
    },
    featured: false,
  },
  {
    id: 19,
    title: 'VaultGame',
    description:
      'Loja de jogos com catálogo, carrinho, login e fluxo de compra simulado. Desenvolvido em equipe na graduação.',
    category: 'academicos',
    tags: ['Django', 'React', 'MySQL'],
    screenshot: null,
    repoPrivate: false,
    links: {
      demo: '',
      github: 'https://github.com/eduardotajra/VaultGame',
    },
    featured: false,
  },
]
