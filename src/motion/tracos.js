// Motor de pinceladas.
// Recebe uma linha central (pontos de controle) e devolve o desenho de um traço
// de pincel: o corpo com pressão (afina no começo e no fim) e tremor de mão,
// mais as cerdas secas por cima, que deixam falhas no final do traço.
// Funções puras e com semente: o mesmo traço sai sempre igual, no site (SVG)
// e nos vídeos (canvas).

// Gerador pseudoaleatório com semente (mulberry32).
export function aleatorio(semente = 1) {
  let a = semente >>> 0 || 1
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Catmull-Rom: passa por todos os pontos de controle com curvas suaves.
export function suaviza(pontos, passos = 10) {
  const n = pontos.length
  if (n < 2) return pontos.slice()
  const out = []
  for (let i = 0; i < n - 1; i++) {
    const p0 = pontos[Math.max(i - 1, 0)]
    const p1 = pontos[i]
    const p2 = pontos[i + 1]
    const p3 = pontos[Math.min(i + 2, n - 1)]
    for (let s = 0; s < passos; s++) {
      const t = s / passos
      const t2 = t * t
      const t3 = t2 * t
      out.push([
        0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
      ])
    }
  }
  out.push(pontos[n - 1])
  return out
}

// Ruído suave (value noise 1D) para o tremor da mão ao longo do traço.
function ruido(rand, n) {
  const nos = Array.from({ length: n + 2 }, () => rand() * 2 - 1)
  return (t) => {
    const x = t * n
    const i = Math.floor(x)
    const f = x - i
    const s = f * f * (3 - 2 * f)
    return nos[i] * (1 - s) + nos[i + 1] * s
  }
}

// Pressão do pincel ao longo do traço: encosta, sustenta e levanta.
function pressao(t, inicio, fim) {
  const a = inicio > 0 ? Math.min(1, t / inicio) : 1
  const b = fim > 0 ? Math.min(1, (1 - t) / fim) : 1
  return Math.sin((a * Math.PI) / 2) * Math.pow(Math.max(b, 0), 0.6)
}

const fmt = (n) => (Math.round(n * 10) / 10).toString()

// Desenha um traço. Devolve strings de path SVG (que também servem no canvas
// via Path2D): corpo, cerdas e a linha central (usada para revelar o traço).
export function traco(controle, opcoes = {}) {
  const {
    largura = 12,
    inicio = 0.12,
    fim = 0.3,
    tremor = 0.22,
    cerdas = 6,
    secura = 0.5,
    semente = 7,
    passos = 12,
    ate = 1,
    chanfro = 0,
  } = opcoes
  const rand = aleatorio(semente)
  const tremorLargura = ruido(rand, 6)
  const tremorLado = ruido(rand, 4)
  const todos = suaviza(controle, passos)

  // Comprimento acumulado, para a pressão seguir a distância e não os pontos.
  const acc = [0]
  for (let i = 1; i < todos.length; i++) {
    acc.push(acc[i - 1] + Math.hypot(todos[i][0] - todos[i - 1][0], todos[i][1] - todos[i - 1][1]))
  }
  const total = acc[acc.length - 1] || 1
  // A geometria é sempre calculada no traço inteiro e só depois cortada em "ate":
  // assim o desenho parcial é idêntico ao começo do traço final (sem tremer).
  const pts = todos
  const limite = Math.max(2, todos.findIndex((_, i) => acc[i] / total > ate) === -1 ? todos.length : todos.findIndex((_, i) => acc[i] / total > ate))

  const normais = pts.map((p, i) => {
    const a = pts[Math.max(i - 1, 0)]
    const b = pts[Math.min(i + 1, pts.length - 1)]
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    const len = Math.hypot(dx, dy) || 1
    return [-dy / len, dx / len]
  })

  const esq = []
  const dir = []
  pts.forEach((p, i) => {
    if (i >= limite) return
    const t = acc[i] / total
    const w = largura * pressao(t, inicio, fim) * (1 + tremor * tremorLargura(t)) * 0.5
    const desvio = largura * 0.12 * tremor * tremorLado(t)
    const [nx, ny] = normais[i]
    esq.push([p[0] + nx * (w + desvio), p[1] + ny * (w + desvio)])
    dir.push([p[0] - nx * (w - desvio), p[1] - ny * (w - desvio)])
  })
  // Ponta chanfrada (marca-texto): corta as pontas na diagonal em vez de afinar.
  if (chanfro && esq.length > 2) {
    const tan = (i, j) => {
      const dx = pts[j][0] - pts[i][0]
      const dy = pts[j][1] - pts[i][1]
      const l = Math.hypot(dx, dy) || 1
      return [dx / l, dy / l]
    }
    const [ax, ay] = tan(0, 1)
    const k = largura * chanfro
    esq[0] = [esq[0][0] + ax * k, esq[0][1] + ay * k]
    const u = esq.length - 1
    const [bx, by] = tan(u - 1, u)
    dir[u] = [dir[u][0] - bx * k, dir[u][1] - by * k]
  }
  const contorno = [...esq, ...dir.reverse()]
  const corpo = `M${contorno.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join('L')}Z`

  // Cerdas: linhas finas paralelas que falham mais perto do fim (pincel seco).
  const fios = []
  for (let c = 0; c < cerdas; c++) {
    const lado = (c / Math.max(cerdas - 1, 1) - 0.5) * 0.9
    const espessura = (largura / cerdas) * (0.35 + rand() * 0.5)
    const opacidade = 0.25 + rand() * 0.45
    let d = ''
    let caneta = false
    pts.forEach((p, i) => {
      const t = acc[i] / total
      // O sorteio acontece para todo ponto, mesmo fora do corte, para a sequência não mudar.
      const falha = t > 1 - secura && rand() < (t - (1 - secura)) * 1.8
      if (i >= limite) return
      if (falha) {
        caneta = false
        return
      }
      const w = largura * pressao(t, inicio, fim) * lado
      const x = p[0] + normais[i][0] * w
      const y = p[1] + normais[i][1] * w
      d += `${caneta ? 'L' : 'M'}${fmt(x)} ${fmt(y)}`
      caneta = true
    })
    if (d) fios.push({ d, espessura, opacidade })
  }

  const centro = `M${pts.slice(0, limite).map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join('L')}`
  return { corpo, cerdas: fios, centro, comprimento: total }
}

// Formas prontas, medidas na caixa (w × h) do elemento marcado.
// Cada forma devolve uma lista de traços: { pontos, largura, ...opções }.
export function forma(tipo, w, h, semente = 3) {
  const r = aleatorio(semente * 31 + 11)
  const j = (amp) => (r() - 0.5) * 2 * amp
  switch (tipo) {
    case 'marca':
      // Marca-texto: uma passada larga atrás da palavra, levemente torta.
      return [
        {
          pontos: [
            [-w * 0.03, h * (0.62 + j(0.04))],
            [w * 0.35, h * (0.6 + j(0.05))],
            [w * 0.7, h * (0.58 + j(0.05))],
            [w * 1.03, h * (0.56 + j(0.04))],
          ],
          largura: h * 0.62,
          inicio: 0,
          fim: 0,
          chanfro: 0.45,
          tremor: 0.12,
          cerdas: 4,
          secura: 0.25,
        },
      ]
    case 'sublinhado':
      return [
        {
          pontos: [
            [-w * 0.02, h * 0.98],
            [w * 0.3, h * (0.92 + j(0.05))],
            [w * 0.65, h * (1.0 + j(0.05))],
            [w * 1.02, h * (0.9 + j(0.04))],
          ],
          largura: Math.max(5, h * 0.11),
          inicio: 0.08,
          fim: 0.35,
        },
      ]
    case 'risca':
      // Correção de caneta vermelha: risca a palavra e volta.
      return [
        {
          pontos: [
            [-w * 0.05, h * 0.6],
            [w * 0.5, h * (0.5 + j(0.06))],
            [w * 1.05, h * 0.42],
          ],
          largura: Math.max(4, h * 0.09),
          inicio: 0.05,
          fim: 0.2,
        },
        {
          pontos: [
            [w * 1.0, h * 0.52],
            [w * 0.45, h * (0.58 + j(0.05))],
            [-w * 0.02, h * 0.5],
          ],
          largura: Math.max(3, h * 0.07),
          inicio: 0.05,
          fim: 0.3,
        },
      ]
    case 'circulo': {
      // Círculo à mão: passa do ponto de partida, como quem circula rápido.
      const cx = w / 2
      const cy = h / 2
      const rx = w / 2 + Math.max(10, w * 0.08)
      const ry = h / 2 + Math.max(8, h * 0.28)
      const pts = []
      const inicioAng = -2.6 + j(0.3)
      for (let k = 0; k <= 14; k++) {
        const a = inicioAng + (k / 14) * Math.PI * 2.18
        const wob = 1 + j(0.05)
        pts.push([cx + Math.cos(a) * rx * wob, cy + Math.sin(a) * ry * wob])
      }
      return [{ pontos: pts, largura: Math.max(4, Math.min(w, h) * 0.07), inicio: 0.04, fim: 0.25, tremor: 0.3 }]
    }
    case 'seta': {
      const pontos = [
        [0, h * 0.15],
        [w * 0.45, h * (0.05 + j(0.05))],
        [w * 0.85, h * 0.45],
        [w * 0.92, h * 0.92],
      ]
      return [
        { pontos, largura: Math.max(4, w * 0.05), inicio: 0.05, fim: 0.2 },
        {
          pontos: [
            [w * 0.7, h * 0.72],
            [w * 0.92, h * 0.95],
            [w * 1.04, h * 0.66],
          ],
          largura: Math.max(4, w * 0.05),
          inicio: 0.1,
          fim: 0.3,
          passos: 6,
        },
      ]
    }
    case 'rabisco': {
      // Zigue-zague que cobre a caixa inteira (usado na troca de página).
      const pts = []
      const linhas = 7
      for (let k = 0; k <= linhas; k++) {
        const y = (k / linhas) * h * 1.1 - h * 0.05
        pts.push([k % 2 ? w * 1.1 : -w * 0.1, y + j(h * 0.02)])
      }
      return [{ pontos: pts, largura: (h / linhas) * 1.9, inicio: 0.01, fim: 0.02, tremor: 0.1, cerdas: 8, secura: 0.15, passos: 8 }]
    }
    default:
      return []
  }
}

// Desenha um traço no canvas, parcialmente (progresso de 0 a 1). Usado nos vídeos.
export function pintaNoCanvas(ctx, controle, opcoes, progresso = 1, cor = '#17140f') {
  if (progresso <= 0) return
  const t = traco(controle, { ...opcoes, ate: progresso })
  ctx.save()
  ctx.fillStyle = cor
  ctx.globalAlpha *= 0.92
  ctx.fill(new Path2D(t.corpo))
  ctx.strokeStyle = cor
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  t.cerdas.forEach((c) => {
    ctx.globalAlpha = c.opacidade
    ctx.lineWidth = c.espessura
    ctx.stroke(new Path2D(c.d))
  })
  ctx.restore()
}
