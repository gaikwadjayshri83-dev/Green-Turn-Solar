import React, { useState, useEffect } from 'react';
import AnimatedHeading from './common/AnimatedHeading';

const initialTestimonials = [
  {
    quote: "Green Turn Solar made the entire process seamless. Our electricity bill has dropped by 90%! The team was professional and knowledgeable. Highly recommended for anyone in Nagpur.",
    name: "A. Sharma",
    location: "Ramdaspeth, Nagpur",
  },
  {
    quote: "I was impressed with their technical expertise. They designed the perfect system for our commercial establishment. The investment is already paying for itself. Fantastic service!",
    name: "R. Patel",
    location: "MIDC, Nagpur",
  },
  {
    quote: "From the initial consultation to the final installation, everything was handled perfectly. The team answered all my questions patiently. I'm proud to be generating my own clean energy.",
    name: "S. Deshpande",
    location: "Manish Nagar, Nagpur",
  }
];

const DefaultAvatar: React.FC = () => (
    <div className="w-14 h-14 rounded-full mr-4 bg-gray-200 flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
        </svg>
    </div>
);

interface TestimonialsProps {
  limit?: number;
}

const TESTIMONIALS_STORAGE_KEY = 'green-turn-solar-testimonials';

const Testimonials: React.FC<TestimonialsProps> = ({ limit }) => {
  const [testimonials, setTestimonials] = useState(() => {
    try {
      const storedTestimonials = window.localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
      return storedTestimonials ? JSON.parse(storedTestimonials) : initialTestimonials;
    } catch (error) {
      console.error("Error reading testimonials from localStorage", error);
      return initialTestimonials;
    }
  });
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', quote: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
    } catch (error) {
      console.error("Error saving testimonials to localStorage", error);
    }
  }, [testimonials]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.location && formData.quote) {
      setTestimonials(prev => [formData, ...prev]);
      setFormData({ name: '', location: '', quote: '' });
      setShowForm(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000); // Hide message after 5 seconds
    }
  };
  
  const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <AnimatedHeading text="What Our Customers Say" className="text-3xl font-bold text-gray-800" />
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          We are proud to have powered homes and businesses across Nagpur with reliable solar energy.
        </p>
      </div>

      {/* Submission Success Message */}
      {submitted && (
        <div className="max-w-3xl mx-auto mb-8 p-4 bg-green-100 border border-green-200 rounded-md text-center text-green-800 animate-fade-in">
          <p className="font-semibold">Thank you! Your story has been shared.</p>
        </div>
      )}

      {/* Add Testimonial Form - Don't show on limited homepage view */}
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
                        Submit
                    </button>
                    </div>
                </form>
                </div>
            )}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
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
