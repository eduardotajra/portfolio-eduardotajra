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
  // AtlasOS: Sonho e Mapa Sistema Atlas ficaram fora por ora: fazem parte de um
  // universo de enigmas em andamento e expor o conteúdo entregaria pistas.
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

const nomesCategoriaEn = { clientes: 'Client projects', autorais: 'Personal projects', academicos: 'Academic' }
categorias.forEach((c) => {
  c.label_en = nomesCategoriaEn[c.id]
})

const descricoesEn = {
  1: 'A website that ages along with whoever visits it. You enter your birth date and the page darkens, yellows and wears out until it reaches your age.',
  2: 'Daily game where you guess anime openings from a snippet of the song. Three game modes and tracks split into vocals and instrumental for the hard levels.',
  3: 'Commissioned interactive experience: the visitor starts in front of an old TV and is led to a retro computer, where the story unfolds. Private client site.',
  4: 'Corporate website for a game studio. The team publishes games and news on its own, through a dashboard, without touching code.',
  5: 'Investigation ARG about a missing girl. Each player has their own login, collects evidence and watches trust, suspicion and risk meters change with their choices.',
  6: "A tabletop RPG group's material turned into a browsable internal dossier: filterable bestiary, ritual grimoire, cipher decoder and a real-time shared board.",
  7: 'Reading atlas for the Percy Jackson universe: 50 books, 60 gods and 43 characters cataloged, with spoiler control and interactive maps.',
  8: 'Daily word search styled like an old newspaper. A new theme every day, riddles hidden in the grid, result history and a score to share with friends.',
  9: 'A Pomodoro timer that became a study routine: leaderboard, focus stats, music player and AI-generated task plans.',
  14: 'Draft and tournament simulation game with its own fictional roster. The same seed always generates the same championship, so you can replay and compare.',
  15: 'Minecraft plugin that adds evolving backpacks: 12 levels, a crafting ritual, items that persist between sessions and a registered owner per backpack.',
  16: 'A bot that fetches the dollar exchange rate on its own, stores the history and serves the data to a dashboard, without anyone opening the bank website.',
  17: "Browser extension that reads the Lattes résumé and automatically ranks each paper by CAPES' Qualis. My final thesis, used by real researchers.",
  18: 'Link shortener with a management panel and a CSV-exportable report. Project from my full stack postgraduate course.',
  19: 'Game store with a catalog, cart, login and a simulated checkout. Built as a team in college.',
}
projects.forEach((p) => {
  if (descricoesEn[p.id]) p.description_en = descricoesEn[p.id]
})
