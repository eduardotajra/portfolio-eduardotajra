import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Carregando from './motion/Carregando'
import LuzDoCursor from './motion/LuzDoCursor'

const Home = lazy(() => import('./pages/Home'))
const Projetos = lazy(() => import('./pages/Projetos'))
const Mods = lazy(() => import('./pages/Mods'))

const curva = [0.76, 0, 0.24, 1]

// Troca de página com cortina: na saída, uma faixa sobe e cobre a tela;
// na entrada, outra recolhe para cima e revela a página nova.
function Pagina({ children }) {
  return (
    <motion.div>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] origin-bottom bg-accent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.45, ease: curva }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[71] flex origin-top items-center justify-center bg-surface"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: curva, delay: 0.05 }}
      >
        <span className="font-mono text-sm text-accent">
          ET<span className="text-text-secondary">.dev</span>
        </span>
      </motion.div>
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
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent to-cyan"
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
        <LuzDoCursor />
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
