import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import CalculatorPage from './pages/CalculatorPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import BuildSystemPage from './pages/BuildSystemPage';
import TestimonialsPage from './pages/TestimonialsPage';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import LoadingSpinner from './components/common/LoadingSpinner';
import { PAGE_SEO } from './constants';

const routes: { [key: string]: React.ComponentType } = {
  '#home': HomePage,
  '#about': AboutPage,
  '#services': ServicesPage,
  '#calculator': CalculatorPage,
  '#faq': FaqPage,
  '#contact': ContactPage,
  '#gallery': GalleryPage,
  '#build': BuildSystemPage,
  '#testimonials': TestimonialsPage,
};

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#home');
  const [isPageLoading, setIsPageLoading] = useState(false);

  const updateMetaTags = (route: string) => {
    const seoData = PAGE_SEO[route] || PAGE_SEO['#home']; // Fallback to home
    document.title = seoData.title;
    const metaDescription = document.getElementById('meta-description') as HTMLMetaElement | null;
    if (metaDescription) {
      metaDescription.content = seoData.description;
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = window.location.hash || '#home';
      // Don't show spinner if it's the same route
      if (newRoute === currentRoute) return;

      setIsPageLoading(true);

      // Simulate a brief loading period for a smoother UX
      setTimeout(() => {
        setCurrentRoute(newRoute);
        updateMetaTags(newRoute);
        window.scrollTo(0, 0);
        setIsPageLoading(false);
      }, 300);
    };
    
    // Set initial route and meta tags without spinner
    const initialHash = window.location.hash || '#home';
    setCurrentRoute(initialHash);
    updateMetaTags(initialHash);

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentRoute]);

  const Page = routes[currentRoute] || routes['#home'];

  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-white text-gray-800 font-sans">
        <Header currentRoute={currentRoute} />
        <main>
          <AnimatePresence mode="wait">
            {isPageLoading ? (
              <m.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-screen" // Ensure loader takes up space
              >
                <LoadingSpinner message="Loading Page..." />
              </m.div>
            ) : (
              <m.div
                key={currentRoute}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Page />
              </m.div>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </LazyMotion>
  );
};

export default App;        
