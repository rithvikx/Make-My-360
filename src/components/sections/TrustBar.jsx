const ITEMS = [
  'Showrooms', 'Real Estate', 'Hotels & Resorts', 'Clinics & Hospitals',
  'Retail Stores', 'Schools', 'Restaurants', 'Jewellery Stores',
  'Gyms & Fitness', 'Offices', 'Car Dealerships', 'Wedding Venues',
];

const ACCENT_COLORS = [
  '#00E0FF', '#7C5CFF', '#FFB800', '#00D47E',
  '#FF4D88', '#00E0FF', '#FF8C40', '#7C5CFF',
  '#00D47E', '#9AA4B2', '#00E0FF', '#FFB800',
];

function MarqueeItem({ label, accentColor }) {
  return (
    <div
      className="flex items-center gap-2.5 px-5 py-2 rounded-full mx-2.5 flex-shrink-0 transition-all duration-300"
      style={{
        background: `${accentColor}08`,
        border: `1px solid ${accentColor}22`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
      />
      <span className="text-[#9AA4B2] font-dm text-sm font-medium whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function TrustBar() {
  const doubled = [...ITEMS, ...ITEMS];
  const doubledColors = [...ACCENT_COLORS, ...ACCENT_COLORS];

  return (
    <section
      aria-label="Trusted by businesses across Hyderabad"
      className="py-14 border-y border-[rgba(0,224,255,0.07)] relative overflow-hidden"
      style={{ background: 'rgba(14,17,23,0.6)' }}
    >
      {/* Top hairline */}
      <div className="section-divider absolute top-0 left-0 right-0" aria-hidden="true" />

      <p className="text-center text-[#9AA4B2] font-dm text-[11px] tracking-[0.35em] uppercase mb-7 font-semibold">
        Trusted by 50+ Hyderabad businesses
      </p>

      {/* Marquee with fade masks */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #06070A 20%, transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #06070A 20%, transparent)' }}
          aria-hidden="true"
        />

        <div className="marquee-track" aria-hidden="true">
          {doubled.map((item, i) => (
            <MarqueeItem
              key={`${item}-${i}`}
              label={item}
              accentColor={doubledColors[i % doubledColors.length]}
            />
          ))}
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" aria-hidden="true" />
    </section>
  );
}
