import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Camera, Video, Globe, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import { staggerReveal } from '../../utils/gsapAnimations';
import { useCMS } from '../../context/CMSContext';

/* ── Additional micro-services row beneath main cards ──────────── */
const MICRO_SERVICES = [
  { icon: Camera, label: 'Product Photography', accent: '#00E0FF' },
  { icon: Video, label: 'Drone Videography', accent: '#FFB800' },
  { icon: Globe, label: 'Google Street View', accent: '#00D47E' },
  { icon: BarChart3, label: 'Analytics & Reports', accent: '#FFB800' },
];

/* ── Feature list item ─────────────────────────────────────────── */
function FeatureItem({ text, accent = '#00E0FF' }) {
  return (
    <li className="flex items-start gap-3 py-2.5 border-b border-[rgba(255,255,255,0.04)] last:border-0">
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
      >
        <Check size={10} style={{ color: accent }} aria-hidden="true" />
      </div>
      <span className="text-[#9AA4B2] font-dm text-sm leading-relaxed">{text}</span>
    </li>
  );
}

/* ── Single service card ────────────────────────────────────────── */
function ServiceCard({ service, isPrimary }) {
  const accent = isPrimary ? '#00E0FF' : '#7C5CFF';
  const glowColor = isPrimary ? 'rgba(0,224,255,0.08)' : 'rgba(124,92,255,0.08)';
  const borderBase = isPrimary ? 'rgba(0,224,255,0.12)' : 'rgba(124,92,255,0.12)';
  const borderHover = isPrimary ? 'rgba(0,224,255,0.32)' : 'rgba(124,92,255,0.32)';

  return (
    <motion.div
      className="service-card flex flex-col rounded-2xl overflow-hidden relative"
      style={{ background: '#11141B', border: `1px solid ${borderBase}` }}
      whileHover={{ borderColor: borderHover, boxShadow: `0 0 48px ${glowColor}` }}
      transition={{ duration: 0.3 }}
    >
      {/* Top accent stripe */}
      <div
        className="h-0.5 w-full flex-shrink-0"
        style={{ background: `linear-gradient(to right, ${accent}, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Background corner glow */}
      <div
        className="absolute top-0 right-0 w-60 h-60 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${accent}0C, transparent 68%)` }}
        aria-hidden="true"
      />

      <div className="p-7 lg:p-9 flex flex-col flex-1">
        {/* Icon + badge row */}
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${accent}12`, border: `1px solid ${accent}28` }}
          >
            {isPrimary ? (
              /* Rotating 360° text badge for primary */
              <span
                className="font-grotesk font-bold text-xs"
                style={{ color: accent, letterSpacing: '-0.02em' }}
              >
                360°
              </span>
            ) : (
              /* Video icon for secondary */
              <Video size={18} style={{ color: accent }} aria-hidden="true" />
            )}
          </div>

          {/* "Most Popular" pill on primary card */}
          {isPrimary && (
            <span
              className="text-[10px] font-dm font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}28` }}
            >
              Most Popular
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-grotesk font-bold text-white mb-3"
          style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)' }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[#9AA4B2] font-dm text-sm leading-relaxed mb-7" style={{ maxWidth: '42ch' }}>
          {service.description}
        </p>

        {/* Feature list */}
        <ul className="mb-8 flex-1" aria-label={`Features of ${service.title}`}>
          {(service.features || []).map((f) => (
            <FeatureItem key={f} text={f} accent={accent} />
          ))}
        </ul>

      </div>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────────────── */
export default function ServicesSection() {
  const sectionRef = useRef(null);
  const { services } = useCMS();

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.service-card');
    if (cards.length) {
      staggerReveal(cards, sectionRef.current, { stagger: 0.14, y: 36 });
    }
    const tiles = sectionRef.current.querySelectorAll('.micro-tile');
    if (tiles.length) {
      staggerReveal(tiles, sectionRef.current, { stagger: 0.07, y: 20, start: 'top 75%' });
    }
  }, [services]);

  return (
    <section
      id="services"
      className="py-28 lg:py-36 bg-[#0E1117] relative overflow-hidden"
      aria-labelledby="services-heading"
      ref={sectionRef}
    >
      {/* Top hairline gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,224,255,0.25), transparent)' }}
        aria-hidden="true"
      />

      {/* Background grid dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,224,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="section-container">

        {/* ── Heading ─────────────────────────────────────────── */}
        <div className="mb-14">
          <SectionHeading
            label="What We Do"
            title={<>Two Powerful Services,<br />One Studio</>}
            subtitle="From immersive virtual tours to scroll-stopping social content we handle your entire digital presence."
            id="services-heading"
          />
        </div>

        {/* ── Main service cards: equal 1:1 grid ──────────────── */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mb-10">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id ?? i}
              service={service}
              isPrimary={i === 0}
              index={i}
            />
          ))}
        </div>

        {/* ── Micro-services strip ─────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {MICRO_SERVICES.map((ms) => {
            const Icon = ms.icon;
            return (
              <div
                key={ms.label}
                className="micro-tile flex items-center gap-3 px-4 py-3.5 rounded-xl"
                style={{
                  background: '#0E1117',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${ms.accent}12` }}
                >
                  <Icon size={14} style={{ color: ms.accent }} aria-hidden="true" />
                </div>
                <span className="text-[#9AA4B2] font-dm text-xs font-medium leading-tight">
                  {ms.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
