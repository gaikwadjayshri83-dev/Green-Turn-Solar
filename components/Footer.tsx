import React from 'react';
import { NAV_LINKS } from '../constants';
import ImageWithSpinner from './common/ImageWithSpinner';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-all duration-300 transform hover:scale-110">
    {children}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <a href="#home" className="inline-block mb-4">
              <div className="h-10 w-auto">
                <ImageWithSpinner 
                  src="/assets/logo/logo.svg" 
                  alt="Green Turn Solar Logo" 
                  imageClassName="object-contain object-left"
                  containerClassName="bg-transparent"
                />
              </div>
            </a>
            <p className="text-gray-400 text-sm">Powering a sustainable Nagpur, one rooftop at a time.</p>
            <div className="flex space-x-4 mt-4">
                <SocialIcon href="https://www.facebook.com/greenturnsolar">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                </SocialIcon>
                <SocialIcon href="https://www.instagram.com/greenturnsolar">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </SocialIcon>
            </div>
          </div>
          <div className="md:col-span-1"></div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 4).map(link => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-green-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 invisible hidden md:visible">.</h4>
             <ul className="space-y-2">
              {NAV_LINKS.slice(4).map(link => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-green-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
              <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Green Turn Solar. All rights reserved. Website for demonstration purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
