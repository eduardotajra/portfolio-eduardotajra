import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Links from './pages/Links'

// /links é o link da bio: abre direto do Instagram e do TikTok, no celular.
// Por isso ela é a única página carregada de imediato — o resto do site
// vem em chunks separados e não pesa nesse primeiro acesso.
const Home = lazy(() => import('./pages/Home'))
const Projetos = lazy(() => import('./pages/Projetos'))
// A navbar não aparece em /links e traz o framer-motion junto: fora do caminho crítico.
const Navbar = lazy(() => import('./components/Navbar'))

// Fundo na cor do site: a troca de chunk não pisca branco.
const Carregando = () => <div className="min-h-screen bg-bg" />

function Layout() {
  const { pathname } = useLocation()
  const rotaNua = pathname === '/links'

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {!rotaNua && (
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
      )}
      <main>
        <Suspense fallback={<Carregando />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/links" element={<Links />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
