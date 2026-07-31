import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Compass, PhoneCall, ChevronRight } from "lucide-react";
import { Button } from "../common/Button";
import { useEnquiry } from "../../context/EnquiryContext";

export function Navbar({ isDark, toggleDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openEnquiryModal } = useEnquiry();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Packages", path: "/packages" },
    { name: "About Us", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass py-3 shadow-md"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 text-white"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-[#E85D3D] flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:rotate-12">
              <Compass className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-xl md:text-2xl font-bold tracking-tight ${
                scrolled ? "text-[var(--text-primary)]" : "text-white"
              }`}>
                Travel <span className="text-[#E85D3D]">Culture</span>
              </span>
              <span className={`text-[10px] uppercase tracking-widest font-semibold -mt-1 ${
                scrolled ? "text-[var(--text-secondary)]" : "text-white/80"
              }`}>
                Wanderlust Editorial
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium text-sm transition-colors duration-300 ${
                    scrolled
                      ? isActive
                        ? "text-[#E85D3D] font-semibold"
                        : "text-[var(--text-primary)] hover:text-[#E85D3D]"
                      : isActive
                      ? "text-[#F2B84B] font-semibold"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E85D3D] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Theme"
              className={`p-2 rounded-full transition-colors ${
                scrolled
                  ? "text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isDark ? <Sun className="w-5 h-5 text-[#F2B84B]" /> : <Moon className="w-5 h-5" />}
            </button>

            <Button
              size="sm"
              onClick={() => openEnquiryModal()}
              icon={PhoneCall}
            >
              Enquire Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Theme"
              className={`p-2 rounded-full ${scrolled ? "text-[var(--text-primary)]" : "text-white"}`}
            >
              {isDark ? <Sun className="w-5 h-5 text-[#F2B84B]" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Menu"
              className={`p-2 rounded-lg ${scrolled ? "text-[var(--text-primary)]" : "text-white"}`}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[var(--bg)] flex flex-col p-6 lg:hidden"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-color)]">
              <Link to="/" className="flex items-center gap-2">
                <Compass className="w-7 h-7 text-[#E85D3D]" />
                <span className="font-serif text-xl font-bold">
                  Travel <span className="text-[#E85D3D]">Culture</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-black/5 dark:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 my-auto">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center justify-between text-xl font-serif font-medium py-2 border-b border-[var(--border-color)]/40 text-[var(--text-primary)]"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-5 h-5 text-[#E85D3D]" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-6 flex flex-col gap-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal();
                }}
                icon={PhoneCall}
              >
                Enquire Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
