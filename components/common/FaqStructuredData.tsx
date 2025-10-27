import React, { useEffect } from 'react';

const FaqStructuredData: React.FC = () => {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the average cost of a rooftop solar system in Nagpur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The cost of a rooftop solar system in Nagpur varies based on size and components. A typical 1 kW system can range from ₹55,000 to ₹60,000, while a 5 kW system might cost between ₹2,75,000 and ₹3,00,000. We offer a free site assessment for a precise, no-obligation quote tailored to your needs."
        }
      },
      {
        "@type": "Question",
        "name": "How much can I save on my electricity bill?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Savings depend on your electricity consumption and system size. Many of our customers in Nagpur have reduced their electricity bills by up to 90%. Our solar calculator can give you a personalized estimate of your potential annual savings."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any government subsidies available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, both central and state governments offer subsidies for rooftop solar installations to encourage renewable energy adoption. At Green Turn Solar, we provide full assistance in navigating the application process to ensure you receive all eligible benefits."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the installation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard residential rooftop solar installation in Nagpur typically takes 2 to 4 days to complete, from mounting the structures to commissioning the system. We work efficiently to minimize any disruption to your routine."
        }
      },
      {
        "@type": "Question",
        "name": "What kind of maintenance do solar panels require?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Solar panels are very low-maintenance. We recommend cleaning them with water every 2-3 weeks to remove dust and debris, which ensures they operate at peak efficiency. We also offer annual maintenance check-ups for a thorough system health analysis."
        }
      }
    ]
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(faqData);
    script.id = 'faq-structured-data'; // Give it an ID to prevent duplicates
    
    // Remove any existing script before adding
    document.getElementById(script.id)?.remove();
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      document.getElementById(script.id)?.remove();
    };
  }, []);

  return null; // This component does not render any visible UI
};

export default FaqStructuredData;
