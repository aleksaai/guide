import { motion } from 'framer-motion'
import { chatPreview } from '../config/content'

export function ChatPreview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-soft">
      <div className="container-site">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <div className="eyebrow mb-4">{chatPreview.eyebrow}</div>
            <h2 className="text-h1 font-semibold text-ink heading-tight">
              Alltagsgespräch. Kein <em className="accent-word">Prompt-Engineering</em>.
            </h2>
            <p className="mt-4 text-[17px] text-muted leading-relaxed">
              {chatPreview.subheading}
            </p>
            <div className="accent-line mt-6" />
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="relative overflow-hidden rounded-lg border border-line bg-white shadow-glass-elevated">
              <img
                src={chatPreview.image}
                alt={chatPreview.imageCaption}
                className="h-auto w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-3 text-xs text-muted text-center">
              {chatPreview.imageCaption}
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}
