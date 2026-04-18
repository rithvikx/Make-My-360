import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CMSProvider } from './context/CMSContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Industries = lazy(() => import('./pages/Industries'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminApp = lazy(() => import('./admin/AdminApp'));

// Page fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[rgba(0,224,255,0.2)] border-t-[#00E0FF] rounded-full animate-spin" />
        <span className="text-[#9AA4B2] font-dm text-sm">Loading...</span>
      </div>
    </div>
  );
}

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

// WhatsApp floating button
function WAFloat() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20a%20360%C2%B0%20virtual%20tour"
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float group"
      aria-label="Chat with us on WhatsApp"
    >
      {/* WhatsApp SVG */}
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.528 5.845L.057 24l6.304-1.651A11.941 11.941 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.858 9.858 0 01-5.034-1.376l-.361-.214-3.741.981.997-3.648-.235-.374A9.854 9.854 0 012.118 12C2.118 6.532 6.532 2.118 12 2.118c5.468 0 9.882 4.414 9.882 9.882 0 5.468-4.414 9.882-9.882 9.882z"/>
      </svg>

      {/* Tooltip */}
      <span
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#11141B] border border-[rgba(255,255,255,0.08)] text-white text-xs font-dm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        aria-hidden="true"
      >
        Chat with us
      </span>
    </a>
  );
}

// Initial page loader
function SiteLoader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="page-loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Loading Make My 360"
      role="status"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="font-grotesk font-black text-3xl text-white tracking-tight">
          Make My{' '}
          <span style={{ color: '#00E0FF', textShadow: '0 0 30px rgba(0,224,255,0.6)' }}>360</span>
        </span>
        <span className="text-[#9AA4B2] font-dm text-xs tracking-[0.3em] uppercase mt-1">
          Loading experience...
        </span>
      </div>
      <div className="loader-scan" aria-hidden="true" />
    </motion.div>
  );
}

// Inner app with routing (needs to be inside BrowserRouter)
function AppInner() {
  const location = useLocation();
  useSmoothScroll();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            {/* Fallback */}
            <Route path="*" element={<PageTransition><Home /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
      <WAFloat />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <HelmetProvider>
      <CMSProvider>
        <BrowserRouter>
          {/* Admin panel lives at /admin — completely separate from main app shell */}
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/admin/*" element={<AdminApp />} />
              <Route
                path="*"
                element={
                  <>
                    <AnimatePresence>
                      {loading && (
                        <SiteLoader key="loader" onDone={() => setLoading(false)} />
                      )}
                    </AnimatePresence>
                    {!loading && <AppInner />}
                  </>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CMSProvider>
    </HelmetProvider>
  );
}
