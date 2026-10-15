import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useIdioma } from '../i18n'

// Showreel em tela cheia. O vídeo só é baixado quando a pessoa abre.
export default function Showreel({ aberto, aoFechar }) {
  const { t, en } = useIdioma()
  const fechar = useRef(null)

  useEffect(() => {
    if (!aberto) return
    const antes = document.activeElement
    const tecla = (e) => e.key === 'Escape' && aoFechar()
    window.addEventListener('keydown', tecla)
    document.documentElement.style.overflow = 'hidden'
    fechar.current?.focus()
    return () => {
      window.removeEventListener('keydown', tecla)
      document.documentElement.style.overflow = ''
      antes?.focus?.()
    }
  }, [aberto, aoFechar])

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('Showreel de Eduardo Tajra', 'Eduardo Tajra showreel')}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-tinta/95 p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={aoFechar}
        >
          <motion.div
            className="relative w-full max-w-6xl"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            exit={{ clipPath: 'inset(0 0 0 100%)' }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={en ? 'en' : 'pt'}
              src={en ? '/showreel/showreel-en.mp4' : '/showreel/showreel-pt.mp4'}
              poster="/showreel/capa.jpg"
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black"
            />
            <div className="mt-3 flex items-center justify-between text-papel/70">
              <p className="font-mao text-xl">{t('feito em código, quadro a quadro', 'made in code, frame by frame')}</p>
              <p className="font-mono text-[11px]">1:06</p>
            </div>
          </motion.div>
          <button
            ref={fechar}
            type="button"
            onClick={aoFechar}
            aria-label={t('Fechar o showreel', 'Close the showreel')}
            className="absolute right-4 top-4 rounded-full border border-papel/30 p-2.5 text-papel transition-colors hover:border-marca hover:text-marca sm:right-8 sm:top-8"
          >
            <X size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
