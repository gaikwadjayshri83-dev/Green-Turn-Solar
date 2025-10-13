import React from 'react';
import PageWrapper from '../components/PageWrapper';
import Testimonials from '../components/Testimonials';
import AnimatedSection from '../components/common/AnimatedSection';

const TestimonialsPage: React.FC = () => {
  return (
    <PageWrapper
      title="What Our Customers Say"
      subtitle="We are proud to have powered homes and businesses across Nagpur with reliable solar energy."
      className="bg-gray-50"
    >
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
    </PageWrapper>
  );
};

export default TestimonialsPage;