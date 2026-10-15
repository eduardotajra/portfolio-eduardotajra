import { useEffect } from 'react'
import Hero from '../components/Hero'
import Servicos from '../components/Servicos'
import Processo from '../components/Processo'
import Projects from '../components/Projects'
import ModsDestaque from '../components/ModsDestaque'
import Impressao3D from '../components/Impressao3D'
import About from '../components/About'
import Experience from '../components/Experience'
import Contact from '../components/Contact'

export default function Home() {
  // Chegando de outra rota com âncora (ex: /projetos -> /#contact),
  // o scroll nativo não dispara: resolvemos depois da montagem. Só na montagem:
  // cliques em âncoras dentro da home já rolam sozinhos, e repetir o scroll aqui
  // brigava com a rolagem suave do navegador e parava fora do lugar.
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash === '#showreel') return
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
  }, [])

  return (
    <>
      <Hero />
      <Servicos />
      <Projects />
      <Processo />
      <ModsDestaque />
      <Impressao3D />
      <About />
      <Experience />
      <Contact />
    </>
  )
}
