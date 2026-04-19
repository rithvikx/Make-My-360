import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// WhatsApp icon
const WAIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.528 5.845L.057 24l6.304-1.651A11.941 11.941 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.858 9.858 0 01-5.034-1.376l-.361-.214-3.741.981.997-3.648-.235-.374A9.854 9.854 0 012.118 12C2.118 6.532 6.532 2.118 12 2.118c5.468 0 9.882 4.414 9.882 9.882 0 5.468-4.414 9.882-9.882 9.882z"/>
  </svg>
);

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="py-32 bg-[#06070A] relative overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* Animated radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,224,255,0.07) 0%, transparent 60%)',
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,224,255,0.1) 0%, transparent 65%)',
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,224,255,0.07) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,224,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,224,255,0.25)] bg-[rgba(0,224,255,0.05)] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF] animate-pulse" />
          <span className="text-[#00E0FF] text-xs font-semibold tracking-widest uppercase font-dm">
            Ready to Start?
          </span>
        </motion.div>

        <motion.h2
          id="final-cta-heading"
          className="font-grotesk font-extrabold text-white mb-6"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Ready to Make Your Business<br />
          Look Future-Ready?
        </motion.h2>

        <motion.p
          className="text-[#9AA4B2] font-dm text-lg mb-12 mx-auto"
          style={{ maxWidth: '52ch' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join 50+ Hyderabad businesses already using 360° virtual tours to win more customers online.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link
            to="/contact"
            aria-label="Get a Quote"
            className="btn-primary text-base px-8 py-4"
          >
            Get a Quote
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <a
            href="https://wa.me/919876543210?text=Hi,%20I%20want%20to%20know%20more%20about%20360%20virtual%20tours"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-lg text-base font-dm font-semibold transition-all duration-300"
            style={{
              background: '#25D366',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.5)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.3)'}
          >
            <WAIcon />
            Chat on WhatsApp
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            '✓ Free Consultation',
            '✓ No Hidden Fees',
            '✓ 5-Day Delivery',
            '✓ 100% Satisfaction',
          ].map((item, i) => (
            <span key={i} className="text-[#9AA4B2] font-dm text-sm flex items-center gap-1.5">
              <span className="text-[#00D47E]">{item.split(' ')[0]}</span>{' '}
              {item.split(' ').slice(1).join(' ')}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
