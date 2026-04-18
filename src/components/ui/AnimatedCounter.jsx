import { useEffect, useRef } from 'react';
import { animateCounter } from '../../utils/gsapAnimations';

/**
 * AnimatedCounter — GSAP-powered counter animation on scroll into view
 */
export default function AnimatedCounter({ target, suffix = '', className = '', style }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    animateCounter(ref.current, target, { suffix });
  }, [target, suffix]);

  return (
    <span ref={ref} className={`stat-num ${className}`} style={style}>
      0{suffix}
    </span>
  );
}
