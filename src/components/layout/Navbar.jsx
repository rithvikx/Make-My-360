import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[rgba(6,7,10,0.92)] backdrop-blur-xl border-b border-[rgba(0,224,255,0.1)] py-3'
            : 'bg-[rgba(6,7,10,0.6)] backdrop-blur-md border-b border-[rgba(0,224,255,0.06)] py-5'
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1" aria-label="Make My 360 Home">
            <span className="font-grotesk font-bold text-xl text-white tracking-tight">
              Make My{' '}
              <span
                className="font-black"
                style={{ color: '#00E0FF', textShadow: '0 0 20px rgba(0,224,255,0.5)' }}
              >
                360
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative font-dm text-sm font-medium transition-colors duration-200 pb-0.5 group ${
                    isActive ? 'text-[#00E0FF]' : 'text-[#9AA4B2] hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* Animated underline */}
                    <motion.span
                      className="absolute left-0 bottom-0 h-[1.5px] bg-[#00E0FF] rounded-full"
                      initial={false}
                      animate={{ width: isActive ? '100%' : '0%' }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      style={{ boxShadow: '0 0 8px rgba(0,224,255,0.6)' }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[rgba(0,224,255,0.4)] text-[#00E0FF] font-dm font-semibold text-sm transition-all duration-300 hover:bg-[rgba(0,224,255,0.08)] hover:shadow-[0_0_20px_rgba(0,224,255,0.2)] animate-pulse-glow"
              aria-label="Get a Quote"
            >
              Get a Quote
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav-overlay md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-6 text-white p-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {/* Logo in overlay */}
            <div className="absolute top-5 left-6">
              <span className="font-grotesk font-bold text-xl text-white">
                Make My{' '}
                <span style={{ color: '#00E0FF' }}>360</span>
              </span>
            </div>

            {/* Nav Links */}
            <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `font-grotesk font-bold text-3xl transition-colors duration-200 ${
                        isActive ? 'text-[#00E0FF]' : 'text-white hover:text-[#00E0FF]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-base"
                  aria-label="Book free demo"
                >
                  Book Free Demo
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.div>
            </nav>

            {/* Bottom tagline */}
            <p className="absolute bottom-8 text-[#9AA4B2] text-sm font-dm">
              Hyderabad's #1 Virtual Tour Studio
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
