import Lenis from '@studio-freight/lenis'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/**
 * Creates a global Lenis smooth-scroll instance matching the main KI-Schule
 * website's feel (duration 1.2, expo-out easing, wheel-only). Touch scrolling
 * falls through to native for correct mobile behaviour.
 *
 * Also attaches to window.__lenis so SPA route changes (see ScrollToTop)
 * can call lenis.scrollTo(0, { immediate: true }) — plain window.scrollTo
 * doesn't work once Lenis owns the scroll.
 */
export function createLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 0,
  })

  window.__lenis = lenis

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}
