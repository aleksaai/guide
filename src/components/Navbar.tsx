import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../config/content'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line/60 bg-white/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="container-site flex h-16 items-center justify-between sm:h-20">
        <Link
          to="/"
          className="flex items-baseline gap-2 text-ink font-semibold text-[17px] tracking-tight"
          aria-label={`${site.name} · ${site.guideName}`}
        >
          <span>KI-Schule</span>
          <span className="text-muted font-normal hidden sm:inline">·</span>
          <span className="text-muted font-normal hidden sm:inline">Guide</span>
        </Link>

        <a
          href={site.mainSite}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink"
        >
          <span>Zur KI-Schule</span>
          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  )
}
