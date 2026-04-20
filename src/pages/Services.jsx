import { Helmet } from 'react-helmet-async';
import ServicesSection from '../components/sections/Services';
import FinalCTA from '../components/sections/FinalCTA';
import SectionHeading from '../components/ui/SectionHeading';

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services | Make My 360 — 360° Tours & Content in Hyderabad</title>
        <meta name="description" content="Explore Make My 360's services: 360° virtual tours, Google Street View, reels creation, social media management and content strategy for Hyderabad businesses." />
      </Helmet>

      <main role="main" className="pt-24">
        {/* Hero Banner */}
        <section className="py-20 bg-[#06070A] border-b border-[rgba(0,224,255,0.08)]">
          <div className="section-container text-center">
            <SectionHeading
              label="Services"
              title="What We Build For You"
              subtitle="From your first virtual tour to a monthly content engine we handle the full digital presence."
              centered
            />
          </div>
        </section>

        <ServicesSection />
        <FinalCTA />
      </main>
    </>
  );
}
