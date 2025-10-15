import React from 'react';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import AnimatedSection from '../components/common/AnimatedSection';
import AnimatedHeading from '../components/common/AnimatedHeading';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import StatsSection from '../components/StatsSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <AboutUs />
      <StatsSection />
      <AnimatedSection className="text-center py-20 bg-gray-50">
        <AnimatedHeading text="See Your Potential Solar Savings" className="text-3xl font-bold text-gray-800 mb-4" />
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto px-4">
            Use our AI-powered calculator to get an instant estimate of how much you can save with a rooftop solar system in Nagpur.
        </p>
        <a href="#calculator" className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition-transform duration-300 hover:scale-105 inline-block">
            Launch Calculator
        </a>
      </AnimatedSection>
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
};

export default HomePage;
