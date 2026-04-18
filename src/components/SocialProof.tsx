import { motion } from 'framer-motion'
import { socialProof } from '../config/content'

export function SocialProof() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-prose">
        <motion.figure
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-ink leading-relaxed tracking-tight">
            &ldquo;{socialProof.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-soft text-ink font-semibold text-sm border border-line">
              AS
            </div>
            <div className="text-left">
              <div className="text-ink font-semibold text-sm">{socialProof.name}</div>
              <div className="text-muted text-xs">{socialProof.role}</div>
            </div>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
