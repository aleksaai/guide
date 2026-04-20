# SPEC — KI-Team-Guide Lead Funnel

**Projekt:** `guide.ki-hochschule.de`
**Repo:** `aleksaai/guide`
**Autor:** Marcus (KI-Team Agent) · **Datum:** 2026-04-18

## 1. Was wird gebaut

Ein One-Page Lead-Magnet-Funnel unter der Sub-Domain `guide.ki-hochschule.de`.
Besucher erhalten nach Bestätigung ihrer E-Mail (Double-Opt-In) einen
PDF-Guide — _"KI-Team-Guide — So baust du dein eigenes KI-Mitarbeiter-Team"_ —
per Mail zugeschickt. Die Leads wandern in Supabase und werden später in den
KI-Schule-Newsletter überführt.

## 2. Zielgruppe (eine Persona)

**Der neugierige Umsetzer.**
- 28–45 Jahre, DACH-Raum
- Selbstständig, Founder, Tech-affiner Angestellter oder Consultant
- Hat schon mit Claude / ChatGPT gearbeitet, will den Sprung von "Chat-Tool"
  zu "eigenes Agenten-Team" schaffen
- Tech-verständig genug, um MD-Files und Ordnerstrukturen zu begreifen
- Aber nicht zwingend Software-Engineer — will praktisch lernen, nicht
  akademisch

Der Ton muss beide Extreme bedienen: tech-tief genug, dass Profis ernst
genommen werden; zugänglich genug, dass Einsteiger nicht abschrecken.

## 3. Kern-Flow

```
  [FORM STATE]        [PENDING STATE]       [SUCCESS STATE]
  Hero + Form   →     "Check your inbox" →  (nur nach DOI-Klick:
  Submit-Klick        Loader → State-Swap   Landet auf /bestaetigt
                                             → PDF-Link wird per Mail
                                                geschickt + auf Seite)
```

## 4. Screens (Routes)

- **`/`** — Landing (Hero + What's Inside + Social Proof + FAQ + BottomCTA + Footer)
- **`/bestaetigt`** — Thank-You nach DOI-Klick
- **`/datenschutz`** — DSGVO-Pflichtseite
- **`/impressum`** — gesetzlich Pflicht
- **`*`** — 404

## 5. Datenmodell (Supabase — Projekt `znltfcxpngtztiwbcamm`)

### Tabelle: `ki_schule_leads`

| Feld | Typ | Nullable | Notiz |
|---|---|---|---|
| `id` | uuid | NO | `default gen_random_uuid()` |
| `email` | citext | NO | UNIQUE (case-insensitive) |
| `first_name` | text | NO | |
| `last_name` | text | NO | |
| `company` | text | YES | |
| `role` | text | YES | Enum-Values: `founder`, `consultant`, `employed`, `selbststaendig`, `student`, `other` |
| `knows_ki_schule` | text | YES | `yes` / `no` — v2 Step 2 |
| `wants_exchange` | text | YES | `yes` / `maybe` / `no` — v2 Step 2 |
| `phone` | text | YES | Nur gesetzt wenn `wants_exchange = yes` |
| `best_reachable` | text | YES | `morning` / `noon` / `afternoon` / `evening` / `flexible` |
| `additional_info` | text | YES | Freitextfeld |
| `doi_token` | uuid | NO | `default gen_random_uuid()` — Double-Opt-In Link |
| `confirmed_at` | timestamptz | YES | NULL = nicht bestätigt |
| `guide_delivered_at` | timestamptz | YES | Wann PDF-Mail raus ging |
| `source` | text | YES | URL-Param `?source=X` für UTM-Tracking |
| `newsletter_consent` | boolean | NO | default false — separate Checkbox |
| `privacy_consent_at` | timestamptz | NO | Zeitstempel der DSGVO-Checkbox |
| `user_agent` | text | YES | Audit-Trail |
| `ip_address` | text | YES | `x-forwarded-for` header |
| `created_at` | timestamptz | NO | `default now()` |

**RLS:** Komplett gesperrt für `anon`. Nur Service-Role-Key (Edge Function)
darf schreiben/lesen. Keine Client-Direktzugriffe.

### Storage Bucket: `ki-guide`

- Private bucket
- Files: `ki-team-guide-v1.pdf` (und spätere Versionen)
- Zugriff nur über **signed URLs** (24h Validity), generiert von der
  Edge Function bei der Confirmation-Mail

## 6. Edge Functions (Supabase)

### `ki-guide-lead-submit`

- **Input (v2 Multi-Step):**
  ```
  {
    firstName, lastName, email,
    company?, role?,
    knowsKiSchule: 'yes' | 'no',
    wantsExchange: 'yes' | 'maybe' | 'no',
    phone?,              // required if wantsExchange === 'yes'
    bestReachable?,      // required if wantsExchange === 'yes'
    additionalInfo?,
    privacyConsent: true,
    newsletterConsent?,
    source?
  }
  ```
- **Validiert:** zod-Schema, E-Mail-Format, required fields
- **Schreibt:** Row in `ki_schule_leads` mit `doi_token = gen_random_uuid()`
- **Sendet:** Bestätigungsmail via **Resend** (Sender: `noreply@projekt.aleksa.ai`,
  Reply-To: `info@aleksa.ai`) mit Link `https://guide.ki-hochschule.de/bestaetigt?token=<doi_token>`
- **Returns:** `{ok: true}` oder `{ok: false, error}`
- **Edge Case:** Wenn E-Mail schon existiert und bereits bestätigt ist →
  sanft reporten "du bist schon dabei, Mail wurde neu geschickt" + neue DOI-Mail

### `ki-guide-lead-confirm`

- **Input:** `{token}` (per POST body, nicht query)
- **Lookup:** Lead mit passendem `doi_token`
- **Updates:** `confirmed_at = now()`, `guide_delivered_at = now()`
- **Generiert:** Signed URL auf `ki-guide/ki-team-guide-v1.pdf` (24h)
- **Sendet:** PDF-Delivery-Mail via Resend mit Download-Link + Intro-Text
- **Returns:** `{ok: true, firstName}` (damit Thank-You-Page personalisieren kann)

Beide Functions: `verify_jwt: false`, CORS offen für `guide.ki-hochschule.de` +
`localhost:5220`.

## 7. Externe APIs

- **Supabase** (`znltfcxpngtztiwbcamm`) — Postgres + Storage + Edge Functions
- **Resend** — Transaktionsmails. Sender: `noreply@projekt.aleksa.ai`.
  Domain `projekt.aleksa.ai` ist bei Resend **bereits verifiziert** (aus der
  IBCB-Migration — SPF/DKIM/Return-Path laufen). `RESEND_API_KEY` liegt als
  Supabase-Secret.

## 8. Akzeptanz-Kriterien (Definition of Done)

- [ ] Form-Submit schreibt Lead + schickt DOI-Mail in < 5s
- [ ] DOI-Link klicken → Confirmation + PDF-Mail kommt innerhalb 30s
- [ ] Bounces/Invalid-Mails erzeugen keinen bestätigten DB-Eintrag
- [ ] Mobile 375px / 768px / 1440px sauber
- [ ] Lighthouse Perf > 85, A11y > 90
- [ ] `curl https://guide.ki-hochschule.de/` liefert volles HTML inkl.
  Meta-Tags + OG-Tags (für LinkedIn/X-Share) — via Prerender
- [ ] DSGVO: Datenschutz-Checkbox required, Newsletter-Consent separat
  (nicht gebündelt), Impressum + Datenschutz verlinkt
- [ ] Lead-Row enthält IP + UA als Audit-Trail
- [ ] Doppelte E-Mail-Submissions werden sauber gehandhabt

## 9. NICHT im Scope (v1)

- Admin-Dashboard für Lead-Einsicht (Aleksa nutzt Supabase Studio direkt)
- Newsletter-Delivery (später, separates Tool — Brevo oder Resend Audiences)
- A/B-Testing-Framework (YAGNI)
- Analytics über GA4 (Plausible wenn überhaupt, später)
- Multi-Language (nur DE v1)
- CAPTCHA (erst bei echtem Spam-Problem)

## 10. Entscheidungen + Begründungen (auditable)

| Entscheidung | Warum |
|---|---|
| Separates Repo `aleksaai/guide` (nicht Subroute im Haupt-KI-Schule-Repo) | Unabhängige Netlify-Site, sauberes Subdomain-Deployment, separate Releases |
| Kein Stitch | BrandKit + existierende ki-hochschule.de-Site reichen als Design-Source; Stitch wäre Zeitverlust |
| Signed URL (24h) statt PDF-Attachment | Attachments gehen in Spam; Links tracken besser; neue Versionen = Storage-Upload statt Mail-Neuversand |
| Resend-Sender `noreply@projekt.aleksa.ai` | Domain bereits verifiziert aus IBCB-Migration; `noreply@` ist Aleksas ausdrückliche Wahl (2026-04-18) |
| Double-Opt-In | DSGVO-Best-Practice + Bounce-Schutz + hält Newsletter-Liste sauber |
| Tailwind + eigene UI-Primitives statt shadcn-Komplett-Install | Kleineres Bundle, klarere Lesbarkeit, wir brauchen <5 Komponenten |
| Hardcoded Supabase-URL + Anon-Key in `src/lib/supabase.ts` | Lesson aus IBCB: Netlify überschreibt env-vars silent mit falschen Werten aus alten Integrationen. Hardcoden schützt (Anon-Key ist public JWT). |
