// ki-guide-lead-submit
// Accepts the Step-1 + Step-2 form payload, stores the lead in ki_schule_leads,
// and sends the Double-Opt-In mail via Resend.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const FROM = 'KI-Schule <noreply@projekt.aleksa.ai>'
const REPLY_TO = 'info@aleksa.ai'
const SITE_ORIGIN = 'https://guide.ki-hochschule.de'

interface Payload {
  firstName: string
  lastName: string
  email: string
  company?: string
  role?: string
  knowsKiSchule?: 'yes' | 'no'
  wantsExchange?: 'yes' | 'maybe' | 'no'
  phone?: string
  bestReachable?: string
  additionalInfo?: string
  newsletterConsent?: boolean
  privacyConsent?: boolean
  source?: string
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
  )
}

async function sendMail(apiKey: string, to: string[], subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from: FROM, reply_to: REPLY_TO, to, subject, html }),
  })
  const body = await res.json()
  if (!res.ok) throw new Error(`Resend ${res.status}: ${JSON.stringify(body)}`)
  return body
}

function doiMailHtml(firstName: string, doiUrl: string) {
  const safeName = escapeHtml(firstName)
  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F5F7FB;font-family:Inter,-apple-system,Segoe UI,sans-serif;color:#0B0B0F;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:48px 16px;background:#F5F7FB;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#FFFFFF;border-radius:16px;border:1px solid #E5E8EE;overflow:hidden;">
<tr><td style="padding:32px 40px 24px 40px;">
<img src="${SITE_ORIGIN}/ki-schule-logo.png" alt="KI-Schule" height="28" style="display:block;">
</td></tr>
<tr><td style="padding:0 40px 16px 40px;">
<div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#5B6270;font-weight:500;margin-bottom:8px;">ANMELDUNG BESTÄTIGEN</div>
<h1 style="font-size:28px;line-height:1.15;font-weight:600;letter-spacing:-0.02em;margin:0 0 16px 0;">Fast da, ${safeName}.</h1>
<p style="font-size:15px;line-height:1.6;color:#5B6270;margin:0 0 24px 0;">
Bitte bestätige noch kurz deine E-Mail, damit wir dir den KI-Team-Guide schicken können. Ein Klick auf den Button, und der Download-Link ist 30 Sekunden später in deiner Inbox.
</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 32px 0;">
<tr><td style="background:#66A4FF;border-radius:999px;">
<a href="${doiUrl}" style="display:inline-block;padding:14px 28px;color:#FFFFFF;font-size:14px;font-weight:600;text-decoration:none;">Anmeldung bestätigen →</a>
</td></tr></table>
<p style="font-size:12px;line-height:1.5;color:#5B6270;margin:0;">
Funktioniert der Button nicht? Kopier diesen Link in deinen Browser:<br>
<a href="${doiUrl}" style="color:#4A8FE8;word-break:break-all;">${doiUrl}</a>
</p>
</td></tr>
<tr><td style="padding:24px 40px 32px 40px;border-top:1px solid #E5E8EE;">
<p style="font-size:11px;line-height:1.5;color:#5B6270;margin:0;">
Du hast dich unter <a href="${SITE_ORIGIN}" style="color:#4A8FE8;">guide.ki-hochschule.de</a> für den KI-Team-Guide angemeldet. Falls du das nicht warst, ignorier diese Mail einfach — ohne Klick passiert nichts.
</p>
</td></tr>
</table>
<div style="padding:16px 0 0 0;font-size:11px;color:#5B6270;">KI-Schule · Spalevic Consulting Kft. · 1147 Budapest, Locsei út 9/A</div>
</td></tr></table>
</body></html>
`
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ ok: false, error: 'POST only' }, 405)

  try {
    const apiKey = Deno.env.get('RESEND_API_KEY')
    if (!apiKey) return json({ ok: false, error: 'RESEND_API_KEY not configured' }, 500)

    const data = (await req.json()) as Payload

    // Minimal server-side validation
    if (!data.firstName?.trim() || !data.lastName?.trim() || !data.email?.trim()) {
      return json({ ok: false, error: 'Missing required fields' }, 400)
    }
    if (data.privacyConsent !== true) {
      return json({ ok: false, error: 'privacyConsent required' }, 400)
    }
    const email = data.email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: 'Invalid email' }, 400)
    }

    const userAgent = req.headers.get('user-agent') ?? ''
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? ''

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Upsert-like: fetch existing row by email. If confirmed already, we still
    // resend the DOI mail (with a fresh token) — the assumption is the user
    // wants to re-download. If not confirmed, we update the row and re-send.
    const { data: existing } = await supabase
      .from('ki_schule_leads')
      .select('id, doi_token, confirmed_at')
      .eq('email', email)
      .maybeSingle()

    const row = {
      email,
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      company: data.company?.trim() || null,
      role: data.role || null,
      knows_ki_schule: data.knowsKiSchule ?? null,
      wants_exchange: data.wantsExchange ?? null,
      phone: data.phone?.trim() || null,
      best_reachable: data.bestReachable || null,
      additional_info: data.additionalInfo?.trim() || null,
      newsletter_consent: data.newsletterConsent === true,
      privacy_consent_at: new Date().toISOString(),
      source: data.source ?? null,
      user_agent: userAgent,
      ip_address: ip,
    }

    let doiToken: string
    if (existing) {
      // Rotate the DOI token so the previous link becomes void
      const { data: upd, error: updErr } = await supabase
        .from('ki_schule_leads')
        .update({ ...row, doi_token: crypto.randomUUID(), confirmed_at: null, guide_delivered_at: null })
        .eq('id', existing.id)
        .select('doi_token')
        .single()
      if (updErr) throw new Error(`DB update: ${updErr.message}`)
      doiToken = upd.doi_token
    } else {
      const { data: ins, error: insErr } = await supabase
        .from('ki_schule_leads')
        .insert(row)
        .select('doi_token')
        .single()
      if (insErr) throw new Error(`DB insert: ${insErr.message}`)
      doiToken = ins.doi_token
    }

    const doiUrl = `${SITE_ORIGIN}/bestaetigt?token=${doiToken}`

    await sendMail(
      apiKey,
      [email],
      'Bitte bestätige deine Anmeldung zum KI-Team-Guide',
      doiMailHtml(row.first_name, doiUrl)
    )

    return json({ ok: true })
  } catch (e) {
    console.error('[ki-guide-lead-submit]', e)
    return json({ ok: false, error: String(e) }, 500)
  }
})
