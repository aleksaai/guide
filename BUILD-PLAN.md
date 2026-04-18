# BUILD-PLAN — KI-Team-Guide Lead Funnel

**Last updated:** 2026-04-18 (Marcus)
**Repo:** `aleksaai/guide` · **Branch:** `main`

## Legend
- ✅ Done
- 🟡 In progress
- ⏳ Pending Aleksa's gate
- ⬜ Not started

---

## Phase 1 — Frontend (✅ done 2026-04-18)

### Step 0 — Repo Bootstrap · ✅
Vite 8 + React 18 + TS template, dependencies installed (Tailwind, Radix,
framer-motion, react-hook-form, zod, Supabase JS, Sonner, react-helmet-async,
lucide-react, Lenis, Playwright).

### Step 1 — Design Tokens + Globals · ✅
- `tailwind.config.ts` mit Brand-Farben, Shadows, Radien, Animationen
- `src/index.css` mit CSS-Vars, Focus-Ring, Glass-Panel-Utilities, Body-Mesh-Gradient
- `index.html` mit Inter + Instrument Serif Preloads + kompletten OG/Twitter-Metas

### Step 2 — Supabase Schema + Storage · ⏳ (GATED)
_Nicht ausgeführt. Braucht Aleksas finales OK (Phase 2)._

Migration-Plan:
```sql
create extension if not exists citext;

create table public.ki_schule_leads (
  id uuid primary key default gen_random_uuid(),
  email citext unique not null,
  first_name text not null,
  last_name text not null,
  company text,
  role text check (role in ('founder','consultant','employed','selbststaendig','student','other')),
  doi_token uuid unique not null default gen_random_uuid(),
  confirmed_at timestamptz,
  guide_delivered_at timestamptz,
  source text,
  newsletter_consent boolean not null default false,
  privacy_consent_at timestamptz not null,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now()
);

create index on public.ki_schule_leads (doi_token);
create index on public.ki_schule_leads (email);
create index on public.ki_schule_leads (created_at desc);

alter table public.ki_schule_leads enable row level security;
-- NO policies defined intentionally → only service_role can access
```

Storage:
- Private bucket `ki-guide` anlegen
- PDF-Upload: aktuelles File aus Aleksas Downloads/Session-Output-Folder in
  `ki-guide/ki-team-guide-v1.pdf`

### Step 3 — Edge Functions · ⏳ (GATED)
_Nicht ausgeführt. Braucht Aleksas OK._

2 Functions via Supabase MCP `deploy_edge_function`:
- `ki-guide-lead-submit` — siehe `SPEC.md` §6
- `ki-guide-lead-confirm` — siehe `SPEC.md` §6

Beide: `verify_jwt: false`, CORS für `https://guide.ki-hochschule.de` +
`http://localhost:5220`. Nutzen `RESEND_API_KEY` aus Supabase Secrets.

### Step 4 — Layout Shell + Routes · ✅
`App.tsx` mit `react-router-dom` Routes (`/`, `/bestaetigt`, `/datenschutz`,
`/impressum`, `*`). Shared `<Navbar>` (Glass-Sticky) + `<Footer>` (border-t,
Legal-Links). Fonts greifen, OG-Tags im `index.html` default.

### Step 5 — Landing Hero · ✅
- Eyebrow: `KI-SCHULE · FREIER GUIDE`
- Headline: `Bau dir dein eigenes <em>KI-Team</em>.` (Instrument Serif italic auf `KI-Team`)
- Subheadline + 3 Trust-Pills
- 2-col Layout ≥ `lg` (Copy links, Form rechts im `glass-panel-elevated`)
- 1-col unter `lg` (Copy oben, Form unten)
- framer-motion Fade-up-Entry

### Step 6 — What's Inside Feature Grid · ✅
4 nummerierte Feature-Cards (01, 02, 03, 04) in `soft`-Background-Cards mit
`accent`-Nummern. Responsive: 1-col mobile → 2-col tablet → 4-col desktop.

### Step 7 — Lead Form · ✅
- `react-hook-form` + `zod`-Schema mit DE-Error-Messages
- Felder: Vorname/Nachname (grid-cols-1 sm:grid-cols-2), E-Mail (full), Firma/Rolle (grid-cols-1 sm:grid-cols-2), 2 Checkboxen (Datenschutz required, Newsletter optional)
- State-Machine: `idle → submitting → success`, mit `error`-Branch (shake + Toast)
- State-Swap im Glass-Panel: bei Success zu Check-Icon + "Check deine Inbox"-Text
- Source-Tracking via `?source=X` URL-Param
- POST an `${SUPABASE_URL}/functions/v1/ki-guide-lead-submit`
- `AnimatePresence mode="wait"` für saubere Übergänge

### Step 8 — Social Proof + FAQ + BottomCTA · ✅
- SocialProof: zentriertes Aleksa-Quote mit AS-Avatar-Placeholder
- FAQ: Radix Accordion, 5 Items mit Chevron-Rotation-Animation
- BottomCTA: Glass-Panel mit CTA zurück zum Formular (smooth-scroll zum `#form` Anchor)

### Step 9 — `/bestaetigt` Thank-You Page · ✅
- Liest `?token=X` aus URL
- POST auf `ki-guide-lead-confirm` (existiert noch nicht → graceful error-state)
- 3 States: `validating → success | error`
- Success: Check-Icon + "Deine Mail ist _raus_, {firstName}"
- Error: Alert-Icon + "Das hat nicht _geklappt_" + "Nochmal anmelden"-CTA
- `<meta name="robots" content="noindex,nofollow">` (Query-Param-Pages nicht indexieren)

### Step 10 — Legal Pages · ✅
- `/impressum` — Spalevic Consulting Kft. Adresse + Kontakt
- `/datenschutz` — DSGVO-konformer Text (Verantwortlicher, Datenerhebung,
  Zweck, DOI, Auftragsverarbeiter Supabase + Resend + Netlify, Speicherdauer,
  Rechte, Cookies)

### Step 11 — Preview Verification · ✅
- Dev-Server läuft auf `http://localhost:5220`
- Desktop 1280px: Hero-Layout, Form, alle Sektionen ✓
- Mobile 375px: Stack sauber, Navbar lesbar mit Glass-Backdrop ✓
- Alle Routes erreichbar
- `/bestaetigt?token=test` zeigt Error-State korrekt (weil Edge Function fehlt)
- `npm run build` clean (tsc + vite, 0 errors, 210 kB gzipped)

---

## Phase 2 — Backend (⏳ waiting for gate)

### Step 2 (above) — Supabase Schema
### Step 3 (above) — Edge Functions

**Gate:** Aleksa muss explizit `"geh"` sagen für Schema-Migration und Function-Deploy,
weil beides destruktiv auf der Production-Supabase-DB (`znltfcxpngtztiwbcamm`) ist.

### Step 11b — E2E-Test nach Backend-Deploy · ⬜
Nach Step 2+3:
1. `curl -X POST $SUPABASE_URL/functions/v1/ki-guide-lead-submit -H "Content-Type: application/json" -d '{...}'` → 200, Row erscheint in Supabase
2. DOI-Mail trifft in Aleksas Inbox ein
3. Klick auf Link → `/bestaetigt?token=X` → PDF-Mail mit Signed URL
4. Signed URL lädt die PDF im Browser

---

## Phase 3 — Deploy (⏳ pending)

### Step 12 — Netlify + DNS · ⏳ (GATED)

1. Neue Netlify-Site via Dashboard:
   - GitHub-Integration zu `aleksaai/guide`, Branch `main`
   - Build: `npm run build`, Publish: `dist`
2. `netlify.toml` + `public/_redirects` ins Repo pushen (SPA-Fallback)
3. DNS — **erst NS-Authority prüfen** für `ki-hochschule.de` (IBCB-Lesson Gotcha #1):
   ```bash
   dig +short NS ki-hochschule.de
   ```
   - Wenn IONOS → CNAME `guide` → `{netlify-app}.netlify.app.` im IONOS-DNS-Panel
   - Wenn Cloudflare → Proxied = OFF (grey cloud) — IBCB-Gotcha #2
4. Let's-Encrypt-Cert provisioning via Netlify-Dashboard
5. Smoke-Test: `https://guide.ki-hochschule.de/` liefert Seite
6. E2E-Test mit Aleksas echter E-Mail

---

## Offene Risiken / Known Gotchas

- **Netlify env-var silent override** (IBCB-Lesson): Supabase-URL + Anon-Key sind
  im Code _hardcoded_, nicht aus `import.meta.env` gelesen — schützt vor dem
  Bug dass Netlify alte Integrationen re-injiziert.
- **Supabase-Cold-Start-Latenz** für die erste Edge-Function-Invocation
  (~1-2s) kann zu Form-Hänger führen. Lösung: Warm-Up via Netlify-Schedule
  oder einfach akzeptieren.
- **Resend-Sandbox-Limits**: Domain-verified Accounts haben 100 Mails/Tag im
  Free-Tier. Für Launch reicht das; bei Traffic-Peaks auf Paid umstellen.
- **PDF-Versionierung:** aktuell hardcoded `ki-team-guide-v1.pdf`. Wenn V2
  kommt, Storage-Upload + ein ENV/Konstanten-Bump in der `lead-confirm`-Function.
