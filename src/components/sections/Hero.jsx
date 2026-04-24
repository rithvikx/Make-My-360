import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ParticleField = lazy(() => import('../three/ParticleField'));

const MotionLink = motion(Link);

const STATS = [
  { num: '500+', label: 'Businesses' },
  { num: '5',    label: 'City' },
  { num: '100%', label: 'Retention' },
];

const easeOut = [0.22, 1, 0.36, 1];

const fadeUp = (delay) => ({
  initial:    { opacity: 0, y: 22 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.75, delay, ease: easeOut },
});

/* ─── Shared floating card styles ─────────────────────── */
const glassCard = {
  background: 'rgba(10,13,20,0.80)',
  border: '1px solid rgba(255,255,255,0.13)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
};

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

      {/* ── Main content ─────────────────────────────────────── */}
      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: 'clamp(2rem, 4vw, 3.5rem)',
          paddingBottom: 'clamp(3rem, 5vw, 5rem)',
        }}
      >

        {/* ══ BADGE — all breakpoints, centered ══════════════════ */}
        <motion.div {...fadeUp(0.05)} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.42rem 1.1rem',
            borderRadius: 9999,
            border: '1px solid rgba(0,214,255,0.55)',
            color: '#00D6FF',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.75rem', fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '0.05em',
            background: 'rgba(0,214,255,0.06)',
          }}>
            <MapPin size={11} aria-hidden="true" />
            Hyderabad's #1 Virtual Tour Studio
          </span>
        </motion.div>

        {/* ══ HEADLINE — all breakpoints, centered ═══════════════ */}
        <motion.h1
          {...fadeUp(0.15)}
          aria-label="Dive Into the Future With 360° Virtual Tours"
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 7vw, 5.2rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: '#ffffff',
            textAlign: 'center',
            margin: '0 auto 0',
            maxWidth: '900px',
          }}
        >
          <span style={{ display: 'block' }}>Dive Into the Future</span>
          <span style={{ display: 'block', color: '#00D6FF' }}>With 360° Virtual Tours</span>
        </motion.h1>

        {/* ══ IMAGE BLOCK — image + floating cards ══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.28, ease: easeOut }}
          style={{
            position: 'relative',
            margin: '2rem auto 0',
            maxWidth: '900px',
            width: '100%',
          }}
        >

          {/* VR Image */}
          <img
            src="/hero-vr.png"
            alt="Person wearing a VR headset experiencing a 360° virtual tour"
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'block',
              width: '100%',
              height: 'clamp(360px, 54vw, 600px)',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.55))',
            }}
          />

          {/* Vignette overlay — sits above VR image (z:1), below floating cards (z:4) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none',
              background: [
                'radial-gradient(ellipse 100% 40% at 50% 100%, rgba(6,7,10,0.75) 0%, transparent 80%)',
                'radial-gradient(ellipse 30% 100% at 0% 50%, rgba(6,7,10,0.40) 0%, transparent 65%)',
                'radial-gradient(ellipse 30% 100% at 100% 50%, rgba(6,7,10,0.40) 0%, transparent 65%)',
              ].join(', '),
            }}
          />

          {/* Floating card: 500+ Tours Delivered — top right */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: easeOut }}
            style={{
              position: 'absolute',
              top: 'clamp(-8px, 2%, 14px)',
              right: 'clamp(-8px, 2%, 14px)',
              zIndex: 4,
              padding: 'clamp(0.55rem, 1.2vw, 0.85rem) clamp(0.75rem, 1.5vw, 1.1rem)',
              display: 'flex', alignItems: 'center', gap: '0.55rem',
              borderRadius: 'clamp(10px, 1.5vw, 16px)',
              ...glassCard,
            }}
          >
            {/* Purple dot accent */}
            <div style={{
              width: 'clamp(7px, 1vw, 10px)',
              height: 'clamp(7px, 1vw, 10px)',
              borderRadius: '50%',
              flexShrink: 0,
              background: '#9B59FF',
              boxShadow: '0 0 10px rgba(155,89,255,0.8)',
            }} />
            <div>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                color: '#fff',
                fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>
                500+
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                color: '#9AA4B2',
                fontSize: 'clamp(0.62rem, 1vw, 0.72rem)',
                marginTop: 3,
                whiteSpace: 'nowrap',
              }}>
                Tours Delivered
              </div>
            </div>
          </motion.div>

          {/* Floating pill: Google Street View — center left */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: easeOut }}
            style={{
              position: 'absolute',
              top: '50%',
              left: 'clamp(-8px, -2%, -12px)',
              transform: 'translateY(-50%)',
              zIndex: 4,
              padding: 'clamp(0.38rem, 0.8vw, 0.55rem) clamp(0.65rem, 1.2vw, 1rem)',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              whiteSpace: 'nowrap',
              borderRadius: 9999,
              ...glassCard,
            }}
          >
            <Sparkles size={13} style={{ color: '#FFB800', flexShrink: 0 }} aria-hidden="true" />
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              color: '#fff',
              fontSize: 'clamp(0.68rem, 1.1vw, 0.82rem)',
              fontWeight: 600,
            }}>
              Google Street View
            </span>
          </motion.div>

          {/* Floating card: 360° Tour Active — bottom right */}
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.4, ease: easeOut }}
            style={{
              position: 'absolute',
              bottom: 'clamp(10px, 3%, 24px)',
              right: 'clamp(-8px, 2%, 14px)',
              zIndex: 4,
              padding: 'clamp(0.65rem, 1.2vw, 0.9rem) clamp(0.75rem, 1.3vw, 1.1rem)',
              minWidth: 'clamp(150px, 26vw, 210px)',
              borderRadius: 'clamp(10px, 1.5vw, 16px)',
              ...glassCard,
            }}
            aria-label="Live tour status"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
              <span style={{
                display: 'block',
                width: 'clamp(7px, 1vw, 9px)',
                height: 'clamp(7px, 1vw, 9px)',
                borderRadius: '50%',
                flexShrink: 0,
                background: '#00D47E',
                animation: 'pulseGreenDot 1.5s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                color: '#fff',
                fontSize: 'clamp(0.65rem, 1.1vw, 0.78rem)',
                fontWeight: 600,
              }}>
                360° Tour Active
              </span>
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              color: '#9AA4B2',
              fontSize: 'clamp(0.6rem, 0.9vw, 0.7rem)',
              marginBottom: '0.5rem',
            }}>
              Room: Showroom Floor
            </div>
            <div
              style={{ width: '100%', height: 5, borderRadius: 9999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}
              role="progressbar" aria-valuenow={73} aria-valuemin={0} aria-valuemax={100} aria-label="73% explored"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '73%' }}
                transition={{ duration: 1.8, delay: 1.8, ease: 'easeInOut' }}
                style={{
                  height: '100%', borderRadius: 9999,
                  background: 'linear-gradient(90deg, #00D6FF, #00D47E)',
                }}
              />
            </div>
            <div style={{
              fontFamily: 'DM Sans, sans-serif',
              color: '#9AA4B2',
              fontSize: 'clamp(0.6rem, 0.9vw, 0.7rem)',
              marginTop: '0.35rem',
            }}>
              73% explored
            </div>
          </motion.div>

        </motion.div>
        {/* end image block */}

        {/* ══ DESKTOP layout: CTA left-bottom + Description bottom-left + Stats bottom-right ══ */}
        <div className="hidden lg:block">
          <motion.div
            {...fadeUp(0.5)}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '2rem',
              marginTop: '2.5rem',
            }}
          >
            {/* Left: description + CTA */}
            <div style={{ flex: '0 0 auto', maxWidth: '420px' }}>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1rem',
                fontWeight: 400,
                color: '#9AA4B2',
                lineHeight: 1.65,
                margin: '0 0 1.75rem 0',
                maxWidth: '420px',
              }}>
                Immersive 360° Virtual Tours, professional content creation &amp; digital
                growth services for modern Hyderabad businesses.
              </p>

              {/* CTA row */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <motion.a
                  href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get a Quote on WhatsApp"
                  whileHover={{ opacity: 0.88, y: -2 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.88rem 2.1rem',
                    borderRadius: '10px', minHeight: '48px',
                    background: '#00D6FF',
                    color: '#000000',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.95rem', fontWeight: 700,
                    textDecoration: 'none', cursor: 'pointer',
                    boxShadow: '0 0 24px rgba(0,214,255,0.25)',
                  }}
                >
                  <Play size={14} fill="currentColor" aria-hidden="true" />
                  Get a Quote
                </motion.a>

                <MotionLink
                  to="/portfolio"
                  aria-label="View our portfolio"
                  whileHover={{ borderColor: 'rgba(255,255,255,0.65)', y: -2 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.88rem 2.1rem',
                    borderRadius: '10px', minHeight: '48px',
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
              </div>
            </div>

            {/* Right: Stats */}
            <div style={{ flex: '0 0 auto' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}
                aria-label="Key statistics"
              >
                {STATS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    {i > 0 && (
                      <span aria-hidden="true" style={{
                        display: 'block', width: 1, height: 30,
                        background: 'rgba(255,255,255,0.12)',
                        margin: '0 1.6rem',
                      }} />
                    )}
                    <div>
                      <div style={{
                        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                        color: '#fff', fontSize: '1.5rem', lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums',
                      }}>
                        {s.num}
                      </div>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#9AA4B2', fontSize: '0.72rem', marginTop: 4 }}>
                        {s.label}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Google Verified */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span aria-hidden="true" style={{
                    display: 'block', width: 1, height: 30,
                    background: 'rgba(255,255,255,0.12)', margin: '0 1.6rem',
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle2 size={15} style={{ color: '#00D47E', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#00D47E', fontSize: '0.82rem', fontWeight: 500 }}>
                      Google Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ══ MOBILE / TABLET (below lg) ════════════════════════ */}
        <div className="lg:hidden">

          {/* CTA buttons — dark pill container */}
          <motion.div
            {...fadeUp(0.4)}
            style={{
              marginTop: '0',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
              background: 'rgba(8,10,16,0.88)',
              borderRadius: '0 0 16px 16px',
              padding: 'clamp(0.9rem, 2vw, 1.25rem) clamp(0.75rem, 2vw, 1.1rem)',
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.07)',
              borderTop: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get a Quote on WhatsApp"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.82rem clamp(1.4rem, 4vw, 2rem)',
                borderRadius: '10px', minHeight: '48px',
                background: '#00D6FF',
                color: '#000000',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(0.88rem, 2.5vw, 0.95rem)', fontWeight: 700,
                textDecoration: 'none', cursor: 'pointer',
                flex: '1 1 auto',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0,214,255,0.22)',
              }}
            >
              <Play size={14} fill="currentColor" aria-hidden="true" />
              Get a Quote
            </a>
            <Link
              to="/portfolio"
              aria-label="View our portfolio"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.82rem clamp(1.4rem, 4vw, 2rem)',
                borderRadius: '10px', minHeight: '48px',
                background: 'transparent',
                color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.35)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(0.88rem, 2.5vw, 0.95rem)', fontWeight: 600,
                textDecoration: 'none', cursor: 'pointer',
                flex: '1 1 auto',
                justifyContent: 'center',
              }}
            >
              See Our Work
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Description */}
          <motion.p
            {...fadeUp(0.5)}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              color: '#9AA4B2',
              lineHeight: 1.7,
              fontSize: 'clamp(0.88rem, 2.4vw, 1rem)',
              marginTop: '1.75rem',
              textAlign: 'center',
              maxWidth: '520px',
              margin: '1.75rem auto 0',
            }}
          >
            Immersive 360° Virtual Tours, professional content creation &amp; digital
            growth services for modern Hyderabad businesses.
          </motion.p>

          {/* Stats row */}
          <motion.div
            {...fadeUp(0.6)}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              rowGap: '0.75rem',
              columnGap: '0',
              marginTop: '1.75rem',
            }}
            aria-label="Key statistics"
          >
            {STATS.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && (
                  <span aria-hidden="true" style={{
                    display: 'block', width: 1, height: 26,
                    background: 'rgba(255,255,255,0.12)', margin: '0 1rem',
                  }} />
                )}
                <div style={{ minWidth: 52 }}>
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                    color: '#fff', fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)', lineHeight: 1,
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

            {/* Google Verified */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span aria-hidden="true" style={{
                display: 'block', width: 1, height: 26,
                background: 'rgba(255,255,255,0.12)', margin: '0 1rem',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={13} style={{ color: '#00D47E' }} aria-hidden="true" />
                <span style={{ fontFamily: 'DM Sans, sans-serif', color: '#00D47E', fontSize: '0.75rem', fontWeight: 500 }}>
                  Google Verified
                </span>
              </div>
            </div>
          </motion.div>

        </div>
        {/* end mobile/tablet */}

      </div>
      {/* end section-container */}

    </section>
  );
}
