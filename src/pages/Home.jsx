import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Servicos from '../components/Servicos'
import Projects from '../components/Projects'
import Impressao3D from '../components/Impressao3D'
import About from '../components/About'
import Experience from '../components/Experience'
import Contact from '../components/Contact'

export default function Home() {
  const { hash: hashDaRota } = useLocation()

  // Chegando de outra rota com âncora (ex: /projetos -> /#contact),
  // o scroll nativo não dispara: resolvemos depois da montagem.
  useEffect(() => {
    // No load inicial o router pode ainda não expor o hash; window.location tem.
    const hash = hashDaRota || window.location.hash
    if (!hash) return
    // O navegador restaura o scroll para 0 depois do load e desfaz o nosso.
    const restauracaoOriginal = window.history.scrollRestoration
    if (restauracaoOriginal) window.history.scrollRestoration = 'manual'

    let cancelado = false
    // 'instant': chegar por link direto deve posicionar de imediato, como uma
    // âncora nativa. Animação aqui é frágil e depende do compositor.
    const irParaSecao = () => {
      if (cancelado) return
      document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' })
    }

    // Na montagem o documento ainda não tem a altura final (imagens pendentes),
    // então o scroll seria limitado. Tentamos após o layout e de novo no load.
    const t = setTimeout(irParaSecao, 120)
    window.addEventListener('load', irParaSecao)
    return () => {
      cancelado = true
      clearTimeout(t)
      window.removeEventListener('load', irParaSecao)
      if (restauracaoOriginal) window.history.scrollRestoration = restauracaoOriginal
    }
  }, [hashDaRota])

  return (
    <>
      <Hero />
      <Servicos />
      <Projects />
      <Impressao3D />
      <About />
      <Experience />
      <Contact />
    </>
  )
}
