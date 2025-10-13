import React from 'react';
import AnimatedSection from './common/AnimatedSection';
import AnimatedHeading from './common/AnimatedHeading';
import ImageWithSpinner from './common/ImageWithSpinner';

const serviceData = [
  {
    imagePath: '/assets/services/1.jpg',
    title: 'Rooftop Solar Installation',
    description: 'Expert design and installation of grid-tied and off-grid solar systems for residential and commercial properties in Nagpur.',
  },
  {
    imagePath: '/assets/services/2.jpg',
    title: 'Solar Maintenance & Repair',
    description: 'Comprehensive AMC packages, panel cleaning, and troubleshooting services to ensure your system operates at peak efficiency.',
  },
  {
    imagePath: '/assets/services/3.jpg',
    title: 'Free Solar Consultation',
    description: 'Our experts provide a free site assessment, analyze your energy needs, and offer a transparent, no-obligation quote.',
  },
];

const Services: React.FC = () => {
  return (
    <AnimatedSection id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <AnimatedHeading text="Our Solar Solutions" className="text-3xl font-bold text-gray-800 mb-4" />
          <p className="max-w-2xl mx-auto text-gray-600 mb-12">
            We provide complete end-to-end solar solutions for homes and businesses across Nagpur.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden">
              <div className="w-full h-48">
                 <ImageWithSpinner src={service.imagePath} alt={service.title} />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Services;