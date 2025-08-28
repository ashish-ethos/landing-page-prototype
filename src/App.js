import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa6";
import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import GallerySection from "./components/GallerySection";
import HighlightsSection from "./components/Highlight";
import PriceListSection from "./components/PriceListSection";
import AmenitiesSection from "./components/AmenitiesSection";
import FloorPlansSection from "./components/FloorsPlanSection";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrollComplete, setIsScrollComplete] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBackToTop(latest > 300);
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    setIsScrollComplete(latest + windowHeight >= documentHeight - 100);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsFormOpen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#overview", label: "Overview" },
    { href: "#highlights", label: "Highlights" },
    { href: "#pricelist", label: "Price List" },
    { href: "#amenities", label: "Amenities" },
    { href: "#floorplans", label: "Floor Plans" },
    { href: "#gallery", label: "Gallery" },
    { href: "#location", label: "Location" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans overflow-x-hidden relative">
      {/* Loading Animation */}
      {isLoading && (
        <motion.div
          className="loading-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <motion.i
            className="fas fa-home text-white text-6xl"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Form Modal */}
      {isFormOpen && <Form onClose={() => setIsFormOpen(false)} />}

      {/* Sticky Navbar */}
      <motion.nav
        className="sticky top-0 z-50 bg-gradient-to-r from-[#e8d7ae] via-[#f1e4c0] to-[#555555] backdrop-blur-md bg-opacity-95 shadow-lg
"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              className="flex-shrink-0"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)",
              }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-extrabold text-black">
                SPJ Vedatam
              </h1>
            </motion.div>

            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="text-black hover:text-gray-500 transition duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                className="bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFormOpen(true)} // ✅ Enquiry button opens form
              >
                +91 8744964496
              </motion.button>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-700 focus:outline-none"
              >
                <motion.svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16m-7 6h7"
                    }
                  />
                </motion.svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-indigo-800 bg-opacity-95 rounded-b-lg">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="block text-white hover:text-gray-700 transition duration-300 px-3 py-2 rounded-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.button
                  className="w-full bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition duration-300 mt-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsFormOpen(true); // ✅ Also open form from mobile menu
                  }}
                >
                  Get in Touch
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Sections */}
      <section id="home">
        <HeroSection className="border-1 border-black px-4 max-w-full" />
      </section>

      <section id="about">
        <AboutSection className="border-1 border-blue max-w-full" />
      </section>


      <section id="highlights">
        <HighlightsSection />
      </section>

      <section id="pricelist">
        <PriceListSection />
      </section>

      <section id="amenities">
        <AmenitiesSection />
      </section>

      <section id="floorplans">
        <FloorPlansSection />
      </section>

      <section
        id="gallery"
        className="py-16 px-4 bg-[#caaa85ad] text-white text-center max-w-full"
      >
        <motion.div
          className="w-auto mx-auto px-4 md:px-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <GallerySection className="px-10 max-w-full" />
        </motion.div>
      </section>

      <section id="location">
        <ContactSection className="border-1 border-green px-10 max-w-full" />
      </section>

      <FooterSection />

      {/* Enquiry Button (Floating) */}
      <motion.div
        className="enquire-tab"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        onClick={() => setIsFormOpen(true)} // ✅ opens form
        whileHover={{ scale: 1.05, backgroundColor: "#ab893b" }}
        whileTap={{ scale: 0.95 }}
      >
        Enquire Now
      </motion.div>

      {/* Back to Top */}
      {showBackToTop && (
        <motion.a
          href="#home"
          className="download-button"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp />
        </motion.a>
      )}

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/8744964496"
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaWhatsapp className="text-2xl" />
      </motion.a>
    </div>
  );
}

export default App;
