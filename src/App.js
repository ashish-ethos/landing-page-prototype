import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";
import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PropertiesSection from "./components/PropertiesSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import GallerySection from "./components/GallerySection";
import FandQSection from "./components/FandQSection";
import OverView from "./components/OverView";

function App() {
  
  const [isLoading, setIsLoading] = useState(true);

 
  const [showBackToTop, setShowBackToTop] = useState(false);


  const [isMenuOpen, setIsMenuOpen] = useState(false);

 
  const [isScrollComplete, setIsScrollComplete] = useState(false);


  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBackToTop(latest > 300);
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    setIsScrollComplete(latest + windowHeight >= documentHeight - 100); 
  });

  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);


  const navItems = [
    { href: "#home", label: "Home", component: "HeroSection" },
    {
      href: "#properties",
      label: "Properties",
      component: "PropertiesSection",
      subItems: [
        { href: "#apartments", label: "Apartments" },
        { href: "#penthouses", label: "Penthouses" },
      ],
    },
    { href: "#overview", label: "Overview", component: "OverView" },
    { href: "#gallery", label: "Gallery", component: "GallerySection" },
    { href: "#faq", label: "FAQ", component: "FandQSection" },
    { href: "#properties", label: "Properties", component: "PropertiesSection"  },
    
    { href: "#about", label: "About", component: "AboutSection" },
    { href: "#contact", label: "Contact", component: "ContactSection" },
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
          onAnimationComplete={() => setIsMenuOpen(false)}
        >
          <motion.i
            className="fas fa-home text-white text-6xl"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Form Modal */}
      <Form />

      {/* Advanced Sticky Navigation Bar */}
      <motion.nav
        className="sticky top-0 z-50 bg-gradient-to-r from-teal-600 via-emerald-700 to-teal-800 backdrop-blur-md bg-opacity-90 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Glow Effect */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(16, 185, 129, 0.7)",
              }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-extrabold text-white">
                Luxe Realty
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  <motion.a
                    href={item.href}
                    className="text-white hover:text-emerald-200 transition duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {item.label}
                  </motion.a>
                  {item.subItems && (
                    <motion.div
                      className="absolute hidden group-hover:block bg-white bg-opacity-90 rounded-md shadow-lg mt-2 py-2 w-40"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-800 hover:bg-emerald-100 transition duration-200"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <motion.button
                className="bg-white text-teal-600 px-4 py-2 rounded-md hover:bg-teal-100 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-emerald-200 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-teal-800 bg-opacity-95 rounded-b-lg">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="block text-white hover:text-emerald-200 transition duration-300 px-3 py-2 rounded-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.button
                  className="w-full bg-white text-teal-600 px-4 py-2 rounded-md hover:bg-teal-100 transition duration-300 mt-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Sections */}
      <HeroSection className="border-1 border-black px-4 max-w-full" />
      <OverView className="border-1 border-red px-4 max-w-full" />
      <AboutSection className="border-1 border-blue max-w-full" />
      <PropertiesSection className="border-1 border-pink max-w-full" />
      <ContactSection className="border-1 border-green px-10 max-w-full" />

      <section
        id="contact"
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
          {/* <Form /> */}
        </motion.div>
      </section>
      <FandQSection />
      <FooterSection />

      {/* Enquiry Button */}
      <motion.div
  className="enquire-tab"
  initial={{ x: 100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
  onClick={() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }}
>
  Enquire Now check
</motion.div>


      {/* Download Button (Bottom Corner) */}
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
          <i className="fas fa-download"><FaArrowUp /></i>
        </motion.a>
      )}
    </div>
  );
}

export default App;
