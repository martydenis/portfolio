import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger  } from 'gsap/ScrollTrigger'

/**
 * Initialize smooth scroll behaviour with Lenis.
 */
export const initSmoothScroll = () => {
  const lenis = new Lenis({
    lerp: 0.05,
    duration: 1.5,
    smoothTouch: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })
}