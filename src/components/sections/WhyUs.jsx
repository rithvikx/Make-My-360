import AnimatedCounter from '../ui/AnimatedCounter';
import SectionHeading from '../ui/SectionHeading';
import { motion } from 'framer-motion';
import { Zap, Star, MapPin, DollarSign, HeadphonesIcon, Film } from 'lucide-react';

const CARDS = [
  {
    icon: Zap,
    title: 'Live in 5 Days',
    desc: 'We shoot, process, and publish your virtual tour within 5 business days. Need it faster? Rush slots are available.',
    size: 'normal',
    accent: '#00E0FF',
  },
  {
    icon: Star,
    title: 'Pro-Grade 360° Cameras',
    desc: 'We use Ricoh Theta Z1 & Insta360 Pro 2 cameras — the same equipment used by Google Street View certified photographers.',
    size: 'normal',
    accent: '#FFB800',
  },
  {
    icon: MapPin,
    title: 'Hyderabad-Only Focus',
    desc: 'We operate only in Hyderabad. That means faster shoots, local support, and deep knowledge of what customers here expect.',
    size: 'normal',
    accent: '#00E0FF',
  },
  {
    icon: DollarSign,
    title: 'Starts at ₹8,999',
    desc: 'No hidden costs. One flat price per package covers the shoot, editing, hosting, and embedding on your Google listing.',
    size: 'normal',
    accent: '#00D47E',
  },
  {
    icon: HeadphonesIcon,
    title: 'We Don\'t Disappear After Delivery',
    desc: 'Unlimited minor revisions in the first 30 days. Tour hosting included for 1 year. We pick up when you call.',
    size: 'normal',
    accent: '#7C5CFF',
  },
  {
    icon: Film,
    title: 'Free Reels From Every Shoot',
    desc: 'Every package includes 2 short-form video clips (9:16) cut from your shoot — ready to post on Instagram and WhatsApp.',
    size: 'normal',
    accent: '#FF4D88',
  },
];

const STATS = [
  { target: 500, suffix: '+', label: 'Tours Delivered', accent: '#00E0FF' },
  { target: 5, suffix: '★', label: 'Google Rating', accent: '#FFB800' },
  { target: 6, suffix: ' yrs', label: 'In Business', accent: '#00D47E' },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-32 bg-[#0E1117] relative overflow-hidden"
      aria-labelledby="whyus-heading"
    >
      {/* Subtle bg grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,224,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,224,255,0.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: heading + stats */}
          <div className="lg:w-[36%] flex-shrink-0 lg:sticky lg:top-32">
            <SectionHeading
              label="Why Make My 360"
              title="Not Just Photos. A Tour That Sells."
              subtitle="We're a dedicated 360° studio — not a photography side hustle. Every project gets a dedicated team, real cameras, and results you can measure."
            />

            {/* Stat counters */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="text-center p-5 rounded-2xl relative overflow-hidden"
                  style={{
                    background: '#11141B',
                    border: `1px solid ${s.accent}18`,
                  }}
                >
                  {/* Inner glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at bottom, ${s.accent}08, transparent 70%)` }}
                    aria-hidden="true"
                  />
                  <AnimatedCounter
                    target={s.target}
                    suffix={s.suffix}
                    className="block text-2xl font-black relative z-10"
                    style={{ color: s.accent }}
                  />
                  <span className="text-[#9AA4B2] font-dm text-xs mt-1.5 block relative z-10">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Trust note */}
            <div
              className="mt-6 p-4 rounded-xl flex items-start gap-3"
              style={{ background: 'rgba(0,224,255,0.04)', border: '1px solid rgba(0,224,255,0.1)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D47E] mt-1.5 flex-shrink-0" style={{ boxShadow: '0 0 6px #00D47E' }} />
              <p className="text-[#9AA4B2] font-dm text-xs leading-relaxed" style={{ maxWidth: 'none' }}>
                50+ businesses across Hyderabad have trusted us — <strong className="text-white font-semibold">zero refunds, zero complaints</strong>. Just tours that work.
              </p>
            </div>
          </div>

          {/* Right: Bento grid */}
          <div className="flex-1 bento-grid">
            {CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  className={`relative bg-[#11141B] rounded-2xl p-6 overflow-hidden ${
                    card.size === 'wide' ? 'bento-card-wide' : ''
                  }`}
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  whileHover={{
                    borderColor: `${card.accent}40`,
                    boxShadow: `0 0 40px ${card.accent}14`,
                    y: -4,
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  {/* Corner gradient */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${card.accent}0C, transparent 70%)` }}
                    aria-hidden="true"
                  />

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 relative z-10"
                    style={{
                      background: `${card.accent}10`,
                      border: `1px solid ${card.accent}22`,
                    }}
                  >
                    <Icon size={18} style={{ color: card.accent }} aria-hidden="true" />
                  </div>
                  <h3 className="font-grotesk font-bold text-white text-base mb-2 relative z-10">
                    {card.title}
                  </h3>
                  <p className="text-[#9AA4B2] font-dm text-sm leading-relaxed relative z-10" style={{ maxWidth: 'none' }}>
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
