import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { useCMS } from '../../context/CMSContext';

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`faq-item ${isOpen ? 'open' : ''}`}
      role="article"
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        id={`faq-question-${faq.id}`}
      >
        <span className={`font-grotesk font-bold text-base transition-colors duration-200 ${
          isOpen ? 'text-[#00E0FF]' : 'text-white'
        }`}>
          {faq.question}
        </span>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: isOpen ? 'rgba(0,224,255,0.1)' : 'rgba(255,255,255,0.05)',
            border: isOpen ? '1px solid rgba(0,224,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
          }}
          aria-hidden="true"
        >
          {isOpen ? (
            <Minus size={13} className="text-[#00E0FF]" />
          ) : (
            <Plus size={13} className="text-[#9AA4B2]" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            role="region"
            aria-labelledby={`faq-question-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5">
              <p className="text-[#9AA4B2] font-dm text-sm leading-relaxed border-t border-[rgba(255,255,255,0.04)] pt-4" style={{ maxWidth: 'none' }}>
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const { faqs } = useCMS();

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section
      id="faq"
      className="py-32 bg-[#0E1117]"
      aria-labelledby="faq-heading"
    >
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      <div className="section-container">
        <div className="text-center mb-16">
          <SectionHeading
            label="FAQs"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before booking your first virtual tour."
            centered
          />
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center mt-12">
          <p className="text-[#9AA4B2] font-dm text-sm">
            Still have questions?{' '}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00E0FF] hover:underline cursor-pointer"
              aria-label="Chat with us on WhatsApp"
            >
              Chat with us on WhatsApp →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
