import { Helmet } from 'react-helmet-async'

export default function Impressum() {
  return (
    <>
      <Helmet>
        <title>Impressum — KI-Team-Guide</title>
        <meta name="robots" content="index,follow" />
      </Helmet>
      <article className="container-prose py-16 sm:py-20">
        <div className="eyebrow mb-4">RECHTLICHES</div>
        <h1 className="text-h1 font-semibold text-ink heading-tight mb-10">Impressum</h1>

        <div className="prose-custom space-y-8 text-[15px] leading-relaxed text-ink">
          <section>
            <h2 className="text-lg font-semibold mb-3">Anbieter</h2>
            <p className="text-muted">
              Spalevic Consulting Kft.
              <br />
              Locsei út 9/A
              <br />
              1147 Budapest
              <br />
              Ungarn
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Kontakt</h2>
            <p className="text-muted">
              E-Mail:{' '}
              <a href="mailto:info@aleksa.ai" className="text-accent underline underline-offset-4">
                info@aleksa.ai
              </a>
              <br />
              Web: ki-hochschule.de
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Vertretungsberechtigter</h2>
            <p className="text-muted">Aleksa Spalevic, Geschäftsführer</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Handelsregister</h2>
            <p className="text-muted">
              Registergericht: Fővárosi Törvényszék Cégbírósága (Budapest)
              <br />
              Handelsregisternummer: 01-09-XXXXXXX
              <br />
              Steuernummer (HU): HU XXXXXXXX
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p className="text-muted">Aleksa Spalevic (Anschrift wie oben)</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Streitbeilegung</h2>
            <p className="text-muted">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              . Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </article>
    </>
  )
}
