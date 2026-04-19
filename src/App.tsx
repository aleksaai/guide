import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import Bestaetigt from './pages/Bestaetigt'
import Datenschutz from './pages/Datenschutz'
import Impressum from './pages/Impressum'
import NotFound from './pages/NotFound'
import { createLenis } from './lib/lenis'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Lenis owns the scroll once initialised — plain window.scrollTo is a no-op.
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
  return null
}

export default function App() {
  useEffect(() => {
    const lenis = createLenis()
    return () => {
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col pt-3 sm:pt-5">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bestaetigt" element={<Bestaetigt />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
