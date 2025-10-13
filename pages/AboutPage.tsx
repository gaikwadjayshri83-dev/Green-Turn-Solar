import React from 'react';
import PageWrapper from '../components/PageWrapper';
import AboutUs from '../components/AboutUs';
import AnimatedSection from '../components/common/AnimatedSection';

const AboutPage: React.FC = () => {
  return (
    <PageWrapper
      title="Our Mission is a Greener Nagpur"
      subtitle="Learn about the team and values driving Green Turn Solar to the forefront of renewable energy in our community."
    >
      <AnimatedSection>
        <AboutUs />
      </AnimatedSection>
    </PageWrapper>
  );
};

export default AboutPage;