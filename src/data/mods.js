// Mods e conteúdo de Minecraft. Cada item só mostra o que foi feito por mim:
// mapa, artes e mods originais de terceiros ficam creditados em `credito`.
// As mídias moram em public/mods e foram capturadas no próprio jogo.
export const mods = [
  {
    id: 'a-ilha',
    titulo: 'A Ilha',
    chamada: 'Contaminação, transformações e chefes para um SMP de terror',
    capa: { src: '/mods/ilha-maldito-carne.jpg' },
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
    chamada: 'Armas com poderes, chat por proximidade e balões de fala',
    capa: { src: '/mods/aurador-poster.jpg' },
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
    chamada: 'Grave suas ações e um clone fantasma repete tudo',
    capa: { src: '/mods/ecos-poster.jpg' },
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
    chamada: 'Mais de 160 itens e uma caixa de prêmios com cassino',
    capa: { src: '/mods/atlas-itens.jpg', pixel: true },
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

// Versão em inglês: os campos *_en são lidos pelo seletor de idioma.
const ingles = {
  'a-ilha': {
    tipo_en: 'Volunteer project',
    chamada_en: 'Contamination, transformations and bosses for a horror SMP',
    resumo_en:
      'The systems of a horror and investigation SMP: a cursed mineral spreads across the map and every player carries their own contamination.',
    destaques_en: [
      'Per-player contamination, with symptoms, collapse, a detector and a cure',
      'Machines with their own interfaces and a whole lab to treat players',
      "Transformations of the player's body, each with its own powers and look",
      'Creatures and 4 bosses with attacks and visual effects made from scratch',
      'Proximity chat with speech bubbles, a custom HUD and loading screen',
      'Entire buildings generated by code',
    ],
    numeros_en: ['154 commits', '390 classes', '217 items', '100 blocks'],
    credito_en: "The map and part of the art are by the server's team.",
    legendas_en: [
      'Contamination read by the detector',
      'The four bosses',
      'Body transformation',
      'Crystal mutation',
      'Containment suit',
      'Machine interface',
      'Contamination HUD',
      'Watchtower generated by code',
    ],
  },
  aurador: {
    tipo_en: 'Commissioned work',
    chamada_en: 'Weapons with powers, proximity chat and speech bubbles',
    resumo_en:
      'A commissioned mod for the Aurador server, still in development. I merged two community mods and improved them my way: new items and changes to what was already there, the way the server owner wanted.',
    destaques_en: [
      "Weapons with powers: steal the enemy's healing, stun everyone around and even copy the weapon of whoever hits you",
      '4 new weapons and card-style tooltips with stat bars and abilities',
      'Proximity chat, a global channel and private messages through an item',
      'A custom panel with a speech bubble editor, colors and VIP permissions',
    ],
    numeros_en: ['in development', 'Java 21', 'Better Combat', 'Curios', "Iron's Spells"],
    credito_en: 'Original mods: Aurador Weapons, by Zacza, and Aurador Bubbles, by JupiterAstral.',
    legendas_en: [
      'Card-style tooltip with abilities',
      'A weapon that keeps the weapons it copied',
      'Tooltip of another weapon',
      'A weapon with a different effect in each hand',
      'Weapon turned into the one it copied',
      'Bubble editor in the panel',
      'Staff controls',
      'Speech bubble in game',
    ],
  },
  'ecos-do-tempo': {
    titulo_en: 'Echoes of Time',
    tipo_en: 'Personal project',
    chamada_en: 'Record your actions and a ghost clone repeats everything',
    resumo_en:
      'Time becomes a resource: a crystal records what you do and, later, a ghost echo repeats it all while you do something else.',
    destaques_en: [
      'A crystal records up to 15 s of what you do: walking, building, breaking and attacking',
      'Solve two-player puzzles on your own',
      'Build armies of echoes or automation without redstone',
      'Control the echoes: loop, go back and forth or play in reverse',
      'Automated tests so no recording is ever lost',
    ],
    numeros_en: ['41 classes', 'JUnit'],
    legendas_en: ['The echo appears', 'In the end, it fades away', 'The recording crystal', 'The item that controls echoes'],
  },
  atlas: {
    tipo_en: 'KubeJS',
    chamada_en: 'Over 160 items and a prize box with a slot machine',
    resumo_en: 'Content for the Atlas SMP written in KubeJS: items, recipes and new mechanics without a compiled mod.',
    destaques_en: [
      'Over 160 new items: fish, food, drinks and ores',
      'A prize box with a slot machine animation and fireworks on the jackpot',
      'New effects, like breathing underwater and suffering out of it',
      'Recipes and modpack balancing',
    ],
    numeros_en: ['168 items', '137 recipes'],
    legendas_en: ['Some of the items'],
  },
}

for (const mod of mods) {
  const { legendas_en: legendas, ...campos } = ingles[mod.id]
  Object.assign(mod, campos)
  mod.galeria.forEach((item, i) => {
    item.legenda_en = legendas[i]
  })
}

extras[0].descricao_en =
  'Spigot/Paper plugin with evolving backpacks: 12 levels, a crafting ritual and a registered owner per backpack.'

export const servicos_en = [
  'Mods from scratch',
  'Systems for your server',
  'Tweaking and merging mods',
  'KubeJS and datapacks',
  'Interfaces and HUDs',
  'Spigot/Paper plugins',
]
