/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#06070A',
        'bg-surface': '#0E1117',
        'bg-card': '#11141B',
        'accent-cyan': '#00E0FF',
        'accent-purple': '#7C5CFF',
        'text-muted': '#9AA4B2',
        'success': '#00D47E',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'bounce-wa': 'bounceWA 2s ease-in-out infinite',
        'arc-sweep': 'arcSweep 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 224, 255, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 224, 255, 0.7)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bounceWA: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        arcSweep: {
          '0%, 100%': { opacity: '0.3', transform: 'rotate(-30deg)' },
          '50%': { opacity: '0.6', transform: 'rotate(30deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'radial-cyan': 'radial-gradient(circle at center, rgba(0, 224, 255, 0.08) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
