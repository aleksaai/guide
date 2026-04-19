import { motion } from 'framer-motion'
import { formBlock } from '../config/content'
import { LeadForm } from './LeadForm'

export function FormSection() {
  return (
    <section id="form" className="py-12 sm:py-16 lg:py-20 scroll-mt-20">
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 sm:mb-10 text-center"
        >
          <div className="eyebrow mb-3">{formBlock.eyebrow}</div>
          <h2 className="text-h1 font-semibold text-ink heading-tight">
            {formBlock.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] sm:text-base text-muted leading-relaxed">
            {formBlock.subheading}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  )
}
