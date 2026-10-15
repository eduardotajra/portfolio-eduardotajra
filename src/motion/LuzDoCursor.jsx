import { useEffect, useRef } from 'react'

// Fundo animado: uma luz suave segue o mouse por todo o site.
// Só em telas com mouse; no toque não existe cursor para seguir.
export default function LuzDoCursor() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    let x = window.innerWidth / 2
    let y = window.innerHeight / 3
    let quadro = 0
    const pinta = () => {
      quadro = 0
      el.style.setProperty('--lx', `${x}px`)
      el.style.setProperty('--ly', `${y}px`)
    }
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      el.style.opacity = '1'
      if (!quadro) quadro = requestAnimationFrame(pinta)
    }
    const sai = () => {
      el.style.opacity = '0'
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', sai)
    return () => {
      cancelAnimationFrame(quadro)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', sai)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(520px circle at var(--lx, 50%) var(--ly, 30%), rgba(129,140,248,0.07), transparent 65%)',
      }}
    />
  )
}
