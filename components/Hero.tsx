import React from 'react';
import LottieAnimation from './LottieAnimation';
import AnimatedHeading from './common/AnimatedHeading';
import ImageWithSpinner from './common/ImageWithSpinner';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white text-center overflow-hidden">
      {/* Background Image using ImageWithSpinner */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        aria-label="Rooftop solar panels on a modern house in Nagpur"
      >
        <ImageWithSpinner
          src="/images/hero-background.jpg"
          alt="Background image of rooftop solar panels"
          containerClassName="bg-gray-100"
        />
      </div>

      {/* Subtle Looping Background Animation */}
      <div className="absolute inset-0 w-full h-full z-10 opacity-30 mix-blend-soft-light">
        <LottieAnimation animationPath="/assets/lottie/hero-background.json" />
      </div>

      {/* Darkening Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
      
      {/* Content */}
      <div className="relative z-30 p-4 max-w-4xl">
        <AnimatedHeading 
          el="h1"
          text="Power Your Future with Nagpur's #1 Rooftop Solar Installer"
          className="text-4xl md:text-6xl font-extrabold mb-4"
        />
        <p className="text-lg md:text-xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
          Join the solar revolution with Green Turn Solar. Reduce your electricity bills, increase property value, and build a sustainable future.
        </p>
        <a href="#calculator" className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition-transform duration-300 hover:scale-105 inline-block animate-fade-in-up focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-green-500" style={{ animationDelay: '0.4s' }}>
          Calculate Your Savings
        </a>
      </div>
    </section>
  );
};

export default Hero;
