import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, Trophy, Clock, MapPin } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { staggerReveal } from '../../utils/gsapAnimations';

const BENEFITS = [
  {
    icon: TrendingUp,
    title: 'Increase Walk-ins',
    desc: 'Customers who tour your space virtually are 5× more likely to visit in person. Convert browsers into buyers.',
    stat: '5×',
    statLabel: 'More Walk-ins',
    accent: '#00E0FF',
  },
  {
    icon: Shield,
    title: 'Instant Trust',
    desc: 'First impressions happen online. A virtual tour signals professionalism before a single word is read.',
    stat: '2×',
    statLabel: 'Trust Score',
    accent: '#00D47E',
  },
  {
    icon: Zap,
    title: 'Sell Faster',
    desc: 'Properties with virtual tours sell 20% faster and for closer to asking price. Every time.',
    stat: '20%',
    statLabel: 'Faster Sales',
    accent: '#FFB800',
  },
  {
    icon: Trophy,
    title: 'Beat Competitors',
    desc: '99% of your rivals don\'t have this yet. Be the business customers remember.',
    stat: '99%',
    statLabel: 'Ahead of Rivals',
    accent: '#7C5CFF',
  },
  {
    icon: Clock,
    title: 'Always Open',
    desc: 'Your business tours 24/7 — on weekends, late nights, and holidays. No staff required.',
    stat: '24/7',
    statLabel: 'Always Live',
    accent: '#FF4D88',
  },
  {
    icon: MapPin,
    title: 'Google Map Boost',
    desc: '"See Inside" on your listing drives 30% more profile actions and higher local search ranking.',
    stat: '30%',
    statLabel: 'More Actions',
    accent: '#FF8C40',
  },
];

export default function WhyVirtualTours() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.benefit-card');
    if (cards.length) staggerReveal(cards, containerRef.current, { stagger: 0.09 });
  }, []);

  return (
    <section
      id="why-virtual-tours"
      className="py-32 bg-[#06070A] relative overflow-hidden"
      aria-labelledby="why-vt-heading"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,224,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,224,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,224,255,0.04) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="text-center mb-20">
          <SectionHeading
            id="why-vt-heading"
            label="The Advantage"
            title="Why Smart Businesses Choose 360° Virtual Tours"
            subtitle="The way customers discover businesses has changed. Virtual tours are no longer a luxury they're the standard."
            centered
          />
        </div>

        <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={i}
              className="benefit-card opacity-0 relative bg-[#11141B] rounded-2xl p-7 overflow-hidden cursor-default"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              whileHover={{
                borderColor: `${b.accent}38`,
                boxShadow: `0 0 50px ${b.accent}12, 0 20px 60px rgba(0,0,0,0.3)`,
                y: -5,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              {/* Corner accent glow */}
              <div
                className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${b.accent}10, transparent 70%)` }}
                aria-hidden="true"
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: `${b.accent}0E`,
                  border: `1px solid ${b.accent}22`,
                }}
              >
                <b.icon size={22} style={{ color: b.accent }} aria-hidden="true" />
              </div>

              {/* Stat callout */}
              <div className="flex items-baseline gap-2 mb-2">
                <span
                  className="font-grotesk font-black text-2xl leading-none"
                  style={{ color: b.accent, letterSpacing: '-0.02em' }}
                >
                  {b.stat}
                </span>
                <span className="text-[#9AA4B2] font-dm text-xs">{b.statLabel}</span>
              </div>

              <h3 className="font-grotesk font-bold text-white text-lg mb-3">{b.title}</h3>
              <p className="text-[#9AA4B2] font-dm text-sm leading-relaxed" style={{ maxWidth: 'none' }}>
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
