import { motion } from 'framer-motion'
import { stats } from '../config/content'

export function StatsStrip() {
  return (
    <section className="relative py-6 sm:py-8">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
              className="glass-panel glass-card-hover flex flex-col items-center justify-center gap-1 rounded-lg px-4 py-6 text-center sm:py-8"
            >
              <div className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {item.value}
              </div>
              <div className="text-[11px] uppercase tracking-[0.06em] font-medium text-muted">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
