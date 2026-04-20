# KI-Team-Guide

**Edition 2026 · v2**
**Bau dir dein eigenes KI-Team.**

Ein Schritt-für-Schritt-Leitfaden, wie du mit Claude, Markdown und Supabase ein virtuelles Team aus spezialisierten KI-Mitarbeitern baust — echte Buchhalterin, echte Assistenz, echter Engineer, echte Stimme am Telefon. Ohne Programmiererfahrung.

*by KI-Schule · Coaching & Community · aleksa.ai*

---

## Vorwort

Die erste Version dieses Guides habe ich geschrieben, als ich selbst gerade erst angefangen hab. Damals hatte ich zwei Agenten und das ganze System passte auf zehn Seiten. Heute, ein halbes Jahr später, laufen sechs Agenten täglich, ein Voice-Agent nimmt Anrufe auf Ungarisch entgegen, ein KI-Engineer baut meine Websites selbstständig — und das Setup ist 1:1 auf zwei Rechnern gleich, weil ich einen Auto-Push-Hook eingerichtet hab, den ich damals nicht kannte.

Diese zweite Edition ist nicht das alte Dokument mit zwei zusätzlichen Seiten. Es ist **komplett neu geschrieben**, mit allem drin, was ich in sechs Monaten echter täglicher Nutzung gelernt habe. Inklusive der Fehler, die ich gemacht hab und die du dir sparen kannst.

Lies nicht alles auf einmal. Der Guide ist als Nachschlagewerk gedacht — Teil 1 bis 4 liest du linear, den Rest überfliegst du und kommst zurück, wenn du den jeweiligen Schritt brauchst.

— Aleksa

---

## Inhalt

**Teil 1 · Das Fundament**
1. Was ist ein KI-Team — und was ist es nicht
2. Warum Markdown statt einer App mit UI
3. Die Claude-Tool-Landschaft: Code, Cowork, Desktop, Web
4. Dein Setup — was du brauchst, was es kostet

**Teil 2 · Dein Projekt-Ordner und GitHub**
5. Ordner am Desktop anlegen
6. Die Ordnerstruktur für dein wachsendes Team
7. Claude Code mit dem Ordner verbinden
8. Git init und GitHub-Repo erstellen
9. macOS Keychain für Git-Credentials
10. Auto-Push-Hook einrichten
11. Cross-Device-Sync zwischen zwei Rechnern

**Teil 3 · Supabase von Null**
12. Was Supabase wirklich ist
13. Dein erstes Supabase-Projekt
14. Der Supabase MCP Connector in Claude
15. API-Keys sicher als Secrets
16. Deine erste Edge Function

**Teil 4 · Deinen ersten Agenten bauen**
17. Die vier Kerndateien im Detail
18. AGENT.md — Wer ist dieser Mitarbeiter
19. workflows.md — Wie arbeitet sie konkret
20. tools.md — Was darf sie benutzen
21. knowledge.md — Was muss sie wissen
22. Das Beispiel Lisa — Schritt für Schritt
23. Slash-Commands: deinen Agenten mit einem Wort aktivieren
24. Das Skill-Ökosystem

**Teil 5 · Werkzeuge anbinden**
25. Offizielle Claude-Konnektoren
26. Eigene MCP-Server als Edge Functions
27. Make.com als Webhook-Layer
28. Community-MCPs aus der Registry
29. Regel: so wenig Schreibrechte wie möglich

**Teil 6 · Skalieren**
30. Den zweiten Agenten bauen
31. Gemeinsames Wissen im Wiki-Ordner
32. Max als CEO-Orchestrator
33. Status-Tracking: wie Marcus Projekte managed

**Teil 7 · Voice Agents**
34. Warum Voice ein eigenes Tier ist
35. Die Stack-Architektur: ElevenLabs + Twilio + Make.com
36. Patricia als Hotline — das Referenz-Beispiel
37. Knowledge Base als RAG für den Agenten
38. Kunden-Voice-Agents als Fulfillment

**Teil 8 · Darüber hinaus**
39. Das Life Dashboard als zweites Frontend
40. Vibe Coding mit Stitch, 21st Dev und Motion
41. Das 3D-Büro (optional)

**Teil 9 · Troubleshooting und Lessons Learned**
42. Die zehn häufigsten Fehler
43. Wenn der Agent halluziniert oder vergisst
44. Supabase-Fallen
45. Make.com-Fallen
46. ElevenLabs-Fallen

**Abschluss**
47. Was du jetzt hast
48. Wie es weitergeht

---

# Teil 1 · Das Fundament

## 1. Was ist ein KI-Team — und was ist es nicht

Stell dir vor, du hättest eine Buchhalterin, die jede Nacht deine Stripe-Zahlungen durchgeht, die passenden Rechnungen in Billingo anlegt, die PDFs in den richtigen Google-Drive-Ordner schiebt und dir morgens einen Bericht schickt, was sie gemacht hat und was noch fehlt.

Eine persönliche Assistentin, die deine wichtigsten E-Mails priorisiert, Antwort-Entwürfe schreibt, deinen Kalender auf den Tag vorbereitet und dich an dein Sparziel erinnert.

Einen Engineer, der aus einer Idee eine Spec macht, einen Bauplan schreibt, eine Website designt, den Code auschecked und am Ende einen Build-Plan liefert, den du Zeile für Zeile in deinem Editor einlöst.

Einen Voice-Agenten, der Anrufe auf Ungarisch annimmt, Termine in deinen Kalender bucht und dir per Mail Bescheid gibt.

Das ist kein Chatbot. Das ist ein **Team**.

### Der Unterschied zu ChatGPT

Wenn du ChatGPT benutzt, hast du einen Gesprächspartner. Du tippst etwas, er antwortet, du tippst wieder — und wenn du den Browser schließt, ist die Geschichte vorbei.

Ein KI-Mitarbeiter ist anders. Er hat:

- **Eine klare Rolle.** Er weiß, wofür er zuständig ist und wofür nicht.
- **Persönlichkeit.** Er kommuniziert konsistent — nicht jedes Mal anders.
- **Wissen.** Er kennt deine Firma, deine Kunden, deine Tools, deine Vorlieben.
- **Routinen.** Er weiß, was jeden Monat passieren muss, was wöchentlich ansteht, was auf welchen Trigger reagiert werden soll.
- **Werkzeuge.** Er kann nicht nur reden — er kann handeln. Er kann Stripe aufrufen, eine Rechnung in Billingo erstellen, ein PDF in Drive laden, eine Mail aus Gmail ziehen, deine Wise-Kontobewegungen prüfen.
- **Grenzen.** Er weiß, welche Aktionen er allein machen darf und welche dein OK brauchen.

Das alles steckt in einer Handvoll Markdown-Dateien. Claude liest sie beim Start der Unterhaltung und schlüpft in die Rolle. Dann kann er mit echten Werkzeugen echte Arbeit machen.

### Warum das ganze jetzt funktioniert

Bis vor Kurzem war so etwas Science Fiction. Drei Entwicklungen haben das geändert:

1. **Tool-Use** — die Fähigkeit großer Sprachmodelle, strukturierte Aufrufe an externe APIs zu machen. Claude ist darin heute sehr gut.
2. **MCP** (Model Context Protocol) — ein Standard, wie Werkzeuge an Sprachmodelle angebunden werden. Das macht den ganzen Kram portabel und einheitlich.
3. **Cloud-Backends ohne Server** — Dienste wie Supabase erlauben dir, kleine Stücke Logik zu deployen, die nur laufen, wenn jemand sie aufruft. Kein Server zu warten, kein Monatsvertrag.

Drei Puzzleteile, die zusammen etwas ergeben, das vor einem Jahr noch nicht möglich war.

### Was es nicht ist

- **Es ist keine fertige Software, die du kaufst.** Du baust sie. Der Guide zeigt, wie.
- **Es ist keine Magie, die alles auf Knopfdruck erledigt.** Du beschreibst präzise, was passieren soll. Der Agent führt aus.
- **Es ist kein Ersatz für dein Urteil.** Die wichtigen Entscheidungen triffst weiter du. Der Agent nimmt dir die Routine ab.
- **Es ist kein Einzel-Tool-Abo.** Es ist eine Architektur, die du verstehen musst. Dafür ist der Aufbau günstig — unter 100 € pro Monat für die meisten Setups, oft unter 30 €.

## 2. Warum Markdown statt einer App mit UI

Du wirst dich wundern, warum das ganze System aus einfachen Textdateien besteht, statt aus einer schicken App mit Oberfläche. Die Antwort ist kurz: weil Textdateien die Programmiersprache sind, die Sprachmodelle nativ lesen.

Claude liest Markdown so, wie ein Mensch gut strukturierten Fließtext liest. Keine Übersetzung, keine Konvertierung. Du schreibst, wie du denkst, und Claude versteht es.

Das hat konkrete Vorteile:

**Du behältst die Kontrolle.** Alles liegt als Text auf deinem Rechner. Du kannst jederzeit reinschauen, ändern, kopieren, an jemand anderen weitergeben. Keine fremde Cloud besitzt deine Agenten-Definitionen.

**Du kannst versionieren.** Git zeigt dir, wann du was geändert hast. Wenn ein Agent plötzlich schlechter wird, siehst du auf einen Blick, was zuletzt anders wurde.

**Du kannst kopieren und anpassen.** Hast du einmal einen guten Agenten gebaut, kopierst du den Ordner und veränderst ein paar Werte, statt von Null anzufangen.

**Du kannst mit anderen teilen.** Ein Agent ist ein Ordner. Schick den Ordner an jemanden, und dieser jemand hat denselben Agenten.

**Kein Lock-in.** Eine App kann morgen ihr Geschäftsmodell ändern. Deine Markdown-Dateien gehören dir, unabhängig davon, welches Modell du damit füttert.

Dafür gibt es einen Preis: du siehst keine bunten Schaltflächen. Du siehst strukturierten Text. Wer von Canva kommt und hübsche Buttons erwartet, ist hier falsch. Wer die Wahl zwischen Substanz und Oberfläche hat und sich für Substanz entscheidet, ist richtig.

## 3. Die Claude-Tool-Landschaft: Code, Cowork, Desktop, Web

Anthropic bietet mehrere Produkte an, die alle auf derselben Claude-Engine laufen, aber für unterschiedliche Arbeitsweisen gemacht sind. Das verwirrt am Anfang. Hier die Klarstellung:

| Tool | Was es ist | Wofür du es nimmst |
|---|---|---|
| **Claude Code** | CLI — läuft im Terminal, arbeitet mit deinem Dateisystem | Code schreiben und ausführen, Agenten-Definitionen ändern, lokale Tools bauen, alles was deine Laufwerke sieht |
| **Claude Cowork** | Web-App / Desktop-App von Anthropic — „Claude im Browser" mit Projekten, Skills, Connectors | Business-Agenten ausführen (Lisa macht Buchhaltung, Patricia liest Mails), Dokumente bauen, Recherche |
| **Claude Desktop** | Legacy-Desktop-App, primär für MCP-Server-Verbindungen | Wird langsam durch Cowork abgelöst, kann man bei Bedarf noch nutzen |
| **Claude Web** | `claude.ai` im Browser | Schnelle Einzelfragen ohne Projekt-Kontext |

In der Praxis wirst du zwei davon benutzen: **Claude Code** und **Claude Cowork**.

**Claude Code nimmst du**, wenn du:
- am Aufbau deines KI-Teams arbeitest (Dateien ändern, Ordner einrichten)
- Code schreiben oder ändern willst (Edge Functions, Websites, Skripte)
- eine Slash-Command-Session mit einem Agenten startest (`/marcus`, `/lisa`)
- mit Git und GitHub arbeitest

**Claude Cowork nimmst du**, wenn du:
- einen Business-Agenten für eine Aufgabe einsetzt (Lisa soll die Februar-Rechnungen erstellen)
- mit offiziellen Connectors arbeitest (Stripe, Gmail, Drive)
- Dokumente erstellst oder überarbeitest
- lange mit einem Agenten im Chat diskutierst, ohne Code anzufassen

Die beiden können das gleiche Agenten-System lesen. Du hast **einmal** die Markdown-Dateien, und beide Claude-Oberflächen holen sie sich bei Bedarf. Welche Oberfläche passender ist, hängt nur davon ab, was du gerade tust.

Claude Desktop und Claude Web tauchen im Guide nicht mehr auf — sie sind Nebenrollen.

## 4. Dein Setup — was du brauchst, was es kostet

Du brauchst vor dem ersten Schritt:

- **Einen Rechner mit Terminal.** Mac oder Windows. Auf Mac ist es das Programm „Terminal", auf Windows nimmst du PowerShell oder Windows Terminal. Keine Sorge, du tippst wenig.
- **Einen Browser.** Safari, Chrome, Firefox — egal.
- **Einen GitHub-Account.** Kostenlos. Geh auf `github.com` und melde dich an. Das ist dein Kommando-Stand für die Versionierung — wir schauen uns das in Teil 2 genau an.
- **Ein Claude-Pro- oder Team-Abo.** Ohne Abo kannst du den Guide nicht umsetzen, weil du Claude Code und Cowork brauchst. Pro kostet circa 20 €/Monat, Team etwas mehr pro Nutzer. Fang mit Pro an.
- **Einen Supabase-Account.** Kostenlos für den Einstieg, kleiner Server-Vertrag ab 25 $/Monat, wenn du produktiv wirst. In den ersten Wochen reicht das Free-Tier bequem.

Grobe Monatskosten für ein typisches KI-Team nach ein paar Monaten Betrieb:

| Posten | Kosten |
|---|---|
| Claude Pro / Team | 20–100 € |
| Supabase Pro | 0–25 € (Free-Tier reicht anfangs) |
| ElevenLabs (nur wenn Voice-Agent) | 5–20 € |
| Twilio (nur wenn Voice-Agent) | 1 € pro Nummer, plus Call-Minuten |
| Make.com (nur wenn Voice- oder Automation-Agenten) | 0–29 € |
| **Summe typisch** | **20–80 € im Monat** |

Dazu kommen einmalige Kosten für Tool-APIs, die du sowieso schon bezahlst — Stripe, dein Buchhaltungssystem, dein E-Mail-Provider. Die zahlen deine Agenten nicht neu, sie greifen nur darauf zu, was du sowieso hast.

**Zeitaufwand:** für den ersten Agenten rechne mit einem langen Wochenende, wenn du den Guide sauber durchgehst. Für jeden weiteren Agenten danach 2–4 Stunden, weil du das Muster dann kennst.

---

# Teil 2 · Dein Projekt-Ordner und GitHub

Dieser Teil war in der ersten Version des Guides zwei Zeilen lang. Das war ein Fehler. Der Projekt-Ordner und die Git-Anbindung sind das Fundament, auf dem alles steht. Nimm dir dafür eine saubere Stunde.

## 5. Ordner am Desktop anlegen

Geh auf deinen Desktop und leg einen neuen Ordner an. Wie du ihn nennst, ist egal — ich hab meinen **Digital Home** genannt, du kannst ihn **Mein KI-Team**, **AI Office** oder **Backstage** nennen. Der Name taucht nur lokal auf.

Ein paar Empfehlungen zum Namen:

- Keine Leerzeichen. Leerzeichen in Pfaden sind manchmal noch Ärger. Nimm `Digital Home` ohne Bindestrich im Finder — im Terminal landet es dann als `Digital\ Home/`, was funktioniert, aber unschön ist. Besser: `digital-home` oder `ki-team`.
- Keine Umlaute. `KI-Büro` wird im Terminal zu `KI-B\xFCro` und dann hast du Probleme.
- Kurz. Du wirst den Pfad oft tippen.

Für diesen Guide nehme ich `ki-team` als Beispielnamen. Wenn du anders entscheidest, ersetz das im Kopf.

## 6. Die Ordnerstruktur für dein wachsendes Team

Der Ordner ist leer. Das ist okay, aber wir legen jetzt die Grundstruktur fest, damit er nicht leer bleibt.

So sieht die Struktur aus, mit der ich selbst arbeite und die sich bewährt hat:

```
ki-team/
├── CLAUDE.md                    Hauptdokument für Claude Code
├── .claude/                     Konfiguration für Claude Code
│   ├── settings.json            Auto-Push-Hook und andere Hooks
│   ├── launch.json              Preview-Server-Konfig
│   └── commands/                Slash-Commands
│       ├── marcus.md            /marcus → lade Marcus-Rolle
│       └── lisa.md              /lisa   → lade Lisa-Rolle
├── ai-team/                     Herz des Systems
│   ├── agents/
│   │   ├── lisa-accounting/
│   │   │   ├── AGENT.md
│   │   │   ├── workflows.md
│   │   │   ├── tools.md
│   │   │   └── knowledge.md
│   │   ├── patricia-assistant/
│   │   │   ├── AGENT.md
│   │   │   ├── workflows.md
│   │   │   ├── tools.md
│   │   │   ├── knowledge.md
│   │   │   └── skills/
│   │   │       └── email-triage.md
│   │   └── marcus-engineer/
│   │       └── ...
│   ├── wiki/                    Gemeinsames Wissen aller Agenten
│   │   ├── company.md
│   │   ├── personal.md
│   │   ├── contacts.md
│   │   └── glossary.md
│   ├── config/
│   │   └── integrations.md      Liste aller Edge-Function-URLs + Keys (verschlüsselt)
│   ├── status/
│   │   └── STATUS.md            Laufende Projekte, für Marcus
│   └── mcp-servers/             Quellcode der eigenen MCP-Server
│       ├── billingo-mcp-server/
│       ├── wise-mcp-server/
│       └── ...
├── .gitignore                   Was NICHT auf GitHub landet
└── README.md                    Kurze Einleitung (für dich und andere)
```

Keine Angst vor der Tiefe. Die Ordner entstehen nach und nach. Du musst heute nur zwei Dinge haben:

1. Den leeren Hauptordner am Desktop
2. Eine erste Datei `CLAUDE.md` mit einer Zeile Inhalt („KI-Team-Projekt. Details kommen.")

Alles andere baust du im Lauf des Guides auf. Der Rest ist Orientierung, damit du schon heute weißt, wohin die Reise geht.

**Warum diese Struktur?**

- **`ai-team/agents/<name>/`** — jeder Agent in seinem eigenen Unterordner. Das hält ihn sauber abgegrenzt und erlaubt dir, ihn zu kopieren oder löschen, ohne andere zu beeinflussen.
- **`ai-team/wiki/`** — gemeinsames Wissen, das alle Agenten teilen. Statt den Firmennamen in sechs AGENT.md-Dateien zu pflegen, steht er einmal in `wiki/company.md` und jeder Agent liest ihn zusätzlich.
- **`ai-team/config/`** — eine zentrale Liste aller externen Integrationen mit URLs, API-Names und der Info, welcher Key in Supabase hinterlegt ist.
- **`ai-team/status/STATUS.md`** — dein Laufbuch. Marcus, dein Engineer-Agent, nutzt diese Datei, um dir jederzeit sagen zu können, was gerade läuft, was blockiert ist und was als Nächstes dran ist.
- **`.claude/`** — alles, was Claude Code an Konfiguration braucht. Auto-Push-Hook, Slash-Commands, Preview-Server. Das ist die Kommando-Zentrale für deine Arbeitsumgebung.

## 7. Claude Code mit dem Ordner verbinden

Jetzt verbindest du Claude Code mit deinem neuen Ordner. Öffne Claude Code (die CLI, nicht die Web-App) und führe im Terminal aus:

```
cd ~/Desktop/ki-team
claude
```

Das startet Claude Code in deinem Projekt-Ordner. Es liest die `CLAUDE.md` beim Start — alles, was dort drin steht, ist immer Teil des Kontexts.

**CLAUDE.md** ist deine Projekt-Visitenkarte für Claude. Schreib dort hin:

- Was das Projekt ist (ein KI-Team-Projekt)
- Wer der Owner ist (du, mit Namen)
- Welche Ordner-Struktur bekannt ist
- Welche Agenten existieren (noch keiner, das kommt)
- Welche Tools angebunden sind (noch keine, das kommt auch)
- Welche wichtigen Regeln gelten (etwa: Tool-Keys liegen in Supabase, nicht lokal)

Die Datei wird mit dem Projekt wachsen. Am Anfang reicht ein Stub:

```markdown
# KI-Team Projekt

**Owner:** [Dein Name]
**Start:** [Datum]

## Was hier entsteht
Ein System aus spezialisierten KI-Agenten, die echte Tools bedienen.
Grundstruktur folgt dem KI-Team-Guide der KI-Schule.

## Struktur (geplant)
- ai-team/agents/  — einzelne Agenten
- ai-team/wiki/    — geteiltes Wissen
- ai-team/config/  — Integrations-Liste
- ai-team/status/  — Projektstatus

## Regeln
- API-Keys liegen als Supabase Secrets, nicht lokal in .env.
- Alle Agenten-Definitionen sind Markdown, keine JSON-Generatoren.
- Bei jedem Projektstart legt Marcus einen Eintrag in STATUS.md an.

## Agenten
(noch keiner)
```

Speichern. Claude Code lädt die Datei ab sofort bei jedem Session-Start.

## 8. Git init und GitHub-Repo erstellen

Jetzt wird es wichtig. Alles, was du bis jetzt gebaut hast, liegt auf deinem Rechner. Wenn dein Rechner stirbt, weg. Wenn du zwischen zwei Geräten wechselst, nicht synchron. Wenn du eine Datei kaputt änderst, schwer zurückzunehmen.

Dafür gibt es **Git** und **GitHub**.

- **Git** ist das Programm, das jede Änderung an deinen Dateien mitschreibt. Lokal, auf deinem Rechner.
- **GitHub** ist der Dienst, wohin du diese Änderungen zusätzlich hochlädst. Als Backup. Als Austauschpunkt zwischen zwei Rechnern. Als Historie, die du nie verlierst.

Klingt nach Entwicklertool. Ist es auch. Aber für ein KI-Team ist es unverzichtbar, sobald du mehr als ein paar Stunden Arbeit reinstecken willst.

### Git initialisieren

Im Terminal, in deinem Projekt-Ordner:

```
cd ~/Desktop/ki-team
git init -b main
```

Das legt einen versteckten `.git`-Ordner an. Ab sofort merkt Git sich alles, was du änderst.

### `.gitignore` anlegen

Nicht alles, was in deinem Ordner ist, gehört auf GitHub. API-Keys auf keinen Fall, Build-Artefakte auch nicht. Leg eine Datei `.gitignore` im Projekt-Hauptordner an:

```
# Betriebssystem-Dateien
.DS_Store
Thumbs.db

# API-Keys und lokale Config
.env
.env.local
.env.*.local
**/.env

# Lokale Claude-Einstellungen (persönlich)
.claude/settings.local.json

# Node / JS-Projekte
node_modules/
dist/
build/
*.log

# Python
__pycache__/
*.pyc

# IDE
.vscode/*
!.vscode/extensions.json
.idea/

# Sensitive Daten-Ordner
/Private/
/Receipts/
/Clients/
```

### GitHub-Repo erstellen

Geh auf `github.com`, oben rechts auf „+" → „New repository". Dann:

- Repository name: **ki-team** (oder wie dein Ordner heißt)
- Private: **Ja**. Dein Agenten-System ist deine Sache. Niemand muss da rein.
- „Add a README" und „Add .gitignore": **beides leer lassen**, du hast schon eine `.gitignore`, und eine `README.md` baust du später.

„Create repository" klicken. Auf der nächsten Seite siehst du einen Block wie:

```
git remote add origin https://github.com/DEIN_USERNAME/ki-team.git
git branch -M main
git push -u origin main
```

### Dem lokalen Ordner den Remote zuweisen

Zurück im Terminal:

```
git remote add origin https://github.com/DEIN_USERNAME/ki-team.git
```

### Erster Commit und Push

```
git add -A
git commit -m "chore: initial project scaffolding"
git push -u origin main
```

Beim ersten Push fragt Git dich nach deinem GitHub-Passwort — aber seit einigen Jahren akzeptiert GitHub Passwörter nicht mehr. Du brauchst einen **Personal Access Token**. Wie der in den Keychain kommt, kommt im nächsten Abschnitt.

## 9. macOS Keychain für Git-Credentials

Auf dem Mac gibt es den Keychain — einen verschlüsselten Tresor für Passwörter. Git kann direkt dagegen sprechen, damit du nicht bei jedem Push ein Passwort eintippen musst.

### Token erstellen

1. Geh auf `github.com/settings/tokens` (rechts oben auf dein Profil → Settings → Developer settings → Personal access tokens → Fine-grained tokens)
2. „Generate new token"
3. Name: etwas Erkennbares wie `ki-team-push-from-mac`
4. Expiration: für den Anfang 90 Tage. Du kannst ihn später verlängern.
5. Repository access: nur dein `ki-team`-Repo wählen
6. Permissions: unter „Repository permissions" → „Contents" → **Read and write**
7. Generieren. Der Token beginnt mit `github_pat_…` und ist sehr lang. **Sofort kopieren** — GitHub zeigt ihn nur einmal.

### Token in den Keychain legen

Auf dem Mac im Terminal:

```
git config --global credential.helper osxkeychain
git config --global user.name "Dein Name"
git config --global user.email "deinemail@example.com"
```

Dann führe nochmal den Push aus:

```
git push -u origin main
```

Es fragt nach dem Nutzernamen (dein GitHub-Nutzername) und dem Passwort (→ hier den Token eingeben). Ab dem zweiten Push merkt sich der Keychain das.

### Credential-Helper auf Windows

Auf Windows nutzt du statt `osxkeychain` den Windows-Credential-Manager:

```
git config --global credential.helper manager
```

Den Rest kannst du analog machen.

## 10. Auto-Push-Hook einrichten

Jetzt kommt eine kleine Magie, die ich die erste Version des Guides sträflich übersehen habe: der **Auto-Push-Hook**.

Das Problem ohne ihn: Du arbeitest mit Claude Code an deinem KI-Team. Du bewegst etwas, änderst etwas, fügst einen Agenten hinzu. Claude ist fertig — und jetzt musst du manuell `git add -A && git commit -m "..." && git push` tippen, damit die Änderung auf GitHub landet. Machst du einmal nicht, und wenn du abends am zweiten Rechner weiterarbeitest, ist dein letzter Stand weg.

Die Lösung: Claude Code führt nach jeder Session automatisch einen Commit und Push aus.

### Den Hook konfigurieren

Leg in deinem Projekt-Ordner die Datei `.claude/settings.json` an:

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "ROOT=$(git rev-parse --show-toplevel) && cd \"$ROOT\" && git add -A && if ! git diff --cached --quiet; then git commit -m \"auto: session update $(date '+%Y-%m-%d %H:%M')\" -q && git push -q; fi"
          }
        ]
      }
    ]
  }
}
```

Was das tut:

- **Stop** ist der Name des Hooks. Er feuert, sobald Claude Code eine Antwort zu Ende gegeben hat.
- Das Kommando ermittelt den Projekt-Root (`git rev-parse --show-toplevel`), stellt sich dort hin, staged alle Änderungen, und wenn es tatsächlich welche gibt, commited und pushed es sie.
- Wenn es keine Änderungen gibt, macht es nichts.
- `-q` bedeutet quiet — keine Meldungen im Terminal, es läuft unsichtbar.

Speichern. Ab dem nächsten Claude-Session-Ende schiebt dein System von selbst nach GitHub.

### Den Hook zur Sicherheit einmal testen

Ändere manuell irgendeine Datei (zum Beispiel füg in `CLAUDE.md` einen Satz hinzu). Gib Claude Code einen kurzen Prompt („alles ok?"). Sobald Claude seinen Antwort-Block beendet hat, müsste auf GitHub ein neuer Commit erscheinen mit dem Zeitstempel. Wenn ja: läuft. Wenn nein: prüf, ob `.claude/settings.json` syntaktisch sauber ist und ob der Keychain-Token greift.

### Warum das so wichtig ist

Mit dem Hook kannst du Claude Code als dein primäres Arbeits-Interface nutzen und dich um Backup, Versionierung und Cross-Device-Sync **überhaupt nicht kümmern**. Jeder Handgriff landet automatisch in GitHub, du kannst jederzeit zu jedem Stand zurück, und jeder deiner anderen Rechner holt sich den letzten Stand mit einem `git pull`.

Für mich ist der Hook der vielleicht wichtigste Abschnitt des ganzen Guides. Ohne ihn wird es mühsam, sobald du länger als eine Stunde arbeitest.

## 11. Cross-Device-Sync zwischen zwei Rechnern

Ich arbeite auf zwei Rechnern: MacBook zu Hause, Mac mini im Büro. Beide zeigen auf denselben GitHub-Repo, beide haben den Auto-Push-Hook. Der Ablauf ist:

1. **Morgens am MacBook:** Claude Code starten, arbeiten. Jede Antwort löst einen Auto-Push aus.
2. **Nachmittags im Büro am Mac mini:** `git pull` im Projekt-Ordner. Alle Änderungen vom Morgen sind da.
3. **Mac mini weiterarbeiten:** erneut Auto-Push bei jeder Session-End.
4. **Abends zurück am MacBook:** `git pull`. Alle Büro-Änderungen sind da.

**Einmaliges Setup auf einem zweiten Rechner:**

```
cd ~/Desktop
git clone https://github.com/DEIN_USERNAME/ki-team.git
cd ki-team
git config --global credential.helper osxkeychain
git config --global user.name "Dein Name"
git config --global user.email "deinemail@example.com"
```

Beim ersten `git pull` fragt es nach dem Token — den hast du ja schon erstellt, du kannst denselben nutzen. Ab dann speichert der Keychain auch hier.

Der `.claude/settings.json`-Hook ist Teil des Repos, wird also automatisch mitgezogen. Heißt: der zweite Rechner kann sofort autopushen, sobald der Keychain-Token liegt.

**Nicht getrackte Dateien zwischen Rechnern synchronisieren:** alles, was in `.gitignore` steht, wird nicht über GitHub synchronisiert. Das ist meist Absicht. Falls du lokal eine `.env` mit Dev-Werten hast, die auf beiden Rechnern gleich sein muss, kopiere sie einmalig über AirDrop oder einen USB-Stick.

---

# Teil 3 · Supabase von Null

Bevor wir in den ersten Agenten gehen, richten wir Supabase ein. Ohne das kann dein Agent nur reden, nicht handeln. Mit Supabase kann er echte APIs aufrufen — Stripe, Billingo, Wise, jede andere API mit Token.

## 12. Was Supabase wirklich ist

Der alte Guide hat Supabase in einem Absatz abgehandelt. Das ist viel zu dünn. Supabase ist ein Cloud-Dienst, der dir fünf Dinge gleichzeitig gibt:

### 1. Eine Postgres-Datenbank

Eine echte relationale Datenbank, wie sie große Firmen benutzen. Du bekommst sie in der Free-Version mit 500 MB Speicher. Für ein KI-Team reicht das für Monate.

Was du da speicherst: alles, was langlebig sein soll. Kunden-Tabellen, Aufgaben, Lead-Daten aus einem Formular, Session-Verläufe.

### 2. Ein Datei-Speicher

Bis zu 1 GB Dateien in der Free-Version. Als öffentliche oder private Buckets. Jeder Bucket hat klare Berechtigungen — privat, öffentlich, mit signierten URLs temporär zugreifbar.

Was du da speicherst: Agenten-Berichte als PDF, Screenshots, vom Agenten erzeugte Dokumente.

### 3. Edge Functions — serverlose Funktionen

Kleine Stücke Code, die du bei Supabase hinterlegst und die unter einer URL erreichbar sind. Werden aufgerufen, führen aus, antworten, legen sich wieder schlafen. Du bezahlst nichts, solange sie nicht laufen. In der Free-Version hast du 500.000 Aufrufe pro Monat frei.

Was du da hinlegst: dein eigener **MCP-Server** für die Billingo-API, dein Wise-MCP-Server, dein Twilio-Wrapper für Voice-Agenten. Alles, was Claude anrufen soll, aber wofür es keinen offiziellen Konnektor gibt.

### 4. Secrets

Ein verschlüsselter Tresor für API-Keys. Hier landen alle Tokens, die deine Edge Functions brauchen — das Billingo-Token, das Stripe-Secret-Key, das Wise-API-Token. Nur deine Edge Functions können die Secrets lesen. Nicht dein lokaler Rechner, nicht dein Browser, niemand anders.

**Das ist die goldene Regel des Guides:** API-Keys gehören in Supabase Secrets. Niemals in deinen lokalen `.env`-Dateien, niemals in Git, niemals in einer Nachricht an Claude.

### 5. Auth (optional)

Falls du später eine Website baust, bei der sich Nutzer einloggen sollen, hat Supabase auch das eingebaut. Für den Anfang irrelevant.

### Warum Supabase und nicht Firebase oder AWS

- **Supabase ist Postgres.** Also eine ordentliche SQL-Datenbank, wie sie seit Jahrzehnten in der Industrie läuft. Firebase zwingt dich zu NoSQL, was für unsere Zwecke unnötig kompliziert ist.
- **Supabase ist europäisch nutzbar.** Du kannst einen EU-Region-Server wählen. DSGVO-relevant.
- **Edge Functions sind einfach.** TypeScript mit Deno, wenige Zeilen pro MCP-Server.
- **Der Claude-MCP-Connector für Supabase existiert.** Du kannst Supabase-Operationen direkt aus Claude steuern — Migrationen anlegen, Edge Functions deployen, Secrets setzen, Logs abrufen. Das ersetzt 90 % der alten CLI-Kommandos.

## 13. Dein erstes Supabase-Projekt

### Projekt anlegen

1. Geh zu `supabase.com`, registrier dich mit GitHub oder Email. Kostenlos.
2. Oben rechts „New project"
3. Organization: deine (bei Neuregistrierung gibt's eine Default-Org)
4. Name: etwas wie `mein-ki-team`
5. Database password: ein sicheres, langes Passwort. Speicher es in einem Passwort-Manager — du brauchst es später beim direkten DB-Zugriff.
6. Region: wähl eine in der Nähe. Für DACH meist „Central EU (Frankfurt)".
7. Pricing plan: Free. Upgrade später, wenn du willst.
8. „Create new project" klicken. Dauert ein paar Minuten.

Wenn das Projekt bereit ist, landest du auf dem Dashboard. Oben siehst du den Projekt-Namen.

### Die vier IDs notieren

Es gibt vier wichtige Werte, die du dir notieren solltest. Sie sind das Ticket, mit dem deine Claude-Sessions und deine Edge Functions auf das Projekt zugreifen.

Geh in der linken Leiste auf **Project Settings** (Zahnrad unten links) → **API**:

| Wert | Wo | Wofür |
|---|---|---|
| Project URL | Settings → API → Project URL | Die Basis-URL, unter der deine Edge Functions und API erreichbar sind. Sieht aus wie `https://abcdefghijklmno.supabase.co` |
| Project Ref | in der URL des Dashboards (zwischen `/project/` und dem nächsten `/`) | Kurzversion der URL. 20 Zeichen, z. B. `abcdefghijklmnopqrst`. Brauchst du in Claude-Kommandos. |
| Anon Public Key | Settings → API → Project API keys → anon public | Ein öffentlicher Key, den Websites und Apps nutzen dürfen. Kannst du committen, er ist designed, um öffentlich zu sein. |
| Service Role Key | Settings → API → Project API keys → service_role | Der Meisterschlüssel. Umgeht alle Sicherheitsregeln. **Niemals** committen, **niemals** in Client-Code, **nur** in Edge Functions verwenden. |

Kopier die vier Werte in einen sicheren Ort. Passwort-Manager oder eine lokale Datei außerhalb des Git-Ordners.

## 14. Der Supabase MCP Connector in Claude

Hier kommt der Game-Changer, der in der ersten Version des Guides noch gar nicht existierte: Claude hat einen offiziellen **Supabase MCP Connector**. Du installierst ihn einmal in Claude, und ab dann kannst du Supabase-Operationen direkt in der Unterhaltung ausführen, ohne Terminal.

### Den Connector einrichten

In Claude Cowork (Browser oder Desktop-App):

1. Rechts oben dein Profil → **Settings** → **Connectors**
2. Such nach „Supabase". Wenn verfügbar, „Add" klicken.
3. Ein Dialog fragt nach Credentials. Gib deinen **Supabase Access Token** ein (`supabase.com/dashboard/account/tokens` → „Generate new token"; Read/Write für dein Projekt).

Ab jetzt kann Claude Cowork direkt Supabase ansprechen.

In Claude Code (CLI):

1. Im Projekt-Ordner oder global die Datei `~/.claude/mcp.json` öffnen (oder anlegen).
2. Den Supabase-MCP-Server hinzufügen. Die genaue Syntax ändert sich mit Claude-Code-Updates — schau auf `docs.anthropic.com` oder frag Claude im Chat: „Wie richte ich den offiziellen Supabase MCP Connector in Claude Code ein?"

### Was du damit machen kannst

Mit dem Connector aktiv kannst du in einer Claude-Unterhaltung zum Beispiel:

- „Zeig mir alle Tabellen in meinem Supabase-Projekt."
- „Leg eine neue Tabelle `leads` an mit den Feldern id, email, name, created_at. Email als UNIQUE, id als uuid mit default gen_random_uuid()."
- „Deploy folgende Edge Function als `billingo-mcp-server` mit `verify_jwt: false`: [Code-Block]"
- „Setz mir ein Secret `BILLINGO_API_KEY` auf den Wert „..." im Supabase-Projekt."
- „Ruf die letzten 50 Einträge aus `leads` ab, die in den letzten 7 Tagen reingekommen sind."
- „Zeig mir die Execution-Logs der letzten Aufrufe von `billingo-mcp-server`."

Alles ohne einen einzigen CLI-Befehl. Das beschleunigt den Aufbau enorm und hält dich im Flow. Der alte Guide hat dir die CLI-Variante beigebracht. Die funktioniert weiterhin, ist aber für die meisten Aufgaben überflüssig geworden.

Wenn der Connector nicht verfügbar ist in deiner Region oder Version, gibt es immer noch den Fallback über die CLI (siehe Abschnitt 26). Aber geh zuerst den Connector-Weg.

## 15. API-Keys sicher als Secrets

Jedes Mal, wenn du ein neues Tool anbindest — Stripe, Billingo, Wise, Gmail-OAuth — bekommst du einen API-Key. Der darf nirgendwo außer in Supabase Secrets liegen.

### Secret setzen

Via Supabase MCP Connector (neuer Weg):

Sag Claude: „Setz im Supabase-Projekt ein Secret `BILLINGO_API_KEY` auf `dein-echtes-token`." Claude ruft den Connector auf und legt das Secret an.

Via Web-Dashboard (alternativ):

1. `supabase.com/dashboard` → dein Projekt
2. Edge Functions (in der linken Leiste) → Secrets-Tab
3. „Add new secret" → Name und Wert eingeben

Via CLI (Legacy):

```
supabase secrets set BILLINGO_API_KEY="dein-token" --project-ref DEINE_REF
```

### Die drei Level von Keys

Jede Edge Function hat Zugriff auf:

- **Secrets**, die du explizit angelegt hast (`BILLINGO_API_KEY`, `WISE_API_TOKEN`, etc.)
- **Die projekt-internen Werte**: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — die werden automatisch injiziert.

In der Edge Function greifst du auf sie zu mit:

```typescript
const billingoKey = Deno.env.get('BILLINGO_API_KEY')
const supaUrl = Deno.env.get('SUPABASE_URL')
const supaServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
```

Niemand außer der Function selbst sieht diese Werte.

### Welche Secrets du am Anfang wahrscheinlich brauchst

Für ein typisches Buchhaltungs-Setup (Lisa) zum Beispiel:

- `STRIPE_API_KEY` — dein Stripe Secret Key aus `dashboard.stripe.com/apikeys`. Live- oder Test-Modus.
- `BILLINGO_API_KEY` — aus `app.billingo.hu` → Settings → API
- `WISE_API_TOKEN` — aus `wise.com/settings/api-tokens` → „Add new token" → **Read only**
- `GOOGLE_OAUTH_REFRESH_TOKEN` — wenn du Gmail und Drive über einen eigenen OAuth-Flow anbindest (siehe Abschnitt 25 für den einfacheren offiziellen Connector-Weg)

Jeden neuen Key als Supabase Secret. Lokal in deinem Projekt niemals Dateien wie `.env` mit echten Keys committen — hier hilft dir die `.gitignore`, die wir in Abschnitt 8 angelegt haben.

## 16. Deine erste Edge Function

Du schreibst nie selbst Edge-Function-Code. Das macht Claude für dich. Was du machst: Claude beschreiben, was die Function tun soll.

### Ein einfaches Beispiel

Sag Claude (in Cowork oder Code):

> „Schreib mir eine Supabase Edge Function `hello-function`, die bei POST mit einem JSON-Body `{ name: string }` zurückantwortet mit `{ message: 'Hallo ' + name }`. Deploy sie mit `verify_jwt: false`."

Claude schreibt den Code (etwa 15 Zeilen TypeScript), zeigt ihn dir, und wenn der Supabase-MCP-Connector aktiv ist, deployed er sie direkt. Alternativ zeigt Claude den Terminal-Befehl, und du führst ihn aus:

```
supabase functions deploy hello-function --no-verify-jwt
```

Danach ist die Function unter folgender URL erreichbar:

```
https://DEINE_PROJECT_REF.supabase.co/functions/v1/hello-function
```

### Testen

Claude kann auch direkt einen Testaufruf machen, wenn der Connector die Logs lesen kann. Oder du testest selbst:

```
curl -X POST https://DEINE_PROJECT_REF.supabase.co/functions/v1/hello-function \
  -H "Content-Type: application/json" \
  -d '{"name":"Aleksa"}'
```

Erwartete Antwort:

```
{"message":"Hallo Aleksa"}
```

Wenn ja: alles bereit für die echten MCP-Server.

---

# Teil 4 · Deinen ersten Agenten bauen

Jetzt kommt das Herzstück. Mit den Fundamenten aus Teil 2 und 3 baust du jetzt deinen ersten Agenten. Ich nehme als Beispiel **Lisa** — Buchhaltung. Die hat sich bei mir in der Praxis am klarsten entwickelt, und du kannst ihre Struktur 1:1 für Patricia, Marcus oder irgendwen adaptieren.

## 17. Die vier Kerndateien im Detail

Jeder Agent besteht aus einem Ordner mit vier Markdown-Dateien:

```
ai-team/agents/lisa-accounting/
├── AGENT.md       Identität, Persönlichkeit, Verantwortung
├── workflows.md   Konkrete Abläufe, Trigger, Schritte
├── tools.md       Welche Werkzeuge darf sie benutzen
└── knowledge.md   Domänen-Wissen, Regeln, Referenzen
```

Jede Datei hat eine klare Rolle. Wenn du sie vermischst, wird's chaotisch. Wenn du sie strikt trennst, kannst du noch in einem Jahr in jede Datei reingehen und weißt sofort, wo du was findest.

**Merksatz:** AGENT sagt, wer — workflows sagt, wie — tools sagt, womit — knowledge sagt, was.

## 18. AGENT.md — Wer ist dieser Mitarbeiter

Die AGENT.md ist das Visitenkartenblatt. Sie definiert:

- **Identität:** Name, Rolle, Emoji (wenn du ein visuelles Büro hast), Status (geplant/aktiv), an wen der Agent berichtet
- **Persönlichkeit:** Wie kommuniziert er? Wie ist sein Arbeitsstil? In 2–3 Sätzen, präzise, nicht generisch.
- **Kernverantwortung:** Was gehört in seinen Bereich, was ausdrücklich nicht
- **Proaktive Verhaltensweisen:** Was macht er, ohne dass du fragst? Täglich, wöchentlich, monatlich
- **Entscheidungsbefugnisse:** Welche Aktionen darf er allein ausführen, welche brauchen dein OK (als Tabelle)

### Template

```markdown
# Agent: [NAME] — [ROLLE]

## Identität
- **Name:** [Menschlicher Name]
- **Rolle:** [Abteilung / Funktion]
- **Emoji:** [optional, für visuelle Interfaces]
- **Status:** Aktiv / Geplant
- **Reports to:** [Max (CEO Agent) oder direkt dir]

## Persönlichkeit
[Beschreib in 2–3 Sätzen den Arbeitsstil. Konkret werden:
Wie kommuniziert er? Formell oder locker? Wie geht er mit
Unsicherheit um? Was ist sein Tonfall?]

## Kernverantwortung
1. [Hauptaufgabe — das ist, wofür der Agent bezahlt wäre,
   wenn er ein Mensch wäre]
2. [Sekundäraufgabe]
3. [Tertiäraufgabe — optional]

## Proaktive Verhaltensweisen
- **Täglich:** [Was prüft er jeden Tag?]
- **Wöchentlich:** [Montags-Report? Wöchentliche Aufräum-Aktion?]
- **Monatlich:** [Standard-Prozess, der jeden Monat läuft]
- **Auf Event:** [Was triggert ihn spontan?]

## Entscheidungsbefugnisse

| Aktion | Darf allein | Braucht dein OK |
|---|---|---|
| [Rechnung entwerfen] | ✓ | |
| [Rechnung finalisieren] | | ✓ |
| [Mail senden] | | ✓ |
| [Datei löschen] | | ✓ |

## Kommunikationsstil
- Sprache: [Deutsch / Englisch]
- Ton: [direkt, knapp, freundlich, formell, …]
- Antwortlänge: [knapp, Bullet-Points; ausführlich; angepasst]
```

### Lisas AGENT.md-Beispiel (gekürzt)

```markdown
# Agent: Lisa — Accounting & Finance

## Identität
- **Name:** Lisa
- **Rolle:** Buchhaltung & Finanzen
- **Emoji:** 📊
- **Status:** Aktiv
- **Reports to:** Aleksa direkt

## Persönlichkeit
Lisa ist gewissenhaft, strukturiert und proaktiv. Sie wartet
nicht, bis man ihr sagt, was zu tun ist — sie flaggt fehlende
Belege, erinnert an Fristen und hält den Drive-Ordner sauber
für die Steuerberaterin. Sie kommuniziert mit Zahlen im Rücken.
Wenn etwas nicht aufgeht, fragt sie nach, bevor sie etwas annimmt.

## Kernverantwortung
1. Monatliche Buchhaltung beider Firmen — Stripe zu Billingo,
   PDFs zu Drive, Abschluss-Bericht
2. Belegverwaltung — Klassifizierung, Upload, Abgleich
3. Kommunikation mit der Steuerberaterin (nur Entwürfe)

## Proaktive Verhaltensweisen
- **Monatlich (3. des Monats):** Stripe-Payments → Billingo →
  Drive; Abschluss-Bericht an Aleksa
- **Auf Event:** Neue Stripe-Zahlung > 500 € → kurzer Hinweis

## Entscheidungsbefugnisse

| Aktion | Darf allein | Braucht dein OK |
|---|---|---|
| Rechnung in Billingo erstellen (aus Stripe-Daten) | ✓ | |
| Rechnung stornieren | | ✓ |
| Belege hochladen und kategorisieren | ✓ | |
| Mail an Steuerberaterin senden | | ✓ (nur Entwurf) |
| Stripe-Refund ausstellen | | ✓ |
```

Nicht generisch. Nicht „sie ist freundlich und hilfsbereit". Sondern konkret: **was** macht sie proaktiv, **was** darf sie allein, **wie** klingt sie.

## 19. workflows.md — Wie arbeitet sie konkret

Die workflows.md ist das Handbuch. Sie enthält alle wiederkehrenden Abläufe als nummerierte Schritt-für-Schritt-Listen. Jeder Workflow hat einen Trigger, eine Frequenz und klare Schritte.

### Template

```markdown
# Lisa's Workflows

## WF-001 — [Name des Workflows]

**Trigger:** [Was startet ihn? Automatisch, manuell, Event-basiert?]
**Frequenz:** [Täglich / wöchentlich / monatlich / ad hoc]
**Akzeptanz:** [Woran merkst du, dass er erfolgreich durchgelaufen ist?]

### Schritte
1. [Schritt 1 — konkret, mit dem Tool-Namen]
2. [Schritt 2]
3. [Schritt 3]

### Fehlerbehandlung
- Wenn [X], dann [Y].
- Wenn [Z], pausiere und frag Aleksa.
```

### Ein konkretes Beispiel — Lisas Monats-Workflow

```markdown
## WF-001 — Monatliche Buchhaltung Spalevic Consulting

**Trigger:** 3. jeden Monats, 09:00
**Frequenz:** monatlich
**Akzeptanz:** Abschluss-Mail an Aleksa mit:
- Zahl der erstellten Rechnungen
- Gesamtsumme netto + brutto
- Zahl der PDFs in Drive
- Liste der fehlenden Belege (falls welche)

### Schritte
1. Stripe-Payments des Vormonats abrufen:
   `stripe_list_balance_transactions(account: "1", date_range: "last_month")`
2. Pro Zahlung:
   a. Prüfen, ob der Kunde in Billingo existiert:
      `billingo_list_partners(search: <email>)`
   b. Falls nicht: anlegen mit `billingo_create_partner`
   c. Rechnung erstellen:
      `billingo_create_document(partner_id, amount, stripe_ref)`
   d. PDF runterladen:
      `billingo_download_pdf(document_id)`
3. PDFs in Drive-Ordner hochladen:
   `google_drive_upload(pdf, path: "Buchhaltung/<Jahr>/<Monat>")`
4. Wise-Kontoauszug manuell (Aleksa) — Lisa erinnert nur daran.
5. Abschluss-Report zusammenstellen und in Chat ausgeben.

### Fehlerbehandlung
- Rechnungsnummer existiert bereits → Stopp, an Aleksa melden.
- Billingo-API schickt 429 (rate limit) → 30 Sekunden warten, ein
  weiterer Versuch, dann pausieren.
- PDF-Download fehlgeschlagen → den Eintrag merken, am Ende einen
  Sammel-Retry. Wenn weiter fehlt, in den Abschluss-Report.
- Stripe-Payment ohne E-Mail-Adresse → in die Fehlt-Liste, nicht
  automatisch erstellen.
```

Die Workflow-Beschreibung ist der Teil, den Lisa wirklich ausführt. Wenn sie ihn nicht ausführen kann (weil ein Tool fehlt, eine Info unklar ist), stoppt sie und fragt.

### Tipp zum Schreiben

Schreib den Workflow zuerst **so, wie du ihn einem menschlichen Praktikanten erklären würdest**. Dann geh nochmal drüber und ersetz vage Formulierungen durch konkrete Tool-Aufrufe. Genau dieselben Tool-Namen benutzt du dann in `tools.md`.

## 20. tools.md — Was darf sie benutzen

Die tools.md ist die Sicherheitsgrenze. Was hier nicht drin steht, kann der Agent nicht aufrufen. Jedes Tool kriegt einen klaren Zweck und ein Zugriffslevel.

### Template

```markdown
# Lisa's Tools

## Offizielle Konnektoren

### Stripe
- **Zweck:** Zahlungen auslesen, keine Refunds
- **Zugriff:** Read only
- **Aktion:** In Claude Cowork unter Settings → Connectors → Stripe
  aktivieren, Aleksa's Account verbinden

## Eigene MCP-Server (Supabase Edge Functions)

### Billingo MCP Server
- **URL:** https://<ref>.supabase.co/functions/v1/billingo-mcp-server
- **Tools:**
  - `billingo_list_partners`
  - `billingo_create_partner`
  - `billingo_create_document`
  - `billingo_download_pdf`
  - `billingo_cancel_document` (Schreibzugriff! Nur mit Bestätigung)
- **Zugriff:** Read + Write
- **Secret:** BILLINGO_API_KEY

### Wise MCP Server
- **URL:** https://<ref>.supabase.co/functions/v1/wise-mcp-server
- **Tools:**
  - `wise_get_profiles`
  - `wise_list_balances`
  - `wise_list_activities`
- **Zugriff:** Read only
- **Secret:** WISE_API_TOKEN

## Google API Bridge

### Gmail (Read only)
- **Tools:**
  - `google_gmail_search`
  - `google_gmail_message`
- **Zweck:** Belege in Mails finden

### Drive (Read + Write)
- **Tools:**
  - `google_drive_list`
  - `google_drive_find_folder`
  - `google_drive_create_folder`
  - `google_drive_ensure_path`
  - `google_drive_upload`
- **Zweck:** PDFs in den richtigen Ordner legen, Ordner anlegen
  wenn nötig
```

### Die Grundregel

Wenn Lisa ein Tool nicht in tools.md hat, kann sie es nicht aufrufen. Du kontrollierst damit, was sie überhaupt darf. Lisa hat bei mir 26 einzelne Tools — jedes bewusst eingetragen.

Patricia, meine persönliche Assistentin, hat nur sechs. Weil sie keinen Schreibzugriff auf Gmail braucht — sie liest nur und schreibt Entwürfe. Ich drücke selbst auf Senden.

**Weniger ist mehr.** Jedes zusätzliche Tool ist eine zusätzliche Möglichkeit, dass der Agent etwas macht, was du nicht wolltest.

## 21. knowledge.md — Was muss sie wissen

Die knowledge.md ist die Bibliothek. Hier landet das Domänen-Wissen, das der Agent braucht, um gute Entscheidungen zu treffen.

### Was da rein gehört

- **Fakten zur Firma:** Firmennamen, Steuernummern, Adressen
- **Fakten zu Prozessen:** Steuer-Kategorien, VAT-Codes, Rechnungsnummern-Konventionen
- **Referenzdaten:** Liste aller deiner Ausgaben-Kategorien, die zu den Drive-Ordnern passen müssen
- **Kontakt-Details:** Namen der Steuerberaterin, der Personen, mit denen der Agent kommuniziert
- **Regeln:** „Rechnungen immer in Euro", „Kunden aus HU bekommen 27 % VAT, aus EU 0 %", „Stripe-Konto 1 ist für KI-Schule, Konto 2 für Client Services"
- **Bekannte Einschränkungen:** „Wise-API kann keine Auszüge abrufen, Aleksa lädt sie manuell hoch"

### Was da **nicht** rein gehört

- Persönlichkeit (gehört in AGENT.md)
- Konkrete Ablauf-Schritte (gehören in workflows.md)
- Tool-URLs und Zugriffslevel (gehören in tools.md)

### Template

```markdown
# Lisa's Knowledge Base

## Firmen, die sie verwaltet

### Spalevic Consulting Kft.
- Steuernummer: HU XXXXXXXX
- Adresse: 1147 Budapest, Locsei út 9/A
- Rechnungsnummern-Block (Billingo): 290759
- Bankkonto (Billingo): 258740 (Wise EUR)
- VAT-Default: 27 % für HU-Kunden, 0 % + EU-Reverse-Charge für EU-Kunden

### Spalevic & Partner Holding Kft.
- ... (analog)

## Stripe-Konten

| Konto | ID | Nutzung |
|---|---|---|
| 1 | acct_1RlQZ6JH4KmjuYHx | KI-Schule, Tech Support |
| 2 | acct_1SQ5j7DGrn0Qd55h | Client Services (default) |

## Kategorien (Drive-Ordner)

Jeder Beleg muss in genau eine dieser Kategorien:
- Software & Subscriptions
- Office & Supplies
- Marketing & Ads
- Travel & Accommodation
- Food & Entertainment
- Professional Services (Steuerberater, Anwalt)
- Hardware
- Other

## Kontakte

- **Steuerberaterin:** Fanni Kovács, fanni@steuerbureau.hu
- **Banking-Support Wise:** support@wise.com

## Regeln

- Alle Rechnungen in Euro
- Rechnungsnummern fortlaufend, keine Lücken
- Bei Stornos nie einfach Rechnungen löschen, sondern offiziell
  stornieren (`billingo_cancel_document`)
- Bei Unsicherheit: pausieren, nicht raten
- Keine E-Mails automatisch an Fanni senden — nur Entwurf
  vorbereiten, Aleksa drückt Senden

## Bekannte Einschränkungen

- Wise-API unterstützt keinen PDF-Auszug, Aleksa lädt monatlich
  manuell hoch
- Stripe-Fee-Rechnungen kommen separat aus dem Stripe-Dashboard
- Billingo-API hat ein Rate Limit von 60 Calls/Minute
```

### Wie der Agent die Datei liest

Wenn Claude die knowledge.md beim Start lädt, kennt er ab sofort alle diese Fakten. Er muss nicht jedes Mal fragen „welche Steuernummer hat die Firma?". Die Antwort steht da.

Das reduziert Halluzinationen dramatisch. Ein Agent, der gut informiert ist, erfindet weniger. Ein Agent ohne knowledge.md erfindet ständig.

## 22. Das Beispiel Lisa — Schritt für Schritt

Wie gehst du konkret vor, wenn du Lisa bauen willst?

### Tag 1 — Brainstorming und AGENT.md

1. **30 Minuten überlegen:** Was genau macht meine Buchhaltung heute? Auflisten, nicht bewerten. Stripe sichten, Rechnungen schreiben, Belege klassifizieren, in Drive hochladen, monatlichen Bericht erstellen, Fanni die Fragen stellen.
2. **AGENT.md schreiben.** Lass Claude helfen: „Ich baue Lisa, Buchhalterin. Schreib mir eine AGENT.md basierend auf dem Template, ich fülle die Details." Dann iteriert ihr zusammen.
3. **Persönlichkeit konkret:** Ich wollte Lisa gewissenhaft aber nicht steif. Nach drei Versuchen saß der Ton.

### Tag 2 — workflows.md und knowledge.md

1. **Den zentralen Workflow in Prosa ausschreiben.** „Einmal im Monat geht Lisa in Stripe, zieht die Payments, checkt Billingo, erstellt Rechnungen, lädt PDFs hoch, meldet sich." Dann von Claude in die Template-Form bringen lassen.
2. **knowledge.md befüllen.** Das dauert etwas, weil du Fakten wiederfinden musst — Steuernummer, Billingo-Block-ID, Drive-Ordner-Namen. Aber wenn du es einmal gemacht hast, hast du's für immer.

### Tag 3 — tools.md und die Integrationen

1. **Liste die Tools aus workflows.md:** Stripe, Billingo, Wise, Drive, Gmail. Das sind die Zeilen für tools.md.
2. **Offizielle Connectors aktivieren:** Stripe und Gmail haben Claude-Connectors. Einmalig in Cowork einschalten, Konto verbinden.
3. **Eigene MCP-Server bauen:** Billingo und Wise haben keine offiziellen Connectors. Also baust du selbst — das ist Teil 5.

### Tag 4 — Erster echter Lauf

1. In Claude Cowork (oder Code) eine neue Unterhaltung starten.
2. Claude instruieren: „Lies `ai-team/agents/lisa-accounting/AGENT.md` und alle zugehörigen Dateien, plus `ai-team/wiki/company.md`. Du bist jetzt Lisa, meine Buchhalterin."
3. Kleine Aufgabe geben: „Zeig mir meine 5 letzten Stripe-Zahlungen und prüf, ob ich für jede eine Billingo-Rechnung habe."
4. Beobachten. Reagieren. Was falsch läuft, zurückschreiben in knowledge.md oder workflows.md. Der Agent wird bei jeder Iteration präziser.

**Am Anfang keine destruktiven Aktionen.** Lisa darf in der ersten Woche keine Rechnung finalisieren. Nur Entwürfe. Nur Listen. Wenn das 20-mal sauber lief, gehst du Schritt für Schritt in den autonomen Modus.

## 23. Slash-Commands: deinen Agenten mit einem Wort aktivieren

Jedes Mal die lange Instruktion zu tippen („Lies AGENT.md, du bist jetzt Lisa…") ist unnötig. Claude Code hat **Slash-Commands**.

Leg die Datei `.claude/commands/lisa.md` an:

```markdown
---
description: Aktiviert Lisa — deine Buchhalterin
---

Du bist jetzt Lisa, die Buchhalterin des KI-Teams.

Lies in dieser Reihenfolge:
1. ai-team/agents/lisa-accounting/AGENT.md
2. ai-team/agents/lisa-accounting/workflows.md
3. ai-team/agents/lisa-accounting/tools.md
4. ai-team/agents/lisa-accounting/knowledge.md
5. ai-team/wiki/company.md
6. ai-team/wiki/contacts.md
7. ai-team/wiki/glossary.md

Dann melde dich in Lisas Persönlichkeit und frag, was anliegt.
Halte dich strikt an deine Entscheidungsbefugnisse. Destruktive
Aktionen immer erst als Entwurf, nie ohne Aleksa's OK.
```

Ab sofort tippst du in Claude Code nur noch `/lisa` und die komplette Rolle ist geladen. Dasselbe für `/patricia`, `/marcus`, jeden anderen Agenten.

### Bonus: Slash-Commands als Vertrag

Der Slash-Command-Text ist de facto der Vertrag zwischen dir und dem Agenten. Änderst du ihn, änderst du den Aktivierungs-Pfad. Das ist auch eine gute Stelle, um dem Agenten zusätzliche Instruktionen mitzugeben, die nicht dauerhaft in AGENT.md stehen, sondern nur für diese Session („wir sind im Lern-Modus, bitte explain vorher").

## 24. Das Skill-Ökosystem

Skills sind noch einmal eine Ebene über den Slash-Commands. Ein **Skill** ist ein kompletter Methoden-Baukasten, den du deinem Agenten verfügbar machst.

Beispiele:

- **ki-agent-builder** (von mir) — ein Skill, der Claude beibringt, wie neue Agenten strukturiert angelegt werden. Wenn du einen neuen Agenten bauen willst, sagst du: „Nutz den ki-agent-builder Skill und bau mir einen Sales-Agenten." Claude kennt die Template-Struktur, die Regeln, die Benennungen.
- **skill-creator** (offiziell von Anthropic) — um selbst neue Skills zu entwerfen
- **document-design** — stilvoll Dokumente bauen
- **canvas-design** — Visuelles erstellen
- **pdf**, **xlsx**, **docx** — Dateiformate professionell behandeln
- **Web-development**, **voice-agent-development**, **stitch-loop-workflow**, **21st-dev-magic**, **motion-design** — meine eigenen, für den Engineer-Agenten Marcus

Skills installierst du einmal in Claude Cowork (Settings → Skills) oder Claude Code (je nach Version). Dann stehen sie verfügbar, und du rufst sie per Namen.

**Start-Paket für dich:**
- Anthropic's offizielle Skills: `skill-creator`, `pdf`, `xlsx`, `docx` — damit kommst du in den meisten Fällen aus
- Mein `ki-agent-builder` — spart dir jedes Mal, wenn du einen neuen Agenten anlegst

Skills sind eine eigene Disziplin. Für den Anfang reicht, dass du weißt: sie existieren, und wenn ein Workflow sich häufig wiederholt, kannst du ihn als Skill verfestigen.

---

# Teil 5 · Werkzeuge anbinden

Dein Agent hat eine Rolle, Workflows, Wissen. Jetzt braucht er echte Werkzeuge. Dafür gibt es vier Wege.

## 25. Offizielle Claude-Konnektoren

Anthropic bietet fertige Konnektoren für häufig genutzte Tools. Die aktivierst du mit ein paar Klicks, keine Programmierung nötig.

### Verfügbare Konnektoren (Stand 2026)

- **Stripe** (volle CRUD-Fähigkeiten)
- **Gmail** (Lesen, Senden, Suchen, Entwürfe)
- **Google Drive** (Lesen, Ordner navigieren)
- **Google Calendar**
- **Slack**
- **Notion**
- **Airtable**
- **HubSpot**
- **Linear**
- …und weitere, Liste wächst

### Aktivierung

1. In Claude Cowork: Settings → **Connectors** → Tool suchen → „Add"
2. Durch den OAuth-Flow klicken. Anthropic holt sich die Zugangsrechte.
3. Fertig. Ab sofort kann jede Claude-Unterhaltung darauf zugreifen.

### Wann du Konnektoren nimmst

- Für jedes Tool, das in der Liste steht
- Wenn du OAuth-flows vermeiden willst
- Wenn du nicht selbst Edge Functions warten willst
- Für Lese-Operationen, die du nicht selbst bauen willst

### Wann nicht

- Wenn du Tools brauchst, die nicht in der Liste stehen (Billingo, Wise, spezialisierte Tools)
- Wenn du sehr granulare Rechte brauchst, die der Konnektor nicht anbietet
- Wenn du Daten nachverarbeiten willst, bevor sie an den Agenten gehen

## 26. Eigene MCP-Server als Edge Functions

Für alles, was nicht als Konnektor verfügbar ist, baust du selbst. Genauer: du sagst Claude, was er bauen soll.

### Das Schema

Ein MCP-Server ist ein kleines Programm, das:

1. Einen POST-Request empfängt mit einem JSON-Body wie `{ "tool": "billingo_create_document", "arguments": {...} }`
2. Die entsprechende echte API aufruft (z. B. Billingo)
3. Das Ergebnis zurückgibt in einem standardisierten Format

In Supabase lebt das als Edge Function.

### So beauftragst du Claude

```
Schreib mir einen Supabase Edge Function als MCP-Server
für die Billingo-API. Sie soll folgende Tools anbieten:

- billingo_list_documents (query: optional partner_id, optional date_range)
- billingo_list_partners (query: optional search)
- billingo_create_partner (args: name, email, tax_number, address)
- billingo_create_document (args: partner_id, amount, vat_rate, stripe_ref)
- billingo_download_pdf (args: document_id)
- billingo_cancel_document (args: document_id)

Der API-Key kommt aus dem Supabase Secret BILLINGO_API_KEY.
Die Auth-Header für Billingo sind: X-Api-Key: <key>.
Die Base-URL ist https://api.billingo.hu/v3.

Deploy sie als billingo-mcp-server mit verify_jwt: false.
Leg den Quellcode im Repo unter ai-team/mcp-servers/billingo-mcp-server/
ab, damit ich ihn versioniert habe.
```

Claude schreibt die komplette Edge Function, erklärt dir optional jede Zeile, speichert sie im richtigen Pfad und deployed sie via Supabase MCP Connector.

### Testen

Claude kann den Test direkt nach dem Deploy machen, oder du testest selbst:

```
curl -X POST https://DEINE_REF.supabase.co/functions/v1/billingo-mcp-server \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer DEIN_SUPABASE_ANON_KEY" \
  -d '{"tool":"billingo_list_partners","arguments":{}}'
```

Antwort ist ein JSON-Array mit deinen Partnern. Wenn ja: läuft. Wenn nein: zeig Claude die Fehlermeldung, er debuggt.

### Mit Claude verbinden

Sobald der MCP-Server deployed ist, verbindest du ihn mit Claude:

In **Claude Cowork:** Settings → Connectors → „Add custom MCP" → URL eintragen.

In **Claude Code:** `~/.claude/mcp.json` erweitern um:

```json
{
  "mcpServers": {
    "billingo": {
      "url": "https://DEINE_REF.supabase.co/functions/v1/billingo-mcp-server"
    }
  }
}
```

Ab jetzt tauchen die Billingo-Tools in Lisas Tool-Arsenal auf.

### Pattern, das sich bewährt hat

- **Ein MCP-Server pro API.** Nicht einen Riesen-Server für alles. Billingo-MCP, Wise-MCP, Twilio-MCP, separat. Dann kannst du einen umbauen, ohne die anderen zu brechen.
- **Quellcode im Repo ablegen.** Unter `ai-team/mcp-servers/<name>/index.ts`. Dann ist er versioniert und jemand anderes (oder du in drei Monaten) kann nachlesen, wie er gebaut ist.
- **Secrets konsequent verwenden.** Nie API-Keys im Code. Immer `Deno.env.get("KEY_NAME")`.
- **CORS offen genug.** Für lokale Entwicklung und Production alle relevanten Origins zulassen.

## 27. Make.com als Webhook-Layer

Hier ist ein Thema, das die erste Version komplett übersehen hat: **Make.com**.

Make.com ist eine visuelle Automatisierungs-Plattform (vormals Integromat). Du zeichnest in einem Editor Szenarien: „Wenn Webhook getriggert wird → hole Google-Kalender → prüf Verfügbarkeit → erstelle Event → schick Mail."

Warum das im Kontext von KI-Teams wichtig ist:

- **Make.com hat eigene OAuth-Flows.** Es hat für Gmail, Google Calendar, Sheets, LinkedIn, Instagram, Brevo und hunderte andere Dienste eigene Verbindungen mit vollen Schreibrechten.
- **Du musst nicht für jede API einen MCP-Server selbst bauen.** Stattdessen: Voice-Agent → Webhook → Make-Szenario → echte Aktion.
- **Visuell editierbar.** Du siehst die Schritte, du änderst ohne Deploy, deine Business-Logik bleibt lesbar.
- **Logs und Retry eingebaut.** Bei jedem Lauf siehst du, was durch jeden Schritt ging. Bei Fehlern kannst du exakt nachvollziehen, wo es hängte.

### Wann du Make statt Edge Function nimmst

- Für **Google Calendar + Gmail send** (OAuth-Scope-Konflikt macht das in Supabase-Edge-Functions mühsam)
- Für **LinkedIn posten, Instagram posten, E-Mail-Verteiler**
- Für **Szenarien mit mehreren Schritten**, die dir als Dataflow klar sind
- Für **Voice-Agent-Backends** (fast immer — siehe Teil 7)

### Wann Edge Function besser ist

- Für **pure Logik**, die du in 20 Zeilen TypeScript schreibst
- Für **interne Tools** (Supabase-Tables, eigene Datenbank)
- Für **Geschwindigkeit** — Make.com-Szenarien laufen in 1–2 Sekunden, Edge Functions unter 500 ms

### Make.com als Webhook-Empfänger einrichten

1. Make.com-Account anlegen (Free-Tier reicht für 1.000 Operationen/Monat)
2. „Create new scenario"
3. Erstes Modul: **Custom Webhook** — kopiere die Webhook-URL
4. Weitere Module hinzufügen: z. B. „Google Calendar → create event"
5. Letztes Modul: **Webhook Response** mit einem JSON-Body wie `{"ok": true}`
6. **Wichtig:** Scheduling auf **Immediately** stellen, sonst antwortet es mit Verzögerung und der Caller hat schon timed out

Die Webhook-URL kopierst du in deinen MCP-Server oder direkt in die Voice-Agent-Tool-Config. Deine Agenten rufen sie auf, als wäre es ein normales Tool.

## 28. Community-MCPs aus der Registry

Ein MCP-Server muss nicht immer von dir oder Anthropic kommen. Es gibt eine wachsende Registry von Community-MCPs — meistens Open Source auf GitHub, die jemand anders schon gebaut hat.

Bevor du selbst baust, frag Claude: „Gibt es schon einen offenen MCP-Server für [Tool X]?" Wenn ja, schau ihn dir an. Manchmal übernimmst du ihn 1:1, manchmal passt du ihn für deinen Fall an.

Typische Community-MCPs: Notion (wenn der offizielle nicht reicht), GitHub (falls nicht schon nativ), Linear, Trello, Redis, spezielle Branchen-Tools.

Skepsis ist dabei angebracht: prüf den Code, bevor du einen fremden MCP-Server in dein Setup lässt. Verarbeitet er Token sauber? Leakt er Daten? Ein MCP, den du selbst reviewed hast, ist sicherer als einer, den du blind einbindest.

## 29. Regel: so wenig Schreibrechte wie möglich

Eine goldene Regel, die ich mir rückwirkend gewünscht hätte früher zu internalisieren:

**Gib deinen Agenten so wenig Schreibrechte wie möglich.**

- Lisa braucht Stripe-Lesen. Sie braucht kein Stripe-Schreiben. Sie soll keine Refunds initiieren, keine Kunden erstellen. Wenn jemand ein Refund will: du machst es manuell.
- Patricia braucht Gmail-Lesen. Sie braucht keinen Gmail-Sendestatus. Sie soll Entwürfe vorbereiten. Du drückst Senden.
- Marcus braucht GitHub-Lesen und GitHub-Schreiben in eigene Repos. Er braucht keinen Zugriff auf fremde Repos. Er braucht kein Delete-Branch-Force-Push-Master.

Warum? Weil KI-Agenten Fehler machen. Selten, aber sie machen sie. Wenn ein fehlerhafter Aufruf nur Lese-Schaden anrichten kann, ist das kein Problem. Wenn er Schreiben darf, kann er Daten löschen, Kunden falsch anlegen, Mails versenden, Geld bewegen.

Die Kosten, wenn etwas schiefgeht, sind asymmetrisch. Ein Lese-Fehler kostet dich einen Debug-Moment. Ein Schreib-Fehler kann dich einen ganzen Tag oder mehr kosten, plus Vertrauensverlust bei deinen Agenten.

**Faustregel:** wenn du unsicher bist zwischen „alleine schreiben" und „Entwurf, dann du drückst Senden", nimm immer Entwurf. Du kannst später, wenn der Agent sich in zehn Iterationen bewährt hat, das Recht erweitern.

---

# Teil 6 · Skalieren

Ein Agent ist ein Anfang. Richtig interessant wird es mit drei, vier, sechs. Dafür brauchst du Patterns, die das Ganze zusammenhalten.

## 30. Den zweiten Agenten bauen

Sobald Lisa läuft, baust du den zweiten. Ich empfehle als zweiten Agent **Patricia — persönliche Assistentin**. Warum: sie hat andere Eigenschaften als Lisa, damit siehst du, wie sich das Pattern auf andere Rollen anwendet.

### Der Unterschied zu Lisa

- Lisa macht viel **Write-Aktionen** (Rechnungen erstellen, PDFs hochladen). Patricia ist primär **Read** plus Draft.
- Lisa läuft monatlich als großer Batch. Patricia läuft **täglich** in kleinen Portionen.
- Lisa hat wenige große Tools (Billingo, Drive). Patricia hat viele kleine (Gmail, Calendar, Life Dashboard, Kontakte).

### Der Prozess

1. Ordner kopieren: `cp -r ai-team/agents/lisa-accounting ai-team/agents/patricia-assistant`
2. Vier Dateien nehmen und Patricia's Rolle reinschreiben. Identität ändern, Workflows völlig neu (Tages-Brief, Mail-Triage, Kalender-Preview), Tools für ihre Aufgaben, Knowledge für ihre Domäne (deine Präferenzen, Termine, Gewohnheiten).
3. `/patricia` Slash-Command anlegen.
4. Erste Testläufe im Entwurfs-Modus.
5. Nach ein bis zwei Wochen langsam Autonomie erweitern.

Wenn du den ersten Agenten sauber gebaut hast, sitzt das Pattern. Der zweite geht in 2–3 Stunden, statt in einem Wochenende.

## 31. Gemeinsames Wissen im Wiki-Ordner

Sobald du zwei Agenten hast, fängst du an, dieselben Informationen doppelt zu pflegen — Firmenname, Firmenadresse, Steuerberaterin.

Das hält nicht lange durch. Lösung: ein **gemeinsamer Wiki-Ordner**, den alle Agenten beim Start zusätzlich lesen.

```
ai-team/wiki/
├── company.md     Firmendaten, Stammdaten, Produkte
├── personal.md    Deine persönlichen Ziele, Pain Points, Präferenzen
├── contacts.md    Wichtige Leute (Steuerberater, Anwalt, Partner, Freunde)
└── glossary.md    Fachbegriffe, Abkürzungen, Insider-Namen
```

Im Slash-Command jedes Agenten trägst du ein:

```
Lies vor dem Start zusätzlich:
- ai-team/wiki/company.md
- ai-team/wiki/contacts.md
- ai-team/wiki/glossary.md
```

Ab jetzt wissen alle Agenten dasselbe über die gemeinsamen Grundlagen. Änderst du einmalig in `company.md` die Firmenadresse, hat jeder Agent sofort die neue Version.

## 32. Max als CEO-Orchestrator

Wenn du irgendwann vier, fünf, sechs Agenten hast, wird es aufwändig, jedes Mal selbst zu entscheiden, wer was macht. Dann kommt **Max**, der CEO-Agent.

Max ist besonders: er hat selbst fast keine Tools. Seine einzige Fähigkeit ist, **Aufgaben an die anderen Agenten zu delegieren**.

Du sagst Max: „Ich brauch für morgen den Februar-Bericht, einen Newsletter-Entwurf und eine Antwort an Kunde X."

Max zerlegt:
- „Lisa, bitte den Februar-Bericht."
- „Emilija, bitte der Newsletter-Entwurf."
- „Patricia, bitte der Antwort-Entwurf an Kunde X."

Max sammelt die Ergebnisse und fasst für dich zusammen: „Alles drei liegt vor. Lisa hat die Zahlen, Emilija hat drei Newsletter-Optionen, Patricia hat den Entwurf und fragt nach, ob dir der Ton so passt."

Das reduziert deine Entscheidungslast drastisch. Du sprichst nur noch mit Max. Max ist der Kellner; die Agenten sind die Küche.

### Max als Agent bauen

Max hat seine eigene AGENT.md, seine eigene Persönlichkeit („ruhig, überblickt viel, delegiert clean"), und seine workflows.md beschreibt, wie er Aufgaben zerlegt.

Seine tools.md enthält: „Darf die AGENT.md der anderen lesen, darf in deren Kontext eine Sub-Unterhaltung starten." Das ist aktuell (Anfang 2026) noch experimentell — State of the Art ist sogenannte „Multi-Agent Orchestration", und sie entwickelt sich schnell. Wenn du Max baust, lass dir von Claude zeigen, was heute möglich ist.

## 33. Status-Tracking — wie Marcus Projekte managed

Marcus, mein Engineer-Agent, hat eine besondere Rolle: er baut Websites und Tools. Und weil Projekte sich immer ziehen, hat er eine spezielle Datei, die er aktiv pflegt: **STATUS.md**.

```
ai-team/status/STATUS.md
```

Die Struktur:

```markdown
# Projekt-Status

## Aktive Projekte

### Guide-Funnel guide.ki-hochschule.de
- **Owner:** Marcus
- **Stand:** Frontend v0.5 live, Backend GATED
- **Letztes Update:** 17. April 2026
- **Nächster Schritt:** Aleksa-OK für Supabase-Migration
- **Blocker:** —

### Patricia-Voice-Agent
- **Owner:** Marcus
- **Stand:** Live seit 17. April 2026
- **Letztes Update:** 18. April 2026
- **Nächster Schritt:** Deutsch-Voice-Update mit neuer Stimme
- **Blocker:** —

## Abgeschlossen

### Guide v1 PDF
...
```

Marcus liest und schreibt diese Datei selbst. Jedes Mal, wenn wir an einem Projekt arbeiten, aktualisiert er den Eintrag. Heißt: **du kannst jederzeit in STATUS.md schauen und weißt, was läuft**. Oder du fragst Marcus: „Was ist der Stand?" und er liest dir die Datei zusammengefasst vor.

**Das Muster ist leicht kopierbar.** Wenn deine anderen Agenten längere Prozesse managen (z. B. Sales-Agent, der Deals verfolgt), gib ihnen eine ähnliche Status-Datei. Ein Agent, der nirgendwo seinen Stand dokumentiert, vergisst sich selbst.

---

# Teil 7 · Voice Agents

Voice-Agents sind eine eigene Welt. Sie verdienen ihr eigenes Kapitel, weil sie fundamental anders sind als Text-Agents.

## 34. Warum Voice ein eigenes Tier ist

Text-Agents haben Zeit. Sie können überlegen, Tools aufrufen, noch mal überlegen, Zwischenergebnisse einsehen, am Ende eine saubere Antwort schreiben. Zeit ist kein Stressfaktor.

Voice-Agents haben **1,2 Sekunden**. Länger als das, und der Anrufer denkt, die Verbindung ist tot.

Das heißt in der Architektur:

- **Kein Batch-Processing.** Jede Aktion muss streaming-fähig sein.
- **Tool-Calls müssen schnell sein.** Webhooks, die 3 Sekunden brauchen, sind ein Problem.
- **Der Prompt muss präziser sein.** Im Text-Chat kann der User nachfragen, wenn etwas unklar ist. Am Telefon merkt er es nicht, wenn der Agent misst.
- **Sprache ist anders als Text.** Formulierungen klingen natürlich oder stolpern. Nummern müssen gesprochen werden, nicht geschrieben. „Plus eins sechs null" ist kein Tool-Argument.

## 35. Die Stack-Architektur: ElevenLabs + Twilio + Make.com

Mein bewährter Voice-Agent-Stack:

```
Anrufer
  ↓
Twilio Phone Number
  ↓
ElevenLabs Conversational AI (STT + LLM + TTS)
  ↓
Tool-Call an Webhook
  ↓
Make.com-Szenario
  ↓
Google Calendar / Gmail / CRM / Sheet
  ↓
Antwort zurück
  ↓
TTS-Antwort an Anrufer
```

**Was jede Komponente macht:**

- **Twilio** verwaltet die Nummer. Anruf kommt rein, Twilio leitet ihn weiter.
- **ElevenLabs** macht Speech-to-Text, ruft den LLM (GPT-5.2, Claude, Gemini — du wählst), macht Text-to-Speech. Alles in einem.
- **Make.com** ist der Business-Logik-Layer. Wenn der Agent eine Aktion auslösen soll (Termin buchen, Mail senden), ruft er ein Webhook auf, das geht an Make, und Make macht den konkreten Arbeitsschritt mit seinen eingebauten Connectors.

### Warum ElevenLabs und nicht OpenAI Voice

- Deutlich bessere Stimmen, besonders für nicht-englische Sprachen
- Einfach integrierbare Tool-Calls via Webhook
- Akzeptable Latenz (1.2–1.8 Sekunden für den vollen Turn)
- Faire Preisgestaltung (ca. 0,10 €/Minute)

Alternativen sind Vapi und Retell — beide gut, etwas andere Stärken. Fang mit ElevenLabs an, wenn du Stimmenqualität hoch priorisierst; nimm Vapi, wenn du komplexe Flow-Orchestrierung brauchst.

### Kostenrahmen

Für einen kleinen Voice-Agent:

- Twilio: 1 € pro Nummer + ca. 0,008 €/Minute Voice
- ElevenLabs Starter: 5 $/Monat + Minuten
- Make.com Free: reicht für ca. 100 Anrufe/Monat
- Alles zusammen: 10–30 € pro Monat bei moderater Nutzung

## 36. Patricia als Hotline — das Referenz-Beispiel

Ich habe für meine Assistentin Patricia eine eigene Telefon-Nummer eingerichtet, die auf Ungarisch, Deutsch und Englisch funktioniert. Die Details:

- **Nummer:** +49 2271 481 2988 (Bergheim, DE)
- **Primärsprache:** Ungarisch
- **Sprachen:** DE + EN als automatische Umschaltung beim ersten Turn
- **Stimme:** Jessica (aus der ElevenLabs-Library)
- **LLM:** GPT-5.2
- **TTS-Modell:** eleven_turbo_v2_5 (pflicht für nicht-englische Agenten)

### Drei Flows, die sie beherrscht

1. **Transfer zu Aleksa:** wenn jemand persönlich mit mir sprechen will
2. **Termin-Buchung:** Kalender-Check + Kalender-Event + Mail an mich
3. **Nachrichten-Relay:** wenn ich nicht da bin, sammelt sie Name, Nummer, Anliegen und mailt sie mir

Jeder Flow ist im System-Prompt beschrieben mit klaren Entscheidungsbedingungen. **Wichtig:** Flows sind linear, nicht verschachtelt. Der Agent entscheidet am Anfang: Flow A, B oder C. Dann geht er durch.

### System-Prompt-Struktur (gekürzt)

```
# Persönlichkeit
Du bist Patricia, die persönliche Assistentin von Aleksa.
Ton: warm, kompetent, ungarisch fluent, deutsch/englisch zweitrangig
aber flüssig. Kurze Sätze. Keine Füllwörter.

# Ziel
Erkenne, was der Anrufer will (A/B/C) und führe ihn durch.

# Absolute Regeln (nummeriert, unbrechbar)
1. Niemals transferieren, ohne zuerst zu fragen, ob der Anrufer
   Deutsch oder Englisch spricht (Aleksa spricht kein Ungarisch).
2. Niemals einen Termin buchen, ohne alle Pflichtfelder zu haben.
3. Bei Unsicherheit: pausieren und nachfragen, nicht raten.

# Gesprächsmenü
- A) Transfer zu Aleksa → nach Sprach-Check → transfer_to_number
- B) Termin buchen → check_calendar → book_appointment
- C) Nachricht hinterlassen → send_message_to_aleksa

# Tools
- check_calendar: Google Calendar freeBusy mit Buffer
  (Parameter: desired_start, duration_minutes)
- book_appointment: erstellt Event + sendet Mail an Aleksa
  (Parameter: subject, start, duration, caller_name, caller_phone, caller_email?)
- send_message_to_aleksa: Mail an info@aleksa.ai mit strukturiertem Inhalt
  (Parameter: caller_name, phone, message, category)
- transfer_to_number: system tool
- end_call: system tool

# Kritische Erinnerungen
- Pre-flight-Gate für Transfer: Sprache prüfen, sonst Flow C
- Pflichtfelder Termin: Name + Telefon immer, Mail optional
```

### Make.com-Szenarien hinten dran

- **Scenario 1 (Calendar-Check):** Webhook → Google Calendar freeBusy query → JSON-Response
- **Scenario 2 (Book Appointment):** Webhook → Google Calendar create event + Gmail send an mich
- **Scenario 3 (Send Message):** Webhook → Gmail send an `info@aleksa.ai` mit Kategorie im Subject

Alle drei mit **scheduling: immediately** (sonst Timeout, siehe Troubleshooting).

### Das Ergebnis

Patricia nimmt Anrufe auf Ungarisch an, versteht das Anliegen in 2–3 Sätzen, führt durch den richtigen Flow, sagt am Ende eine saubere Abschluss-Formulierung. Wenn es ein Termin ist, ist der in meinem Kalender, bevor der Anrufer aufgelegt hat. Ich bekomme eine strukturierte Mail mit allen Details.

**Baukasten-Tipp:** kopier dieses Setup exakt als Start, wenn du einen eigenen Voice-Agent baust. Die Feinheiten lernst du, indem du ihn live testest und den Prompt iterierst.

## 37. Knowledge Base als RAG für den Agenten

Voice-Agents haben ein Problem: der System-Prompt ist begrenzt. Alles über ~2.000 Token wird langsam und vergisslich.

Aber Patricia muss viel wissen: meine Firma, meine Kontakte, ungarisches Steuerrecht, meine Gewohnheiten. Wohin damit?

Die Lösung: **Knowledge Base mit RAG** (Retrieval-Augmented Generation). ElevenLabs hat das eingebaut.

### Was RAG ist

Statt dein gesamtes Wissen im System-Prompt zu haben, lädst du separate Wissens-Dokumente hoch. Bei jeder Nutzer-Anfrage prüft ElevenLabs, welche Teile dieser Dokumente relevant sind, holt sie und füttert sie als Kontext für die aktuelle Antwort mit.

**Vorteil:** dein System-Prompt bleibt klein und schnell. Wissen kann beliebig wachsen. Wenn sich ein Fakt ändert, tauschst du nur das entsprechende Dokument.

### Patricias KB

Ich habe fünf Dokumente hochgeladen:

1. `wiki/personal.md` — mein Profil, Ziele
2. `wiki/contacts.md` — wichtige Leute
3. `wiki/company.md` — Firmendaten
4. `wiki/glossary.md` — Fachbegriffe
5. `agents/patricia-assistant/knowledge.md` — ungarisches Recht, Patricia-spezifisches

ElevenLabs indexiert automatisch. Bei jedem Anruf holt sie die top-20 relevanten Chunks aus allen fünf Dokumenten.

**Wartung:** wenn ich eine Datei ändere, muss ich das entsprechende KB-Dokument ersetzen (delete + re-upload). Das ist aktuell ein Snapshot, kein Live-Mirror. Workaround: ein kleines Skript, das bei jedem Commit auf GitHub prüft, ob eines der fünf Files sich geändert hat, und dann automatisch das KB-Dokument aktualisiert. (Hab ich noch auf der Roadmap.)

## 38. Kunden-Voice-Agents als Fulfillment

Ein neueres Kapitel: ich baue Voice-Agents nicht nur für mich, sondern auch als **Fulfillment** für Kunden einer Partner-Firma. Das Pattern ist leicht abgewandelt:

- Ich baue den ElevenLabs-Agent + Twilio-Nummer + Make.com-Backend
- Der Kunde bekommt `agent_id` und `phone_number_id` übergeben
- Der Partner wickelt Whitelabeling + Kunden-Pricing + Minute-Tracking ab

Der erste Fall war **„Kati" für VV-Cars** — eine Personenbeförderung in Dassel. Der Inhaber bekam einen Agenten, der Krankenfahrten, Taxi, Flughafentransfer, Rollstuhl, Dialyse, Kurier und Busreisen als Flows kann. Jede Kategorie mit eigenem Mail-Template an den Inhaber.

**Das Pattern ist skalierbar.** Du kannst in 3–5 Stunden pro Kunde einen solchen Voice-Agent aufsetzen. Wenn du dabei als Dienstleister arbeitest, hast du ein sehr konkretes Produkt: „Bekommt dein Kunde einen KI-Rezeptionisten an die Firmen-Nummer, der immer antwortet, Termine bucht und dich informiert."

Die Details sind in WF-M009 in meinem eigenen `marcus-engineer/workflows.md` — wenn du das selbst machen willst, kann dir Marcus (oder ein ähnlicher Engineer-Agent) den Baukasten durchgehen.

---

# Teil 8 · Darüber hinaus

Die folgenden drei Themen sind Erweiterungen. Ohne sie geht dein KI-Team, aber mit ihnen wird es mächtiger.

## 39. Das Life Dashboard als zweites Frontend

Dein KI-Team braucht nicht zwangsläufig eine Oberfläche. Claude Code und Cowork reichen. Aber manchmal willst du Dinge **sehen** und selbst bearbeiten — deine Budget-Einträge, deine Passwörter, deine Todos, deine Bible-Notes.

Dafür habe ich mir ein **Life Dashboard** gebaut: eine kleine React-App, die auf derselben Supabase-Instanz sitzt und dir alle „Lebens-Tabellen" als UI zeigt.

### Was im Dashboard liegt

- **Passwörter** (kleine verschlüsselte Sammlung)
- **Budget & Finance** (Einnahmen, Ausgaben, Ziele)
- **Portfolio** (ETFs, Aktien, Krypto — Allokation)
- **Investments** (einzelne Transaktionen)
- **Todos mit Subtasks**
- **Bible Notes und Study Plans**
- **Pinboard** mit Sticky-Notes und Images
- **Strategy Items**

Jede Tabelle ist über den `life-dashboard-bridge` auch von den Agenten aus erreichbar. Lisa kann direkt in `ld_budget_entries` schreiben, Patricia kann deine Todos lesen.

### Ob du das brauchst

Wenn du nur einen Buchhaltungs-Agenten hast: nein, unnötig. Wenn du mehrere Agenten hast und sie miteinander an geteilten Datensätzen arbeiten sollen, wird ein solches Dashboard wertvoll. Außerdem ist es eine gute Übung, um Supabase-Tables richtig zu modellieren und mit Agenten zu synchronisieren.

**Tech-Stack:** React + Vite + Tailwind + shadcn/ui + Supabase Auth + Postgres. Auth via Google OAuth. Alles live editierbar. Read/Write via RLS-Policies, die `auth.uid() = user_id` prüfen.

## 40. Vibe Coding mit Stitch, 21st Dev und Motion

Mein Engineer-Agent Marcus hat eine besondere Fähigkeit: er baut nicht-generische Websites. Das klingt trivial, ist es aber nicht. Die Standard-Antwort von Sprachmodellen, wenn du sie nach einer Website fragst, ist **generisches Tailwind** — Standard-Templates, Standard-Spacing, Standard-Farben. Sieht aus wie jedes zweite Startup 2024.

Die drei Tools, die das ändern:

- **Google Stitch** — ein AI-Design-Tool von Google, das aus Textprompts Screen-Anatomien generiert. Marcus legt dort ein Projekt an, beschreibt die Seite, bekommt eine Design-Vorlage zurück. Die exportiert er dann in eine `DESIGN.md` mit Color-Tokens, Typography, Spacing.
- **21st Dev Magic** — eine kuratierte Community-Library von React/Tailwind-Komponenten. Marcus sucht mit einer Beschreibung: „Pricing-Card mit drei Tiers, middle highlighted" und bekommt eine bewährte Umsetzung zurück, die er nur noch an seine Farben anpasst.
- **Motion** (früher Framer Motion) — die Industry-Standard-Library für React-Animationen. Keine Website wirkt „fertig", wenn sie keine Bewegung hat. Motion macht Microinteractions zum Standard.

Zusammen: **Stitch liefert die Anatomie, 21st Dev liefert die Komponenten, Motion bringt sie zum Leben.**

Wenn du selbst Websites von Claude bauen lassen willst, lern diese drei Tools. Lass Marcus (oder einen ähnlichen Engineer-Agenten) in deinem System sie einrichten. Der Unterschied zwischen einer generischen Claude-Website und einer mit diesem Stack ist riesig.

## 41. Das 3D-Büro (optional)

Die Kür: ein visuelles 3D-Büro. Ich habe meinen sechs Agenten ein Voxel-Büro gebaut. Man klickt auf eine Figur, ein Chat-Panel öffnet sich, man chattet mit dem Agenten.

**Nutzwert:** moderat. Es ist cool, und es macht Spaß, das Team zu **sehen**. Aber die Arbeit selbst lässt sich auch perfekt in Claude Code und Cowork machen.

**Wenn du's baust:** Vite + React + Three.js, eine Szene mit Boden, Wänden, einer Figur pro Agent. Jede Figur ein Click-Handler, der ein `ChatPanel.tsx` öffnet. Das Panel schickt Nachrichten an einen Node-Backend-Server, der die Anthropic-API mit dem zusammengesetzten System-Prompt aus den vier Markdown-Dateien aufruft und die Tool-Calls an die Edge Functions routed.

Das ist ein Projekt für ein Wochenende, wenn du Marcus zur Hand hast.

---

# Teil 9 · Troubleshooting und Lessons Learned

Hier ist der Teil, der im alten Guide komplett gefehlt hat. Ich habe sechs Monate lang alles aufgeschrieben, was schiefging, und was ich jedes Mal in derselben Falle erneut gelernt habe. Spar dir die Monate.

## 42. Die zehn häufigsten Fehler

**1. Keys im Code statt in Secrets.** Immer wieder tippt man im Eifer der Gefechts einen Key direkt in eine Edge Function. Git merkt sich das. Lösung: **vor jedem Commit** `git diff` schauen und prüfen, dass keine Tokens darin stehen. Bei Unfall: Key bei der ursprünglichen API widerrufen, neuen generieren, Supabase-Secret aktualisieren. Sofort.

**2. `scroll-behavior: smooth` kollidiert mit Lenis.** Wenn du eine Website mit Lenis hast und im CSS steht `html { scroll-behavior: smooth }`, zuckt das Scrollen. Raus damit.

**3. Stripe-Konto-Parameter als String „1"/"2" statt als Variable.** Claude macht das gern falsch, weil die API-Dokumentation unklar ist. Nur Nummern. Nicht `"account1"`.

**4. Supabase-URL und Anon-Key aus `import.meta.env` lesen.** Klingt richtig, bringt dich aber bei Deploys auf Netlify in Teufels Küche, wenn alte Environment-Variablen von früheren Projekten nachwirken. **Empfehlung:** fest im Code hinterlegen. Der Anon-Key ist per Definition öffentlich, das Committen ist sicher.

**5. Make.com-Webhook-Szenarien ohne `scheduling: immediately`.** Default ist anders, und dann hängt alles. Symptom: Warnmail-Flut von Make alle 15 Minuten. Fix: im Szenario-Blueprint scheduling auf `immediately` stellen.

**6. DE-Local-Twilio-Nummern ohne Address und Bundle SID.** Beim Kaufen einer deutschen Festnetznummer akzeptiert Twilio nur, wenn du ein Regulatory-Bundle hast. Wenn nicht: Error 21631. Einmalig Bundle beantragen (Validierung dauert Tage), dann läuft alles.

**7. Non-English ElevenLabs-Agent mit `eleven_multilingual_v2`.** Schlägt beim Start fehl mit „Non-english Agents must use turbo or flash v2_5". Fix: `model_id: "eleven_turbo_v2_5"` explizit setzen.

**8. `agent_id` falsch geschrieben beim ElevenLabs-Binding.** Die API akzeptiert das Feld unter dem Namen `agent_id`, nicht `inbound_agent_id`. Falscher Name wird silent akzeptiert — aber das Binding greift nicht. Symptom: der Agent nimmt keine Calls an.

**9. Google-Email `sendAnEmail` v4 mit `bodyType: rawHtml` schickt leere Mails.** Ohne Warnung. Fix: `bodyType: collection` + `contents: [{text: "..."}]`.

**10. Ohne Branchen-Adressbundle versucht, eine DE-Mobilnummer zu kaufen.** Geht nicht. DE-Mobile braucht eigenes Bundle, und das wird nur bei echten Business-Bedarfen approved. Wenn du SMS-Fähigkeit brauchst und DE-Mobile nicht geht: WhatsApp via WBM-Cloud-Send als Alternative (aufwändig, aber möglich).

## 43. Wenn der Agent halluziniert oder vergisst

Sprachmodelle machen Fehler. Typen:

- **Der Agent erfindet Fakten.** Lösung: mehr konkrete Fakten in `knowledge.md`. Je besser die Fakten dokumentiert sind, desto weniger halluziniert er.
- **Der Agent vergisst Regeln mitten im Gespräch.** Lösung: kritische Regeln **am Anfang des System-Prompts** als nummerierte ABSOLUTE REGELN. Am Ende des Prompts nochmal als „Critical Reminders" wiederholen.
- **Der Agent antwortet zu lang.** Lösung: in AGENT.md den Kommunikationsstil explizit begrenzen: „Antwortlänge: knapp, max. 3 Sätze, bei Bedarf ausführlicher auf Nachfrage."
- **Der Agent macht einen Tool-Call, der gar nicht in `tools.md` steht.** Claude probiert gern mal aus. Fix: in Cowork/Code die Tool-Liste streng konfigurieren, nichts erlauben, was du nicht explizit freigegeben hast.

## 44. Supabase-Fallen

- **Cold Start der Edge Function.** Erste Invocation nach langer Pause ist 1–2 s langsamer. Für Voice-Agents kritisch. Workaround: ein kleines Warm-Up-Skript, das alle 5 Minuten alle Functions pinged. Oder einfach akzeptieren.
- **Service Role Key versehentlich im Frontend.** Verheerend — jemand könnte alle deine Daten lesen und schreiben. Unbedingt nur in Edge Functions verwenden. Frontend bekommt Anon Key.
- **RLS nicht aktiviert.** Standardmäßig ist eine neue Table offen. **Immer** `alter table ... enable row level security;` — und explizit definieren, wer was darf. Ohne Policies heißt das: niemand kann lesen, du auch nicht (außer mit Service Role). Sicherheit by default.
- **Secret nicht verfügbar in der Function.** Wenn du ein Secret setzt und die Function bereits deployed war: redeploy. Secrets werden beim Function-Start geladen.

## 45. Make.com-Fallen

- **Silent schlechte Google-Connection.** Make hat interne Verbindungen; wenn eine davon abgelaufen ist, läuft das Szenario trotzdem los und failed spät. Lösung: nach dem Bau jede Connection explizit testen.
- **Blueprint-Feldnamen case-sensitive.** Bei Spracheinträgen oder API-Modulen achten auf exakte Groß-/Kleinschreibung.
- **Webhook-Response-Body als String, nicht als Object.** Je nach Modul erwartet Make einen JSON-String (`"{\"ok\": true}"`), andere ein JSON-Object. Dokumentation lesen, bei Fehler konvertieren.

## 46. ElevenLabs-Fallen

- **System-Prompt > 2.000 Token = hoher Latenz-Impact.** Alles, was über ~2.000 Token geht, erhöht die First-Token-Time signifikant. Wenn dein Prompt zu lang wird, verschieb Wissen in die Knowledge Base.
- **Shared Voice klingt broken.** Passiert. Vor dem Agent-Setup immer die Voice einzeln mit einem TTS-Testsatz in der Zielsprache prüfen. Wenn sie schlecht klingt: andere Voice.
- **`condition` im Transfer-Tool ist kein Gate.** Claude/GPT ignoriert es oft. Das einzige echte Gate ist ein **hardcoded Pre-Flight-Check in den Absolute Regeln des System-Prompts**.
- **Text-Normalisation Default schickt gesprochene Zahlen.** Setz `text_normalisation_type: "elevenlabs"` statt `"system_prompt"` — damit werden Tool-Parameter wieder als strukturierte Zahlen geschickt, nicht als „plus eins sechs null sieben".

---

# Abschluss

## 47. Was du jetzt hast

Wenn du diesen Guide von vorn bis hinten durchgearbeitet hast, besitzt du:

- **Einen sauberen Projekt-Ordner** auf deinem Rechner, strukturiert nach dem KI-Team-Muster
- **Einen GitHub-Repo**, der jeden Handgriff automatisch sichert
- **Einen Auto-Push-Hook**, der Cross-Device-Arbeit möglich macht
- **Ein Supabase-Projekt** mit Edge Functions und Secrets, die dein Agent als MCP-Server nutzt
- **Mindestens einen KI-Mitarbeiter** mit den vier Kerndateien, voll aktiviert
- **Einen Slash-Command**, mit dem du den Agenten per Wort aktivierst
- **Einen eigenen MCP-Server**, der einer echten API (Billingo, Wise, whatever) ein Claude-Interface gibt
- **Optional:** einen Voice-Agent an einer echten Telefon-Nummer
- **Optional:** ein Life Dashboard als visuelle Ebene über deinen Daten

Und das Wichtigste: du weißt, **warum** jede einzelne Komponente da ist. Du bist nicht abhängig von diesem Guide — du kannst alles, was hier beschrieben ist, selbst reproduzieren, erweitern, austauschen.

## 48. Wie es weitergeht

**Kurzfristig (nächste 2–4 Wochen):**
- Lass deinen ersten Agenten eine Woche laufen. Beobachte, was schiefgeht. Schreib knowledge.md und workflows.md nach, wo er vorbeizielte.
- Erweitere die Entscheidungsbefugnisse schrittweise. Erst nachdem er in zehn Iterationen zuverlässig war.
- Überleg dir den zweiten Agenten. Ein anderes Pattern — wenn Lisa Write-heavy ist, nimm als zweiten einen Read-heavy (Patricia).

**Mittelfristig (nächste 2–3 Monate):**
- Zweiten und dritten Agenten bauen.
- Wiki-Ordner aufbauen, damit sich Wissen nicht doppelt.
- Marcus oder einen anderen Engineer-Agent hinzufügen, der dir beim Bauen der anderen hilft.

**Langfristig (6–12 Monate):**
- Max als CEO-Orchestrator, wenn es zu viele Agenten werden.
- Voice-Agent, wenn du einen echten Bedarf hast (Reception, Sales-Qualification, Support).
- Experimentieren mit Inter-Agent-Kommunikation — state-of-the-art, entwickelt sich schnell.

**Fail fast.** Wenn ein Agent nach drei Wochen nicht nützt, dann nützt er nicht. Streich ihn. Es ist keine Schande. Ein Agent, der funktioniert, ist mehr wert als fünf, die halb fertig im Ordner liegen.

**Teilen.** Wenn du etwas gebaut hast, was gut funktioniert, schreib es auf. Stell ein Template in die Community. Deine `agents/xyz/`-Ordner sind portabel — du kannst sie buchstäblich als ZIP versenden, und jemand anderes hat den gleichen Agent.

**Frag.** Die KI-Schule-Community wächst. Wenn du irgendwo hängst, bring den Kontext mit (dein tools.md, der konkrete Fehler-Output, die Claude-Antwort), und wir finden eine Lösung. Solo-Aufbau ist möglich, aber gemeinsam ist es schneller und weniger frustrierend.

---

Viel Erfolg beim Bauen.

Ein Agent, der funktioniert, ist mehr wert als fünf, die halb fertig im Ordner liegen.

— Aleksa

*KI-Schule · Coaching & Community · aleksa.ai · Edition 2026 · v2*
