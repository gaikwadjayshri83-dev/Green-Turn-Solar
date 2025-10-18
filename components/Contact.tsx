import React, { useState } from 'react';
import AnimatedSection from './common/AnimatedSection';
import AnimatedHeading from './common/AnimatedHeading';

const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    const subject = `New Inquiry from ${name}`;
    const body = `
      You have a new message from your website contact form:
      --------------------------------------------------
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      --------------------------------------------------
      Message:
      ${message}
    `;

    const mailtoLink = `mailto:greenturnsolarcare@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setFormSubmitted(true);
    // Form is not reset to allow users to copy text if mailto fails.
  };

  return (
    <AnimatedSection id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedHeading text="Get in Touch" className="text-3xl font-bold text-gray-800" />
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Ready to make the switch to solar? Contact us today for a free, no-obligation consultation and quote.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input type="text" id="name" name="name" required placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input type="email" id="email" name="email" required placeholder="Your Email Address" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input type="tel" id="phone" name="phone" placeholder="Your Phone Number (Optional)" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea id="message" name="message" required rows={4} placeholder="How can we help you?" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-transform hover:scale-105">
                  Send Message via Email
                </button>
              </div>
            </form>
            {formSubmitted && (
              <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-md text-gray-800 animate-fade-in">
                <h4 className="font-bold">Thank you!</h4>
                <p className="mt-2 text-sm">
                  Your email client should now be open. Please review and click 'Send' to deliver your message.
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
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">Contact Information</h3>
              <p className="text-gray-600 mt-2">
                Feel free to call us or visit our office during business hours. We're always happy to talk about solar!
              </p>
              <div className="space-y-4 mt-4">
                  <div className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <div className="ml-4">
                          <h4 className="font-semibold text-gray-700">Our Office</h4>
                          <p className="text-gray-600">Ramtilak Co-operative Housing Society, 149, Vittal Nagar 1, Manewada, Nagpur, Maharashtra 440034</p>
                      </div>
                  </div>
                  <div className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <div className="ml-4">
                          <h4 className="font-semibold text-gray-700">Phone</h4>
                          <p className="text-gray-600">8857935078, 9529473748</p>
                      </div>
                  </div>
                  <div className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <div className="ml-4">
                          <h4 className="font-semibold text-gray-700">Email</h4>
                          <p className="text-gray-600">greenturnsolarcare@gmail.com</p>
                      </div>
                  </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">Our Location</h3>
              <div className="mt-4 rounded-lg overflow-hidden shadow-md">
                <iframe
                    src="https://maps.google.com/maps?q=21.0972211517598,79.11483163066299&z=15&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Green Turn Solar Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
