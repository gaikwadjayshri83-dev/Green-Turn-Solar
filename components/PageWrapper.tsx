import React from 'react';
import AnimatedHeading from './common/AnimatedHeading';

interface PageWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`animate-fade-in pt-28 pb-16 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <AnimatedHeading
              el="h1"
              text={title}
              className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
            />
            {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
