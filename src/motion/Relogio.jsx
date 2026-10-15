import { useEffect, useState } from 'react'

// Hora de Fortaleza ao vivo: um detalhe real, de gente, no lugar de um selo genérico.
const formata = () =>
  new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Fortaleza', hour: '2-digit', minute: '2-digit' }).format(new Date())

export default function Relogio({ className = '' }) {
  const [hora, setHora] = useState('')

  useEffect(() => {
    const t0 = setTimeout(() => setHora(formata()), 0)
    const id = setInterval(() => setHora(formata()), 20000)
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
          <time>{hora}</time>
        </>
      )}
    </span>
  )
}
