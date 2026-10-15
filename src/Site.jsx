import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carregando from './motion/Carregando'
import { forma, traco } from './motion/tracos'

const Home = lazy(() => import('./pages/Home'))
const Projetos = lazy(() => import('./pages/Projetos'))
const Mods = lazy(() => import('./pages/Mods'))

const curva = [0.76, 0, 0.24, 1]

// Troca de página a pincel: na saída, um zigue-zague de tinta cobre a tela;
// na entrada, o mesmo traço se apaga e revela a página nova.
const cortina = (() => {
  const [f] = forma('rabisco', 1000, 1000, 5)
  return { ...traco(f.pontos, { ...f, semente: 9 }), largura: f.largura }
})()

const mascara = {
  entra: { pathLength: 1, opacity: 1 },
  mostra: {
    pathLength: 0,
    opacity: 0,
    transition: { pathLength: { duration: 0.6, ease: curva }, opacity: { delay: 0.6, duration: 0 } },
  },
  sai: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 0.55, ease: curva }, opacity: { duration: 0 } } },
}

function Pagina({ children }) {
  return (
    <motion.div initial="entra" animate="mostra" exit="sai">
      {children}
      <svg
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="cortina-pincel" maskUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
            <motion.path
              d={cortina.centro}
              fill="none"
              stroke="#fff"
              strokeWidth={cortina.largura * 1.9}
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={mascara}
            />
          </mask>
        </defs>
        <g mask="url(#cortina-pincel)">
          <path d={cortina.corpo} fill="#17140f" />
          {cortina.cerdas.map((c, i) => (
            <path key={i} d={c.d} fill="none" stroke="#17140f" strokeWidth={c.espessura} strokeOpacity={c.opacidade} />
          ))}
        </g>
      </svg>
    </motion.div>
  )
}

function BarraDeLeitura() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
    />
  )
}

export default function Site() {
  const location = useLocation()

  // Na troca de rota (não de âncora), começa a página nova do topo.
  const aoTerminarSaida = () => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    // reducedMotion="user": quem pediu menos movimento no sistema não recebe
    // as animações de transformação do framer-motion.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg text-text-primary">
        <BarraDeLeitura />
        <Navbar />
        <main>
          <AnimatePresence mode="wait" initial={false} onExitComplete={aoTerminarSaida}>
            <Pagina key={location.pathname}>
              <Suspense fallback={<Carregando />}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projetos" element={<Projetos />} />
                  <Route path="/mods" element={<Mods />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </Suspense>
            </Pagina>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
