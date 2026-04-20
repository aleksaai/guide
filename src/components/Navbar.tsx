import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <header className="sticky top-3 z-50 w-full px-3 sm:top-5 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="glass-navbar grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5">
          {/* left spacer (keeps logo optically centered) */}
          <div aria-hidden />

          {/* centered logo */}
          <Link
            to="/"
            className="justify-self-center shrink-0"
            aria-label="KI-Schule — KI-Team-Guide"
          >
            <img
              src="/ki-schule-logo.png"
              alt="KI-Schule"
              className="h-5 w-auto sm:h-7"
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* right: ghost sub + primary main */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <a
              href="https://ki-hochschule.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-ghost hidden sm:inline-flex px-3.5 py-1.5 text-[12px] sm:text-[13px]"
            >
              Zur KI-Schule
            </a>
            <a
              href="https://app.ki-hochschule.de/home"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-primary px-4 py-1.5 text-[12px] sm:px-5 sm:py-2 sm:text-[13px]"
            >
              Log In
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
