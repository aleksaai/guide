# KI-Team-Guide Lead Funnel — guide.ki-hochschule.de

Lead-Magnet-Funnel für Aleksas KI-Team-Guide PDF. Repo: `aleksaai/guide`.

## Team Context (lies das, wenn du Marcus bist)

- `/Users/destinypraktika/Desktop/claude-team/CLAUDE.md`
- `/Users/destinypraktika/Desktop/claude-team/ai-team/projects/ki-guide/SUMMARY.md`
- `/Users/destinypraktika/Desktop/claude-team/ai-team/projects/ki-guide/COMPONENTS.md`
- `/Users/destinypraktika/Desktop/claude-team/ai-team/projects/ki-guide/LESSONS.md`

## Quick Facts

- **Stack:** Vite 8 + React 18 + TS + Tailwind + react-hook-form + zod + framer-motion + Supabase + Resend
- **Live-URL:** https://guide.ki-hochschule.de
- **State:** 🟡 Phase 1 done (Frontend), Phase 2 pending (Edge Functions für Backend)
- **Deploy:** Netlify

## Nächste Schritte

Phase 2 — Edge Functions für Double-Opt-In:
1. Supabase-Tabelle `guide_leads` (citext unique email, doi_token, confirmed_at, delivered_at)
2. Edge Function `ki-guide-lead-submit` — POST → insert + Resend-DOI-Mail
3. Edge Function `ki-guide-lead-confirm` — Token → update + Resend-Delivery-Mail mit Signed-URL

Pattern-Details: siehe `claude-team/ai-team/projects/ki-guide/COMPONENTS.md`

## Brand

KI-Schule Accent `#66A4FF`, Inter + Instrument Serif italic, Glass-Panels, Blue-Mesh-Gradient. Details in `claude-team/ai-team/assets/ki-schule-brand-kit/`.

Bei Fragen oder neuen Tasks: `/marcus`.
