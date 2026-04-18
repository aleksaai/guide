import { motion } from 'framer-motion'
import { whatsInside } from '../config/content'

export function WhatsInside() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-site">
        <div className="max-w-2xl">
          <div className="eyebrow mb-4">{whatsInside.eyebrow}</div>
          <h2 className="text-h1 font-semibold text-ink heading-tight">
            {whatsInside.heading.split(' ').slice(0, -1).join(' ')}{' '}
            <em className="accent-word">
              {whatsInside.heading.split(' ').slice(-1)[0].replace('.', '')}
            </em>
            .
          </h2>
          <p className="mt-4 text-[17px] text-muted leading-relaxed">
            {whatsInside.subheading}
          </p>
          <div className="accent-line mt-6" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {whatsInside.items.map((item, i) => (
            <motion.div
              key={item.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
              className="rounded-lg border border-line bg-soft p-6 sm:p-7"
            >
              <div className="text-2xl font-semibold text-accent mb-3">{item.n}</div>
              <h3 className="text-base font-semibold text-ink mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
