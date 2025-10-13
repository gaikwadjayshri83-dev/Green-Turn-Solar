import React from 'react';
import AnimatedSection from './common/AnimatedSection';
import AnimatedHeading from './common/AnimatedHeading';

const testimonials = [
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

const Testimonials: React.FC = () => {
  return (
    <AnimatedSection id="testimonials" className="py-20 bg-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedHeading text="What Our Customers Say" className="text-3xl font-bold text-gray-800" />
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            We are proud to have powered homes and businesses across Nagpur with reliable solar energy.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
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
      </div>
    </AnimatedSection>
  );
};

export default Testimonials;
