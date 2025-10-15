import React from 'react';
import PageWrapper from '../components/PageWrapper';
import AnimatedSection from '../components/common/AnimatedSection';
import ImageWithSpinner from '../components/common/ImageWithSpinner';

const galleryImages = [
  { src: '/images/1.jpg', alt: 'Rooftop solar panel installation on a residential building' },
  { src: '/images/2.jpg', alt: 'Solar panels installed on an industrial rooftop' },
  { src: '/images/3.jpg', alt: 'Detailed view of a solar panel array' },
  { src: '/images/4.jpg', alt: 'Green Turn Solar team inspecting a completed installation' },
];

const GalleryPage: React.FC = () => {
  return (
    <PageWrapper
      title="Our Work"
      subtitle="Explore a selection of our completed residential and commercial solar projects across Nagpur."
    >
      <AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg h-64 bg-gray-100">
              <ImageWithSpinner 
                src={image.src} 
                alt={image.alt} 
                imageClassName="transition-transform duration-300 group-hover:scale-110"
                containerClassName="bg-gray-100"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </PageWrapper>
  );
};

export default GalleryPage;
