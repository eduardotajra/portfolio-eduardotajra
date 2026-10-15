// Mods e conteúdo de Minecraft. Cada item só mostra o que foi feito por mim:
// mapa, artes e mods originais de terceiros ficam creditados em `credito`.
// As mídias moram em public/mods e foram capturadas no próprio jogo.
export const mods = [
  {
    id: 'a-ilha',
    titulo: 'A Ilha',
    tipo: 'Projeto voluntário',
    plataforma: 'Forge 1.20.1',
    resumo:
      'Os sistemas exclusivos do SMP de terror e investigação A Ilha: um mineral amaldiçoado se espalha pelo mapa e cada jogador carrega a própria contaminação.',
    destaques: [
      'Contaminação individual, detector, colapso e tratamentos',
      'Laboratório com mais de 10 máquinas, câmaras de descontaminação e incidentes no reator',
      '12 Malditos com poderes e mutações no corpo, 8 criaturas e 4 chefes',
      'Fala por proximidade com balão, HUD de equipamento e tela de carregamento própria',
      'Construções geradas por código, exportadas para WorldEdit, Create e datapack',
    ],
    numeros: ['154 commits', '390 classes', '217 itens', '100 blocos'],
    credito: 'Mapa e parte das artes são da equipe do servidor.',
    video: { src: '/mods/a-ilha.mp4', poster: '/mods/ilha-poster.jpg', loop: false },
    galeria: [
      { src: '/mods/ilha-detector.jpg', legenda: 'Contaminação medida pelo detector' },
      { src: '/mods/ilha-chefes.jpg', contain: true, legenda: 'Os quatro chefes' },
      { src: '/mods/ilha-maldito-carne.jpg', legenda: 'Malditos no laboratório' },
      { src: '/mods/ilha-maldito-cristal.jpg', legenda: 'Mutação cristalina' },
      { src: '/mods/ilha-traje.jpg', legenda: 'Traje de contenção' },
      { src: '/mods/ilha-reator.jpg', contain: true, legenda: 'Reator de Síntese' },
      { src: '/mods/ilha-colapso.jpg', legenda: 'Colapso e janela de reação' },
      { src: '/mods/ilha-torre.jpg', legenda: 'Torre de vigia gerada por código' },
    ],
  },
  {
    id: 'aurador',
    titulo: 'Aurador 2.0',
    tipo: 'Trabalho para servidor',
    plataforma: 'NeoForge 1.21.1',
    resumo:
      'Mod sob encomenda para o servidor Aurador, ainda em desenvolvimento. Juntei dois mods da comunidade e aprimorei do meu jeito: itens novos e mudanças no que já existia, para ficar do jeito que o dono do servidor queria.',
    destaques: [
      'Tooltip em cartão: cor por arma, barras de atributo e habilidades no SHIFT',
      '4 armas novas: Orgulho, Fome, Vazio Intrínseco e Mil Faces, que copia a arma de quem te ataca',
      'Habilidades da Elegia do Amante: Portador Legítimo, Majestade e Última Dança',
      'Chat de proximidade, global OFF-RP e Comunicador para mensagens privadas',
      'Painel (Y) com editor de balões: skins, enfeites, cores e permissões VIP',
    ],
    numeros: ['em desenvolvimento', 'Java 21', 'Better Combat', 'Curios', "Iron's Spells"],
    credito: 'Mods originais: Traço, de Zacza, e Aurador Bubbles, de JupiterAstral.',
    video: { src: '/mods/aurador.mp4', poster: '/mods/aurador-poster.jpg', loop: true },
    galeria: [
      { src: '/mods/aurador-orgulho.jpg', contain: true, legenda: 'Cartão do Orgulho com habilidades' },
      { src: '/mods/aurador-roda.jpg', contain: true, legenda: 'Mil Faces e a Roda de Faces' },
      { src: '/mods/aurador-fome.jpg', contain: true, legenda: 'Cartão da Fome' },
      { src: '/mods/aurador-vazio.jpg', contain: true, legenda: 'Vazio Intrínseco: lança e cajado' },
      { src: '/mods/aurador-mil-faces.jpg', legenda: 'Mil Faces transformada' },
      { src: '/mods/aurador-painel-balao.jpg', contain: true, legenda: 'Editor de balões no painel' },
      { src: '/mods/aurador-painel-equipe.jpg', contain: true, legenda: 'Controles da equipe' },
      { src: '/mods/aurador-poster.jpg', legenda: 'Balão de fala em jogo' },
    ],
  },
  {
    id: 'ecos-do-tempo',
    titulo: 'Ecos do Tempo',
    tipo: 'Autoral',
    plataforma: 'NeoForge 1.21.1',
    resumo:
      'O tempo vira recurso: um cristal grava o que você faz e, depois, um eco fantasma repete tudo enquanto você faz outra coisa.',
    destaques: [
      'O Cristal de Eco grava até 15 s de movimento, blocos, golpes e itens',
      'Puzzles de dois jogadores feitos sozinho, combate N contra 1 e automação sem redstone',
      'Batuta troca o modo (uma vez, repetição, vai e volta) e inverte o sentido',
      'Ancoradouro invoca ecos sozinho, tirando material de um baú',
      'Testes automatizados para a persistência das gravações',
    ],
    numeros: ['41 classes', 'JUnit'],
    credito: null,
    video: { src: '/mods/ecos-do-tempo.mp4', poster: '/mods/ecos-poster.jpg', loop: true },
    galeria: [
      { src: '/mods/ecos-chega.jpg', legenda: 'O eco aparece' },
      { src: '/mods/ecos-dissolve.jpg', legenda: 'No fim, ele se desfaz' },
      { src: '/mods/ecos-cristal.jpg', contain: true, legenda: 'Cristal de Eco' },
      { src: '/mods/ecos-batuta.jpg', contain: true, legenda: 'Batuta de Ecos' },
    ],
  },
  {
    id: 'atlas',
    titulo: 'Atlas',
    tipo: 'KubeJS',
    plataforma: 'Minecraft 1.20.1',
    resumo:
      'Conteúdo do SMP Atlas escrito em KubeJS: itens, receitas e mecânicas novas sem precisar de um mod compilado.',
    destaques: [
      'Mais de 160 itens: peixes brasileiros, cafés, comidas, bebidas e minérios mesclados',
      'Plushiebox: caixa com animação de cassino de 3 rolos, fogos no jackpot e ranking',
      "Efeito Guelras: respira debaixo d'água e sofre fora dela, com a chuva aliviando",
      'Receitas, tags e ajustes de balanceamento do modpack',
    ],
    numeros: ['168 itens', '137 receitas'],
    credito: null,
    video: null,
    galeria: [{ src: '/mods/atlas-itens.jpg', legenda: 'Alguns dos itens', contain: true, pixel: true }],
  },
]

// Projetos menores que não pedem uma seção inteira.
export const extras = [
  {
    titulo: 'BackPex',
    descricao:
      'Plugin Spigot/Paper de mochilas evolutivas: 12 níveis, ritual de criação e dono registrado por mochila.',
    link: 'https://github.com/eduardotajra/BackPex',
  },
]

export const servicos = [
  'Mod do zero',
  'Sistemas para o seu servidor',
  'Ajustes e junção de mods',
  'KubeJS e datapacks',
  'Interfaces e HUDs',
  'Plugins Spigot/Paper',
]
