import { motion } from 'framer-motion'
import { hero } from '../config/content'
import { LeadForm } from './LeadForm'

export function Hero() {
  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-28">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-2xl"
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

            {/* Accent line */}
            <div className="accent-line mt-8 hidden sm:block" />

            {/* Trust pills */}
            <div className="mt-8 flex flex-wrap gap-2 text-xs text-muted">
              <span className="inline-flex items-center rounded-full border border-line bg-white/60 px-3 py-1 backdrop-blur-sm">
                12.000+ Wörter
              </span>
              <span className="inline-flex items-center rounded-full border border-line bg-white/60 px-3 py-1 backdrop-blur-sm">
                Praxis, keine Theorie
              </span>
              <span className="inline-flex items-center rounded-full border border-line bg-white/60 px-3 py-1 backdrop-blur-sm">
                Von einem, der's selbst baut
              </span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            id="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="mb-4 px-1">
              <div className="eyebrow mb-2">{hero.formTitle.toUpperCase()}</div>
              <p className="text-sm text-muted leading-relaxed max-w-md">{hero.formSubtitle}</p>
            </div>
            <LeadForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
