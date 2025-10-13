import React from 'react';
import PageWrapper from '../components/PageWrapper';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
  return (
    <PageWrapper
      title="Contact Us"
      subtitle="We're here to help you on your journey to clean, renewable energy. Reach out to us with any questions."
    >
      <Contact />
    </PageWrapper>
  );
};

export default ContactPage;
