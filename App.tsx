import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import CalculatorPage from "./pages/CalculatorPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import BuildSystemPage from "./pages/BuildSystemPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfServices from "./pages/TermsOfServices";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Hash-based routes for single-page sections
const hashRoutes: { [key: string]: React.ComponentType } = {
  "#home": HomePage,
  "#about": AboutPage,
  "#services": ServicesPage,
  "#calculator": CalculatorPage,
  "#faq": FaqPage,
  "#contact": ContactPage,
  "#gallery": GalleryPage,
  "#build": BuildSystemPage,
  "#testimonials": TestimonialsPage,
};

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState(
    window.location.hash || "#home"
  );
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [pathRoute, setPathRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === currentRoute) return;
      setIsPageLoading(true);

      setTimeout(() => {
        setCurrentRoute(window.location.hash || "#home");
        window.scrollTo(0, 0);
        setIsPageLoading(false);
      }, 300);
    };

    const handlePathChange = () => {
      setPathRoute(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handlePathChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handlePathChange);
    };
  }, [currentRoute]);

  // Choose correct page (path-based or hash-based)
  let Page: React.ComponentType;
  if (pathRoute === "/privacy-policy") Page = PrivacyPolicy;
  else if (pathRoute === "/terms-of-services") Page = TermsOfServices;
  else Page = hashRoutes[currentRoute] || hashRoutes["#home"];

  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-white text-gray-800 font-sans min-h-screen flex flex-col">
        <Header currentRoute={currentRoute} />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {isPageLoading ? (
              <m.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-screen flex items-center justify-center"
              >
                <LoadingSpinner message="Loading Page..." />
              </m.div>
            ) : (
              <m.div
                key={currentRoute + pathRoute}
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
