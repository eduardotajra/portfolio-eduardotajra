import { lazy, Suspense } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Links from './pages/Links'
import Carregando from './motion/Carregando'

// /links é o link da bio: abre direto do Instagram e do TikTok, no celular.
// Por isso ela é a única página carregada de imediato. O resto do site
// (animações, framer-motion, navbar) vem num chunk separado e não pesa aqui.
const Site = lazy(() => import('./Site'))

function Raiz() {
  const { pathname } = useLocation()
  if (pathname === '/links') return <Links />
  return (
    <Suspense fallback={<Carregando />}>
      <Site />
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Raiz />
    </BrowserRouter>
  )
}
