import { Helmet } from 'react-helmet-async'

export default function Datenschutz() {
  return (
    <>
      <Helmet>
        <title>Datenschutzerklärung — KI-Team-Guide</title>
        <meta name="robots" content="index,follow" />
      </Helmet>
      <article className="container-prose py-16 sm:py-20">
        <div className="eyebrow mb-4">DSGVO</div>
        <h1 className="text-h1 font-semibold text-ink heading-tight mb-10">Datenschutzerklärung</h1>

        <div className="space-y-8 text-[15px] leading-relaxed text-ink">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Verantwortlicher</h2>
            <p className="text-muted">
              Spalevic Consulting Kft., Locsei út 9/A, 1147 Budapest, Ungarn. Kontakt:{' '}
              <a href="mailto:info@aleksa.ai" className="text-accent underline underline-offset-4">
                info@aleksa.ai
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. Welche Daten wir erheben</h2>
            <p className="text-muted">
              Wenn du das Anmelde-Formular für den KI-Team-Guide ausfüllst, erheben wir: Vorname,
              Nachname, E-Mail-Adresse, optional Firma und Rolle. Zusätzlich speichern wir zum
              Nachweis der Einwilligung die IP-Adresse, den User-Agent deines Browsers und den
              Zeitstempel der Anmeldung.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Zweck & Rechtsgrundlage</h2>
            <p className="text-muted">
              Wir verarbeiten deine Daten auf Grundlage deiner Einwilligung nach Art. 6 Abs. 1 lit.
              a DSGVO, um dir den angeforderten Guide per E-Mail zuzustellen. Wenn du zusätzlich
              der Newsletter-Einwilligung zustimmst, verwenden wir deine E-Mail für
              Produkt-Updates zum Thema KI-Teams. Du kannst die Einwilligung jederzeit widerrufen,
              z.B. per E-Mail an info@aleksa.ai oder über den Abmelde-Link in jeder E-Mail.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Double-Opt-In</h2>
            <p className="text-muted">
              Nach dem Ausfüllen des Formulars schicken wir dir eine Bestätigungs-Mail mit einem
              Link. Erst nach Klick auf diesen Link senden wir dir den Guide — und erst dann wird
              deine Anmeldung als bestätigt gespeichert. Klickst du den Link nicht innerhalb von
              30 Tagen, löschen wir deinen Datensatz automatisch.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Auftragsverarbeiter</h2>
            <p className="text-muted">Für Speicherung und Versand setzen wir folgende Dienste ein:</p>
            <ul className="mt-3 list-disc pl-6 text-muted space-y-2">
              <li>
                <strong className="text-ink font-semibold">Supabase</strong> (Supabase Inc., USA) —
                Speicherung der Lead-Daten und Bereitstellung des PDF-Downloads. EU-Region, DPA
                vorhanden.
              </li>
              <li>
                <strong className="text-ink font-semibold">Resend</strong> (Resend Inc., USA) —
                Versand der Bestätigungs- und Guide-Mails. DPA vorhanden.
              </li>
              <li>
                <strong className="text-ink font-semibold">Netlify</strong> (Netlify Inc., USA) —
                Hosting der Webseite.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Speicherdauer</h2>
            <p className="text-muted">
              Bestätigte Anmeldungen speichern wir, solange du den Newsletter beziehen möchtest.
              Nach Widerruf/Abmeldung werden deine Daten innerhalb von 30 Tagen gelöscht — außer
              gesetzliche Aufbewahrungsfristen stehen entgegen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Deine Rechte</h2>
            <p className="text-muted">
              Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
              Einschränkung (Art. 18), Widerspruch (Art. 21) und Datenübertragbarkeit (Art. 20)
              nach DSGVO. Dich bei einer Aufsichtsbehörde zu beschweren ist jederzeit möglich. Zur
              Ausübung reicht eine formlose Mail an{' '}
              <a href="mailto:info@aleksa.ai" className="text-accent underline underline-offset-4">
                info@aleksa.ai
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. Cookies & Tracking</h2>
            <p className="text-muted">
              Diese Seite setzt keine Marketing-Cookies und verwendet kein Nutzer-Tracking. Ein
              einzelner technisch notwendiger Cookie kann für die Session-Verwaltung gesetzt werden.
            </p>
          </section>

          <p className="text-xs text-muted pt-4 border-t border-line">
            Stand: April 2026
          </p>
        </div>
      </article>
    </>
  )
}
