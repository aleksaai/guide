import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="eyebrow mb-4">404 · SEITE NICHT GEFUNDEN</div>
      <h1 className="text-h1 font-semibold text-ink mb-3">
        Dieser Link führt <em className="accent-word">ins Leere</em>.
      </h1>
      <p className="max-w-md text-muted mb-8">
        Vielleicht hat sich was bewegt. Geh zurück zur Start­seite und hol dir den Guide dort.
      </p>
      <Link to="/" className="btn-ink">
        Zur Startseite
      </Link>
    </div>
  )
}
