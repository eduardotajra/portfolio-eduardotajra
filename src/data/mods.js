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
      'Os sistemas de um SMP de terror e investigação: um mineral amaldiçoado se espalha pelo mapa e cada jogador carrega a própria contaminação.',
    destaques: [
      'Contaminação por jogador, com sintomas, colapso, detector e cura',
      'Máquinas com interface própria e um laboratório inteiro para tratar jogadores',
      'Transformações no corpo do jogador, cada uma com poderes e visual próprio',
      'Criaturas e 4 chefes com ataques e efeitos visuais feitos do zero',
      'Chat por proximidade com balão de fala, HUD e tela de carregamento customizados',
      'Construções inteiras geradas por código',
    ],
    numeros: ['154 commits', '390 classes', '217 itens', '100 blocos'],
    credito: 'Mapa e parte das artes são da equipe do servidor.',
    video: { src: '/mods/a-ilha.mp4', poster: '/mods/ilha-poster.jpg', loop: false },
    galeria: [
      { src: '/mods/ilha-detector.jpg', legenda: 'Contaminação medida pelo detector' },
      { src: '/mods/ilha-chefes.jpg', contain: true, legenda: 'Os quatro chefes' },
      { src: '/mods/ilha-maldito-carne.jpg', legenda: 'Transformação no corpo' },
      { src: '/mods/ilha-maldito-cristal.jpg', legenda: 'Mutação cristalina' },
      { src: '/mods/ilha-traje.jpg', legenda: 'Traje de contenção' },
      { src: '/mods/ilha-reator.jpg', contain: true, legenda: 'Interface de máquina' },
      { src: '/mods/ilha-colapso.jpg', legenda: 'HUD de contaminação' },
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
      'Armas com poderes: roubar a cura do inimigo, atordoar todos em volta e até copiar a arma de quem te ataca',
      '4 armas novas e tooltips em cartão, com atributos em barras e habilidades',
      'Chat por proximidade, canal global e mensagens privadas por item',
      'Painel próprio com editor de balões de fala, cores e permissões VIP',
    ],
    numeros: ['em desenvolvimento', 'Java 21', 'Better Combat', 'Curios', "Iron's Spells"],
    credito: 'Mods originais: Aurador Weapons, de Zacza, e Aurador Bubbles, de JupiterAstral.',
    video: { src: '/mods/aurador.mp4', poster: '/mods/aurador-poster.jpg', loop: true },
    galeria: [
      { src: '/mods/aurador-orgulho.jpg', contain: true, legenda: 'Tooltip em cartão com habilidades' },
      { src: '/mods/aurador-roda.jpg', contain: true, legenda: 'Arma que guarda as armas que copiou' },
      { src: '/mods/aurador-fome.jpg', contain: true, legenda: 'Tooltip de outra arma' },
      { src: '/mods/aurador-vazio.jpg', contain: true, legenda: 'Arma com efeito diferente em cada mão' },
      { src: '/mods/aurador-mil-faces.jpg', legenda: 'Arma transformada na que copiou' },
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
      'Um cristal grava até 15 s do que você faz: andar, construir, quebrar e atacar',
      'Resolva puzzles de dois jogadores sozinho',
      'Monte exércitos de ecos ou automações sem redstone',
      'Controle os ecos: repetir em loop, ir e voltar ou inverter o sentido',
      'Testes automatizados para não perder nenhuma gravação',
    ],
    numeros: ['41 classes', 'JUnit'],
    credito: null,
    video: { src: '/mods/ecos-do-tempo.mp4', poster: '/mods/ecos-poster.jpg', loop: true },
    galeria: [
      { src: '/mods/ecos-chega.jpg', legenda: 'O eco aparece' },
      { src: '/mods/ecos-dissolve.jpg', legenda: 'No fim, ele se desfaz' },
      { src: '/mods/ecos-cristal.jpg', contain: true, legenda: 'O cristal que grava' },
      { src: '/mods/ecos-batuta.jpg', contain: true, legenda: 'O item que controla os ecos' },
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
      'Mais de 160 itens novos: peixes, comidas, bebidas e minérios',
      'Caixa de prêmios com animação de cassino e fogos no jackpot',
      "Efeitos novos, como respirar debaixo d'água e sofrer fora dela",
      'Receitas e balanceamento do modpack',
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
