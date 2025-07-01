import React from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaWater, FaLeaf, FaToilet, FaDraftingCompass, FaHardHat } from "react-icons/fa";

function OverView() {
  const leftBackgroundVariants = {
    hidden: { opacity: 0, scale: 1.1, filter: "brightness(0.7)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "brightness(1)",
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
        delayChildren: 0.8,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100, rotate: 5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 1,
      },
    },
  };

  const textHoverVariants = {
    hover: {
      background: "linear-gradient(90deg, #d4a373, #f5e8c7)",
      WebkitBackgroundClip: "text",
      color: "transparent",
      scale: 1.03,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0 8px 20px rgba(202, 170, 133, 0.5)",
      background: "#d4a373",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 1.2,
      },
    },
  };

  const partnerships = [
    {
      title: "Italian Marble",
      subtitle: "Luxurious Italian Marble",
      description:
        "Experience elegance with Italian marble in the master bedroom, washroom, and living area, adding a touch of sophistication to your space.",
      icon: <FaBuilding />,
      color: "bg-green-600",
      alignment: "left",
    },
    {
      title: "Toto, Japan",
      subtitle: "Premium Washroom Fittings",
      description:
        "Enhance your washroom experience with world-class fixtures from the Toto brand, known for quality and style.",
      icon: <FaToilet />,
      color: "bg-red-500",
      alignment: "right",
    },
    {
      title: "WET, USA",
      subtitle: "Stunning Waterfall Design",
      description:
        "Admire the breathtaking waterfall design crafted by WET, adding a serene touch to your environment.",
      icon: <FaWater />,
      color: "bg-orange-500",
      alignment: "left",
    },
    {
      title: "UHA, London",
      subtitle: "Innovative Architecture",
      description:
        "Discover architectural brilliance designed by UHA London, blending aesthetics with functionality.",
      icon: <FaDraftingCompass />,
      color: "bg-sky-600",
      alignment: "right",
    },
    {
      title: "SWA Group, USA",
      subtitle: "Exquisite Landscaping",
      description:
        "Transform your outdoor spaces with the creative landscaping expertise of SWA Group, combining beauty and nature.",
      icon: <FaLeaf />,
      color: "bg-pink-600",
      alignment: "left",
    },
    {
      title: "Leighton, Australia",
      subtitle: "Reliable Construction",
      description:
        "Built to perfection by Leighton, ensuring unmatched quality and durability in every detail.",
      icon: <FaHardHat />,
      color: "bg-emerald-600",
      alignment: "right",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-20 mt-12 px-4 md:px-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Section - Enhanced Background Image with Content */}
          <motion.div
            className="w-full md:w-1/2 relative rounded-2xl overflow-hidden border-4 border-[linear-gradient(45deg, #d4a373, #f5e8c7)] border-image-slice: 1 shadow-[0_10px_30px_rgba(212,163,115,0.4)]"
            variants={leftBackgroundVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/images/highlight-bg.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            {/* Radial Gradient Overlay with Glass Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.3),transparent_70%)] z-10"></div>

            {/* Content Container with Advanced Styling */}
            <motion.div
              className="relative z-20 p-10 md:p-12 backdrop-blur-sm bg-white/30 border border-[#d4a373]/40 rounded-xl"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2
                className="text-5xl md:text-6xl font-extrabold mb-4 text-[#d4a373] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] leading-tight"
                variants={childVariants}
                whileHover={textHoverVariants.hover}
              >
                Overview
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl font-semibold text-black mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                variants={childVariants}
                whileHover={textHoverVariants.hover}
              >
                Ultra Luxury Living at Elan The Emperor
              </motion.p>
              <motion.p
                className="text-lg md:text-xl text-black/90 mb-6 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                variants={childVariants}
              >
                Discover Elan The Emperor, a prestigious development in Sector 106, Dwarka Expressway, Gurgaon. Spanning 30 acres, it offers 4 & 5 BHK apartments and penthouses with world-class amenities, including India’s first 7-star design and 70% green space.
              </motion.p>
              <motion.a
                href="#brochure"
                className="inline-block bg-[#e0bc92] text-black font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                variants={childVariants}
                whileHover={buttonHoverVariants.hover}
                whileTap={{ scale: 0.98 }}
              >
                Download Brochure
              </motion.a>
            </motion.div>

            {/* Decorative Glow and Particle Effect */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle, rgba(212,163,115,0.15) 0%, transparent 60%)] animate-pulse-slow"></div>
            <div className="absolute inset-0 z-0 opacity-10">
              <div className="absolute w-4 h-4 bg-[#d4a373]/50 rounded-full animate-float top-1/4 left-1/3"></div>
              <div className="absolute w-6 h-6 bg-[#d4a373]/40 rounded-full animate-float delay-2000 top-2/3 right-1/4"></div>
            </div>
          </motion.div>

          {/* Right Section - Online Image */}
          <motion.div
            className="w-full md:w-1/2 relative rounded-2xl overflow-hidden border-4 border-[linear-gradient(45deg, #d4a373, #f5e8c7)] border-image-slice: 1"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Elan The Emperor Property"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Additional Content Below */}
        <motion.div
          className="mt-12 p-6 md:p-8 bg-white rounded-xl shadow-lg"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="text-gray-600 mb-4 text-lg"
            variants={childVariants}
          >
            The project ensures assured allotment and an easy booking process. Download the brochure for detailed floor plans, updated prices, and the latest project information. Secure your place in one of the most prestigious addresses on Dwarka Expressway today!
          </motion.p>
          <motion.p
            className="text-gray-600 text-lg"
            variants={childVariants}
          >
            Elan Group showcases excellence by combining modern design with high-quality construction, meeting the evolving needs of urban living. Their strategically located projects offer luxury, convenience, and sustainability, making them a top choice for homebuyers and investors.
          </motion.p>
        </motion.div>

        {/* Count Section */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="bg-[#d4a373]/10 p-6 rounded-lg text-center border border-[#d4a373]/30 hover:bg-[#d4a373]/20 transition-colors duration-300"
            variants={childVariants}
          >
            <h3 className="text-3xl font-bold text-[#d4a373] mb-2">1</h3>
            <p className="text-gray-700 text-sm md:text-base">30 Acres of Luxury</p>
          </motion.div>
          <motion.div
            className="bg-[#d4a373]/10 p-6 rounded-lg text-center border border-[#d4a373]/30 hover:bg-[#d4a373]/20 transition-colors duration-300"
            variants={childVariants}
          >
            <h3 className="text-3xl font-bold text-[#d4a373] mb-2">2</h3>
            <p className="text-gray-700 text-sm md:text-base">4 & 5 BHK Options</p>
          </motion.div>
          <motion.div
            className="bg-[#d4a373]/10 p-6 rounded-lg text-center border border-[#d4a373]/30 hover:bg-[#d4a373]/20 transition-colors duration-300"
            variants={childVariants}
          >
            <h3 className="text-3xl font-bold text-[#d4a373] mb-2">3</h3>
            <p className="text-gray-700 text-sm md:text-base">7-Star Amenities</p>
          </motion.div>
          <motion.div
            className="bg-[#d4a373]/10 p-6 rounded-lg text-center border border-[#d4a373]/30 hover:bg-[#d4a373]/20 transition-colors duration-300"
            variants={childVariants}
          >
            <h3 className="text-3xl font-bold text-[#d4a373] mb-2">4</h3>
            <p className="text-gray-700 text-sm md:text-base">70% Green Space</p>
          </motion.div>
        </motion.div>

        {/* New Timeline Section at Bottom */}
        <motion.div
          className="mt-20 py-16 px-4 md:px-8 bg-gradient-to-r from-gray-200 to-gray-400 rounded-xl shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12 text-center">
            Our Prestigious Partnerships
          </h2>
          <div className="relative max-w-6xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 z-0" />

            {/* Timeline Items */}
            <div className="space-y-16 relative z-10">
              {partnerships.map((item, i) => {
                const isLeft = item.alignment === "left";
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={itemVariants}
                    className={`flex flex-col md:flex-row items-center md:items-stretch ${
                      isLeft ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    {/* Content Box */}
                    <div
                      className={`w-full md:w-1/2 px-4 ${
                        isLeft ? "md:order-1 text-left" : "md:order-2 text-right"
                      }`}
                    >
                      <div className="bg-gray-100 border border-gray-300 shadow-lg rounded-xl p-6 md:p-8">
                        <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                          {item.subtitle}
                        </h4>
                        <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
                      </div>
                    </div>

                    {/* Middle Icon */}
                    <div className="hidden md:flex flex-col items-center justify-center px-4">
                      <div
                        className={`w-14 h-14 rounded-full text-white flex items-center justify-center ${item.color} shadow-md text-2xl`}
                        variants={iconVariants}
                      >
                        {item.icon}
                      </div>
                      <div className="h-16 w-1 bg-gray-300" />
                    </div>

                    {/* Title Label */}
                    <div
                      className={`w-full md:w-1/2 px-4 mt-4 md:mt-0 ${
                        isLeft ? "md:order-2 text-left" : "md:order-1 text-right"
                      }`}
                    >
                      <h3
                        className={`text-2xl md:text-3xl font-bold ${
                          item.color
                        } text-white px-6 py-3 rounded-xl ${
                          isLeft ? "bg-gradient-to-r" : "bg-gradient-to-l"
                        }`}
                        style={{
                          backgroundColor: item.color,
                          display: "inline-block",
                          borderTopLeftRadius: isLeft ? "0.75rem" : "0",
                          borderBottomLeftRadius: isLeft ? "0.75rem" : "0",
                          borderTopRightRadius: isLeft ? "0" : "0.75rem",
                          borderBottomRightRadius: isLeft ? "0" : "0.75rem",
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Custom animations
const styles = `
  @keyframes pulse-slow {
    0% { opacity: 0.15; }
    50% { opacity: 0.3; }
    100% { opacity: 0.15; }
  }
  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
  .animate-pulse-slow { animation: pulse-slow 5s infinite; }
  .animate-float { animation: float 3s infinite; }
  .delay-2000 { animation-delay: 2s; }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default OverView;