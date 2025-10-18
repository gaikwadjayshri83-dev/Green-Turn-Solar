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
import { updateMetaTags } from './utils/seo.ts';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

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

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = window.location.hash || '#home';
      if (newRoute !== currentRoute) {
        setCurrentRoute(newRoute);
        window.scrollTo(0, 0);
      }
    };
    
    // Set initial route
    const initialHash = window.location.hash || '#home';
    setCurrentRoute(initialHash);

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
            <m.div
              key={currentRoute}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
