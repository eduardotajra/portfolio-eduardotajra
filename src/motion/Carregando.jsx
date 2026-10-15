// Loader do site: o monograma ET se desenha em laço enquanto o pedaço da
// página chega. Só CSS e SVG, para não puxar o framer-motion junto.
export default function Carregando() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#efe9dd]" role="status">
      <svg width="64" height="64" viewBox="0 0 26 24" fill="none" aria-hidden="true">
        <path
          d="M10 4H3v16h7M3 12h6M13 4h9M17.5 4v16"
          stroke="#17140f"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="60"
          style={{ animation: 'loader-traco 1.6s ease-in-out infinite' }}
        />
      </svg>
      <div className="h-[2px] w-24 overflow-hidden bg-[#d6ccb9]">
        <div className="h-full w-1/3 bg-[#bb2e17]" style={{ animation: 'loader-barra 1.1s ease-in-out infinite' }} />
      </div>
      <span className="sr-only">Carregando…</span>
    </div>
  )
}
