import Lenis from '@studio-freight/lenis'
import { initAppearances } from './animate.js'
import "@scss/sandbox.scss"

/**
 * Initialize smooth scroll behaviour with Lenis.
 */
const lenis = new Lenis({
  lerp: 0.05,
  duration: 1.5,
  smoothTouch: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


window.addEventListener('load', function() {
  initAppearances();
});