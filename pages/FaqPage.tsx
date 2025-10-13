import React from 'react';
import PageWrapper from '../components/PageWrapper';
import Faq from '../components/Faq';
import AnimatedSection from '../components/common/AnimatedSection';

const FaqPage: React.FC = () => {
  return (
    <PageWrapper
      title="Frequently Asked Questions"
      subtitle="Have questions about going solar in Nagpur? We've got answers."
    >
      <AnimatedSection>
        <Faq />
      </AnimatedSection>
    </PageWrapper>
  );
};

export default FaqPage;