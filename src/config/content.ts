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
    photoUrl: '/aleksa-hero.png',
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
    'Ich hab mein komplettes Backoffice — Buchhaltung, Assistenz, Engineering — als virtuelles KI-Team gebaut. Der Guide zeigt dir Schritt für Schritt, wie du das für dich selbst nachbaust.',
  trustPills: [
    '12.000+ Wörter',
    'Praxis, keine Theorie',
    'Live im Einsatz seit 2026',
  ],
  byline: {
    prefix: '—',
    name: 'Aleksa Spalevic',
    role: 'Gründer KI-Schule',
  },
  cta: 'Guide jetzt holen',
} as const

export const stats = {
  items: [
    { value: '80+', label: 'Seiten' },
    { value: '12.400', label: 'Wörter' },
    { value: '40+', label: 'Screenshots' },
    { value: '4', label: 'fertige Agent-Templates' },
  ],
} as const

export const formBlock = {
  eyebrow: 'IN UNTER 60 SEKUNDEN',
  heading: 'Trag dich ein. Bekomm den Guide.',
  subheading:
    'Wir schicken dir den Guide per Mail zu. Kein Verkaufs-Funnel, keine Massen-Mails — nur das Dokument und gelegentliche Updates, wenn sich wirklich was tut.',
} as const

export const myTeam = {
  eyebrow: 'DAS IST MEIN ECHTES TEAM',
  heading: 'Sieben Agenten. Ein System.',
  subheading:
    'Jeder Agent hat eine klare Rolle, eigene Tools und eigenes Wissen. Sie arbeiten autonom an echten Business-Aufgaben — nicht an Chat-Experimenten. Genau dieses System lernst du im Guide zu bauen.',
  overviewImage: '/team-overview.png',
  overviewCaption: 'Mein 3D-Office — Lisa, Patricia, Marcus, Max, Liam, Emilija.',
  agents: [
    {
      image: '/lisa-working.png',
      name: 'Lisa',
      role: 'Accounting & Finance',
      body:
        'Zieht Stripe-Zahlungen, erstellt Billingo-Rechnungen, lädt Belege in Drive. Kommuniziert direkt mit der Steuerberaterin.',
    },
    {
      image: '/marcus-working.png',
      name: 'Marcus',
      role: 'AI Engineer & Project Manager',
      body:
        'Schreibt Specs, baut Websites und Voice Agents, trackt Projekte, redigiert Code. Der Agent, der diesen Guide mit-gebaut hat.',
    },
    {
      image: '/team-meeting.png',
      name: 'Und drei mehr',
      role: 'Patricia, Max, Emilija, Liam',
      body:
        'Personal Assistant, CEO-Orchestrator, Content-Strategie, Sales. Jeder mit eigenem System-Prompt und eigenen Tools.',
    },
  ],
} as const

export const chatPreview = {
  eyebrow: 'SO FÜHLT SICH DAS AN',
  heading: 'Alltagsgespräch. Kein Prompt-Engineering.',
  subheading:
    'Du klickst den Agenten an, den du brauchst, und sagst was zu tun ist. Er führt die Aktion mit echten Tools aus und meldet zurück. So einfach. Und so ernst wie eine Chat-Nachricht an einen Kollegen.',
  image: '/chat-interface.png',
  imageCaption: 'Echtes Interface aus meinem AI-Office.',
} as const

export const whatsInside = {
  eyebrow: 'WAS IM GUIDE STEHT',
  heading: 'Substanz statt Übersicht.',
  subheading:
    'Keine KI-Hype-Broschüre. Eine konkrete Anleitung, wie moderne KI-Teams wirklich funktionieren — mit den Mustern, die ich in meinem eigenen System einsetze.',
  items: [
    {
      n: '01',
      title: 'Was Markdown-Dateien wirklich sind',
      body:
        'MD-Files sind kein Notizblock. Sie sind die Persönlichkeit, das Wissen und die Anweisungen deiner KI-Mitarbeiter. Welche Datei für welchen Zweck.',
    },
    {
      n: '02',
      title: 'Die Anatomie eines KI-Agenten',
      body:
        'AGENT.md, workflows.md, knowledge.md, tools.md. Was in welche Datei gehört, warum die Trennung wichtig ist, und wie du deinen eigenen Agenten sauber strukturierst.',
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
        'Ein realistischer Fahrplan: welche Entscheidungen in Woche 1 fallen, welche Fehler du vermeidest, was du aus meiner Erfahrung direkt übernehmen kannst.',
    },
  ],
} as const

export const socialProof = {
  eyebrow: 'WARUM DIESER GUIDE',
  quote:
    'Ich hab dieses Team für mich selbst gebaut, bevor ich angefangen hab, es jemandem beizubringen. Jeder Screenshot, jedes Code-Snippet, jeder Workflow in diesem Guide ist aus meinem echten Arbeitsalltag.',
  name: 'Aleksa Spalevic',
  role: 'Gründer KI-Schule · Spalevic Consulting',
  photoUrl: '/aleksa-hero.png',
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
