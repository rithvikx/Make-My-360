import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Users } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import FinalCTA from '../components/sections/FinalCTA';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { useCMS } from '../context/CMSContext';

const VALUES = [
  { icon: Star, title: 'Quality First', desc: 'We use only professional-grade equipment and never cut corners on post-production.' },
  { icon: Clock, title: 'Respect Your Time', desc: '3–5 day delivery is our standard. We\'ve never missed a committed deadline.' },
  { icon: Users, title: 'Local Expertise', desc: 'Born in Hyderabad, built for Hyderabad businesses. We know this market.' },
  { icon: MapPin, title: 'Results-Driven', desc: 'We care about walk-ins, leads, and sales — not just aesthetics.' },
];

export default function About() {
  const { about } = useCMS();
  const STATS = about.stats;
  return (
    <>
      <Helmet>
        <title>About | Make My 360 — Hyderabad's Virtual Tour Studio</title>
        <meta name="description" content="Learn about Make My 360 — Hyderabad's premium 360° virtual tour studio. Our story, values, and the team behind Hyderabad's most trusted digital space studio." />
      </Helmet>

      <main role="main" className="pt-24">
        {/* Hero Banner */}
        <section className="py-20 bg-[#06070A] border-b border-[rgba(0,224,255,0.08)] relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,224,255,0.06), transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="section-container text-center relative z-10">
            <SectionHeading
              label="About Us"
              title="We Make Spaces Come Alive Online"
              subtitle="Make My 360 is Hyderabad's dedicated virtual tour studio — built to transform how local businesses present themselves to the world."
              centered
            />
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-[#0E1117] border-b border-[rgba(0,224,255,0.06)]" aria-label="Key numbers">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s, i) => (
                <div key={i} className="text-center">
                  <AnimatedCounter target={s.value} suffix={s.suffix} className="text-3xl" />
                  <p className="text-[#9AA4B2] font-dm text-sm mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-28 bg-[#06070A]" aria-labelledby="story-heading">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 id="story-heading" className="font-grotesk font-bold text-white text-3xl mb-6">
                  {about.headline}
                </h2>
                <div className="space-y-4 text-[#9AA4B2] font-dm text-base leading-relaxed">
                  {about.story.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {VALUES.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <motion.div
                      key={i}
                      className="bg-[#11141B] border border-[rgba(0,224,255,0.1)] rounded-2xl p-5"
                      whileHover={{ borderColor: 'rgba(0,224,255,0.3)', y: -4 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                    >
                      <Icon size={20} className="text-[#00E0FF] mb-3" aria-hidden="true" />
                      <h3 className="font-grotesk font-bold text-white text-sm mb-1.5">{v.title}</h3>
                      <p className="text-[#9AA4B2] font-dm text-xs leading-relaxed" style={{ maxWidth: 'none' }}>{v.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
    </>
  );
}
