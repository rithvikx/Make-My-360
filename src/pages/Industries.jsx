import { Helmet } from 'react-helmet-async';
import IndustriesSection from '../components/sections/Industries';
import FinalCTA from '../components/sections/FinalCTA';
import SectionHeading from '../components/ui/SectionHeading';

export default function IndustriesPage() {
  return (
    <>
      <Helmet>
        <title>Industries | Make My 360 — Virtual Tours for Every Business in Hyderabad</title>
        <meta name="description" content="We serve real estate, jewellery stores, hotels, restaurants, bike showrooms, clinics, gyms, schools and more across Hyderabad with premium 360° virtual tours." />
      </Helmet>

      <main role="main" className="pt-24">
        <section className="py-20 bg-[#06070A] border-b border-[rgba(0,224,255,0.08)]">
          <div className="section-container text-center">
            <SectionHeading
              label="Industries"
              title="Built for Your Industry"
              subtitle="Whatever your business type, we have proven virtual tour workflows tailored for you."
              centered
            />
          </div>
        </section>

        <IndustriesSection />
        <FinalCTA />
      </main>
    </>
  );
}
