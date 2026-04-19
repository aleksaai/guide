import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function BottomCTA() {
  function scrollToForm(e: React.MouseEvent) {
    e.preventDefault()
    const target = document.getElementById('form')
    if (!target) return
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: -24, duration: 1.4 })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="glass-panel-elevated p-8 sm:p-12 text-center"
        >
          <h2 className="text-h1 font-semibold text-ink heading-tight">
            Bereit, dein erstes <em className="accent-word">KI-Team</em> zu bauen?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-muted leading-relaxed">
            Trag dich ein, lies den Guide am Wochenende, bau deinen ersten Agenten am Montag.
          </p>
          <a href="#form" onClick={scrollToForm} className="btn-accent mt-8 inline-flex">
            Guide jetzt holen
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
