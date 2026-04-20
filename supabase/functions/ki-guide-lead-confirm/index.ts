// ki-guide-lead-confirm
// POST { token } — marks the lead as confirmed, generates a 24h signed URL
// for the PDF, sends the delivery mail via Resend, and (on first confirm)
// sends an internal heads-up to Aleksa with all lead details.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const FROM = 'KI-Schule <noreply@projekt.aleksa.ai>'
const REPLY_TO = 'info@aleksa.ai'
const INTERNAL_NOTIFY_TO = 'info@aleksa.ai'
const SITE_ORIGIN = 'https://guide.ki-hochschule.de'
const MAIN_SITE = 'https://ki-hochschule.de'
const BUCKET = 'ki-guide'
const PDF_PATH = 'ki-team-guide-v2.pdf'
const SIGNED_URL_TTL = 60 * 60 * 24 // 24 hours

const REACHABLE_LABELS: Record<string, string> = {
  morning: 'Vormittags (9–12 Uhr)',
  noon: 'Mittags (12–14 Uhr)',
  afternoon: 'Nachmittags (14–18 Uhr)',
  evening: 'Abends (ab 18 Uhr)',
  flexible: 'Flexibel — einfach schreiben',
}

const EXCHANGE_LABELS: Record<string, string> = {
  yes: 'Ja, gerne',
  maybe: 'Vielleicht',
  no: 'Nein',
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function esc(s: string | null | undefined) {
  if (!s) return ''
  return String(s).replace(/[&<>"']/g, (c) =>
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

function deliveryMailHtml(args: {
  firstName: string
  downloadUrl: string
  wantsExchange: boolean
  bestReachableLabel: string
}) {
  const name = esc(args.firstName)
  const exchangeBlock = args.wantsExchange
    ? `
<tr><td style="padding:0 40px 32px 40px;">
<div style="padding:20px 24px;background:#F5F7FB;border-radius:12px;border:1px solid #E5E8EE;">
<div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#66A4FF;font-weight:600;margin-bottom:6px;">ICH MELDE MICH</div>
<p style="font-size:14px;line-height:1.55;color:#0B0B0F;margin:0;">
Du hast gesagt, du hättest Lust auf einen kurzen Austausch. Ich ruf dich in den nächsten 1–3 Werktagen an — gewünschte Zeit: <strong>${esc(args.bestReachableLabel)}</strong>.
</p>
</div>
</td></tr>`
    : ''

  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F5F7FB;font-family:Inter,-apple-system,Segoe UI,sans-serif;color:#0B0B0F;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:48px 16px;background:#F5F7FB;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#FFFFFF;border-radius:16px;border:1px solid #E5E8EE;overflow:hidden;">

<tr><td style="padding:32px 40px 24px 40px;"><img src="${SITE_ORIGIN}/ki-schule-logo.png" alt="KI-Schule" height="28"></td></tr>

<tr><td style="padding:0 40px 24px 40px;">
<div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#5B6270;font-weight:500;margin-bottom:8px;">DEIN GUIDE</div>
<h1 style="font-size:32px;line-height:1.1;font-weight:600;letter-spacing:-0.02em;margin:0 0 16px 0;">
Dein KI-Team-Guide ist <em style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400;color:#66A4FF;">da</em>.
</h1>
<p style="font-size:16px;line-height:1.6;margin:0 0 24px 0;">
Hey ${name}, bestätigt. Hier ist der Download-Link. Er ist 24 Stunden gültig — wenn du in der Zeit nicht dazu kommst, schreib mir kurz und ich schick dir einen neuen.
</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px 0;">
<tr><td style="background:#66A4FF;border-radius:999px;">
<a href="${args.downloadUrl}" style="display:inline-block;padding:16px 32px;color:#FFFFFF;font-size:15px;font-weight:600;text-decoration:none;">Guide herunterladen (PDF)</a>
</td></tr></table>
</td></tr>

${exchangeBlock}

<tr><td style="padding:0 40px 32px 40px;">
<hr style="border:none;border-top:1px solid #E5E8EE;margin:0 0 24px 0;">
<div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#5B6270;font-weight:500;margin-bottom:8px;">ÜBER DIE KI-SCHULE</div>
<p style="font-size:14px;line-height:1.6;color:#5B6270;margin:0 0 16px 0;">
Die KI-Schule ist meine Community- und Coaching-Plattform rund um KI in der Praxis. Wenn du den Guide magst, lohnt sich vielleicht der tiefere Blick — zwei Säulen:
</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
<tr>
<td width="50%" valign="top" style="padding-right:8px;">
<div style="padding:16px;background:#FFFFFF;border:1px solid #E5E8EE;border-radius:10px;">
<div style="font-size:13px;font-weight:600;margin-bottom:6px;">Community</div>
<div style="font-size:12px;line-height:1.5;color:#5B6270;">Vernetzung mit Gleichgesinnten aus der KI-Bubble.</div>
</div></td>
<td width="50%" valign="top" style="padding-left:8px;">
<div style="padding:16px;background:#FFFFFF;border:1px solid #E5E8EE;border-radius:10px;">
<div style="font-size:13px;font-weight:600;margin-bottom:6px;">Selbstständigkeit</div>
<div style="font-size:12px;line-height:1.5;color:#5B6270;">1:1-Coaching beim Aufbau deiner eigenen KI-Agentur.</div>
</div></td>
</tr></table>
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr><td style="border:1px solid #0B0B0F;border-radius:999px;">
<a href="${MAIN_SITE}" style="display:inline-block;padding:12px 24px;color:#0B0B0F;font-size:13px;font-weight:500;text-decoration:none;">Mehr zur KI-Schule →</a>
</td></tr></table>
</td></tr>

<tr><td style="padding:24px 40px 32px 40px;border-top:1px solid #E5E8EE;">
<p style="font-size:13px;line-height:1.6;margin:0 0 4px 0;">Viel Erfolg beim Bauen,<br><strong>Aleksa</strong></p>
<p style="font-size:11px;color:#5B6270;margin:4px 0 0 0;">Gründer KI-Schule · Spalevic Consulting</p>
</td></tr>
</table>

<div style="padding:16px 0 0 0;font-size:10px;line-height:1.5;color:#5B6270;max-width:560px;">
Du bekommst diese Mail, weil du den KI-Team-Guide auf <a href="${SITE_ORIGIN}" style="color:#4A8FE8;">guide.ki-hochschule.de</a> angefordert hast.<br>
KI-Schule · Spalevic Consulting Kft. · 1147 Budapest, Locsei út 9/A<br>
<a href="${SITE_ORIGIN}/datenschutz" style="color:#4A8FE8;">Datenschutz</a> · <a href="${SITE_ORIGIN}/impressum" style="color:#4A8FE8;">Impressum</a>
</div>
</td></tr></table>
</body></html>
`
}

function notifySubject(lead: Record<string, any>) {
  const full = `${lead.first_name ?? ''} ${lead.last_name ?? ''}`.trim() || lead.email
  if (lead.wants_exchange === 'yes') return `🔔 Neuer Lead will Austausch: ${full}`
  if (lead.wants_exchange === 'maybe') return `📬 Neuer Lead (Austausch: vielleicht): ${full}`
  return `📬 Neuer Lead: ${full}`
}

function internalNotifyHtml(lead: Record<string, any>) {
  const reachable = REACHABLE_LABELS[lead.best_reachable as string] ?? esc(lead.best_reachable) ?? '—'
  const exchangeLabel = EXCHANGE_LABELS[lead.wants_exchange as string] ?? '—'
  const isHot = lead.wants_exchange === 'yes'
  const headerEmoji = isHot ? '🔔' : '📬'
  const headerTitle = isHot ? 'Neuer Lead will Austausch' : 'Neuer Lead bestätigt'
  const headerSub = isHot
    ? 'Aus dem KI-Team-Guide-Funnel — Lead hat bestätigt und "Ja, gerne" auf Austausch gewählt.'
    : 'Aus dem KI-Team-Guide-Funnel — Lead hat seine E-Mail bestätigt.'
  const submittedAt = lead.created_at
    ? new Date(lead.created_at).toLocaleString('de-DE', {
        timeZone: 'Europe/Budapest',
        dateStyle: 'short',
        timeStyle: 'short',
      })
    : '—'

  return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
<h2 style="color:#0B0B0F;margin:0 0 16px 0;">${headerEmoji} ${headerTitle}</h2>
<p style="color:#5B6270;margin:0 0 20px 0;">${headerSub}</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;">
<tr><td style="padding:6px 0;font-weight:bold;width:170px;">Name</td><td>${esc(lead.first_name)} ${esc(lead.last_name)}</td></tr>
<tr><td style="padding:6px 0;font-weight:bold;">E-Mail</td><td><a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a></td></tr>
<tr><td style="padding:6px 0;font-weight:bold;">Telefon</td><td>${lead.phone ? `<a href="tel:${esc(lead.phone)}">${esc(lead.phone)}</a>` : '—'}</td></tr>
<tr><td style="padding:6px 0;font-weight:bold;">Firma</td><td>${esc(lead.company) || '—'}</td></tr>
<tr><td style="padding:6px 0;font-weight:bold;">Rolle</td><td>${esc(lead.role) || '—'}</td></tr>
<tr><td style="padding:6px 0;font-weight:bold;">Austausch gewünscht</td><td>${esc(exchangeLabel)}</td></tr>
<tr><td style="padding:6px 0;font-weight:bold;">Erreichbarkeit</td><td>${esc(reachable)}</td></tr>
<tr><td style="padding:6px 0;font-weight:bold;">Kennt KI-Schule</td><td>${lead.knows_ki_schule === 'yes' ? 'Ja' : lead.knows_ki_schule === 'no' ? 'Nein' : '—'}</td></tr>
<tr><td style="padding:6px 0;font-weight:bold;">Newsletter-Consent</td><td>${lead.newsletter_consent ? 'Ja' : 'Nein'}</td></tr>
<tr><td style="padding:6px 0;font-weight:bold;">Eingetragen</td><td>${esc(submittedAt)}</td></tr>
</table>
${lead.additional_info ? `<div style="margin-top:20px;"><div style="font-weight:bold;margin-bottom:6px;">Freitext:</div><div style="padding:12px;background:#F5F7FB;border-radius:8px;font-size:13px;white-space:pre-wrap;">${esc(lead.additional_info)}</div></div>` : ''}
<p style="color:#999;font-size:12px;margin-top:24px;">Confirmed: ${new Date().toISOString()} · Source: ${esc(lead.source) || 'direct'}</p>
</div>
`
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ ok: false, error: 'POST only' }, 405)

  try {
    const apiKey = Deno.env.get('RESEND_API_KEY')
    if (!apiKey) return json({ ok: false, error: 'RESEND_API_KEY not configured' }, 500)

    const { token } = (await req.json()) as { token?: string }
    if (!token || typeof token !== 'string') {
      return json({ ok: false, error: 'Token missing' }, 400)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Look up by token
    const { data: lead, error: selErr } = await supabase
      .from('ki_schule_leads')
      .select('*')
      .eq('doi_token', token)
      .maybeSingle()

    if (selErr) throw new Error(`DB select: ${selErr.message}`)
    if (!lead) return json({ ok: false, error: 'Ungültiger oder abgelaufener Link.' }, 404)

    // Generate signed URL for the PDF (24h)
    const { data: signed, error: signErr } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(PDF_PATH, SIGNED_URL_TTL, { download: 'KI-Team-Guide.pdf' })

    if (signErr || !signed?.signedUrl) {
      throw new Error(`Signed URL: ${signErr?.message ?? 'no URL'}`)
    }

    const now = new Date().toISOString()
    const isFirstConfirm = !lead.confirmed_at

    // Mark confirmed + delivered (only if not yet confirmed)
    const { error: updErr } = await supabase
      .from('ki_schule_leads')
      .update({
        confirmed_at: lead.confirmed_at ?? now,
        guide_delivered_at: now,
      })
      .eq('id', lead.id)
    if (updErr) throw new Error(`DB update: ${updErr.message}`)

    // Send the delivery mail
    const wantsExchange = lead.wants_exchange === 'yes'
    await sendMail(
      apiKey,
      [lead.email],
      `${lead.first_name}, dein KI-Team-Guide ist da.`,
      deliveryMailHtml({
        firstName: lead.first_name,
        downloadUrl: signed.signedUrl,
        wantsExchange,
        bestReachableLabel: REACHABLE_LABELS[lead.best_reachable as string] ?? '',
      })
    )

    // Internal notification — fires on every first confirm, regardless of wants_exchange.
    // Subject + header vary by wants_exchange so Aleksa can triage at a glance.
    if (isFirstConfirm) {
      try {
        await sendMail(
          apiKey,
          [INTERNAL_NOTIFY_TO],
          notifySubject(lead),
          internalNotifyHtml(lead)
        )
      } catch (notifyErr) {
        console.error('[internal-notify]', notifyErr)
        // non-blocking — the user mail was already sent
      }
    }

    return json({ ok: true, firstName: lead.first_name })
  } catch (e) {
    console.error('[ki-guide-lead-confirm]', e)
    return json({ ok: false, error: String(e) }, 500)
  }
})
