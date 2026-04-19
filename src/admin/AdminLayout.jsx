import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Layers, Image, Info,
  HelpCircle, LogOut, Menu, ExternalLink
} from 'lucide-react';

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
  { icon: Layers, label: 'Services', to: '/admin/services' },
  { icon: Image, label: 'Portfolio', to: '/admin/portfolio' },
  { icon: Info, label: 'About', to: '/admin/about' },
  { icon: HelpCircle, label: 'FAQ', to: '/admin/faq' },
];

/* Hoisted out of AdminLayout to avoid component-inside-render ESLint error */
function SidebarContent({ onClose, onLogout }) {
  return (
    <>
      {/* Brand */}
      <div className="p-5 pb-4 border-b" style={{ borderColor: 'rgba(0,224,255,0.08)' }}>
        <div className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Make My <span style={{ color: '#00E0FF' }}>360</span>
        </div>
        <div
          className="text-xs font-medium px-2 py-0.5 rounded mt-1 inline-block"
          style={{ background: 'rgba(0,224,255,0.1)', color: '#00E0FF', fontSize: 10 }}
        >
          CMS Admin
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1" aria-label="Admin navigation">
        {NAV.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[rgba(0,224,255,0.1)] text-[#00E0FF]'
                  : 'text-[#9AA4B2] hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
              }`
            }
            aria-label={`Navigate to ${label}`}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t space-y-1" style={{ borderColor: 'rgba(0,224,255,0.08)' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#9AA4B2] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"
        >
          <ExternalLink size={14} aria-hidden="true" />
          View Website
        </a>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#9AA4B2] hover:text-red-400 hover:bg-[rgba(255,80,80,0.06)] transition-all cursor-pointer"
        >
          <LogOut size={14} aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </>
  );
}

export default function AdminLayout({ children, onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ background: '#06070A', color: '#fff' }}
    >
      {/* Sidebar — Desktop */}
      <aside
        className="hidden lg:flex flex-col w-56 flex-shrink-0 sticky top-0 h-screen"
        style={{ background: '#0E1117', borderRight: '1px solid rgba(0,224,255,0.08)' }}
      >
        <SidebarContent onClose={() => setOpen(false)} onLogout={handleLogout} />
      </aside>

      {/* Mobile sidebar overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setOpen(false)}
          style={{ background: 'rgba(0,0,0,0.6)' }}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col w-56 transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: '#0E1117', borderRight: '1px solid rgba(0,224,255,0.08)' }}
      >
        <SidebarContent onClose={() => setOpen(false)} onLogout={handleLogout} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header
          className="lg:hidden flex items-center gap-4 px-4 py-3 sticky top-0 z-30"
          style={{ background: '#0E1117', borderBottom: '1px solid rgba(0,224,255,0.08)' }}
        >
          <button
            onClick={() => setOpen(true)}
            className="text-[#9AA4B2] hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <span className="font-bold text-white text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Make My 360 CMS
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-8 overflow-auto" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
