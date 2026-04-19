import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Map } from 'lucide-react';

// Instagram SVG (not available in this lucide-react version)
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const NAV_LINKS = ['Home', 'Services', 'Portfolio', 'About', 'Contact'];
const SERVICE_LINKS = [
  '360° Virtual Tours',
  'Content Creation',
  'Social Media',
  'Reels Production',
  'Photography',
];

// WhatsApp SVG icon
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.528 5.845L.057 24l6.304-1.651A11.941 11.941 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.858 9.858 0 01-5.034-1.376l-.361-.214-3.741.981.997-3.648-.235-.374A9.854 9.854 0 012.118 12C2.118 6.532 6.532 2.118 12 2.118c5.468 0 9.882 4.414 9.882 9.882 0 5.468-4.414 9.882-9.882 9.882z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-[#06070A] border-t border-[rgba(0,224,255,0.08)] pt-20 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1: Brand */}
          <div>
            <Link to="/" className="inline-block mb-4" aria-label="Make My 360 Home">
              <span className="font-grotesk font-bold text-2xl text-white">
                Make My{' '}
                <span style={{ color: '#00E0FF', textShadow: '0 0 20px rgba(0,224,255,0.4)' }}>360</span>
              </span>
            </Link>
            <p className="text-[#9AA4B2] text-sm font-dm leading-relaxed mb-6" style={{ maxWidth: '26ch' }}>
              Hyderabad's premium studio for 360° virtual tours and digital growth.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/makemy360"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                className="w-9 h-9 rounded-full border border-[rgba(0,224,255,0.2)] flex items-center justify-center text-[#9AA4B2] hover:text-[#00E0FF] hover:border-[#00E0FF] transition-all duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-9 h-9 rounded-full border border-[rgba(0,224,255,0.2)] flex items-center justify-center text-[#9AA4B2] hover:text-[#25D366] hover:border-[#25D366] transition-all duration-200"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on Google Maps"
                className="w-9 h-9 rounded-full border border-[rgba(0,224,255,0.2)] flex items-center justify-center text-[#9AA4B2] hover:text-[#00E0FF] hover:border-[#00E0FF] transition-all duration-200"
              >
                <Map size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-grotesk font-bold text-white text-sm uppercase tracking-widest mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((name) => (
                <li key={name}>
                  <Link
                    to={name === 'Home' ? '/' : `/${name.toLowerCase()}`}
                    className="text-[#9AA4B2] hover:text-[#00E0FF] font-dm text-sm transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="font-grotesk font-bold text-white text-sm uppercase tracking-widest mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((name) => (
                <li key={name}>
                  <Link
                    to="/services"
                    className="text-[#9AA4B2] hover:text-[#00E0FF] font-dm text-sm transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-grotesk font-bold text-white text-sm uppercase tracking-widest mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#00E0FF] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-[#9AA4B2] font-dm text-sm">
                  Hyderabad, Telangana, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#00E0FF] flex-shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9AA4B2] hover:text-[#25D366] font-dm text-sm transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#00E0FF] flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:hello@makemy360.in"
                  className="text-[#9AA4B2] hover:text-[#00E0FF] font-dm text-sm transition-colors"
                >
                  hello@makemy360.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Map size={16} className="text-[#00E0FF] flex-shrink-0" aria-hidden="true" />
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9AA4B2] hover:text-[#00E0FF] font-dm text-sm transition-colors"
                >
                  Find us on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9AA4B2] text-xs font-dm">
            © {new Date().getFullYear()} Make My 360. All rights reserved.{' '}
            <span>Made in Hyderabad 🇮🇳</span>
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:hello@makemy360.in?subject=Privacy%20Policy%20Request" className="text-[#9AA4B2] hover:text-white text-xs font-dm transition-colors">
              Privacy Policy
            </a>
            <a href="mailto:hello@makemy360.in?subject=Terms%20of%20Service" className="text-[#9AA4B2] hover:text-white text-xs font-dm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
