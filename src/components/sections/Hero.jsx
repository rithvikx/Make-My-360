import { Suspense, lazy, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { wordReveal } from '../../utils/gsapAnimations';

const HeroGlobe = lazy(() => import('../three/HeroGlobe'));
const ParticleField = lazy(() => import('../three/ParticleField'));

const STATS = [
  { num: '50+', label: 'Businesses' },
  { num: '5', label: 'Cities' },
  { num: '100%', label: 'Retention' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

/* CSS-only 360° ring for mobile (no Three.js needed) */
function MobileRing360() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
      {/* Outer rotating ring */}
      <div
        className="absolute inset-0 rounded-full border border-dashed"
        style={{
          borderColor: 'rgba(0,224,255,0.25)',
          animation: 'ring360Rotate 14s linear infinite',
        }}
        aria-hidden="true"
      />
      {/* Middle ring */}
      <div
        className="absolute rounded-full border"
        style={{
          inset: 20,
          borderColor: 'rgba(0,224,255,0.15)',
          animation: 'ring360RotateRev 10s linear infinite',
          borderStyle: 'dashed',
        }}
        aria-hidden="true"
      />
      {/* Inner glow */}
      <div
        className="absolute rounded-full"
        style={{
          inset: 40,
          background: 'radial-gradient(ellipse at center, rgba(0,224,255,0.15) 0%, transparent 70%)',
          boxShadow: '0 0 40px rgba(0,224,255,0.2)',
        }}
        aria-hidden="true"
      />
      {/* Orbiting dot */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          width: 8,
          height: 8,
          marginTop: -4,
          marginLeft: -4,
          transformOrigin: '4px 4px',
          animation: 'dotOrbit 4s linear infinite',
        }}
        aria-hidden="true"
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: '#00E0FF', boxShadow: '0 0 10px #00E0FF' }}
        />
      </div>
      {/* Center label */}
      <div className="relative z-10 text-center">
        <div
          className="font-grotesk font-black text-3xl leading-none"
          style={{ color: '#00E0FF', textShadow: '0 0 30px rgba(0,224,255,0.5)' }}
        >
          360°
        </div>
        <div className="text-[#9AA4B2] font-dm text-[10px] tracking-widest uppercase mt-1">Virtual Tour</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const h1Ref = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      wordReveal(h1Ref.current);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ paddingTop: '80px' }}
      aria-label="Hero section"
    >
      {/* ── Layered background glows ───────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 70% 55% at 62% 50%, rgba(0,224,255,0.07) 0%, transparent 68%)',
            'radial-gradient(ellipse 40% 40% at 20% 80%, rgba(124,92,255,0.05) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* ── Grid dot pattern ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,224,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Particle background ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ width: '100%', height: '100%' }}>
            <ParticleField count={1200} spread={14} opacity={0.5} />
          </Canvas>
        </Suspense>
      </div>

      {/* ── Content grid ─────────────────────────────────────────────── */}
      <div className="section-container relative z-10 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 xl:gap-16 items-center min-h-[calc(100svh-80px)]">

          {/* ═══ LEFT COLUMN ════════════════════════════════════════════ */}
          <div className="flex flex-col justify-center">

            {/* Location badge */}
            <motion.div {...fadeUp(0.05)} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: 'rgba(0,224,255,0.06)',
                  border: '1px solid rgba(0,224,255,0.25)',
                  color: '#00E0FF',
                }}
              >
                <MapPin size={11} aria-hidden="true" />
                Hyderabad's #1 Virtual Tour Studio
              </span>
            </motion.div>

            {/* H1 — animated via wordReveal */}
            <h1
              ref={h1Ref}
              className="font-grotesk font-bold text-white mb-5 leading-[1.08]"
              style={{
                fontSize: 'clamp(2.1rem, 4.8vw, 4.4rem)',
                letterSpacing: '-0.035em',
                minHeight: '2em',
              }}
              aria-label="Let Customers Walk Into Your Business Before They Visit"
            >
              Let Customers Walk Into Your Business Before They Visit
            </h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.5)}
              className="font-dm text-[#9AA4B2] leading-relaxed mb-8"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', maxWidth: '44ch' }}
            >
              Immersive 360° Virtual Tours, professional content creation &amp; digital
              growth services for modern Hyderabad businesses.
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-3.5 mb-10">
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20demo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a free demo on WhatsApp"
                className="btn-primary"
              >
                <Play size={15} aria-hidden="true" />
                Book Free Demo
              </a>
              <Link
                to="/portfolio"
                aria-label="View our portfolio of virtual tours"
                className="btn-secondary"
              >
                See Our Work
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Micro stats row */}
            <motion.div
              {...fadeUp(0.8)}
              className="flex items-center gap-5 flex-wrap"
              aria-label="Key statistics"
            >
              {STATS.map((s, i) => (
                <div key={i} className="flex items-center gap-5">
                  {i > 0 && (
                    <span
                      className="w-px h-7 rounded-full block"
                      style={{ background: 'rgba(0,224,255,0.15)' }}
                      aria-hidden="true"
                    />
                  )}
                  <div>
                    <div
                      className="font-grotesk font-black text-white leading-none"
                      style={{ fontSize: '1.35rem', letterSpacing: '-0.02em' }}
                    >
                      {s.num}
                    </div>
                    <div className="font-dm text-[#9AA4B2] text-xs mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}

              {/* Google verified badge */}
              <div className="flex items-center gap-5">
                <span
                  className="w-px h-7 rounded-full block"
                  style={{ background: 'rgba(0,224,255,0.15)' }}
                  aria-hidden="true"
                />
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} style={{ color: '#00D47E' }} aria-hidden="true" />
                  <span className="font-dm text-xs text-white font-semibold">Google Verified</span>
                </div>
              </div>
            </motion.div>

            {/* Mobile 360° ring — only visible on small screens */}
            <motion.div
              {...fadeUp(0.95)}
              className="flex lg:hidden justify-center mt-14"
              aria-hidden="true"
            >
              <MobileRing360 />
            </motion.div>
          </div>

          {/* ═══ RIGHT COLUMN — 3D Globe (desktop only) ════════════════ */}
          <div className="relative hidden lg:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              style={{ width: '100%', maxWidth: 560, aspectRatio: '1/1' }}
            >
              <Suspense
                fallback={
                  <div className="flex items-center justify-center w-full h-full">
                    <div
                      className="w-40 h-40 rounded-full border-2 border-[rgba(0,224,255,0.25)] animate-pulse"
                      style={{ boxShadow: '0 0 60px rgba(0,224,255,0.15)' }}
                    />
                  </div>
                }
              >
                <Canvas
                  camera={{ position: [0, 0, 4.5], fov: 50 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <HeroGlobe />
                </Canvas>
              </Suspense>

              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,224,255,0.09) 0%, transparent 70%)',
                  zIndex: -1,
                }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Floating card: Tour Active */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-[10%] left-[2%] glass-card p-4"
              style={{ minWidth: 196 }}
              aria-label="Live tour status panel"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  className="w-2 h-2 rounded-full bg-[#00D47E] flex-shrink-0"
                  style={{ boxShadow: '0 0 8px #00D47E', animation: 'pulseGlow 1.5s ease-in-out infinite' }}
                  aria-hidden="true"
                />
                <span className="text-white font-dm text-xs font-semibold">360° Tour Active</span>
              </div>
              <div className="text-[#9AA4B2] font-dm text-xs mb-2">Room: Showroom Floor</div>
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.07)' }}
                role="progressbar"
                aria-valuenow={73}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="73% of tour explored"
              >
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '73%' }}
                  transition={{ duration: 2, delay: 2, ease: 'easeInOut' }}
                  className="h-full rounded-full"
                  style={{ background: '#00E0FF', boxShadow: '0 0 8px rgba(0,224,255,0.5)' }}
                />
              </div>
              <div className="text-[#9AA4B2] font-dm text-xs mt-1.5">73% explored</div>
            </motion.div>

            {/* Floating stat: Projects */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[12%] right-[2%] glass-card px-4 py-2.5 flex items-center gap-2.5"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: '#7C5CFF', boxShadow: '0 0 8px #7C5CFF' }}
                aria-hidden="true"
              />
              <div>
                <div className="font-grotesk font-bold text-white text-sm leading-none">50+</div>
                <div className="font-dm text-[#9AA4B2] text-xs mt-0.5">Tours Delivered</div>
              </div>
            </motion.div>

            {/* New: Sparkles badge top-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[28%] left-[-2%] glass-card px-3.5 py-2 flex items-center gap-2"
            >
              <Sparkles size={13} style={{ color: '#FFB800' }} aria-hidden="true" />
              <span className="font-dm text-white text-xs font-semibold">Google Street View</span>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[#9AA4B2] text-[10px] font-dm tracking-[0.25em] uppercase">Scroll</span>
        <div
          className="w-px h-10 rounded-full"
          style={{ background: 'linear-gradient(to bottom, rgba(0,224,255,0.5), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
