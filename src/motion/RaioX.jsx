import { useIdioma } from '../i18n'

// Raio-X: um scanner desce pela captura do site e, por onde passa, revela a
// "planta" por baixo (a mesma imagem em negativo azul sobre papel milimetrado).
// Projeto privado não tem imagem: vira um documento com tarjas pretas.
export default function RaioX({ src, alt, privado = false, className = '' }) {
  const { t } = useIdioma()

  if (privado || !src) {
    return (
      <div className={`relative flex aspect-[16/10] flex-col justify-center gap-2.5 overflow-hidden bg-[#f4efe3] p-6 ${className}`}>
        <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{t('confidencial', 'classified')}</span>
        {[92, 70, 84, 40, 76, 58].map((w, i) => (
          <span key={i} className="block h-3 bg-tinta" style={{ width: `${w}%`, opacity: i === 3 ? 0.25 : 0.92 }} />
        ))}
        <span className="font-mao absolute bottom-3 right-4 -rotate-6 text-xl text-accent">
          {t('site privado do cliente', "client's private site")}
        </span>
      </div>
    )
  }

  return (
    <div className={`group/rx relative aspect-[16/10] overflow-hidden bg-surface-2 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
      <div
        aria-hidden="true"
        className="milimetrado absolute inset-0 bg-[#e9eefb]"
        style={{ animation: 'raio-x-varre 3.2s cubic-bezier(.6,0,.4,1) infinite' }}
      >
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top opacity-80 mix-blend-multiply"
          style={{ filter: 'grayscale(1) invert(1) contrast(1.4) brightness(1.1) sepia(1) hue-rotate(180deg) saturate(2.4)' }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 h-[2px] bg-cyan shadow-[0_0_0_1px_rgba(31,79,216,0.25)]"
        style={{ animation: 'raio-x-linha 3.2s cubic-bezier(.6,0,.4,1) infinite' }}
      >
        <span className="absolute right-2 top-1 bg-cyan px-1.5 font-mono text-[9px] uppercase tracking-widest text-white">raio-x</span>
      </div>
    </div>
  )
}
