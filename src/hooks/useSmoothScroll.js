import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

/**
 * Initializes Lenis smooth scroll and syncs with GSAP ScrollTrigger.
 * Should be called once at the App level.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Create Lenis instance
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    // Sync with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // GSAP ticker loop
    const ticker = gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenisInstance.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenisInstance;
}

/**
 * Scroll to a target element or position
 * @param {string|number} target - CSS selector or pixel value
 */
export function scrollTo(target) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.2 });
  } else {
    // Fallback
    const el = typeof target === 'string' ? document.querySelector(target) : null;
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
