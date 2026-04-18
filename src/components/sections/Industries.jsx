import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Building2, Gem, Hotel, UtensilsCrossed, ShoppingBag,
  Bike, Dumbbell, GraduationCap, Cross, Monitor
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { staggerReveal } from '../../utils/gsapAnimations';
import { useCMS } from '../../context/CMSContext';

const ICON_MAP = {
  Building2, Gem, Hotel, UtensilsCrossed, ShoppingBag,
  Bike, Dumbbell, GraduationCap, Cross, Monitor,
};

/* Accent color per industry id for visual variety */
const ACCENT_MAP = {
  'real-estate':  { color: '#00E0FF', bg: 'rgba(0,224,255,0.07)',  border: 'rgba(0,224,255,0.18)' },
  'jewellery':    { color: '#FFB800', bg: 'rgba(255,184,0,0.07)',   border: 'rgba(255,184,0,0.18)' },
  'hotels':       { color: '#FF8C40', bg: 'rgba(255,140,64,0.07)',  border: 'rgba(255,140,64,0.18)' },
  'restaurants':  { color: '#FF4D4D', bg: 'rgba(255,77,77,0.07)',   border: 'rgba(255,77,77,0.18)' },
  'retail':       { color: '#00D47E', bg: 'rgba(0,212,126,0.07)',   border: 'rgba(0,212,126,0.18)' },
  'showrooms':    { color: '#7C5CFF', bg: 'rgba(124,92,255,0.07)',  border: 'rgba(124,92,255,0.18)' },
  'gyms':         { color: '#FFB800', bg: 'rgba(255,184,0,0.07)',   border: 'rgba(255,184,0,0.18)' },
  'schools':      { color: '#00E0FF', bg: 'rgba(0,224,255,0.07)',   border: 'rgba(0,224,255,0.18)' },
  'hospitals':    { color: '#00D47E', bg: 'rgba(0,212,126,0.07)',   border: 'rgba(0,212,126,0.18)' },
  'offices':      { color: '#9AA4B2', bg: 'rgba(154,164,178,0.07)', border: 'rgba(154,164,178,0.18)' },
};

export default function IndustriesSection() {
  const gridRef = useRef(null);
  const { industries } = useCMS();

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.industry-card');
    if (cards.length) staggerReveal(cards, gridRef.current, { stagger: 0.06, y: 28 });
  }, []);

  return (
    <section
      id="industries"
      className="py-32 bg-[#06070A] relative overflow-hidden"
      aria-labelledby="industries-heading"
    >
      {/* Subtle radial bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,224,255,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-container">
        <div className="text-center mb-16">
          <SectionHeading
            id="industries-heading"
            label="Industries We Serve"
            title="Every Business Deserves a Premium Digital Presence"
            subtitle="Whether you run a jewellery store in Secunderabad or a resort in Hitec City — we've got your space covered."
            centered
          />
        </div>

        <div
          ref={gridRef}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {industries.map((ind) => {
            const IconComponent = ICON_MAP[ind.icon];
            const accent = ACCENT_MAP[ind.id] ?? ACCENT_MAP['offices'];
            return (
              <motion.div
                key={ind.id}
                className="industry-card opacity-0 relative bg-[#11141B] rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden"
                style={{ border: `1px solid rgba(255,255,255,0.06)` }}
                whileHover={{
                  borderColor: accent.border,
                  boxShadow: `0 8px 40px ${accent.bg.replace('0.07', '0.15')}`,
                  y: -5,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                role="article"
                aria-label={`${ind.name} virtual tour services`}
              >
                {/* Corner gradient glow */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at top right, ${accent.color}12, transparent 70%)` }}
                  aria-hidden="true"
                />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ background: accent.bg, border: `1px solid ${accent.border}` }}
                >
                  {IconComponent && (
                    <IconComponent
                      size={22}
                      className="industry-icon"
                      style={{ color: accent.color }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <h3
                  className="font-grotesk font-bold text-white text-sm mb-1.5 leading-tight"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {ind.name}
                </h3>
                <p className="text-[#9AA4B2] font-dm text-xs leading-relaxed" style={{ maxWidth: 'none' }}>
                  {ind.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ background: `linear-gradient(to right, transparent, ${accent.color}, transparent)` }}
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom label */}
        <div className="flex justify-center mt-12">
          <p className="text-center text-[#9AA4B2] font-dm text-sm">
            Don't see your industry?{' '}
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20have%20a%20unique%20business%20and%20want%20to%20know%20if%20you%20cover%20it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00E0FF] hover:underline"
            >
              Talk to us — we cover everything →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
