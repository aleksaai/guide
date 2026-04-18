// Single source of truth for all static copy on the site.
// Edit here — not in the components — to change text.

export const site = {
  name: 'KI-Schule',
  guideName: 'KI-Team-Guide',
  tagline: 'Bau dir dein eigenes KI-Team',
  url: 'https://guide.ki-hochschule.de',
  mainSite: 'https://ki-hochschule.de',
  founder: {
    name: 'Aleksa Spalevic',
    role: 'Gründer KI-Schule',
  },
  company: {
    legalName: 'Spalevic Consulting Kft.',
    address: '1147 Budapest, Locsei út 9/A',
    email: 'info@aleksa.ai',
  },
} as const

export const hero = {
  eyebrow: 'KI-SCHULE · FREIER GUIDE',
  headlinePre: 'Bau dir dein eigenes',
  headlineAccent: 'KI-Team',
  headlinePost: '.',
  subheadline:
    'Der Guide zeigt dir, wie ich mit Markdown-Dateien und Claude Code ein komplettes virtuelles Team aus Lisa, Patricia und Marcus gebaut habe. Plus wie du das selbst nachbaust — ohne Vorkenntnisse, aber mit echter Tiefe.',
  formTitle: 'Hol dir den Guide',
  formSubtitle:
    'Wir schicken ihn dir in die Inbox. Keine Spam-Serie, kein Verkaufs-Funnel — nur der Guide und gelegentliche Updates, wenn sich was Wichtiges tut.',
} as const

export const whatsInside = {
  eyebrow: 'WAS DU BEKOMMST',
  heading: 'Substanz statt Übersicht.',
  subheading:
    'Keine KI-Hype-Broschüre. Eine konkrete Anleitung, wie moderne KI-Teams wirklich funktionieren — mit den Mustern, die ich in meinem eigenen System einsetze.',
  items: [
    {
      n: '01',
      title: 'Was Markdown-Dateien wirklich sind',
      body:
        'MD-Files sind kein Notizblock. Sie sind die Persönlichkeit, das Wissen und die Anweisungen deiner KI-Mitarbeiter. Wir gehen durch, welche Dateien für welchen Zweck da sind.',
    },
    {
      n: '02',
      title: 'Die Anatomie eines KI-Agenten',
      body:
        'AGENT.md, workflows.md, knowledge.md, tools.md. Was in welche Datei gehört, warum diese Trennung existiert, und wie du deinen eigenen Agenten sauber strukturierst.',
    },
    {
      n: '03',
      title: 'Wie Tools angedockt werden',
      body:
        'Supabase Edge Functions, MCP-Server, Gmail, Drive, Stripe. Ein Agent ohne Tools ist ein Chat-Bot. Wir schauen uns an, wie echte Aktionen in Prod laufen.',
    },
    {
      n: '04',
      title: 'Vom ersten Prompt zum Team in 72h',
      body:
        'Ein realistischer Fahrplan: welche Entscheidungen in Woche 1 fallen müssen, welche Fehler du vermeidest, wo du aus eigener Erfahrung weißt was geht — und was nicht.',
    },
  ],
} as const

export const socialProof = {
  quote:
    'Ich hab dieses Team selbst gebaut und nutze es täglich für Buchhaltung, Termine, Code und Kundenprojekte. Der Guide ist meine komplette Anleitung — damit du das Gleiche nachbauen kannst, ohne drei Monate zu experimentieren.',
  name: 'Aleksa Spalevic',
  role: 'Gründer KI-Schule',
} as const

export const faq = {
  eyebrow: 'HÄUFIGE FRAGEN',
  heading: 'Kurz und ehrlich.',
  items: [
    {
      q: 'Brauche ich Programmiererfahrung?',
      a: 'Nein. Der Guide geht davon aus, dass du Claude schon mal benutzt hast — aber nicht, dass du Code geschrieben hast. Wenn du Ordner, Dateien und Browser-Tabs bedienen kannst, reicht das.',
    },
    {
      q: 'Was kostet das, was da drin beschrieben wird?',
      a: 'Im Kern: Claude Pro oder Claude Max (20 €–100 €/Monat), ein Supabase-Account (kostenlos bis zum realen Einsatz) und optional ein paar API-Credits. Unter 100 € im Monat, meistens unter 30 €.',
    },
    {
      q: 'Wie lange dauert der Aufbau?',
      a: 'Ein erster sinnvoller Agent: 2–4 Stunden. Ein kleines Team aus 3 Agenten, das produktiv genutzt werden kann: 1–2 Wochenenden. Plus danach iterieren.',
    },
    {
      q: 'Welche Tools brauche ich?',
      a: 'Claude Code (CLI), einen Ordner auf deinem Rechner, Git + GitHub, Supabase. Der Rest (Stripe, Gmail, Kalender) kommt nur rein, wenn dein Team das braucht.',
    },
    {
      q: 'Bekomme ich Updates zum Guide?',
      a: 'Ja. Wer die Bestätigungs-Mail klickt, landet in einem kurzen Newsletter-Verteiler — ausschließlich für substanzielle Updates zum Thema KI-Teams. Kein Marketing-Geballer. Abmelden jederzeit mit einem Klick.',
    },
  ],
} as const

export const roleOptions = [
  { value: 'founder', label: 'Founder / Unternehmer:in' },
  { value: 'consultant', label: 'Consultant / Freelancer' },
  { value: 'employed', label: 'Angestellt' },
  { value: 'selbststaendig', label: 'Selbständig' },
  { value: 'student', label: 'Student:in' },
  { value: 'other', label: 'Sonstiges' },
] as const
