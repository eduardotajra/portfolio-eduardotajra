import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { forma, traco } from './tracos'

const limpaId = (id) => id.replace(/[^a-zA-Z0-9]/g, '')

// Um traço de pincel revelado por uma máscara que corre pela linha central:
// o corpo e as cerdas já estão desenhados, a máscara é que "passa o pincel".
function Traco({ t, largura, cor, id, animacao, opacidade = 0.94, pad }) {
  return (
    <>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x={-pad - 4000} y={-pad - 4000} width="9000" height="9000">
          <motion.path
            d={t.centro}
            fill="none"
            stroke="#fff"
            strokeWidth={largura * 1.9}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...animacao}
          />
        </mask>
      </defs>
      <g mask={`url(#${id})`}>
        <path d={t.corpo} fill={cor} fillOpacity={opacidade} />
        {t.cerdas.map((c, i) => (
          <path
            key={i}
            d={c.d}
            fill="none"
            stroke={cor}
            strokeWidth={c.espessura}
            strokeOpacity={c.opacidade}
            strokeLinecap="round"
          />
        ))}
      </g>
    </>
  )
}

// Marca um trecho de texto com pincel: 'marca' (marca-texto atrás), 'sublinhado',
// 'risca' (correção) ou 'circulo'. Sem `ativo`, desenha quando entra na tela;
// com `ativo`, desenha e apaga conforme o valor.
export function Pincel({
  tipo = 'marca',
  cor,
  children,
  atraso = 0,
  duracao = 0.75,
  semente = 3,
  ativo,
  className = '',
  style,
}) {
  const ref = useRef(null)
  const [caixa, setCaixa] = useState(null)
  const id = limpaId(useId())

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect
      setCaixa((c) => (c && Math.abs(c.w - width) < 1 && Math.abs(c.h - height) < 1 ? c : { w: width, h: height }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const tracos = useMemo(() => {
    if (!caixa || caixa.w < 2) return []
    return forma(tipo, caixa.w, caixa.h, semente).map((f, i) => ({
      t: traco(f.pontos, { ...f, semente: semente * 13 + i }),
      largura: f.largura,
    }))
  }, [caixa, tipo, semente])

  const corFinal = cor || (tipo === 'marca' ? '#ffd84a' : '#bb2e17')
  const atras = tipo === 'marca'
  const controlado = ativo !== undefined

  const animacao = (i) => {
    const transition = {
      pathLength: { duration: duracao, delay: atraso + i * duracao * 0.8, ease: [0.65, 0, 0.35, 1] },
      opacity: { duration: 0.01, delay: atraso + i * duracao * 0.8 },
    }
    if (controlado) {
      return {
        initial: false,
        animate: ativo ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
        transition: ativo ? transition : { duration: 0.25 },
      }
    }
    return {
      initial: { pathLength: 0, opacity: 0 },
      whileInView: { pathLength: 1, opacity: 1 },
      viewport: { once: true, margin: '-30px' },
      transition,
    }
  }

  return (
    <span ref={ref} style={style} className={`relative inline-block ${atras ? 'isolate' : ''} ${className}`}>
      {caixa && tracos.length > 0 && (
        <svg
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 overflow-visible ${atras ? '-z-10 mix-blend-multiply' : 'z-10'}`}
          width={caixa.w}
          height={caixa.h}
          viewBox={`0 0 ${caixa.w} ${caixa.h}`}
        >
          {tracos.map(({ t, largura }, i) => (
            <Traco
              key={i}
              t={t}
              largura={largura}
              cor={corFinal}
              id={`${id}m${i}`}
              pad={Math.max(caixa.h, 60)}
              opacidade={atras ? 0.85 : 0.94}
              animacao={animacao(i)}
            />
          ))}
        </svg>
      )}
      {children}
    </span>
  )
}

// Traço livre num sistema de coordenadas próprio (viewBox). `progresso` pode ser
// um MotionValue (traço preso à rolagem) ou nada (desenha ao entrar na tela).
export function TracoLivre({
  pontos,
  opcoes = {},
  cor = '#17140f',
  progresso,
  atraso = 0,
  duracao = 0.9,
  opacidade = 0.94,
}) {
  const id = limpaId(useId())
  const t = useMemo(() => traco(pontos, opcoes), [pontos, opcoes])
  const largura = opcoes.largura ?? 12
  const animacao = progresso
    ? { style: { pathLength: progresso, opacity: 1 } }
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once: true, margin: '-30px' },
        transition: {
          pathLength: { duration: duracao, delay: atraso, ease: [0.65, 0, 0.35, 1] },
          opacity: { duration: 0.01, delay: atraso },
        },
      }
  return <Traco t={t} largura={largura} cor={cor} id={id} pad={200} opacidade={opacidade} animacao={animacao} />
}
