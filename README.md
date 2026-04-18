# KI-Team-Guide — Lead Magnet Funnel

> **Production URL (geplant):** `https://guide.ki-hochschule.de`
>
> **Repo:** [`aleksaai/guide`](https://github.com/aleksaai/guide) · **Owner:** Aleksa (`aleksaai`)
>
> **Tech Lead:** Marcus (KI-Team Agent) · **Stand:** Phase 1 (Frontend) ✅ · Phase 2 (Backend) offen

## Was das ist

Ein One-Page Lead-Magnet-Funnel für die KI-Schule. Besucher tragen sich mit
B2B-Kontaktdaten ein und bekommen nach Double-Opt-In-Bestätigung den
**KI-Team-Guide** (PDF) per Mail zugeschickt. Leads wandern in Supabase und
werden später in den KI-Schule-Newsletter überführt.

## Docs

Bevor du hier Code anfasst, lies in dieser Reihenfolge:

1. [`SPEC.md`](./SPEC.md) — Was genau gebaut wird, Zielgruppe, Datenmodell, externe APIs
2. [`BUILD-PLAN.md`](./BUILD-PLAN.md) — 12 Schritte mit Akzeptanz + aktueller Status pro Schritt
3. [`HANDOFF.md`](./HANDOFF.md) — Kurze Übergabe-Notiz: wer hat was zuletzt gemacht, was ist als nächstes dran, wo liegen die Gates

## Stack

| Layer | Tool |
|---|---|
| Build | Vite 8 |
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS 3 + Design-Tokens aus KI-Schule Brand-Kit |
| Animation | framer-motion |
| Formular | react-hook-form + zod |
| UI | Radix (Accordion, Checkbox, Label) + eigene Primitives |
| Toasts | Sonner |
| SEO | react-helmet-async |
| Backend | Supabase (Postgres + Storage + Edge Functions) |
| Mail | Resend (Sender: `noreply@projekt.aleksa.ai`) |
| Host | Netlify (geplant) |

## Lokal starten

```bash
# Einmalig nach Clone
npm install

# Dev-Server
npm run dev
# → http://localhost:5220
```

Auf einer neuen Maschine musst du nur klonen + installieren:

```bash
cd ~/Desktop
git clone https://github.com/aleksaai/guide.git KI-Guide
cd KI-Guide
npm install
npm run dev
```

## Build + Deploy

```bash
npm run build   # tsc + vite build → dist/
npm run preview # lokale preview des Builds
```

Deploy läuft über Netlify mit GitHub-Integration (wird in Phase 3 aufgesetzt).
SPA-Fallback via `public/_redirects` + `netlify.toml` folgt dem Marcus-Pattern
aus dem IBCB-Projekt.

## Branding

Design-Quelle: `/Users/destinypraktika/Desktop/KI-Schule-Brand-Kit/` — 9 MD-Files
+ `assets/`-Ordner. **Nicht ins Repo kopieren** (separater Source of Truth).

Canonical-Werte, die im Code leben:
- Accent: `#66A4FF` · Ink: `#0B0B0F` · Muted: `#5B6270` · Soft: `#F5F7FB` · Line: `#E5E8EE`
- Fonts: Inter (300–800) + Instrument Serif italic (nur für einzelne Akzent-Wörter in Headlines)
- Radius-Default: `16px` (Cards), `12px` (Buttons/Inputs)
- Voice: „Klar. Direkt. Warm. Ohne Gewäsch." (siehe `07-voice-and-tone.md` im Brand-Kit)

## Repo-Struktur

```
KI-Guide/
├── README.md              ← Du bist hier
├── SPEC.md                ← Was gebaut wird, im Detail
├── BUILD-PLAN.md          ← 12 Steps + aktueller Status
├── HANDOFF.md             ← Übergabe zwischen Sessions/Devices
├── index.html             ← Head, Meta, Font-Preloads
├── src/
│   ├── main.tsx           ← Root (Router + Helmet + Toaster)
│   ├── App.tsx            ← Routes
│   ├── index.css          ← Globals, CSS-Vars, Glass-Utilities
│   ├── config/content.ts  ← Alle Texte zentral (single source of truth)
│   ├── lib/
│   │   ├── cn.ts          ← className-merge-Util
│   │   └── supabase.ts    ← Client + EDGE-URL
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── WhatsInside.tsx
│   │   ├── LeadForm.tsx   ← react-hook-form + zod + State-Machine
│   │   ├── SocialProof.tsx
│   │   ├── FAQ.tsx
│   │   └── BottomCTA.tsx
│   └── pages/
│       ├── Home.tsx
│       ├── Bestaetigt.tsx  ← DOI-Confirm-Flow
│       ├── Datenschutz.tsx
│       ├── Impressum.tsx
│       └── NotFound.tsx
├── tailwind.config.ts     ← Farben, Radien, Shadows, Animationen
├── vite.config.ts         ← Port 5220
└── public/favicon.svg
```

## Wer hier anfassen darf

- **Aleksa** direkt — Copy-Änderungen (alles lebt in `src/config/content.ts`)
- **Marcus / Claude Code** — strukturelle + funktionale Änderungen, Backend-Wiring
- **Niemand anderes** — es ist ein Produkt von KI-Schule, kein Open-Source

---

*Erstellt 2026-04-18 von Marcus (KI-Team Agent) · Spec-first, Build-Plan-nach.*
