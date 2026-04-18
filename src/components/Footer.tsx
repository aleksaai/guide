import { Link } from 'react-router-dom'
import { site } from '../config/content'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-white/60 backdrop-blur-sm mt-16 sm:mt-24">
      <div className="container-site py-10 sm:py-12">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:gap-0 sm:text-left">
          <div className="text-xs text-muted leading-relaxed">
            © {year} {site.company.legalName} · {site.company.address}
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted">
            <Link to="/impressum" className="transition hover:text-ink">
              Impressum
            </Link>
            <Link to="/datenschutz" className="transition hover:text-ink">
              Datenschutz
            </Link>
            <a
              href={site.mainSite}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-ink"
            >
              ki-hochschule.de
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
