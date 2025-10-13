import React from 'react';
import AnimatedSection from './common/AnimatedSection';
import AnimatedHeading from './common/AnimatedHeading';
import ImageWithSpinner from './common/ImageWithSpinner';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const AboutUs: React.FC = () => {
  return (
    <AnimatedSection className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <AnimatedHeading text="Your Trusted Solar Partner in Nagpur" className="text-3xl font-bold text-gray-800 mb-4" />
            <p className="text-gray-600 mb-6">
              Green Turn Solar was founded with a simple mission: to make clean, renewable energy accessible and affordable for every home and business in Nagpur. We are a team of certified engineers and solar experts dedicated to providing top-quality rooftop solar solutions tailored to our local community's needs.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckIcon />
                <span className="ml-3 text-gray-700"><strong className="font-semibold">Local Expertise:</strong> Deep understanding of Nagpur's climate and regulations.</span>
              </li>
              <li className="flex items-start">
                <CheckIcon />
                <span className="ml-3 text-gray-700"><strong className="font-semibold">Quality Assurance:</strong> We use only Tier-1 solar panels and premium inverters for maximum efficiency and longevity.</span>
              </li>
              <li className="flex items-start">
                <CheckIcon />
                <span className="ml-3 text-gray-700"><strong className="font-semibold">End-to-End Service:</strong> From consultation and system design to installation and post-sales support, we handle everything.</span>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 rounded-lg shadow-xl overflow-hidden">
            <ImageWithSpinner
              src="/assets/about/about.jpg"
              alt="Green Turn Solar technician providing excellent service"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutUs;