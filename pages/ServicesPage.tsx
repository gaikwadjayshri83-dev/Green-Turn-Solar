import React from 'react';
import PageWrapper from '../components/PageWrapper';
import Services from '../components/Services';

const ServicesPage: React.FC = () => {
  return (
    <PageWrapper
      title="Our Comprehensive Solar Solutions"
      subtitle="We provide complete end-to-end solar solutions for homes and businesses across Nagpur."
    >
      <Services />
    </PageWrapper>
  );
};

export default ServicesPage;