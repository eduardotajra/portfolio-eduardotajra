/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

// Idioma do site: português por padrão, inglês para quem usa o navegador em
// inglês ou escolhe no seletor. A escolha fica salva no navegador.
const IdiomaContext = createContext({ lang: 'pt', setLang: () => {} })

function idiomaInicial() {
  try {
    const salvo = localStorage.getItem('lang')
    if (salvo === 'pt' || salvo === 'en') return salvo
  } catch {
    /* sem storage (modo privado): segue pelo navegador */
  }
  if (typeof navigator !== 'undefined' && !/^pt\b/i.test(navigator.language || 'pt')) return 'en'
  return 'pt'
}

export function IdiomaProvider({ children }) {
  const [lang, setLangState] = useState(idiomaInicial)

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR'
  }, [lang])

  const setLang = (novo) => {
    setLangState(novo)
    try {
      localStorage.setItem('lang', novo)
    } catch {
      /* ignora */
    }
  }

  return <IdiomaContext.Provider value={{ lang, setLang }}>{children}</IdiomaContext.Provider>
}

// t('texto em português', 'English text') devolve o do idioma atual.
// tr(objeto, 'campo') lê objeto.campo_en em inglês, com o português de reserva.
export function useIdioma() {
  const { lang, setLang } = useContext(IdiomaContext)
  const en = lang === 'en'
  const t = (pt, ingles) => (en ? ingles : pt)
  const tr = (obj, campo) => (en && obj[`${campo}_en`] !== undefined ? obj[`${campo}_en`] : obj[campo])
  return { lang, setLang, en, t, tr }
}

export function SeletorIdioma({ className = '' }) {
  const { lang, setLang } = useIdioma()
  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={`neu-trilho relative inline-grid grid-cols-2 rounded-lg p-1 font-mono text-[11px] ${className}`}
    >
      <span
        aria-hidden="true"
        className="neu-botao absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-md transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]"
        style={{ transform: lang === 'en' ? 'translateX(100%)' : 'translateX(0)' }}
      />
      {['pt', 'en'].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 rounded-md px-2.5 py-1 uppercase transition-colors duration-300 active:scale-90 ${
            lang === l ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
