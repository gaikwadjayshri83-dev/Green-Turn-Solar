import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import ImageWithSpinner from './common/ImageWithSpinner';

const Header: React.FC<{ currentRoute: string }> = ({ currentRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white/80 shadow-md backdrop-blur-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center space-x-3">
            <div className="h-10 w-auto">
              <ImageWithSpinner 
                src="/assets/logo/logo.svg" 
                alt="Green Turn Solar Logo" 
                imageClassName="object-contain"
                containerClassName="bg-transparent"
              />
            </div>
          </a>
          
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`font-medium transition-colors pb-1 border-b-2 ${currentRoute === link.href ? 'text-green-600 border-green-600' : 'text-gray-600 border-transparent hover:text-green-600'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden lg:inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500">
            Free Quote
          </a>
          
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <nav className="flex flex-col items-center py-4 space-y-4">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)} 
                className={`font-medium text-lg ${currentRoute === link.href ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform hover:scale-105">
              Free Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
