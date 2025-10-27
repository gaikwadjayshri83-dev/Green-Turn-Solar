import React from 'react';
import PageWrapper from '../components/PageWrapper';
import Testimonials from '../components/Testimonials';
import AnimatedSection from '../components/common/AnimatedSection';
import GoogleReviews from '../components/GoogleReviews';

const TestimonialsPage: React.FC = () => {
  return (
    <PageWrapper
      title="What Our Customers Say"
      subtitle="We are proud to have powered homes and businesses across Nagpur with reliable solar energy. See our verified reviews on Google."
      className="bg-green-50"
    >
      <AnimatedSection className="mb-16">
        <GoogleReviews />
      </AnimatedSection>
      <AnimatedSection>
        <div className="bg-white py-16">
          <Testimonials showHeading={false} />
        </div>
      </AnimatedSection>
    </PageWrapper>
  );
};

export default TestimonialsPage;
