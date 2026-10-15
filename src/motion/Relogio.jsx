import { useEffect, useState } from 'react'

// Hora de Fortaleza ao vivo: um detalhe real, de gente, no lugar de um selo genérico.
const formata = () =>
  new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Fortaleza', hour: '2-digit', minute: '2-digit' }).format(new Date())

// Cada dígito que muda sobe de baixo, como num contador mecânico; os dois-pontos piscam devagar.
function Digitos({ texto }) {
  return [...texto].map((c, i) =>
    /\d/.test(c) ? (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <span key={c} className="digito-rola inline-block">
          {c}
        </span>
      </span>
    ) : (
      <span key={i} className="dois-pontos">
        {c}
      </span>
    )
  )
}

export default function Relogio({ className = '' }) {
  const [hora, setHora] = useState('')

  useEffect(() => {
    const t0 = setTimeout(() => setHora(formata()), 0)
    const id = setInterval(() => setHora(formata()), 15000)
    return () => {
      clearTimeout(t0)
      clearInterval(id)
    }
  }, [])

  return (
    <span className={className}>
      Fortaleza, BR
      {hora && (
        <>
          {' · '}
          <time className="tabular-nums" aria-label={hora}>
            <Digitos texto={hora} />
          </time>
        </>
      )}
    </span>
  )
}
