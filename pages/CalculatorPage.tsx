import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import SolarCalculator from '../components/SolarCalculator';
import EmiCalculator from '../components/EmiCalculator';
import { SolarEstimate } from '../types';
import { PRICING_INFO } from '../constants';
import AnimatedSection from '../components/common/AnimatedSection';
import AnimatedHeading from '../components/common/AnimatedHeading';

const CalculatorPage: React.FC = () => {
  const [estimate, setEstimate] = useState<SolarEstimate | null>(null);

  return (
    <PageWrapper
      title="Solar Savings & Cost Calculator"
      subtitle="Use our tools to estimate your savings and explore financing options for your rooftop solar system in Nagpur."
      className="bg-gray-50"
    >
      <AnimatedSection>
        <SolarCalculator onEstimateChange={setEstimate} />
      </AnimatedSection>

      {/* Always display the EMI calculator. It will update when an estimate is generated. */}
      <AnimatedSection className="mt-12 max-w-4xl mx-auto">
        {/* Provide a default loan amount for when no estimate has been calculated yet */}
        <EmiCalculator initialLoanAmount={estimate ? estimate.installationCostInr : 55000} />
      </AnimatedSection>

      {/* Show the "Get Quote" button only after an estimate is generated */}
      {estimate && (
        <AnimatedSection className="mt-8 text-center">
          <a 
            href="#contact" 
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition-transform duration-300 hover:scale-105 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 focus-visible:ring-green-500"
          >
            Get a Free Quote
          </a>
        </AnimatedSection>
      )}

      <AnimatedSection className="max-w-4xl mx-auto mt-16">
         <div className="bg-white p-8 rounded-lg shadow-lg">
            <AnimatedHeading text={PRICING_INFO.title} className="text-2xl font-bold text-gray-800 mb-4" />
            <p className="text-gray-600 mb-4">{PRICING_INFO.intro}</p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                {PRICING_INFO.factors.map((factor, index) => <li key={index}>{factor}</li>)}
            </ul>
            <p className="text-gray-600 mb-6">{PRICING_INFO.conclusion}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 bg-green-50 p-6 rounded-md border border-green-200">
                {PRICING_INFO.priceList.map((item, index) => (
                    <p key={index} className="text-gray-700 font-medium">{item}</p>
                ))}
            </div>
        </div>
      </AnimatedSection>

    </PageWrapper>
  );
};

export default CalculatorPage;