import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { hero } from '../config/content'

export function Hero() {
  function scrollToForm(e: React.MouseEvent) {
    e.preventDefault()
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative pt-6 pb-10 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
      <div className="container-site">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-2xl order-2 lg:order-1"
          >
            <div className="eyebrow mb-5">{hero.eyebrow}</div>

            <h1 className="text-display font-semibold text-ink heading-tight">
              {hero.headlinePre}{' '}
              <em className="accent-word">{hero.headlineAccent}</em>
              {hero.headlinePost}
            </h1>

            <p className="mt-6 max-w-xl text-[17px] sm:text-lg text-muted leading-relaxed">
              {hero.subheadline}
            </p>

            <div className="accent-line mt-8 hidden sm:block" />

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted">
              {hero.trustPills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center rounded-full border border-line bg-white/60 px-3 py-1 backdrop-blur-sm"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button onClick={scrollToForm} className="btn-accent">
                {hero.cta}
                <ArrowDown className="h-4 w-4" />
              </button>
              <div className="text-sm text-muted">
                <span className="text-muted/70">{hero.byline.prefix} </span>
                <span className="font-medium text-ink">{hero.byline.name}</span>
                <span className="text-muted">, {hero.byline.role}</span>
              </div>
            </div>
          </motion.div>

          {/* Right — portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-xl">
              {/* subtle accent glow behind image */}
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-[999px] opacity-70 blur-3xl"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(102,164,255,0.35) 0%, rgba(142,185,255,0.15) 45%, transparent 75%)',
                }}
              />
              <img
                src="/aleksa-hero.png"
                alt="Aleksa Spalevic — Gründer der KI-Schule"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
                width={1200}
                height={900}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
