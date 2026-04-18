import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate a counter from 0 to a target value
 * @param {HTMLElement} el - Element containing the number
 * @param {number} target - Final number value
 * @param {object} options - Additional GSAP options
 */
export function animateCounter(el, target, options = {}) {
  if (!el) return;
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: target,
    duration: options.duration ?? 2,
    ease: options.ease ?? 'power2.out',
    onUpdate: () => {
      el.textContent = Math.round(obj.value) + (options.suffix ?? '');
    },
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
      ...options.scrollTrigger,
    },
  });
}

/**
 * Stagger fade-up reveal for a group of elements
 * @param {NodeList|HTMLElement[]} elements
 * @param {HTMLElement} trigger - ScrollTrigger trigger element
 * @param {object} options
 */
export function staggerReveal(elements, trigger, options = {}) {
  return gsap.fromTo(
    elements,
    { y: options.y ?? 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options.duration ?? 0.7,
      stagger: options.stagger ?? 0.1,
      ease: options.ease ?? 'power3.out',
      scrollTrigger: {
        trigger: trigger ?? elements[0],
        start: options.start ?? 'top 82%',
        once: true,
      },
    }
  );
}

/**
 * Draw a vertical SVG/div line from top to bottom on scroll
 * @param {HTMLElement} line
 * @param {HTMLElement} trigger
 */
export function drawLine(line, trigger) {
  return gsap.fromTo(
    line,
    { scaleY: 0, transformOrigin: 'top' },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
      },
    }
  );
}

/**
 * Parallax effect on an element relative to scroll speed
 * @param {HTMLElement} el
 * @param {number} speed - 0.1 = subtle, 0.5 = dramatic
 */
export function parallax(el, speed = 0.2) {
  return gsap.to(el, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Hero word-by-word text reveal
 * Wraps each word in overflow:hidden clip + animates inner span up from below.
 * Words are separated by a plain space so layout is preserved naturally.
 * @param {HTMLElement} el - The h1/heading element
 */
export function wordReveal(el) {
  if (!el) return;
  const text = el.textContent.trim();
  const words = text.split(/\s+/);

  // Each word: outer clip wrapper + inner animated span
  // Words are joined with a literal space so they wrap naturally
  el.innerHTML = words
    .map(
      (w) =>
        `<span style="overflow:hidden;display:inline-block;vertical-align:bottom"><span class="word" style="display:inline-block">${w}</span></span>`
    )
    .join(' ');

  const wordEls = el.querySelectorAll('.word');
  return gsap.fromTo(
    wordEls,
    { y: '110%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 0.75,
      stagger: 0.055,
      ease: 'power4.out',
      delay: 0.2,
    }
  );
}
