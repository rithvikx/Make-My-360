/**
 * CMSContext.jsx
 * Global state for editable site content.
 * Falls back to static data files; persists every change to localStorage.
 */
import { createContext, useContext, useState, useCallback } from 'react';
import { services as defaultServices } from '../data/services';
import { industries as defaultIndustries } from '../data/industries';
import { faqs as defaultFaqs } from '../data/faq';

// ── Helpers ──────────────────────────────────────────────────────────────
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(`mm360_cms_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(`mm360_cms_${key}`, JSON.stringify(value));
}

// ── Default portfolio items ───────────────────────────────────────────────
const defaultPortfolio = [
  { id: 1, title: 'Bike Showroom Virtual Tour', industry: 'Automotive', location: 'Gachibowli', accent: '#00E0FF', label: '3,600 sq ft • Full Showroom' },
  { id: 2, title: 'Luxury Jewellery Store', industry: 'Jewellery', location: 'Secunderabad', accent: '#7C5CFF', label: '1,200 sq ft • Multi-floor' },
  { id: 3, title: 'Real Estate Walkthrough', industry: 'Real Estate', location: 'Kokapet', accent: '#00D47E', label: '3BHK Luxury Apartment' },
  { id: 4, title: 'Fashion Retail Store', industry: 'Retail', location: 'Banjara Hills', accent: '#FF4D88', label: '2,400 sq ft • 2 Floors' },
  { id: 5, title: 'Fine Dining Restaurant', industry: 'F&B', location: 'Jubilee Hills', accent: '#FFB800', label: '180 pax Capacity' },
];

// ── Default about content ─────────────────────────────────────────────────
const defaultAbout = {
  headline: 'Built Because Hyderabad Deserved Better',
  story: [
    'We started Make My 360 after watching local businesses in Hyderabad struggle to compete online — not because of product quality, but because of how they were presented digitally.',
    'A showroom in Gachibowli with 200 bikes on the floor. A jewellery store in Secunderabad with decades of craftsmanship. A restaurant in Jubilee Hills with stunning interiors. All invisible online.',
    'We decided to change that. Today, Make My 360 operates across 5 cities with a team of photographers, 3D specialists, and content creators — all dedicated to one goal: making Hyderabad businesses look like world-class brands online.',
  ],
  stats: [
    { value: 50, suffix: '+', label: 'Businesses Served' },
    { value: 5, suffix: ' Cities', label: 'Across Telangana' },
    { value: 100, suffix: '%', label: 'Client Retention' },
    { value: 3, suffix: '+', label: 'Years of Experience' },
  ],
};

// ── Context ───────────────────────────────────────────────────────────────
const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [services, setServicesState] = useState(() => loadFromStorage('services', defaultServices));
  const [industries, setIndustriesState] = useState(() => loadFromStorage('industries', defaultIndustries));
  const [portfolio, setPortfolioState] = useState(() => loadFromStorage('portfolio', defaultPortfolio));
  const [about, setAboutState] = useState(() => loadFromStorage('about', defaultAbout));
  const [faqs, setFaqsState] = useState(() => loadFromStorage('faqs', defaultFaqs));

  // ── Services ──
  const updateServices = useCallback((updater) => {
    setServicesState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage('services', next);
      return next;
    });
  }, []);

  // ── Industries ──
  const updateIndustries = useCallback((updater) => {
    setIndustriesState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage('industries', next);
      return next;
    });
  }, []);

  // ── Portfolio ──
  const updatePortfolio = useCallback((updater) => {
    setPortfolioState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage('portfolio', next);
      return next;
    });
  }, []);

  // ── About ──
  const updateAbout = useCallback((updater) => {
    setAboutState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage('about', next);
      return next;
    });
  }, []);

  // ── FAQs ──
  const updateFaqs = useCallback((updater) => {
    setFaqsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage('faqs', next);
      return next;
    });
  }, []);

  return (
    <CMSContext.Provider
      value={{
        services, updateServices,
        industries, updateIndustries,
        portfolio, updatePortfolio,
        about, updateAbout,
        faqs, updateFaqs,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used inside <CMSProvider>');
  return ctx;
}
