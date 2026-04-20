import { motion } from 'framer-motion'
import { myTeam } from '../config/content'

export function MyTeam() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-site">
        <div className="max-w-2xl">
          <div className="eyebrow mb-4">{myTeam.eyebrow}</div>
          <h2 className="text-h1 font-semibold text-ink heading-tight">
            Sechs Agenten. <em className="accent-word">Ein</em> System.
          </h2>
          <p className="mt-4 text-[17px] text-muted leading-relaxed">{myTeam.subheading}</p>
          <div className="accent-line mt-6" />
        </div>

        {/* Hero screenshot of the team */}
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-10 sm:mt-12"
        >
          <div className="relative glass-panel-elevated overflow-hidden rounded-xl p-2 sm:p-3">
            <video
              src={myTeam.overviewVideo}
              poster={myTeam.overviewImage}
              className="block h-auto w-full rounded-lg"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Übersicht des KI-Teams im 3D-Office"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs text-muted">
            {myTeam.overviewCaption}
          </figcaption>
        </motion.figure>

        {/* Agent callouts */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {myTeam.agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
              className="glass-panel glass-card-hover flex flex-col overflow-hidden rounded-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-white/30">
                <img
                  src={agent.image}
                  alt={`${agent.name} — ${agent.role}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-ink">{agent.name}</h3>
                  <span className="text-[11px] uppercase tracking-[0.06em] font-medium text-accent">
                    {agent.role.split(' & ')[0]}
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-muted">{agent.role}</div>
                <p className="mt-3 text-sm text-muted leading-relaxed">{agent.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
