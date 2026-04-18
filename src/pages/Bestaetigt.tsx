import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, AlertCircle } from 'lucide-react'
import { EDGE } from '../lib/supabase'

type State = 'validating' | 'success' | 'error'

export default function Bestaetigt() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const [state, setState] = useState<State>('validating')
  const [firstName, setFirstName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!token) {
      setState('error')
      setErrorMsg('Kein Bestätigungs-Token in der URL. Klick bitte erneut auf den Link aus deiner Email.')
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`${EDGE}/ki-guide-lead-confirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })
        const data = await res.json().catch(() => ({ ok: false }))
        if (cancelled) return
        if (!res.ok || !data.ok) {
          setErrorMsg(data.error ?? 'Dieser Link ist abgelaufen oder ungültig.')
          setState('error')
        } else {
          setFirstName(data.firstName ?? '')
          setState('success')
        }
      } catch {
        if (cancelled) return
        setErrorMsg('Netzwerk-Fehler. Bitte in einer Minute nochmal versuchen.')
        setState('error')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [token])

  return (
    <>
      <Helmet>
        <title>Bestätigt — KI-Team-Guide</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <section className="container-prose flex min-h-[60vh] flex-col items-center justify-center py-16 sm:py-24 text-center">
        <AnimatePresence mode="wait">
          {state === 'validating' && (
            <motion.div
              key="validating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <p className="mt-4 text-sm text-muted">Wir bestätigen deine Anmeldung…</p>
            </motion.div>
          )}

          {state === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent mb-6">
                <Check className="h-8 w-8" strokeWidth={2.5} />
              </div>
              <div className="eyebrow mb-3">BESTÄTIGT</div>
              <h1 className="text-h1 font-semibold text-ink heading-tight">
                Deine Mail ist <em className="accent-word">raus</em>
                {firstName && `, ${firstName}`}.
              </h1>
              <p className="mt-5 max-w-md text-[17px] text-muted leading-relaxed">
                Der Guide liegt in deiner Inbox. Falls nicht sichtbar — check Spam. Der
                Download-Link ist 24 Stunden gültig.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a href="https://ki-hochschule.de" className="btn-ink">
                  Mehr über die KI-Schule
                </a>
                <Link to="/" className="btn-ghost">
                  Zurück zur Startseite
                </Link>
              </div>
            </motion.div>
          )}

          {state === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-soft border border-line text-muted mb-6">
                <AlertCircle className="h-8 w-8" strokeWidth={2} />
              </div>
              <div className="eyebrow mb-3">LINK UNGÜLTIG</div>
              <h1 className="text-h1 font-semibold text-ink heading-tight">
                Das hat nicht <em className="accent-word">geklappt</em>.
              </h1>
              <p className="mt-5 max-w-md text-[15px] text-muted leading-relaxed">{errorMsg}</p>
              <Link to="/" className="btn-accent mt-8">
                Nochmal anmelden
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
