

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// --- PageLoader Component (Inlined to fix build error) ---
const PageLoader: React.FC = () => {
  return (
    <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 250px)' }}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );
};

const pageMeta = {
  '/': { 
    title: 'Green Turn Solar | Rooftop Solar Installation in Nagpur', 
    description: 'Leading rooftop solar panel installation and maintenance services in Nagpur. Get a free quote from Green Turn Solar for sustainable energy solutions for your home or business.' 
  },
  '/about': { 
    title: 'About Us | Green Turn Solar', 
    description: "Learn about Green Turn Solar, Nagpur's trusted local experts in rooftop solar. Discover our mission to make clean energy accessible and our commitment to quality and service." 
  },
  '/services': { 
    title: 'Solar Solutions & Services | Green Turn Solar Nagpur', 
    description: 'Explore comprehensive solar solutions from Green Turn Solar in Nagpur, including rooftop installation, maintenance, repair, and free expert consultations for your energy needs.' 
  },
  '/calculator': { 
    title: 'Solar Savings Calculator | Green Turn Solar Nagpur', 
    description: 'Calculate your potential savings with our AI-powered solar calculator. Estimate costs, savings, and EMI options for a rooftop solar system in Nagpur.' 
  },
  '/faq': { 
    title: 'FAQ | Green Turn Solar Nagpur', 
    description: 'Find answers to frequently asked questions about solar panel installation, costs, savings, and maintenance in Nagpur. Get expert insights from Green Turn Solar.' 
  },
  '/contact': { 
    title: 'Contact Us | Green Turn Solar Nagpur', 
    description: 'Contact Green Turn Solar for a free quote or consultation. Reach out to our Nagpur office via phone, email, or our contact form to start your solar journey.' 
  },
  '/gallery': { 
    title: 'Project Gallery | Green Turn Solar Nagpur', 
    description: "View our gallery of completed residential and commercial rooftop solar projects in Nagpur. See the quality and craftsmanship of Green Turn Solar's installations." 
  },
  '/build': { 
    title: 'Build Your Solar System | Green Turn Solar Nagpur', 
    description: "Design your own custom rooftop solar system. Select panels, inverters, and more with Green Turn Solar's system builder and get a personalized quote for your Nagpur property." 
  },
  '/testimonials': { 
    title: 'Customer Testimonials | Green Turn Solar Nagpur', 
    description: 'Read testimonials and reviews from satisfied Green Turn Solar customers across Nagpur. Discover why we are the top-rated choice for rooftop solar installation.' 
  },
};

// Lazy load page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const BuildSystemPage = lazy(() => import('./pages/BuildSystemPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));

const routes: { [key: string]: React.LazyExoticComponent<React.ComponentType> } = {
  '/': HomePage,
  '/about': AboutPage,
  '/services': ServicesPage,
  '/calculator': CalculatorPage,
  '/faq': FaqPage,
  '/contact': ContactPage,
  '/gallery': GalleryPage,
  '/build': BuildSystemPage,
  '/testimonials': TestimonialsPage,
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href && anchor.target !== '_blank' && anchor.getAttribute('rel') !== 'noopener noreferrer') {
        const url = new URL(anchor.href);
        if (url.origin === window.location.origin) {
          e.preventDefault();
          if (url.pathname !== currentPath) {
            navigate(url.pathname);
          }
        }
      }
    };
    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [currentPath]);
  
  useEffect(() => {
    const meta = pageMeta[currentPath as keyof typeof pageMeta] || pageMeta['/'];
    document.title = meta.title;
    
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    
    // Update Open Graph and Twitter card meta tags
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', meta.description);

    const canonicalUrl = window.location.origin + currentPath;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[property="twitter:url"]')?.setAttribute('content', canonicalUrl);

    window.scrollTo(0, 0);
  }, [currentPath]);

  const Page = routes[currentPath] || routes['/'];

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header currentPath={currentPath} />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Page />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
