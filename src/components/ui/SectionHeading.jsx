export default function SectionHeading({ label, title, subtitle, centered = false, className = '', id }) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {label && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,224,255,0.25)] bg-[rgba(0,224,255,0.05)] text-[#00E0FF] text-xs font-semibold tracking-widest uppercase mb-6 font-dm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF] inline-block animate-pulse" />
          {label}
        </div>
      )}
      {title && (
        <h2
          id={id}
          className="font-grotesk font-bold text-white leading-[1.1] mb-5"
          style={{ fontSize: 'clamp(1.85rem, 3.8vw, 3rem)', letterSpacing: '-0.025em' }}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`text-[#9AA4B2] font-dm leading-relaxed ${centered ? 'mx-auto' : ''}`}
          style={{ maxWidth: '58ch', fontSize: '1.05rem' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
