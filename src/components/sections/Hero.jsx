import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ParticleField = lazy(() => import('../three/ParticleField'));

const MotionLink = motion(Link);

const STATS = [
  { num: '50+',  label: 'Businesses' },
  { num: '5',    label: 'City' },
  { num: '100%', label: 'Retention' },
];

const easeOut = [0.22, 1, 0.36, 1];

const fadeUp = (delay) => ({
  initial:    { opacity: 0, y: 22 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.75, delay, ease: easeOut },
});

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '80px',
        background: '#06070A',
        overflow: 'hidden',
      }}
    >

      {/* ── Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.018,
          backgroundImage: 'radial-gradient(rgba(0,224,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Particles */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.18 }}>
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ width: '100%', height: '100%' }}>
            <ParticleField count={900} spread={14} opacity={0.5} />
          </Canvas>
        </Suspense>
      </div>

      {/* ── Main content */}
      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: 'clamp(6rem, 10vw, 9rem)',
          paddingBottom: 'clamp(3rem, 5vw, 5rem)',
        }}
      >

        {/* ══ DESKTOP: two-column row ══════════════════════════════ */}
        <div
          className="hidden lg:flex"
          style={{ alignItems: 'center', gap: 'clamp(2rem, 4vw, 4rem)' }}
        >

          {/* ── LEFT COLUMN */}
          <div style={{ flex: '1.05' }}>

            {/* Badge */}
            <motion.div {...fadeUp(0.1)} style={{ marginBottom: '1.5rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.42rem 1rem',
                borderRadius: 9999,
                border: '1px solid #00D6FF',
                color: '#00D6FF',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.78rem', fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                <MapPin size={12} aria-hidden="true" />
                Hyderabad's #1 Virtual Tour Studio
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.22)}
              aria-label="Dive Into the Future With 360° Virtual Tours"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: 0, marginBottom: '1.5rem',
              }}
            >
              <span style={{ display: 'block' }}>Dive Into the</span>
              <span style={{ display: 'block' }}>
                Future{' '}
                <span style={{ color: '#00D6FF'}}>With</span>
                {' '}360°
              </span>
              <span style={{ display: 'block' }}>Virtual Tours</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              {...fadeUp(0.34)}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                fontWeight: 450,
                color: '#9AA4B2',
                lineHeight: 1.65,
                maxWidth: '440px',
                marginBottom: '2.4rem',
              }}
            >
              Immersive 360° Virtual Tours, professional content creation &amp; digital
              growth services for modern Hyderabad businesses.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.46)}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}
            >
              <motion.a
                href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get a Quote on WhatsApp"
                whileHover={{ opacity: 0.88, y: -1 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.85rem 2rem',
                  borderRadius: '10px',
                  minHeight: '44px',
                  background: '#00D6FF',
                  color: '#000000',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.95rem', fontWeight: 600,
                  textDecoration: 'none', cursor: 'pointer',
                }}
              >
                <Play size={14} fill="currentColor" aria-hidden="true" />
                Get a Quote
              </motion.a>

              <MotionLink
                to="/portfolio"
                aria-label="View our portfolio"
                whileHover={{ borderColor: 'rgba(255,255,255,0.65)', y: -1 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.85rem 2rem',
                  borderRadius: '10px',
                  minHeight: '44px',
                  background: 'transparent',
                  color: '#ffffff',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.95rem', fontWeight: 600,
                  textDecoration: 'none', cursor: 'pointer',
                }}
              >
                See Our Work
                <ArrowRight size={15} aria-hidden="true" />
              </MotionLink>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeUp(0.58)}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
              aria-label="Key statistics"
            >
              {STATS.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && (
                    <span aria-hidden="true" style={{
                      display: 'block', width: 1, height: 28,
                      background: 'rgba(255,255,255,0.12)',
                      margin: '0 1.8rem',
                    }} />
                  )}
                  <div>
                    <div style={{
                      fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                      color: '#fff', fontSize: '1.45rem', lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {s.num}
                    </div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#9AA4B2', fontSize: '0.72rem', marginTop: 3 }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}

              {/* Google Verified */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span aria-hidden="true" style={{
                  display: 'block', width: 1, height: 28,
                  background: 'rgba(255,255,255,0.12)',
                  margin: '0 1.8rem',
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={15} style={{ color: '#00D47E', flexShrink: 0 }} aria-hidden="true" />
                  <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#00D47E', fontSize: '0.82rem', fontWeight: 500 }}>
                    Google Verified
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex:-5}}>

            {/* VR Image */}
            <motion.img
              src="/hero-vr.png"
              alt="Person wearing a VR headset experiencing a 360° virtual tour"
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.08, ease: easeOut }}
              style={{
                position: 'relative', zIndex: -10,
                width: '150%', maxWidth: '1093px', height: '729px',
                objectFit: 'cover',
                filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.45))',
                display: 'block',
              }}
            />

            {/* Floating card: Tours Delivered (top-right) */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.8, ease: easeOut }}
              style={{
                position: 'absolute', top: '6%', right: 0, zIndex: 4,
                padding: '0.72rem 1.1rem',
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                borderRadius: 18,
                background: 'rgba(13,16,23,0.72)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 10px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: '#7C5CFF' }} />
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#fff', fontSize: '0.88rem', lineHeight: 1 }}>
                  50+
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#9AA4B2', fontSize: '0.68rem', marginTop: 3 }}>
                  Tours Delivered
                </div>
              </div>
            </motion.div>

            {/* Floating pill: Google Street View (center-left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 2.0, ease: easeOut }}
              style={{
                position: 'absolute', top: '52%', left: '-6%', zIndex: 4,
                padding: '0.5rem 1rem',
                display: 'flex', alignItems: 'center', gap: '0.45rem',
                whiteSpace: 'nowrap',
                borderRadius: 9999,
                background: 'rgba(13,16,23,0.72)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 10px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <Sparkles size={12} style={{ color: '#FFB800', flexShrink: 0 }} aria-hidden="true" />
              <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '0.75rem', fontWeight: 600 }}>
                Google Street View
              </span>
            </motion.div>

            {/* Floating card: 360° Tour Active (bottom-right) */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 2.2, ease: easeOut }}
              style={{
                position: 'absolute', bottom: '6%', right: 0, zIndex: 4,
                padding: '0.9rem 1.1rem', minWidth: 200,
                borderRadius: 18,
                background: 'rgba(13,16,23,0.72)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 10px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              aria-label="Live tour status"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
                <span style={{
                  display: 'block', width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: '#00D47E',
                  animation: 'pulseGlow 1.5s ease-in-out infinite',
                }} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '0.75rem', fontWeight: 600 }}>
                  360° Tour Active
                </span>
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#9AA4B2', fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                Room: Showroom Floor
              </div>
              <div
                style={{ width: '100%', height: 6, borderRadius: 9999, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}
                role="progressbar" aria-valuenow={73} aria-valuemin={0} aria-valuemax={100} aria-label="73% explored"
              >
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '73%' }}
                  transition={{ duration: 2, delay: 2.6, ease: 'easeInOut' }}
                  style={{
                    height: '100%', borderRadius: 9999,
                    background: 'linear-gradient(90deg, #00D6FF, #00D47E)',
                  }}
                />
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#9AA4B2', fontSize: '0.68rem', marginTop: '0.4rem' }}>
                73% explored
              </div>
            </motion.div>
          </div>
        </div>

        {/* ══ MOBILE / TABLET: stacked (up to lg) ═══════════════════ */}
        <div className="lg:hidden" style={{ paddingTop: '1rem' }}>

          {/* Badge */}
          <motion.div {...fadeUp(0.05)} style={{ marginBottom: '1.25rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.42rem 1rem', borderRadius: 9999,
              border: '1px solid #00D6FF', color: '#00D6FF',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.72rem', fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.04em',
            }}>
              <MapPin size={10} aria-hidden="true" />
              Hyderabad's #1 Virtual Tour Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            aria-label="Dive Into the Future With 360° Virtual Tours"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700, lineHeight: 1.08,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(2.4rem, 8vw, 3.6rem)',
              margin: 0, marginBottom: '1.25rem', color: '#ffffff',
            }}
          >
            <span style={{ display: 'block' }}>Dive Into the</span>
            <span style={{ display: 'block' }}>
              Future{' '}
              <span style={{ color: '#00D6FF', fontStyle: 'italic' }}>With</span>
              {' '}360°
            </span>
            <span style={{ display: 'block' }}>Virtual Tours</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeUp(0.18)}
            style={{
              fontFamily: 'DM Sans, sans-serif', color: '#9AA4B2',
              lineHeight: 1.65, fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
              marginBottom: '1.75rem',
              maxWidth: '520px',
            }}
          >
            Immersive 360° Virtual Tours, professional content creation &amp; digital
            growth services for modern Hyderabad businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.26)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}
          >
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get a Quote on WhatsApp"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.85rem 2rem',
                borderRadius: '10px', minHeight: '44px',
                background: '#00D6FF', color: '#000000',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.95rem', fontWeight: 600,
                textDecoration: 'none', cursor: 'pointer',
              }}
            >
              <Play size={15} fill="currentColor" aria-hidden="true" />
              Get a Quote
            </a>
            <Link
              to="/portfolio"
              aria-label="View our portfolio"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.85rem 2rem',
                borderRadius: '10px', minHeight: '44px',
                background: 'transparent', color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.35)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.95rem', fontWeight: 600,
                textDecoration: 'none', cursor: 'pointer',
              }}
            >
              See Our Work
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.34)}
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', rowGap: '0.7rem', columnGap: '0.1rem', marginBottom: '2.5rem' }}
            aria-label="Key statistics"
          >
            {STATS.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && (
                  <span aria-hidden="true" style={{
                    display: 'block', width: 1, height: 24,
                    background: 'rgba(255,255,255,0.12)', margin: '0 0.85rem',
                  }} />
                )}
                <div style={{ minWidth: 60 }}>
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                    color: '#fff', fontSize: 'clamp(1rem, 3vw, 1.25rem)', lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {s.num}
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#9AA4B2', fontSize: '0.68rem', marginTop: 3 }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span aria-hidden="true" style={{
                display: 'block', width: 1, height: 24,
                background: 'rgba(255,255,255,0.12)', margin: '0 0.85rem',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={13} style={{ color: '#00D47E' }} aria-hidden="true" />
                <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#00D47E', fontSize: '0.72rem', fontWeight: 500 }}>
                  Google Verified
                </span>
              </div>
            </div>
          </motion.div>

          {/* Image + floating cards */}
          <div style={{ position: 'relative', paddingTop: '2rem', paddingBottom: '4.5rem' }}>

            {/* Tours Delivered card — top right */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: easeOut }}
              style={{
                position: 'absolute', top: 0, right: 0, zIndex: 4,
                padding: '0.55rem 0.9rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                borderRadius: 14,
                background: 'rgba(13,16,23,0.78)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7C5CFF', flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#fff', fontSize: '0.82rem', lineHeight: 1 }}>
                  50+
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#9AA4B2', fontSize: '0.64rem', marginTop: 2 }}>
                  Tours Delivered
                </div>
              </div>
            </motion.div>

            {/* VR Image — full width */}
            <motion.img
              src="/hero-vr.png"
              alt="Person wearing a VR headset experiencing a 360° virtual tour"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.36, ease: easeOut }}
              style={{
                display: 'block',
                width: '100%',
                height: 'clamp(260px, 62vw, 500px)',
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.45))',
                borderRadius: '16px',
              }}
            />

            {/* Google Street View pill — bottom left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.52, ease: easeOut }}
              style={{
                position: 'absolute', bottom: '3rem', left: '2%', zIndex: 4,
                padding: '0.4rem 0.85rem',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                borderRadius: 9999,
                background: 'rgba(13,16,23,0.82)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <Sparkles size={11} style={{ color: '#FFB800', flexShrink: 0 }} aria-hidden="true" />
              <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '0.68rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                Google Street View
              </span>
            </motion.div>

            {/* Tour Active card — bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.58, ease: easeOut }}
              style={{
                position: 'absolute', bottom: 0, right: 0, zIndex: 4,
                padding: '0.75rem 0.9rem', minWidth: 'clamp(160px, 40vw, 210px)',
                borderRadius: 14,
                background: 'rgba(13,16,23,0.78)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 8px 22px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              aria-label="Live tour status"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                <span style={{
                  display: 'block', width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                  background: '#00D47E',
                  animation: 'pulseGlow 1.5s ease-in-out infinite',
                }} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '0.68rem', fontWeight: 600 }}>
                  360° Tour Active
                </span>
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#9AA4B2', fontSize: '0.63rem', marginBottom: '0.4rem' }}>
                Room: Showroom Floor
              </div>
              <div
                style={{ width: '100%', height: 5, borderRadius: 9999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}
                role="progressbar" aria-valuenow={73} aria-valuemin={0} aria-valuemax={100} aria-label="73% explored"
              >
                <div style={{ width: '73%', height: '100%', borderRadius: 9999, background: 'linear-gradient(90deg, #00D6FF, #00D47E)' }} />
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#9AA4B2', fontSize: '0.63rem', marginTop: '0.3rem' }}>
                73% explored
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      
    </section>
  );
}
