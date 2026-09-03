import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projetos from './pages/Projetos'
import Links from './pages/Links'

// A rota /links é um hub de bio: abre direto, sem navegação do site em volta.
function Layout() {
  const { pathname } = useLocation()
  const bareRoute = pathname === '/links'

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {!bareRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/links" element={<Links />} />
          <Route path="*" element={<Home />} />
        </Routes>
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
