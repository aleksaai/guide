import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Mail, ArrowRight, Check } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '../lib/cn'
import { EDGE } from '../lib/supabase'
import { roleOptions } from '../config/content'

const schema = z.object({
  firstName: z.string().min(1, 'Bitte gib deinen Vornamen an'),
  lastName: z.string().min(1, 'Bitte gib deinen Nachnamen an'),
  email: z.string().email('Ungültige Email-Adresse'),
  company: z.string().optional(),
  role: z.string().optional(),
  newsletterConsent: z.boolean().optional(),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: 'Bitte bestätige die Datenschutzerklärung' }),
  }),
})

type FormValues = z.infer<typeof schema>

type State = 'idle' | 'submitting' | 'success' | 'error'

export function LeadForm() {
  const [state, setState] = useState<State>('idle')
  const [submittedEmail, setSubmittedEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      role: '',
      newsletterConsent: false,
      privacyConsent: false as unknown as true,
    },
  })

  async function onSubmit(values: FormValues) {
    setState('submitting')
    try {
      const source = new URLSearchParams(window.location.search).get('source') ?? undefined
      const res = await fetch(`${EDGE}/ki-guide-lead-submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, source }),
      })
      const data = await res.json().catch(() => ({ ok: false }))
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? 'Unbekannter Fehler')
      }
      setSubmittedEmail(values.email)
      setState('success')
      reset()
    } catch (err) {
      console.error(err)
      setState('error')
      toast.error('Das hat nicht geklappt. Bitte in einer Minute nochmal versuchen.')
      setTimeout(() => setState('idle'), 600)
    }
  }

  return (
    <div className="glass-panel-elevated p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col items-center text-center py-6 sm:py-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent mb-5">
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-semibold text-ink tracking-tight">
              Check deine <em className="accent-word">Inbox</em>.
            </h3>
            <p className="mt-3 max-w-sm text-[15px] text-muted leading-relaxed">
              Wir haben eine Bestätigungs-Mail an{' '}
              <span className="font-medium text-ink">{submittedEmail}</span> geschickt. Klick den
              Link darin und der Guide ist 30 Sekunden später in deiner Inbox.
            </p>
            <p className="mt-4 text-xs text-muted">
              Keine Mail? Schau im Spam-Ordner oder{' '}
              <button
                type="button"
                onClick={() => setState('idle')}
                className="text-accent underline underline-offset-4 hover:text-accent-dark"
              >
                hier nochmal anmelden
              </button>
              .
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className={cn('flex flex-col gap-4', state === 'error' && 'animate-shake')}
          >
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Vorname"
                required
                error={errors.firstName?.message}
                id="firstName"
              >
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="input-field"
                  {...register('firstName')}
                  aria-invalid={!!errors.firstName}
                />
              </Field>
              <Field
                label="Nachname"
                required
                error={errors.lastName?.message}
                id="lastName"
              >
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="input-field"
                  {...register('lastName')}
                  aria-invalid={!!errors.lastName}
                />
              </Field>
            </div>

            <Field label="E-Mail" required error={errors.email?.message} id="email">
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className="input-field"
                placeholder="du@firma.de"
                {...register('email')}
                aria-invalid={!!errors.email}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Firma" id="company">
                <input
                  id="company"
                  type="text"
                  autoComplete="organization"
                  className="input-field"
                  placeholder="optional"
                  {...register('company')}
                />
              </Field>
              <Field label="Rolle" id="role">
                <select
                  id="role"
                  className="input-field cursor-pointer"
                  defaultValue=""
                  {...register('role')}
                >
                  <option value="">Wähle eine Rolle</option>
                  {roleOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Consent checkboxes */}
            <div className="mt-2 flex flex-col gap-3">
              <CheckboxRow
                id="privacyConsent"
                error={errors.privacyConsent?.message}
                {...register('privacyConsent')}
              >
                Ich stimme der{' '}
                <a
                  href="/datenschutz"
                  target="_blank"
                  className="text-accent underline underline-offset-4 hover:text-accent-dark"
                >
                  Datenschutzerklärung
                </a>{' '}
                zu. <span className="text-muted">*</span>
              </CheckboxRow>
              <CheckboxRow
                id="newsletterConsent"
                {...register('newsletterConsent')}
              >
                Schick mir gelegentliche Updates zum Thema KI-Teams. Abmelden jederzeit möglich.
              </CheckboxRow>
            </div>

            <button
              type="submit"
              disabled={state === 'submitting'}
              className="btn-accent mt-2 w-full sm:w-auto sm:self-start"
            >
              {state === 'submitting' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Senden…</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  <span>Guide jetzt holen</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="mt-1 text-[11px] text-muted leading-relaxed">
              Kein Verkaufs-Funnel. Keine Massen-Mails. Du kannst dich mit einem Klick wieder
              abmelden.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({
  label,
  required,
  error,
  id,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  id: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
      {error && (
        <span className="text-[11px] text-[#C24A4F] mt-0.5" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

const CheckboxRow = React.forwardRef<
  HTMLInputElement,
  { id: string; children: React.ReactNode; error?: string } & React.InputHTMLAttributes<HTMLInputElement>
>(function CheckboxRowInner({ id, children, error, ...rest }, ref) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-muted"
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-accent focus:ring-accent/40"
        {...rest}
      />
      <span className="flex-1">
        {children}
        {error && (
          <span className="block text-[11px] text-[#C24A4F] mt-1" role="alert">
            {error}
          </span>
        )}
      </span>
    </label>
  )
})
