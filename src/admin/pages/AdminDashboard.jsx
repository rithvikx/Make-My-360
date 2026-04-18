import { Link } from 'react-router-dom';
import { Layers, Building2, Image, Info, HelpCircle, ExternalLink } from 'lucide-react';
import { StatCard, C } from '../components/AdminUI';
import { useCMS } from '../../context/CMSContext';

export default function AdminDashboard() {
  const { services, industries, portfolio, faqs } = useCMS();

  const stats = [
    { icon: Layers, label: 'Services', value: services.length, to: '/admin/services', accent: '#00E0FF' },
    { icon: Building2, label: 'Industries', value: industries.length, to: '/admin/industries', accent: '#7C5CFF' },
    { icon: Image, label: 'Portfolio Items', value: portfolio.length, to: '/admin/portfolio', accent: '#00D47E' },
    { icon: HelpCircle, label: 'FAQ Items', value: faqs.length, to: '/admin/faq', accent: '#FFB800' },
  ];

  const sections = [
    { icon: Layers, label: 'Manage Services', desc: 'Add, edit or remove service offerings', to: '/admin/services', accent: '#00E0FF' },
    { icon: Building2, label: 'Manage Industries', desc: 'Update which industries you serve', to: '/admin/industries', accent: '#7C5CFF' },
    { icon: Image, label: 'Manage Portfolio', desc: 'Showcase your best project work', to: '/admin/portfolio', accent: '#00D47E' },
    { icon: Info, label: 'Edit About Page', desc: 'Update story, headline and team stats', to: '/admin/about', accent: '#FF4D88' },
    { icon: HelpCircle, label: 'Manage FAQ', desc: 'Add frequently asked questions', to: '/admin/faq', accent: '#FFB800' },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Dashboard
        </h1>
        <p className="text-sm" style={{ color: C.muted }}>
          Manage your website content from here. Changes reflect instantly on the live site.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.to} to={s.to} className="block hover:scale-[1.02] transition-transform">
            <StatCard icon={s.icon} label={s.label} value={s.value} accent={s.accent} />
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: C.muted }}>
        Quick Actions
      </h2>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.to}
              to={s.to}
              className="group rounded-xl p-5 flex items-start gap-4 transition-all"
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${s.accent}44`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${s.accent}12`, border: `1px solid ${s.accent}25` }}
              >
                <Icon size={16} style={{ color: s.accent }} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-white mb-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {s.label}
                </div>
                <div className="text-xs" style={{ color: C.muted }}>{s.desc}</div>
              </div>
              <ExternalLink size={14} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: s.accent }} aria-hidden="true" />
            </Link>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-xs mt-10 text-center" style={{ color: 'rgba(154,164,178,0.4)' }}>
        Data is saved in browser localStorage and reflects immediately on the website.
      </p>
    </div>
  );
}
