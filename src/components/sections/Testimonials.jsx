import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { testimonials } from '../../data/testimonials';

function StarRow() {
  return (
    <div className="flex items-center gap-0.5 mb-5" aria-label="5 star rating">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={13} className="fill-[#FFB800] text-[#FFB800]" aria-hidden="true" />
      ))}
    </div>
  );
}

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #00E0FF, #0070CC)',
  'linear-gradient(135deg, #7C5CFF, #C44DFF)',
  'linear-gradient(135deg, #FF4D88, #FF8C40)',
  'linear-gradient(135deg, #00D47E, #00A8CC)',
  'linear-gradient(135deg, #FFB800, #FF8C40)',
  'linear-gradient(135deg, #00E0FF, #7C5CFF)',
];

function TestimonialCard({ t, gradientIndex }) {
  const initials = t.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="relative bg-[#11141B] border border-[rgba(255,255,255,0.07)] rounded-2xl p-7 flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-[rgba(0,224,255,0.2)] hover:shadow-[0_0_40px_rgba(0,224,255,0.07)]"
      role="article"
      aria-label={`Testimonial from ${t.name}`}
    >
      {/* Top-right quote icon */}
      <div className="absolute top-5 right-5" aria-hidden="true">
        <Quote size={32} className="text-[rgba(0,224,255,0.07)] fill-[rgba(0,224,255,0.07)]" />
      </div>

      {/* Corner glow */}
      <div
        className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top left, rgba(0,224,255,0.04), transparent 70%)' }}
        aria-hidden="true"
      />

      <StarRow />

      <p
        className="text-white font-dm text-sm leading-[1.8] flex-1 mb-7"
        style={{ maxWidth: 'none' }}
      >
        "{t.text}"
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3 border-t border-[rgba(255,255,255,0.05)] pt-5">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-grotesk font-bold text-white text-xs"
          style={{ background: AVATAR_GRADIENTS[gradientIndex % AVATAR_GRADIENTS.length] }}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <div className="font-grotesk font-bold text-white text-sm">{t.name}</div>
          <div className="text-[#9AA4B2] font-dm text-xs mt-0.5">
            {t.businessType} &nbsp;·&nbsp;
            <span style={{ color: 'rgba(0,224,255,0.6)' }}>{t.location}</span>
          </div>
        </div>

        {/* Google badge */}
        <div
          className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-dm font-semibold"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#9AA4B2' }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(active * perPage, active * perPage + perPage);
  const visibleStartIndex = active * perPage;

  return (
    <section
      id="testimonials"
      className="py-32 bg-[#06070A] relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,224,255,0.04) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <SectionHeading
            label="Client Stories"
            title="Real Results, Real Businesses"
            subtitle="50+ Hyderabad businesses have already made the switch. Here's why they're glad they did."
            centered
          />

          {/* Summary trust bar */}
          <div className="inline-flex items-center gap-6 mt-8 px-6 py-3 rounded-full border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)]">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[#FFB800] text-[#FFB800]" aria-hidden="true" />
                ))}
              </div>
              <span className="font-grotesk font-bold text-white text-sm">5.0</span>
            </div>
            <div className="w-px h-4 bg-[rgba(255,255,255,0.12)]" aria-hidden="true" />
            <span className="text-[#9AA4B2] font-dm text-sm">50+ verified reviews</span>
            <div className="w-px h-4 bg-[rgba(255,255,255,0.12)]" aria-hidden="true" />
            <span className="text-[#9AA4B2] font-dm text-sm">Google &amp; Instagram</span>
          </div>
        </div>

        {/* Desktop 3-col grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="hidden md:grid grid-cols-3 gap-5"
          >
            {visible.map((t, i) => (
              <TestimonialCard key={t.id} t={t} gradientIndex={visibleStartIndex + i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mobile: single card carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) setActive((a) => Math.min(a + 1, testimonials.length - 1));
                if (info.offset.x > 60) setActive((a) => Math.max(a - 1, 0));
              }}
            >
              <TestimonialCard t={testimonials[active]} gradientIndex={active} />
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-[#00E0FF] w-6' : 'bg-[rgba(0,224,255,0.2)] w-1.5'
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Page dots (desktop) */}
        {pages > 1 && (
          <div className="hidden md:flex items-center justify-center gap-2 mt-10">
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-[#00E0FF] w-8' : 'bg-[rgba(0,224,255,0.2)] w-2'
                }`}
                aria-label={`Page ${i + 1} of testimonials`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
