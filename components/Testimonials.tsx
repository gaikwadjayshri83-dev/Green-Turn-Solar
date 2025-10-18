import React, { useState, useEffect } from 'react';
import AnimatedHeading from './common/AnimatedHeading';
import Spinner from './common/Spinner';

interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

const DefaultAvatar: React.FC = () => (
    <div className="w-14 h-14 rounded-full mr-4 bg-gray-200 flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
        </svg>
    </div>
);

interface TestimonialsProps {
  limit?: number;
  showHeading?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ limit, showHeading = true }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', quote: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/assets/data/testimonials.json');
        if (!response.ok) {
          throw new Error('Could not fetch testimonials.');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.location && formData.quote) {
      const subject = `New Testimonial Submission from ${formData.name}`;
      const body = `
        A new testimonial has been submitted for review:
        --------------------------------------------------
        Name: ${formData.name}
        Location: ${formData.location}
        --------------------------------------------------
        Testimonial:
        "${formData.quote}"
      `;

      const mailtoLink = `mailto:greenturnsolarcare@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      setFormData({ name: '', location: '', quote: '' });
      setShowForm(false);
      setSubmitted(true);
    }
  };
  
  const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {showHeading && (
        <div className="text-center mb-12">
          <AnimatedHeading text="What Our Customers Say" className="text-3xl font-bold text-gray-800" />
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            We are proud to have powered homes and businesses across Nagpur with reliable solar energy.
          </p>
        </div>
      )}

      {submitted && (
        <div className="max-w-3xl mx-auto mb-8 p-4 bg-green-100 border border-green-200 rounded-md text-center text-green-800 animate-fade-in">
          <h4 className="font-bold">Thank you!</h4>
          <p className="mt-2 text-sm">
            Your email client should now be open. Please review and click 'Send' to deliver your story to our team.
          </p>
        </div>
      )}

      {!limit && (
        <div className="text-center mb-12">
            {!showForm ? (
                <button
                onClick={() => setShowForm(true)}
                className="bg-white text-green-600 font-bold py-3 px-8 rounded-full border-2 border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                Share Your Story
                </button>
            ) : (
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-left animate-fade-in-down">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Share Your Experience</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="e.g., A. Sharma" />
                    </div>
                    <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Your Location</label>
                    <input type="text" name="location" id="location" value={formData.location} onChange={handleInputChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="e.g., Ramdaspeth, Nagpur" />
                    </div>
                    <div>
                    <label htmlFor="quote" className="block text-sm font-medium text-gray-700">Your Story</label>
                    <textarea name="quote" id="quote" value={formData.quote} onChange={handleInputChange} required rows={4} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Tell us about your experience..."></textarea>
                    </div>
                    <div className="flex justify-end space-x-4">
                    <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors">
                        Submit for Review
                    </button>
                    </div>
                </form>
                </div>
            )}
        </div>
      )}

      {isLoading && <div className="flex justify-center items-center h-40"><Spinner className="h-12 w-12 text-green-600" /></div>}
      {error && <div className="text-center text-red-600 bg-red-100 p-4 rounded-md">{error}</div>}
      
      {!isLoading && !error && (
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
              <div className="flex-grow">
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center mt-auto">
                <DefaultAvatar />
                <div>
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {limit && testimonials.length > limit && (
        <div className="text-center mt-12">
            <a 
              href="#testimonials"
              className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition-transform duration-300 hover:scale-105 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 focus-visible:ring-green-500"
            >
              Read More Stories
            </a>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
