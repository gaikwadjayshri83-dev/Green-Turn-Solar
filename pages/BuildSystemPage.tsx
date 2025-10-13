import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import AnimatedSection from '../components/common/AnimatedSection';
import AnimatedHeading from '../components/common/AnimatedHeading';
import { SYSTEM_OPTIONS } from '../constants';

const SelectionGroup: React.FC<{ title: string; name: string; options: string[]; selected: string; onChange: (value: string) => void; }> = ({ title, name, options, selected, onChange }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {options.map((option) => (
        <label key={option} className={`cursor-pointer p-4 border rounded-lg text-center transition-all duration-200 ${selected === option ? 'bg-green-600 text-white border-green-600 shadow-lg' : 'bg-white hover:border-green-400'}`}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={selected === option}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <span className="font-medium">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

const BuildSystemPage: React.FC = () => {
  const [config, setConfig] = useState({
    capacity: SYSTEM_OPTIONS.capacities[0],
    panel: SYSTEM_OPTIONS.panels[0],
    inverter: SYSTEM_OPTIONS.inverters[0],
    structure: SYSTEM_OPTIONS.structures[0],
  });

  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleConfigChange = (field: keyof typeof config, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Custom Solar System Quote for ${contact.name}`;
    const body = `
      A new custom solar system quote has been requested.
      --------------------------------------------------
      CUSTOMER DETAILS:
      Name: ${contact.name}
      Email: ${contact.email}
      Phone: ${contact.phone || 'Not provided'}
      --------------------------------------------------
      SYSTEM CONFIGURATION:
      - System Capacity: ${config.capacity}
      - Solar Panel Company: ${config.panel}
      - Inverter: ${config.inverter}
      - Structure Type: ${config.structure}
      --------------------------------------------------
    `;

    const mailtoLink = `mailto:greenturnsolarcare@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setFormSubmitted(true);
  };

  return (
    <PageWrapper
      title="Build Your Custom Solar System"
      subtitle="Select your preferred components to design a system that fits your needs perfectly. Submit your configuration to get a personalized quote from our experts."
      className="bg-gray-50"
    >
      <AnimatedSection>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
          <form onSubmit={handleSubmit}>
            <SelectionGroup
              title="1. Select System Capacity"
              name="capacity"
              options={SYSTEM_OPTIONS.capacities}
              selected={config.capacity}
              onChange={(value) => handleConfigChange('capacity', value)}
            />

            <SelectionGroup
              title="2. Select Solar Panel Company"
              name="panel"
              options={SYSTEM_OPTIONS.panels}
              selected={config.panel}
              onChange={(value) => handleConfigChange('panel', value)}
            />

            <SelectionGroup
              title="3. Select Inverter"
              name="inverter"
              options={SYSTEM_OPTIONS.inverters}
              selected={config.inverter}
              onChange={(value) => handleConfigChange('inverter', value)}
            />

            <SelectionGroup
              title="4. Select Structure Type"
              name="structure"
              options={SYSTEM_OPTIONS.structures}
              selected={config.structure}
              onChange={(value) => handleConfigChange('structure', value)}
            />

            <div className="mt-12 pt-8 border-t border-gray-200">
               <AnimatedHeading el="h3" text="5. Your Contact Information" className="text-2xl font-bold text-center mb-6 text-gray-800" />
               <div className="max-w-lg mx-auto space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input type="text" id="name" name="name" required placeholder="Your Name" value={contact.name} onChange={handleContactChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" id="email" name="email" required placeholder="Your Email Address" value={contact.email} onChange={handleContactChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">Phone</label>
                    <input type="tel" id="phone" name="phone" placeholder="Your Phone Number (Optional)" value={contact.phone} onChange={handleContactChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-transform hover:scale-105 text-lg">
                    Get Quote via Email
                  </button>
               </div>
               {formSubmitted && (
                 <div className="max-w-lg mx-auto mt-6 p-4 bg-green-100 border border-green-200 rounded-md text-gray-800 animate-fade-in">
                   <h4 className="font-bold">Thank you!</h4>
                   <p className="mt-2 text-sm">
                     Your email client should be open with your custom quote request. Please review and click 'Send' to deliver it to our team.
                   </p>
                   <p className="mt-2 text-xs">
                     If it didn't open, please manually send your request to{' '}
                     <a href="mailto:greenturnsolarcare@gmail.com" className="font-semibold text-green-700 hover:underline">
                       greenturnsolarcare@gmail.com
                     </a>.
                   </p>
                 </div>
               )}
            </div>
          </form>
        </div>
      </AnimatedSection>
    </PageWrapper>
  );
};

export default BuildSystemPage;