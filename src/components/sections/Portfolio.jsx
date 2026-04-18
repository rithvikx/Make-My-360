import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { Link } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';

function accentToGradient(accent) {
  return `linear-gradient(135deg, #0a1020 0%, #1a2040 50%, ${accent}22 100%)`;
}

export default function Portfolio() {
  const scrollRef = useRef(null);
  const { portfolio: PROJECTS } = useCMS();

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };

  return (
    <section
      id="portfolio"
      className="py-32 bg-[#0E1117] overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            label="Our Work"
            title="Explore Projects We've Built"
            subtitle="Real businesses, real spaces, real results."
          />

          {/* Scroll controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full border border-[rgba(0,224,255,0.2)] flex items-center justify-center text-[#9AA4B2] hover:text-[#00E0FF] hover:border-[#00E0FF] transition-all"
              aria-label="Scroll portfolio left"
            >
              <ArrowRight size={16} className="rotate-180" aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full border border-[rgba(0,224,255,0.2)] flex items-center justify-center text-[#9AA4B2] hover:text-[#00E0FF] hover:border-[#00E0FF] transition-all"
              aria-label="Scroll portfolio right"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="h-scroll-wrapper flex gap-5 pb-4"
          role="list"
          aria-label="Portfolio projects"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              role="listitem"
              className="portfolio-card flex-shrink-0 w-[360px] h-[300px] rounded-2xl overflow-hidden border border-[rgba(0,224,255,0.1)] relative cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              aria-label={`${project.title} - ${project.location}`}
            >
              {/* Gradient thumbnail */}
              <div
                className="w-full h-full"
                style={{ background: project.gradient ?? accentToGradient(project.accent) }}
              >
                {/* 360 badge top-right */}
                <div
                  className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-grotesk font-bold"
                  style={{
                    background: 'rgba(6,7,10,0.8)',
                    border: `1px solid ${project.accent}44`,
                    color: project.accent,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  360°
                </div>

                {/* Center visual element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-20 h-20 rounded-full border-2 opacity-30"
                    style={{ borderColor: project.accent }}
                  />
                  <div
                    className="absolute w-12 h-12 rounded-full border"
                    style={{ borderColor: project.accent, opacity: 0.5 }}
                  />
                </div>

                {/* Project info bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4"
                  style={{ background: 'linear-gradient(to top, rgba(6,7,10,0.95) 70%, transparent)' }}>
                  <div
                    className="text-xs font-dm mb-1"
                    style={{ color: project.accent }}
                  >
                    {project.industry} · {project.location}
                  </div>
                  <div className="text-white font-grotesk font-bold text-base mb-0.5">
                    {project.title}
                  </div>
                  <div className="text-[#9AA4B2] font-dm text-xs">{project.label}</div>
                </div>

                {/* Hover overlay */}
                <div className="portfolio-overlay">
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 text-[#00E0FF] font-dm font-semibold text-sm"
                    aria-label={`View ${project.title} tour`}
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    View Tour →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
