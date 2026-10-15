import { ArrowUpRight } from 'lucide-react'

// Botão de tinta: o texto sobe e uma cópia entra por baixo (text lift),
// e a seta escorrega na diagonal. Sem brilho, sem gradiente.
export function BotaoTinta({ children, href, className = '', variante = 'tinta', icone = true, ...props }) {
  const estilos = {
    tinta: 'bg-tinta text-papel hover:bg-accent',
    contorno: 'border-[1.5px] border-tinta text-tinta hover:bg-tinta hover:text-papel',
    noite: 'bg-[#e8f5d0] text-noite hover:bg-white',
  }
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors duration-300 ${estilos[variante]} ${className}`}
      {...props}
    >
      <span className="relative block h-[1.25em] overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span aria-hidden="true" className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:-translate-y-full">
          {children}
        </span>
      </span>
      {icone && (
        <span className="relative block h-4 w-4 overflow-hidden">
          <ArrowUpRight size={16} className="absolute transition-transform duration-500 group-hover:-translate-y-4 group-hover:translate-x-4" />
          <ArrowUpRight size={16} className="absolute -translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </a>
  )
}
