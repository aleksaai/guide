# E-Mail-Templates — KI-Team-Guide Funnel

Diese Templates werden von den Supabase Edge Functions (`ki-guide-lead-submit`
und `ki-guide-lead-confirm`) via Resend versendet.

- **Sender:** `noreply@projekt.aleksa.ai` (Domain seit IBCB bei Resend verifiziert)
- **Reply-To:** `info@aleksa.ai` (damit Antworten bei Aleksa landen)
- **Rendering:** Inline-HTML, keine externen CSS-Files, Mail-Client-safe

---

## 1. Bestätigungs-Mail (Double-Opt-In)

**Getriggert:** direkt nach Step-2-Submit von `ki-guide-lead-submit`.

**Subject:** `Bitte bestätige deine Anmeldung zum KI-Team-Guide`

**Personalisierung:**
- `{{firstName}}` — Vorname
- `{{doiUrl}}` — `https://guide.ki-hochschule.de/bestaetigt?token=<doi_token>`

**HTML (gekürzt, styled inline):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bestätige deine Anmeldung</title>
</head>
<body style="margin:0;padding:0;background:#F5F7FB;font-family:Inter,-apple-system,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="padding:48px 16px;background:#F5F7FB;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0"
               style="max-width:560px;background:#FFFFFF;border-radius:16px;
                      border:1px solid #E5E8EE;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px 40px;text-align:left;">
              <img src="https://guide.ki-hochschule.de/ki-schule-logo.png"
                   alt="KI-Schule" height="28" style="display:block;">
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 40px 16px 40px;">
              <div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;
                          color:#5B6270;font-weight:500;margin-bottom:8px;">
                ANMELDUNG BESTÄTIGEN
              </div>
              <h1 style="font-size:28px;line-height:1.15;color:#0B0B0F;
                         font-weight:600;letter-spacing:-0.02em;margin:0 0 16px 0;">
                Fast da, {{firstName}}.
              </h1>
              <p style="font-size:15px;line-height:1.6;color:#5B6270;margin:0 0 24px 0;">
                Bitte bestätige noch kurz deine E-Mail, damit wir dir den
                KI-Team-Guide schicken können. Ein Klick auf den Button,
                und der Download-Link ist 30 Sekunden später in deiner Inbox.
              </p>
              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                     style="margin:8px 0 32px 0;">
                <tr>
                  <td style="background:#66A4FF;border-radius:999px;">
                    <a href="{{doiUrl}}"
                       style="display:inline-block;padding:14px 28px;color:#FFFFFF;
                              font-size:14px;font-weight:600;text-decoration:none;">
                      Anmeldung bestätigen →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="font-size:12px;line-height:1.5;color:#5B6270;margin:0;">
                Funktioniert der Button nicht? Kopier diesen Link in deinen Browser:<br>
                <a href="{{doiUrl}}"
                   style="color:#4A8FE8;word-break:break-all;">{{doiUrl}}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px 40px;border-top:1px solid #E5E8EE;">
              <p style="font-size:11px;line-height:1.5;color:#5B6270;margin:0;">
                Du hast dich unter <a href="https://guide.ki-hochschule.de"
                style="color:#4A8FE8;">guide.ki-hochschule.de</a> für den
                KI-Team-Guide angemeldet. Falls du das nicht warst, ignorier
                diese Mail einfach — ohne Klick passiert nichts.
              </p>
            </td>
          </tr>
        </table>

        <!-- Below-card signature -->
        <div style="padding:16px 0 0 0;font-size:11px;color:#5B6270;">
          KI-Schule · Spalevic Consulting Kft. · 1147 Budapest, Locsei út 9/A
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 2. Delivery-Mail (nach DOI-Klick)

**Getriggert:** von `ki-guide-lead-confirm` nach erfolgreicher Token-Verification.

**Subject:** `{{firstName}}, dein KI-Team-Guide ist da.`

**Personalisierung:**
- `{{firstName}}`
- `{{downloadUrl}}` — 24h Signed URL auf `ki-guide/ki-team-guide-v2.pdf`
- `{{wantsExchange}}` — Flag, zeigt den Rückruf-Zusatz-Block an/aus
- `{{bestReachableLabel}}` — z. B. „Vormittags (9–12 Uhr)"
- `{{kiSchuleUrl}}` — `https://ki-hochschule.de`

**HTML (Kernstruktur):**

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Dein KI-Team-Guide</title></head>
<body style="margin:0;padding:0;background:#F5F7FB;font-family:Inter,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="padding:48px 16px;background:#F5F7FB;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0"
             style="max-width:560px;background:#FFFFFF;border-radius:16px;
                    border:1px solid #E5E8EE;overflow:hidden;">

        <!-- Logo -->
        <tr><td style="padding:32px 40px 24px 40px;">
          <img src="https://guide.ki-hochschule.de/ki-schule-logo.png"
               alt="KI-Schule" height="28">
        </td></tr>

        <!-- Hero -->
        <tr><td style="padding:0 40px 24px 40px;">
          <div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;
                      color:#5B6270;font-weight:500;margin-bottom:8px;">
            DEIN GUIDE
          </div>
          <h1 style="font-size:32px;line-height:1.1;color:#0B0B0F;font-weight:600;
                     letter-spacing:-0.02em;margin:0 0 16px 0;">
            Dein KI-Team-Guide ist <em style="font-family:'Instrument Serif',Georgia,serif;
                                              font-style:italic;font-weight:400;
                                              color:#66A4FF;">da</em>.
          </h1>
          <p style="font-size:16px;line-height:1.6;color:#0B0B0F;margin:0 0 24px 0;">
            Hey {{firstName}}, bestätigt. Hier ist der Download-Link. Er ist
            24 Stunden gültig — wenn du in der Zeit nicht dazu kommst, schreib
            mir kurz und ich schick dir einen neuen.
          </p>

          <!-- Download CTA -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                 style="margin:0 0 32px 0;">
            <tr><td style="background:#66A4FF;border-radius:999px;">
              <a href="{{downloadUrl}}"
                 style="display:inline-block;padding:16px 32px;color:#FFFFFF;
                        font-size:15px;font-weight:600;text-decoration:none;">
                Guide herunterladen (PDF, ca. 5 MB)
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Wenn wants_exchange == 'yes' -->
        {{#if wantsExchange}}
        <tr><td style="padding:0 40px 32px 40px;">
          <div style="padding:20px 24px;background:#F5F7FB;border-radius:12px;
                      border:1px solid #E5E8EE;">
            <div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;
                        color:#66A4FF;font-weight:600;margin-bottom:6px;">
              ICH MELDE MICH
            </div>
            <p style="font-size:14px;line-height:1.55;color:#0B0B0F;margin:0;">
              Du hast gesagt, du hättest Lust auf einen kurzen Austausch.
              Ich ruf dich in den nächsten 1–3 Werktagen an — gewünschte
              Zeit: <strong>{{bestReachableLabel}}</strong>.
            </p>
          </div>
        </td></tr>
        {{/if}}

        <!-- Über die KI-Schule -->
        <tr><td style="padding:0 40px 32px 40px;">
          <hr style="border:none;border-top:1px solid #E5E8EE;margin:0 0 24px 0;">
          <div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;
                      color:#5B6270;font-weight:500;margin-bottom:8px;">
            ÜBER DIE KI-SCHULE
          </div>
          <p style="font-size:14px;line-height:1.6;color:#5B6270;margin:0 0 16px 0;">
            Die KI-Schule ist meine Community- und Coaching-Plattform rund um
            KI in der Praxis. Wenn du den Guide magst, lohnt sich vielleicht
            der tiefere Blick — zwei Säulen:
          </p>

          <!-- 2 Pillars Row -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                 style="margin:0 0 24px 0;">
            <tr>
              <td width="50%" valign="top" style="padding-right:8px;">
                <div style="padding:16px;background:#FFFFFF;border:1px solid #E5E8EE;
                            border-radius:10px;">
                  <div style="font-size:13px;font-weight:600;color:#0B0B0F;
                              margin-bottom:6px;">
                    Community
                  </div>
                  <div style="font-size:12px;line-height:1.5;color:#5B6270;">
                    Vernetzung mit Gleichgesinnten aus der KI-Bubble.
                  </div>
                </div>
              </td>
              <td width="50%" valign="top" style="padding-left:8px;">
                <div style="padding:16px;background:#FFFFFF;border:1px solid #E5E8EE;
                            border-radius:10px;">
                  <div style="font-size:13px;font-weight:600;color:#0B0B0F;
                              margin-bottom:6px;">
                    Selbstständigkeit
                  </div>
                  <div style="font-size:12px;line-height:1.5;color:#5B6270;">
                    1:1-Coaching beim Aufbau deiner eigenen KI-Agentur.
                  </div>
                </div>
              </td>
            </tr>
          </table>

          <!-- KI-Schule CTA -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="border:1px solid #0B0B0F;border-radius:999px;">
              <a href="{{kiSchuleUrl}}"
                 style="display:inline-block;padding:12px 24px;color:#0B0B0F;
                        font-size:13px;font-weight:500;text-decoration:none;">
                Mehr zur KI-Schule →
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Signature -->
        <tr><td style="padding:24px 40px 32px 40px;border-top:1px solid #E5E8EE;">
          <p style="font-size:13px;line-height:1.6;color:#0B0B0F;margin:0 0 4px 0;">
            Viel Erfolg beim Bauen,<br>
            <strong>Aleksa</strong>
          </p>
          <p style="font-size:11px;color:#5B6270;margin:4px 0 0 0;">
            Gründer KI-Schule · Spalevic Consulting
          </p>
        </td></tr>
      </table>

      <!-- Legal footer outside the card -->
      <div style="padding:16px 0 0 0;font-size:10px;line-height:1.5;color:#5B6270;
                  max-width:560px;">
        Du bekommst diese Mail, weil du den KI-Team-Guide auf
        <a href="https://guide.ki-hochschule.de" style="color:#4A8FE8;">
        guide.ki-hochschule.de</a> angefordert hast.<br>
        KI-Schule · Spalevic Consulting Kft. · 1147 Budapest, Locsei út 9/A<br>
        <a href="https://guide.ki-hochschule.de/datenschutz"
           style="color:#4A8FE8;">Datenschutz</a> ·
        <a href="https://guide.ki-hochschule.de/impressum"
           style="color:#4A8FE8;">Impressum</a>
      </div>
    </td></tr>
  </table>
</body>
</html>
```

---

## 3. Interne Notification an Aleksa (optional)

Wenn `wants_exchange = 'yes'`, zusätzlich eine simple interne Mail an
`info@aleksa.ai` mit den Kontaktdaten für den Rückruf.

**Subject:** `🔔 Neuer Lead will Austausch: {{firstName}} {{lastName}}`

**Body (Plain Text reicht):**

```
Neuer Lead aus dem KI-Team-Guide-Funnel will einen kurzen Austausch.

Name:      {{firstName}} {{lastName}}
E-Mail:    {{email}}
Telefon:   {{phone}}
Firma:     {{company}}
Rolle:     {{role}}

Erreichbarkeit: {{bestReachableLabel}}
Kennt KI-Schule: {{knowsKiSchule}}

Freitext:
{{additionalInfo}}

Eingegangen: {{submittedAt}} via {{source}}
```

---

## Resend-Integration (Sketch)

Die Edge Function nutzt Resend's REST-API:

```typescript
async function sendMail(to: string, subject: string, html: string) {
  const RESEND_KEY = Deno.env.get('RESEND_API_KEY')!
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'KI-Schule <noreply@projekt.aleksa.ai>',
      reply_to: 'info@aleksa.ai',
      to: [to],
      subject,
      html,
    }),
  })
  if (!res.ok) throw new Error(`Resend: ${await res.text()}`)
  return res.json()
}
```

Die HTML-Templates werden mit simplem `.replace()` (oder einer kleinen
Template-Engine wie `nanotemplate`) gerendert. Conditional Sections
(`{{#if wantsExchange}}...{{/if}}`) werden in der Function als
TypeScript-Conditionals aufgelöst, nicht als Mustache-Templating.

---

## Testing-Checkliste vor Go-Live

- [ ] DOI-Mail kommt in < 10 s nach Submit an
- [ ] DOI-Link führt zu `/bestaetigt` und triggert `ki-guide-lead-confirm`
- [ ] Delivery-Mail kommt in < 30 s nach Confirm-Klick an
- [ ] Download-Link öffnet die PDF direkt
- [ ] Wenn `wants_exchange = yes`: Zusatz-Block in Delivery-Mail sichtbar
- [ ] Interne Notification an Aleksa nur bei `wants_exchange = yes`
- [ ] Beide Mails rendern sauber in Gmail / Apple Mail / Outlook (Web)
- [ ] Beide Mails passieren SpamAssassin mit Score < 3
- [ ] Reply-To funktioniert: Antwort landet bei `info@aleksa.ai`
