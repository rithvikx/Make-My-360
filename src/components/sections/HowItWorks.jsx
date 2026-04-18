import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Camera, Cpu, Globe } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    icon: MessageCircle,
    title: 'Consultation',
    desc: 'Tell us about your space and goals. We understand your business, audience, and what outcome you want from your tour.',
    detail: 'Free · 30 minutes · Online or in-person',
  },
  {
    num: '02',
    icon: Camera,
    title: 'Shoot & Capture',
    desc: 'Our team visits your location with professional 360° cameras and lighting equipment. We capture every angle.',
    detail: '2–6 hours on-site · Zero disruption to business',
  },
  {
    num: '03',
    icon: Cpu,
    title: 'Edit & Build',
    desc: 'We stitch, color-grade, and build your interactive tour — complete with hotspots, navigation, and branding.',
    detail: '3–5 business days delivery',
  },
  {
    num: '04',
    icon: Globe,
    title: 'Publish & Grow',
    desc: 'Your tour goes live — submitted to Google Street View, embedded on your website, and shared across platforms.',
    detail: 'Live within hours of approval',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Draw the timeline line on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );

      // Animate each step
      gsap.utils.toArray('.step-item').forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // Node pop-in
      gsap.utils.toArray('.step-node').forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-32 bg-[#06070A]"
      aria-labelledby="hiw-heading"
      ref={sectionRef}
    >
      <div className="section-container">
        <div className="text-center mb-20">
          <SectionHeading
            label="The Process"
            title="From Consultation to Live Tour in Days"
            subtitle="Four steps. Zero hassle. A virtual presence that works 24/7."
            centered
          />
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-[rgba(0,224,255,0.08)] overflow-hidden">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full h-full origin-top"
              style={{
                background: 'linear-gradient(to bottom, #00E0FF, rgba(0,224,255,0.1))',
                transformOrigin: 'top',
                scaleY: 0,
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="step-item opacity-0 flex gap-8 pl-16 relative"
                  role="listitem"
                >
                  {/* Node */}
                  <div
                    className="step-node absolute left-0 w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 opacity-0"
                    style={{
                      background: '#06070A',
                      borderColor: '#00E0FF',
                      boxShadow: '0 0 20px rgba(0,224,255,0.3)',
                      top: 0,
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={18} className="text-[#00E0FF]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-[#11141B] border border-[rgba(0,224,255,0.1)] rounded-2xl p-6 hover:border-[rgba(0,224,255,0.25)] transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="font-grotesk font-black text-xs tracking-widest"
                        style={{ color: 'rgba(0,224,255,0.4)' }}
                      >
                        {step.num}
                      </span>
                      <h3 className="font-grotesk font-bold text-white text-lg">{step.title}</h3>
                    </div>
                    <p className="text-[#9AA4B2] font-dm text-sm leading-relaxed mb-3" style={{ maxWidth: 'none' }}>
                      {step.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-dm font-semibold text-[#00E0FF] opacity-70">
                      <span className="w-1 h-1 rounded-full bg-[#00E0FF]" />
                      {step.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
