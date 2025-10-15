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
      setCurrentRoute(newRoute);
      updateMetaTags(newRoute);
      window.scrollTo(0, 0);
    };
    
    // Set initial route and meta tags
    const initialHash = window.location.hash || '#home';
    setCurrentRoute(initialHash);
    updateMetaTags(initialHash);

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Run only once on component mount

  const Page = routes[currentRoute] || routes['#home'];

  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-white text-gray-800 font-sans">
        <Header currentRoute={currentRoute} />
        <main>
          <AnimatePresence mode="wait">
            <m.div
              key={currentRoute}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Page />
            </m.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </LazyMotion>
  );
};

export default App;
