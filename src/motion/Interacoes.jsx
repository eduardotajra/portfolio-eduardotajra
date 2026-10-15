import { useState } from 'react'

// Esqueleto: um bloco cintilando no lugar da imagem até ela chegar.
export function ImagemEsqueleto({ className = '', classeCaixa = '', ...props }) {
  const [carregou, setCarregou] = useState(false)
  return (
    <div className={`relative h-full w-full ${classeCaixa}`}>
      {!carregou && <div aria-hidden="true" className="esqueleto absolute inset-0" />}
      <img
        {...props}
        onLoad={() => setCarregou(true)}
        className={`${className} transition-opacity duration-500 ${carregou ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
