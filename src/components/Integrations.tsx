import { motion } from 'framer-motion'
import { integrations } from '../config/content'
import { LogoMarquee } from './LogoMarquee'

export function Integrations() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="eyebrow mb-3">{integrations.eyebrow}</div>
          <h2 className="text-2xl sm:text-[28px] lg:text-3xl font-semibold text-ink heading-tight">
            Deine KI-Mitarbeiter nutzen deine{' '}
            <em className="accent-word whitespace-nowrap">echten Tools</em>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] sm:text-[15px] text-muted leading-relaxed">
            {integrations.subheading}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-10 sm:mt-12"
        >
          <LogoMarquee size="md" />
        </motion.div>
      </div>
    </section>
  )
}
