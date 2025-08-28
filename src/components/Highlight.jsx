import React from "react";
import { motion } from "framer-motion";

function Highlight({ text, number, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative group bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Icon */}
      <div className="mb-3">
        <svg
          className="w-8 h-8 text-black group-hover:text-yellow-600 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            d="M12 17.27L18.18 21l-1.63-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text */}
      <p className="text-gray-800 text-base font-medium group-hover:text-gray-900 transition-colors duration-300">
        {text}
      </p>

      {/* Number */}
      <span className="absolute top-3 right-4 text-gray-300 text-xl font-bold group-hover:text-gray-400 transition-all duration-300">
        {number}
      </span>

      {/* Gradient bottom line on hover */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}

function HighlightsSection() {
  const highlights = [
    "Premium retail shops designed for optimal functionality",
    "Excellent connectivity to major business hubs",
    "State-of-the-art infrastructure with modern amenities",
    "High visibility for retail spaces, ensuring a steady flow of customers",
    "Ample parking spaces for business owners and visitors",
    "Premium Commercial Property in Sector 14 Gurgaon",
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-[#f8f6f1] to-[#fefefe] overflow-hidden">
      {/* Title */}
      <div className="text-center mb-16 z-10 relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm uppercase tracking-widest text-gray-600 font-semibold mb-2"
        >
          Project Highlights
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-800"
        >
          Highlights
        </motion.h2>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10 relative">
        {highlights.map((text, index) => (
          <Highlight key={index} text={text} number={index + 1} delay={index * 0.15} />
        ))}
      </div>

      {/* Glowing background shapes */}
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] bg-yellow-300 opacity-20 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] bg-pink-300 opacity-20 rounded-full filter blur-3xl animate-pulse z-0" />
    </section>
  );
}

export default HighlightsSection;
