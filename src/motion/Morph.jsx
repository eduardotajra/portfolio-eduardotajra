import { motion } from 'framer-motion'

// Morphing: todas as formas são polígonos com o mesmo número de pontos,
// amostrados ao longo do contorno a partir do topo. Assim uma vira a outra
// suavemente, ponto a ponto.
const N = 48

function amostra(vertices) {
  const fechado = [...vertices, vertices[0]]
  const lados = []
  let total = 0
  for (let i = 0; i < vertices.length; i++) {
    const [ax, ay] = fechado[i]
    const [bx, by] = fechado[i + 1]
    const len = Math.hypot(bx - ax, by - ay)
    lados.push({ ax, ay, bx, by, len })
    total += len
  }
  const pts = []
  for (let k = 0; k < N; k++) {
    let alvo = (k / N) * total
    for (const l of lados) {
      if (alvo <= l.len) {
        const f = alvo / l.len
        pts.push([l.ax + (l.bx - l.ax) * f, l.ay + (l.by - l.ay) * f])
        break
      }
      alvo -= l.len
    }
  }
  return pts
}

const regular = (lados, raio = 10, giro = -Math.PI / 2) =>
  Array.from({ length: lados }, (_, i) => {
    const a = giro + (i / lados) * Math.PI * 2
    return [12 + Math.cos(a) * raio, 12 + Math.sin(a) * raio]
  })

const estrela = Array.from({ length: 10 }, (_, i) => {
  const a = -Math.PI / 2 + (i / 10) * Math.PI * 2
  const r = i % 2 ? 4.6 : 10.5
  return [12 + Math.cos(a) * r, 12 + Math.sin(a) * r]
})

const caminho = (pts) => `M${pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join('L')}Z`

// Uma forma para cada coisa que o hero diz que eu construo.
const FORMAS = [
  caminho(amostra([[12, 2.5], [21.5, 2.5], [21.5, 21.5], [2.5, 21.5], [2.5, 2.5]])), // grade de caça-palavras
  caminho(amostra(regular(40, 10))), // olho / lupa de ARG
  caminho(amostra([[12, 2.5], [21, 18.5], [3, 18.5]])), // botão de play
  caminho(amostra(estrela)), // extensão que brilha
  caminho(amostra([[12, 1.5], [22, 12], [12, 22.5], [2, 12]])), // diamante do Minecraft
  caminho(amostra(regular(6, 10.5))), // cubo da impressão 3D
]

export default function MorphIcone({ indice, className = '' }) {
  const d = FORMAS[indice % FORMAS.length]
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="morph-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#818cf8" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <motion.path
        initial={false}
        animate={{ d }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        fill="url(#morph-grad)"
        fillOpacity="0.18"
        stroke="url(#morph-grad)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}
