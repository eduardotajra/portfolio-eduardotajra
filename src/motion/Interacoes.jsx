import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const temMouse = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

// Microinteração: o botão é puxado de leve pelo cursor (magnético) e, ao
// entrar, uma gota de cor se espalha a partir do ponto onde o mouse entrou.
export function BotaoMagnetico({ children, className = '', corGota = 'rgba(255,255,255,0.22)', ...props }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 15 })
  const y = useSpring(0, { stiffness: 220, damping: 15 })
  const [gota, setGota] = useState(null)

  const move = (e) => {
    if (!temMouse()) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4)
  }
  const entra = (e) => {
    const r = ref.current.getBoundingClientRect()
    setGota({ x: e.clientX - r.left, y: e.clientY - r.top, id: Date.now() })
  }
  const sai = () => {
    x.set(0)
    y.set(0)
    setGota(null)
  }

  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onPointerMove={move}
      onPointerEnter={entra}
      onPointerLeave={sai}
      whileTap={{ scale: 0.94 }}
      className={`relative isolate overflow-hidden ${className}`}
      {...props}
    >
      {gota && (
        <motion.span
          key={gota.id}
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 rounded-full"
          style={{ left: gota.x, top: gota.y, width: 16, height: 16, marginLeft: -8, marginTop: -8, background: corGota }}
          initial={{ scale: 0 }}
          animate={{ scale: 28 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      {children}
    </motion.a>
  )
}

// Falso 3D: o card inclina na direção do mouse e um reflexo acompanha.
export function Inclina({ children, className = '', max = 7 }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 18 })
  const brilho = useTransform(
    [px, py],
    ([a, b]) => `radial-gradient(420px circle at ${a * 100}% ${b * 100}%, rgba(255,255,255,0.10), transparent 55%)`
  )
  const [ativo, setAtivo] = useState(false)

  const move = (e) => {
    if (!temMouse()) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const sai = () => {
    px.set(0.5)
    py.set(0.5)
    setAtivo(false)
  }

  return (
    <div style={{ perspective: 900 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerEnter={() => setAtivo(temMouse())}
        onPointerLeave={sai}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className={`relative h-full ${className}`}
      >
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-300"
          style={{ background: brilho, opacity: ativo ? 1 : 0 }}
        />
      </motion.div>
    </div>
  )
}

// Esqueleto: um bloco cintilando no lugar da imagem até ela chegar.
export function ImagemEsqueleto({ className = '', classeCaixa = '', ...props }) {
  const [carregou, setCarregou] = useState(false)
  return (
    <div className={`relative h-full w-full ${classeCaixa}`}>
      {!carregou && <div aria-hidden="true" className="esqueleto absolute inset-0" />}
      <img
        {...props}
        onLoad={() => setCarregou(true)}
        className={`${className} transition-opacity duration-500 ${carregou ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
