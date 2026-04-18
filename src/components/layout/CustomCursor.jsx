import { useEffect, useRef } from 'react';

/**
 * CustomCursor — a cyan dot + ring follower cursor for desktop
 * Hidden on touch/mobile devices via CSS
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Check for touch/pointer coarse — don't run on mobile
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      // Ring follows with lerp for smooth lag
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      animId = requestAnimationFrame(animateRing);
    };

    // Expand ring on interactive elements
    const onEnter = () => ring.classList.add('expanded');
    const onLeave = () => ring.classList.remove('expanded');

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    document.addEventListener('mousemove', onMouseMove);
    animId = requestAnimationFrame(animateRing);

    // Show cursors once mouse moves
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    const showCursor = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      document.removeEventListener('mousemove', showCursor);
    };
    document.addEventListener('mousemove', showCursor);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', showCursor);
      cancelAnimationFrame(animId);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
