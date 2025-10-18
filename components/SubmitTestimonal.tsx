import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import AnimatedSection from '../components/common/AnimatedSection';
import AnimatedHeading from '../components/common/AnimatedHeading';

const SubmitTestimonialPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    quote: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, location, quote } = formData;
    
    const subject = `New Testimonial Submission from ${name}`;
    const body = `
      You have a new testimonial submission from your website:
      --------------------------------------------------
      Name: ${name}
      Location: ${location}
      --------------------------------------------------
      Testimonial:
      "${quote}"
    `;

    const mailtoLink = `mailto:greenturnsolarcare@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setFormSubmitted(true);
  };

  return (
    <PageWrapper
      title="Share Your Experience"
      subtitle="We'd love to hear about your journey with Green Turn Solar. Your feedback helps us improve and inspires others to go solar."
      className="bg-gray-50"
    >
      <AnimatedSection>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
          <AnimatedHeading el="h2" text="Submit Your Testimonial" className="text-3xl font-bold text-gray-800 mb-6 text-center" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., A. Sharma"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Your Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Ramdaspeth, Nagpur"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="quote" className="block text-sm font-medium text-gray-700">Your Testimonial</label>
              <textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Share your experience with us..."
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-transform hover:scale-105 text-lg"
              >
                Submit My Testimonial
              </button>
            </div>
          </form>

          {formSubmitted && (
            <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-md text-gray-800 animate-fade-in text-center">
              <h4 className="font-bold">Thank you for your feedback!</h4>
              <p className="mt-2 text-sm">
                Your email client should now be open. Please review and click 'Send' to deliver your testimonial to our team.
              </p>
              <p className="mt-2 text-xs">
                If it didn't open, please manually send your message to{' '}
                <a href="mailto:greenturnsolarcare@gmail.com" className="font-semibold text-green-700 hover:underline">
                  greenturnsolarcare@gmail.com
                </a>.
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </PageWrapper>
  );
};

export default SubmitTestimonialPage;
