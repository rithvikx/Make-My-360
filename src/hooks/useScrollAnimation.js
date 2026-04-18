import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to create GSAP scroll-triggered animations.
 * Returns a ref to attach to the container element.
 * @param {Function} animationFn - Takes (elements, gsap) and sets up animation
 * @param {object} deps - Dependency array for re-run (optional)
 */
export function useScrollAnimation(animationFn, deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      animationFn(containerRef.current, gsap);
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

/**
 * Hook to reveal elements with fade-up animation on scroll.
 * Attach returned ref to the section container.
 * @param {string} selector - CSS selector for elements to animate
 * @param {object} options - GSAP defaults
 */
export function useRevealAnimation(selector = '.reveal-up', options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          y: options.y ?? 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: options.duration ?? 0.8,
          stagger: options.stagger ?? 0.1,
          ease: options.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.start ?? 'top 80%',
            once: true,
            ...options.scrollTrigger,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}
