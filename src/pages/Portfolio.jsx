import { Helmet } from 'react-helmet-async';
import Portfolio from '../components/sections/Portfolio';
import FinalCTA from '../components/sections/FinalCTA';
import SectionHeading from '../components/ui/SectionHeading';

export default function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Portfolio | Make My 360 — Virtual Tour Projects in Hyderabad</title>
        <meta name="description" content="Browse Make My 360's portfolio of 360° virtual tours — bike showrooms, jewellery stores, real estate, restaurants, and retail spaces across Hyderabad." />
      </Helmet>

      <main role="main" className="pt-24">
        <section className="py-20 bg-[#06070A] border-b border-[rgba(0,224,255,0.08)]">
          <div className="section-container text-center">
            <SectionHeading
              label="Portfolio"
              title="50+ Projects. Each One Unique."
              subtitle="A selection of virtual tours and content we've built for Hyderabad businesses."
              centered
            />
          </div>
        </section>

        <Portfolio />
        <FinalCTA />
      </main>
    </>
  );
}
