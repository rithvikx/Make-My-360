import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import TrustBar from '../components/sections/TrustBar';
import WhyVirtualTours from '../components/sections/WhyVirtualTours';
import ServicesSection from '../components/sections/Services';
import IndustriesSection from '../components/sections/Industries';
import Portfolio from '../components/sections/Portfolio';
import HowItWorks from '../components/sections/HowItWorks';
import WhyUs from '../components/sections/WhyUs';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import FinalCTA from '../components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Make My 360 | 360° Virtual Tours & Content Creation in Hyderabad</title>
        <meta
          name="description"
          content="Hyderabad's premium 360° virtual tour studio. Google Street View, website tours, reels, content creation & social media management. Book a free demo today."
        />
      </Helmet>

      <main id="main-content" role="main">
        <Hero />
        <TrustBar />
        <WhyVirtualTours />
        <ServicesSection />
        <IndustriesSection />
        <Portfolio />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  );
}
