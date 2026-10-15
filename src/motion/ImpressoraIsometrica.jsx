import { useRef } from 'react'
import { useAnimationFrame, useInView, useReducedMotion } from 'framer-motion'
import { useIdioma } from '../i18n'

// Animação isométrica: uma impressora 3D imprimindo uma peça camada por
// camada. A projeção é calculada aqui (x desce para a direita, y para a
// esquerda, z sobe); o quadro a quadro mexe só nos atributos, sem re-render.
const S = 9
const CX = 130
const CY = 120
const COS = Math.cos(Math.PI / 6) * S
const SEN = Math.sin(Math.PI / 6) * S
const iso = (x, y, z) => [CX + (x - y) * COS, CY + (x + y) * SEN - z * S]
const pts = (...ps) => ps.map((p) => iso(...p).map((n) => n.toFixed(1)).join(',')).join(' ')

const CAMADAS = 10
const ALTURA = 0.7
const POR_CAMADA = 0.55 // segundos
const PAUSA = 1.6
const CICLO = CAMADAS * POR_CAMADA + PAUSA
const TOPO = 11

const faces = Array.from({ length: CAMADAS }, (_, k) => {
  const z0 = k * ALTURA
  const z1 = z0 + ALTURA
  const tom = k % 2 ? 0.92 : 1
  return {
    direita: pts([7, 3, z0], [7, 7, z0], [7, 7, z1], [7, 3, z1]),
    esquerda: pts([3, 7, z0], [7, 7, z0], [7, 7, z1], [3, 7, z1]),
    topo: pts([3, 3, z1], [7, 3, z1], [7, 7, z1], [3, 7, z1]),
    tom,
  }
})

export default function ImpressoraIsometrica({ className = '' }) {
  const svg = useRef(null)
  const camadas = useRef([])
  const bico = useRef(null)
  const fio = useRef(null)
  const texto = useRef(null)
  const visivel = useInView(svg, { margin: '-40px' })
  const parado = useReducedMotion()
  const { t } = useIdioma()

  useAnimationFrame((ms) => {
    if (!visivel || !svg.current) return
    const tc = parado ? CAMADAS * POR_CAMADA : (ms / 1000) % CICLO
    const atual = Math.min(CAMADAS, Math.floor(tc / POR_CAMADA))
    const f = (tc % POR_CAMADA) / POR_CAMADA
    camadas.current.forEach((g, k) => {
      if (g) g.style.opacity = k < atual ? '1' : '0'
    })
    // O bico faz zigue-zague sobre a camada que está imprimindo.
    const imprimindo = atual < CAMADAS
    const linhas = 4
    const passo = Math.min(linhas - 1, Math.floor(f * linhas))
    const dentro = (f * linhas) % 1
    const nx = imprimindo ? (passo % 2 ? 7 - dentro * 4 : 3 + dentro * 4) : 5
    const ny = imprimindo ? 3.5 + passo * (3 / (linhas - 1)) : 5
    const nz = Math.min(atual, CAMADAS) * ALTURA + 0.9
    const [bx, by] = iso(nx, ny, nz)
    const [tx, ty] = iso(nx, ny, TOPO)
    bico.current?.setAttribute('transform', `translate(${bx.toFixed(1)} ${by.toFixed(1)})`)
    fio.current?.setAttribute('d', `M${tx.toFixed(1)} ${ty.toFixed(1)}L${bx.toFixed(1)} ${(by - 6).toFixed(1)}`)
    if (texto.current) {
      const pct = imprimindo ? Math.round(((atual + f) / CAMADAS) * 100) : 100
      texto.current.textContent = imprimindo ? `${t('imprimindo', 'printing')} ${pct}%` : t('pronto ✓', 'done ✓')
    }
  })

  return (
    <div className={`relative ${className}`}>
      <svg ref={svg} viewBox="0 0 260 240" className="h-full w-full" aria-hidden="true">
        {/* mesa */}
        <polygon points={pts([0, 0, 0], [10, 0, 0], [10, 10, 0], [0, 10, 0])} fill="#13132a" stroke="#2a2a3e" />
        {[2.5, 5, 7.5].map((v) => (
          <g key={v} stroke="#1e1e38" strokeWidth="0.8">
            <line x1={iso(v, 0, 0)[0]} y1={iso(v, 0, 0)[1]} x2={iso(v, 10, 0)[0]} y2={iso(v, 10, 0)[1]} />
            <line x1={iso(0, v, 0)[0]} y1={iso(0, v, 0)[1]} x2={iso(10, v, 0)[0]} y2={iso(10, v, 0)[1]} />
          </g>
        ))}
        {/* colunas e topo da estrutura */}
        {[[0, 0], [10, 0], [0, 10]].map(([x, y]) => (
          <line key={`${x}${y}`} x1={iso(x, y, 0)[0]} y1={iso(x, y, 0)[1]} x2={iso(x, y, TOPO)[0]} y2={iso(x, y, TOPO)[1]} stroke="#3a3a5e" strokeWidth="2" strokeLinecap="round" />
        ))}
        <polygon points={pts([0, 0, TOPO], [10, 0, TOPO], [10, 10, TOPO], [0, 10, TOPO])} fill="none" stroke="#3a3a5e" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* peça, camada por camada */}
        {faces.map((c, k) => (
          <g key={k} ref={(el) => {
              camadas.current[k] = el
            }} style={{ opacity: 0 }}>
            <polygon points={c.direita} fill="#0e7490" style={{ filter: `brightness(${c.tom})` }} />
            <polygon points={c.esquerda} fill="#0891b2" style={{ filter: `brightness(${c.tom})` }} />
            <polygon points={c.topo} fill="#67e8f9" />
          </g>
        ))}

        {/* cabeçote */}
        <path ref={fio} stroke="#818cf8" strokeWidth="1.5" strokeOpacity="0.6" />
        <g ref={bico}>
          <rect x="-7" y="-14" width="14" height="8" rx="2" fill="#818cf8" />
          <polygon points="-3,-6 3,-6 0,-1" fill="#c7d2fe" />
          <circle cx="0" cy="1" r="1.6" fill="#fbbf24" />
        </g>
      </svg>
      <span
        ref={texto}
        className="vidro absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-mono text-[11px] text-cyan"
      />
    </div>
  )
}
