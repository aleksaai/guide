# HANDOFF — KI-Team-Guide

> **Dieses Dokument ist für die nächste Marcus/Claude-Code-Session** (ggf. auf
> einer anderen Maschine — Aleksa wechselt zwischen MacBook zuhause und Mac
> mini im Büro). Lies es, bevor du irgendwas anfasst.

## TL;DR

**Status: ✅ LIVE in Produktion** seit 2026-04-20. `guide.ki-hochschule.de` funktioniert Ende-zu-Ende — Multi-Step-Form, DOI-Mail, 24h-Signed-URL-Delivery, interne Notification bei `wants_exchange=yes`.

Historie:
- v0.1 (2026-04-18, `76d39bd` + `b5a8a5f`): initial Build + Docs
- v0.2 (2026-04-19, `40eb61a`): Warm/Personal Layout-Upgrade
- v0.3 (2026-04-19, `e1dc784`): Hero centered flow
- v0.4 (2026-04-19, `d6dc7e7`): Glass-3D-Buttons + Integrations-Marquee
- v0.5 (2026-04-19, `ba6e243`): Lenis smooth scroll + kein Eyebrow mehr
- v0.6 (2026-04-20, `9c800eb`): Multi-Step-Form + Email-Templates-Spec
- v0.7 (2026-04-20, `fdb0d5c`): Team-Overview-Video statt statischem Bild
- v0.8 (2026-04-20, `b2d6366`): Funnel-Content gegen v2-PDF abgeglichen (37 Seiten, 48 Kapitel)
- v0.9 (2026-04-20, `2215182`): Netlify-Config ready
- v1.0 (2026-04-20, `4f0cb75`): **LIVE** — Supabase + Edge Functions + DNS + Navbar-CSS-Fix

**Learnings aus dem Build:** komplett dokumentiert in `ai-team/agents/marcus-engineer/knowledge.md` unter zwei Abschnitten:
- *Vite + esbuild CSS-Minifier merged prefixed/unprefixed Properties (2026-04-20)*
- *Lead-Magnet-Funnel End-to-End-Pattern (2026-04-20)*

**Known issue beim Push:** große Binary-Assets können `HTTP 400 send-pack` triggern. Fix: `git config http.postBuffer 524288000` im Repo.

## Wo alles liegt

| Artefakt | Location |
|---|---|
| Frontend-Repo | `~/Desktop/KI-Guide/` auf der aktuellen Maschine. Auf neuer Maschine: `git clone https://github.com/aleksaai/guide.git ~/Desktop/KI-Guide && cd ~/Desktop/KI-Guide && npm install` |
| Spec | [`SPEC.md`](./SPEC.md) im Repo-Root |
| 12-Step Build Plan | [`BUILD-PLAN.md`](./BUILD-PLAN.md) im Repo-Root |
| Brand Source of Truth | `/Users/destinypraktika/Desktop/KI-Schule-Brand-Kit/` (**separat**, nicht im Repo) |
| Projekt-Status im AI-Team | `Digital Home/ai-team/status/STATUS.md` → Abschnitt "KI-Team-Guide Lead Funnel" |
| Marcus' Playbook | `Digital Home/ai-team/agents/marcus-engineer/knowledge.md` → Abschnitt "KI-Team-Guide Lead Funnel" |

## Was die nächste Session als erstes tun sollte

1. **Lies in dieser Reihenfolge:**
   - `/Users/destinypraktika/Desktop/Digital Home/CLAUDE.md` (bleibt Marcus' Startpunkt)
   - `/Users/destinypraktika/Desktop/Digital Home/.claude/commands/marcus.md` (aktiviert die Marcus-Rolle)
   - Dieses File (`HANDOFF.md`)
   - `SPEC.md`
   - `BUILD-PLAN.md`
2. **Falls auf neuem Gerät:**
   - `cd ~/Desktop && git clone https://github.com/aleksaai/guide.git KI-Guide`
   - `cd KI-Guide && npm install`
   - Preview-Config für Marcus' `launch.json` anlegen (Eintrag siehe unten)
3. **Abklären mit Aleksa:** "Phase 1 ist fertig — grünes Licht für
   Supabase-Migration + Edge Functions + Netlify-Deploy?"

## Gates (wo du NICHT ohne Aleksas explizites OK weitermachst)

| Gate | Was | Reversibel? |
|---|---|---|
| G1 | Supabase-Migration `ki_schule_leads` + Bucket `ki-guide` + PDF-Upload (via Supabase MCP) | Ja, Drop-Table + Delete-Bucket. Aber Produktions-DB — Aleksa muss OK geben. |
| G2 | Deploy der 2 Edge Functions `ki-guide-lead-submit` + `ki-guide-lead-confirm` | Ja, überschreibbar. |
| G3 | Netlify-Site anlegen + GitHub-Integration + DNS-Umstellung für `guide.ki-hochschule.de` | DNS-Änderung ist langsam reversibel (TTL). |
| G4 | Go-Live mit echter Mail-Pipeline zu Aleksas Kontakten | Nur nach E2E-Test mit Aleksas eigener Mail als erstem echten Lead. |

## Wichtige Entscheidungen (triff sie nicht neu)

- **Sender-E-Mail:** `noreply@projekt.aleksa.ai` (Aleksas Entscheidung 2026-04-18 per Chat).
  Domain `projekt.aleksa.ai` ist bei Resend bereits verifiziert aus der IBCB-Migration.
- **Hero-Claim:** `Bau dir dein eigenes KI-Team.` mit Instrument Serif italic auf `KI-Team`.
- **Keine Icons-in-Circles** als Service-Illustrations (BrandKit-Regel).
- **Supabase-URL + Anon-Key hardcoded** in `src/lib/supabase.ts` — IBCB-Lesson gegen
  env-var silent override auf Netlify.
- **Keine neuen Sub-Domains oder Repos ohne Nachfrage** — `guide.ki-hochschule.de` + `aleksaai/guide` sind gesetzt.

## Preview-Config für Marcus `launch.json`

Auf der aktuellen Maschine ist folgender Eintrag in
`/Users/destinypraktika/Desktop/Digital Home/.claude/launch.json`:

```json
{
  "name": "ki-guide",
  "runtimeExecutable": "/usr/local/bin/npm",
  "runtimeArgs": ["--prefix", "/Users/destinypraktika/Desktop/KI-Guide", "run", "dev"],
  "port": 5220,
  "autoPort": true
}
```

Auf einer anderen Maschine mit anderem Home-Pfad denselben Eintrag anpassen.

## Phase 2 — Next Steps (wenn Aleksa greenlighted)

1. **Supabase-Migration** via `mcp__6271192e-…__apply_migration` auf Projekt `znltfcxpngtztiwbcamm`:
   - SQL aus `BUILD-PLAN.md` Step 2
2. **Storage-Bucket `ki-guide`** anlegen (private) + PDF-Upload. Aleksa muss
   sagen, wo die finale PDF liegt (aktuell ist sie in einem
   Session-Outputs-Pfad: `/Users/destinypraktika/Library/Application Support/Claude/…/KI-Team-Guide.pdf`).
3. **Edge Functions deployen** via `mcp__6271192e-…__deploy_edge_function`:
   - Code-Templates für beide Functions kommen in einem separaten Commit sobald
     das Grünlicht da ist (damit wir nicht Tote-Code im Repo haben).
4. **Resend-Sender-Setup** checken: `noreply@projekt.aleksa.ai` als verifizierten
   Sender-Identity anlegen (falls nicht schon da).
5. **E2E-Test** via `curl` + Aleksas echter Mail.

## Was NICHT als Nächstes

- Newsletter-Delivery-System bauen (kommt später, separates Projekt)
- Admin-Dashboard für Leads (Aleksa nutzt Supabase Studio direkt)
- CAPTCHA (erst wenn Spam real wird)
- Analytics/Tracking (Plausible erst nach Launch, wenn überhaupt)

## Wenn was schiefgeht

- **Preview startet nicht:** check `npm install` ran durch, port 5220 frei,
  Node 18+.
- **TypeScript-Errors:** `npm run build` lokal laufen lassen, Fehler fixen
  bevor du committest.
- **Git push failed:** Check Keychain-Token für `aleksaai`-Account — siehe
  `ai-team/agents/marcus-engineer/knowledge.md` Abschnitt "KI-Schule Website"
  Phase-1-Blocker (selbe Token-Scope-Thematik kann auftauchen).
- **Supabase-Cold-Start-Errors** beim ersten Form-Submit: einmal re-triggern
  reicht meist.

## Kontext zum Projekt (aus Aleksa's Worten)

Originaler Auftrag (2026-04-18, Chat-Nachricht):

> "Ich möchte ein Formular erstellen. Und das soll bitte in unserem Branding
> weiterhin sein. [...] ein Formular, wo dann Personen, die sich eine Datei
> runterladen wollen von mir, das runterladen können. Ich hab nämlich eine
> Datei erstellt, wie die selber so KI Mitarbeiter machen können, wie Du es
> jetzt bist und wie ich hier in Claude gebaut habe, also mein ganzes KI
> Mitarbeiterteam. Und das soll wirklich sehr sehr detailliert sein. [...]
> ein Formular machen, wo ich halt Leute [...] dieser ist sozusagen mein
> Leadmagnet. Ich möchte so neue potenzielle Personen für die KI-Schule
> gewinnen. Und da soll sich jeder eintragen können mit seinem Namen und
> mit seinen Kontaktdaten."

Nachträgliche Aleksa-Spezifikationen (2026-04-18):
- Sub-Domain: `guide.ki-hochschule.de`
- Full-B2B-Form (nicht minimal)
- Delivery per E-Mail (GDPR, Double-Opt-In)
- Leads in Supabase → später in Newsletter überführen
- Ton: AI-Liebhaber-tauglich, nicht zu simpel, aber auch nicht abschreckend für Anfänger
- Repo: `aleksaai/guide` (hat er selbst angelegt)
- Lokaler Ordner: `~/Desktop/KI-Guide/`
- Sender-Mail: `noreply@projekt.aleksa.ai`

---

*Last updated: 2026-04-18 · Marcus*
