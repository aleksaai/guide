import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { hero } from '../config/content'

export function Hero() {
  function scrollToForm(e: React.MouseEvent) {
    e.preventDefault()
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-20">
      <div className="container-site">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* 1. Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="eyebrow"
          >
            {hero.eyebrow}
          </motion.div>

          {/* 2. Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
            className="mt-5 text-display font-semibold text-ink heading-tight"
          >
            {hero.headlinePre}{' '}
            <em className="accent-word whitespace-nowrap">{hero.headlineAccent}</em>
            {hero.headlinePost}
          </motion.h1>

          {/* 3. Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="relative mt-10 sm:mt-12"
          >
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(102,164,255,0.30) 0%, rgba(142,185,255,0.12) 45%, transparent 75%)',
              }}
            />
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl">
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

          {/* 4. Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
            className="mt-10 sm:mt-12 max-w-xl text-[17px] sm:text-lg text-muted leading-relaxed"
          >
            {hero.subheadline}
          </motion.p>

          {/* accent line as visual break */}
          <div className="accent-line mt-8" />

          {/* 5. Trust pills */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted"
          >
            {hero.trustPills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center rounded-full border border-line bg-white/60 px-3 py-1 backdrop-blur-sm"
              >
                {pill}
              </span>
            ))}
          </motion.div>

          {/* 6. CTA + byline */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <button onClick={scrollToForm} className="btn-accent">
              {hero.cta}
              <ArrowDown className="h-4 w-4" />
            </button>
            <div className="text-sm text-muted">
              <span className="text-muted/70">{hero.byline.prefix} </span>
              <span className="font-medium text-ink">{hero.byline.name}</span>
              <span className="text-muted">, {hero.byline.role}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
