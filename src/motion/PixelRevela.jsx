import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

// Carregamento em pixels: quando entra na tela, a imagem aparece em blocos
// grandes e vai ganhando resolução até ficar nítida, como um chunk carregando.
// É uma camada por cima: a imagem de verdade está embaixo o tempo todo.
const BLOCOS = [28, 18, 11, 7, 4, 2]

export default function PixelRevela({ src, className = '' }) {
  const ref = useRef(null)
  const visivel = useInView(ref, { once: true, margin: '-60px' })
  const parado = useReducedMotion()
  const [pronto, setPronto] = useState(false)

  useEffect(() => {
    if (!visivel || parado) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    let passo = 0
    let timer = 0
    let cancelado = false
    img.onload = () => {
      if (cancelado) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w
      canvas.height = h
      // Mesma lógica de object-cover: recorta a imagem para caber na caixa.
      const escala = Math.max(w / img.width, h / img.height)
      const sw = w / escala
      const sh = h / escala
      const sx = (img.width - sw) / 2
      const sy = (img.height - sh) / 2
      const pequeno = document.createElement('canvas')
      const pctx = pequeno.getContext('2d')
      const desenha = () => {
        if (cancelado) return
        if (passo >= BLOCOS.length) {
          setPronto(true)
          return
        }
        const b = BLOCOS[passo]
        pequeno.width = Math.max(1, Math.round(w / b))
        pequeno.height = Math.max(1, Math.round(h / b))
        pctx.drawImage(img, sx, sy, sw, sh, 0, 0, pequeno.width, pequeno.height)
        ctx.imageSmoothingEnabled = false
        ctx.clearRect(0, 0, w, h)
        ctx.drawImage(pequeno, 0, 0, w, h)
        passo += 1
        timer = setTimeout(desenha, 85)
      }
      desenha()
    }
    img.src = src
    return () => {
      cancelado = true
      clearTimeout(timer)
    }
  }, [visivel, parado, src])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full bg-[#0b120d] transition-opacity duration-300 ${
        pronto || parado ? 'opacity-0' : 'opacity-100'
      } ${className}`}
    />
  )
}
