import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400)); // brief fake delay
    const ok = onLogin(password);
    setLoading(false);
    if (ok) {
      navigate('/admin', { replace: true });
    } else {
      setError('Incorrect password. Try again.');
      setPassword('');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #06070A 0%, #0E1117 100%)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,224,255,0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div
        className="relative z-10 w-full max-w-sm mx-4"
        style={{ animation: 'fadeInUp 0.5s ease both' }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Make My <span style={{ color: '#00E0FF' }}>360</span>
          </div>
          <p className="text-sm" style={{ color: '#9AA4B2' }}>Admin Panel</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: '#11141B',
            border: '1px solid rgba(0,224,255,0.12)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,224,255,0.1)', border: '1px solid rgba(0,224,255,0.2)' }}
            >
              <Lock size={16} className="text-[#00E0FF]" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Sign In
              </h1>
              <p className="text-xs" style={{ color: '#9AA4B2' }}>Enter admin password to continue</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                required
                autoFocus
                className="w-full px-4 py-3 pr-11 rounded-lg text-sm text-white placeholder-[#9AA4B2]"
                style={{
                  background: '#06070A',
                  border: error ? '1px solid #FF4444' : '1px solid rgba(0,224,255,0.15)',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(0,224,255,0.4)')}
                onBlur={(e) => (e.target.style.borderColor = error ? '#FF4444' : 'rgba(0,224,255,0.15)')}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: '#9AA4B2' }}
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="text-xs mb-3 px-1" style={{ color: '#FF6B6B' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: loading ? 'rgba(0,224,255,0.4)' : '#00E0FF',
                color: '#06070A',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[rgba(0,0,0,0.3)] border-t-[#06070A] rounded-full animate-spin" />
              ) : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(154,164,178,0.5)' }}>
          <a href="/" style={{ color: '#00E0FF' }}>← Back to website</a>
        </p>
      </div>
    </div>
  );
}
