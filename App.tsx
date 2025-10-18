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
      setCurrentRoute(window.location.hash || '#home');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const Page = routes[currentRoute] || routes['#home'];

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header currentRoute={currentRoute} />
      <main>
        <Page />
      </main>
      <Footer />
    </div>
  );
};

export default App;
