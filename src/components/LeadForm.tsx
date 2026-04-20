import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Loader2,
  Mail,
  ArrowRight,
  ArrowLeft,
  Check,
  Users,
  Rocket,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '../lib/cn'
import { EDGE } from '../lib/supabase'
import {
  roleOptions,
  formStep1,
  formStep2,
  knowsKiSchule,
  wantsExchange,
  reachableOptions,
} from '../config/content'

// ── Schema
// Step 1 fields are always required. Step 2 fields are validated only when
// the user submits Step 2 (we trigger a subset of the schema per step).

const schema = z
  .object({
    // Step 1
    firstName: z.string().min(1, 'Bitte gib deinen Vornamen an'),
    lastName: z.string().min(1, 'Bitte gib deinen Nachnamen an'),
    email: z.string().email('Ungültige E-Mail-Adresse'),
    company: z.string().optional(),
    role: z.string().optional(),
    // Step 2
    knowsKiSchule: z.enum(['yes', 'no'], {
      errorMap: () => ({ message: 'Bitte wähl eine Antwort' }),
    }),
    wantsExchange: z.enum(['yes', 'maybe', 'no'], {
      errorMap: () => ({ message: 'Bitte wähl eine Antwort' }),
    }),
    phone: z.string().optional(),
    bestReachable: z.string().optional(),
    additionalInfo: z.string().optional(),
    newsletterConsent: z.boolean().optional(),
    privacyConsent: z.literal(true, {
      errorMap: () => ({ message: 'Bitte bestätige die Datenschutzerklärung' }),
    }),
  })
  // If the user says "yes" to exchange, a phone number becomes required.
  .superRefine((val, ctx) => {
    if (val.wantsExchange === 'yes' && (!val.phone || val.phone.trim().length < 4)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phone'],
        message: 'Für den Rückruf brauchen wir deine Nummer',
      })
    }
  })

type FormValues = z.infer<typeof schema>

type State = 'idle' | 'submitting' | 'success' | 'error'
type Step = 1 | 2

export function LeadForm() {
  const [state, setState] = useState<State>('idle')
  const [step, setStep] = useState<Step>(1)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      role: '',
      knowsKiSchule: undefined,
      wantsExchange: undefined,
      phone: '',
      bestReachable: '',
      additionalInfo: '',
      newsletterConsent: false,
      privacyConsent: false as unknown as true,
    },
  })

  const watchKnows = watch('knowsKiSchule')
  const watchExchange = watch('wantsExchange')

  async function goToStep2() {
    // Only validate Step-1 fields before advancing
    const ok = await trigger(['firstName', 'lastName', 'email'])
    if (ok) setStep(2)
  }

  function backToStep1() {
    setStep(1)
  }

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
      setStep(1)
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
            className={cn('flex flex-col gap-5', state === 'error' && 'animate-shake')}
          >
            {/* Step indicator */}
            <StepIndicator step={step} />

            <AnimatePresence mode="wait" initial={false}>
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex flex-col gap-4"
                >
                  <StepHeader
                    eyebrow={formStep1.eyebrow}
                    heading={formStep1.heading}
                    sub={formStep1.subheading}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Vorname" required error={errors.firstName?.message} id="firstName">
                      <input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        className="input-field"
                        {...register('firstName')}
                        aria-invalid={!!errors.firstName}
                      />
                    </Field>
                    <Field label="Nachname" required error={errors.lastName?.message} id="lastName">
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

                  <button
                    type="button"
                    onClick={goToStep2}
                    className="btn-glass-primary mt-2 w-full px-5 py-3 text-sm sm:w-auto sm:self-start"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{formStep1.submitLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex flex-col gap-5"
                >
                  <StepHeader
                    eyebrow={formStep2.eyebrow}
                    heading={formStep2.heading}
                    sub={formStep2.subheading}
                  />

                  {/* Q1 — Kennst du die KI-Schule schon? */}
                  <div className="flex flex-col gap-3">
                    <div className="text-[13px] font-medium text-ink">
                      {knowsKiSchule.question}
                    </div>
                    <RadioGroup
                      options={knowsKiSchule.options}
                      name="knowsKiSchule"
                      register={register}
                      error={errors.knowsKiSchule?.message}
                    />
                    <AnimatePresence initial={false}>
                      {watchKnows === 'no' && (
                        <motion.div
                          key="intro"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-1 rounded-lg border border-accent/20 bg-accent/5 p-4 sm:p-5">
                            <div className="text-[13px] font-semibold text-ink mb-1">
                              {knowsKiSchule.introWhenNo.heading}
                            </div>
                            <p className="text-[12.5px] text-muted leading-relaxed">
                              {knowsKiSchule.introWhenNo.body}
                            </p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              {knowsKiSchule.introWhenNo.pillars.map((p, i) => (
                                <div
                                  key={p.name}
                                  className="rounded-md bg-white/60 border border-white/80 p-3 sm:p-4"
                                >
                                  <div className="flex items-center gap-2 text-ink font-semibold text-[13px]">
                                    {i === 0 ? (
                                      <Users className="h-3.5 w-3.5 text-accent" />
                                    ) : (
                                      <Rocket className="h-3.5 w-3.5 text-accent" />
                                    )}
                                    {p.name}
                                  </div>
                                  <p className="mt-1 text-[12px] text-muted leading-relaxed">
                                    {p.body}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Q2 — Interesse am Austausch */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[13px] font-medium text-ink">
                      {wantsExchange.question}
                    </div>
                    <div className="text-[11.5px] text-muted">{wantsExchange.subtext}</div>
                    <RadioGroup
                      options={wantsExchange.options}
                      name="wantsExchange"
                      register={register}
                      error={errors.wantsExchange?.message}
                    />
                    <AnimatePresence initial={false}>
                      {watchExchange === 'yes' && (
                        <motion.div
                          key="exchange-fields"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 flex flex-col gap-4 rounded-lg border border-line bg-white/50 p-4 sm:p-5">
                            <Field
                              label="Telefonnummer"
                              required
                              error={errors.phone?.message}
                              id="phone"
                            >
                              <input
                                id="phone"
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                className="input-field"
                                placeholder="+49 170 1234567"
                                {...register('phone')}
                                aria-invalid={!!errors.phone}
                              />
                            </Field>
                            <Field label="Wann bist du am besten erreichbar?" id="bestReachable">
                              <select
                                id="bestReachable"
                                className="input-field cursor-pointer"
                                defaultValue=""
                                {...register('bestReachable')}
                              >
                                <option value="">Wähle eine Zeit</option>
                                {reachableOptions.map((o) => (
                                  <option key={o.value} value={o.value}>
                                    {o.label}
                                  </option>
                                ))}
                              </select>
                            </Field>
                            <Field
                              label="Noch was, das ich vorab wissen sollte? (optional)"
                              id="additionalInfo"
                            >
                              <textarea
                                id="additionalInfo"
                                className="input-field min-h-[90px] resize-y py-3"
                                placeholder="z. B. worum's konkret gehen soll"
                                {...register('additionalInfo')}
                              />
                            </Field>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Consent */}
                  <div className="mt-1 flex flex-col gap-3 border-t border-line pt-4">
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
                    <CheckboxRow id="newsletterConsent" {...register('newsletterConsent')}>
                      Schick mir gelegentliche Updates zum Thema KI-Teams. Abmelden jederzeit möglich.
                    </CheckboxRow>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row-reverse sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={state === 'submitting'}
                      className="btn-glass-primary px-5 py-3 text-sm w-full sm:w-auto"
                    >
                      {state === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Senden…</span>
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4" />
                          <span>{formStep2.submitLabel}</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={backToStep1}
                      className="inline-flex items-center justify-center gap-1.5 text-sm text-muted hover:text-ink transition"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      {formStep2.backLabel}
                    </button>
                  </div>

                  <p className="text-[11px] text-muted leading-relaxed">
                    Kein Verkaufs-Funnel. Keine Massen-Mails. Du kannst dich mit einem Klick wieder
                    abmelden.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── UI Primitives

function StepIndicator({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-medium">
      <div
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-full border transition',
          step === 1
            ? 'border-accent bg-accent text-white'
            : 'border-accent bg-accent/10 text-accent'
        )}
      >
        {step === 2 ? <Check className="h-3.5 w-3.5" /> : '1'}
      </div>
      <div
        className={cn(
          'h-px w-8 transition',
          step === 2 ? 'bg-accent' : 'bg-line'
        )}
      />
      <div
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-full border transition',
          step === 2
            ? 'border-accent bg-accent text-white'
            : 'border-line bg-white text-muted'
        )}
      >
        2
      </div>
    </div>
  )
}

function StepHeader({
  eyebrow,
  heading,
  sub,
}: {
  eyebrow: string
  heading: string
  sub: string
}) {
  return (
    <div>
      <div className="eyebrow mb-2">{eyebrow}</div>
      <h3 className="text-[22px] sm:text-2xl font-semibold text-ink tracking-tight">{heading}</h3>
      <p className="mt-1.5 text-[13px] sm:text-[14px] text-muted leading-relaxed">{sub}</p>
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

function RadioGroup<T extends string>({
  name,
  options,
  register,
  error,
}: {
  name: string
  options: readonly { value: T; label: string }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  error?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-2 text-[13px] text-ink transition hover:border-accent/50 hover:bg-white has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:font-medium has-[:checked]:shadow-[0_0_0_1px_rgba(102,164,255,0.4)]"
          >
            <input
              type="radio"
              className="sr-only"
              value={o.value}
              {...register(name)}
            />
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full bg-line transition group-has-[:checked]:bg-accent"
            />
            {o.label}
          </label>
        ))}
      </div>
      {error && (
        <span className="text-[11px] text-[#C24A4F]" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

const CheckboxRow = React.forwardRef<
  HTMLInputElement,
  {
    id: string
    children: React.ReactNode
    error?: string
  } & React.InputHTMLAttributes<HTMLInputElement>
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
