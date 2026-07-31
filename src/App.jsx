import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";

import { useLenis } from "./hooks/useLenis";
import { useDarkMode } from "./hooks/useDarkMode";
import { EnquiryProvider } from "./context/EnquiryContext";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { WhatsAppFloat } from "./components/common/WhatsAppFloat";

import { Home } from "./pages/Home";
import { Destinations } from "./pages/Destinations";
import { DestinationDetail } from "./pages/DestinationDetail";
import { Packages } from "./pages/Packages";
import { PackageDetail } from "./pages/PackageDetail";
import { About } from "./pages/About";
import { Gallery } from "./pages/Gallery";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useLenis();
  const { isDark, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  return (
    <HelmetProvider>
      <EnquiryProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-300">
          <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />

          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route path="/destinations/:slug" element={<DestinationDetail />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/packages/:slug" element={<PackageDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </div>

          <Footer />
          <WhatsAppFloat />
        </div>
      </EnquiryProvider>
    </HelmetProvider>
  );
}
