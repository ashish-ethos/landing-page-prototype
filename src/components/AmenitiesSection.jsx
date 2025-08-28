import React from "react";
import { motion } from "framer-motion";

// Static image imports (after moving them to src/assets/images/)
import amenities02 from "../assets/images/amenities02.png";
import amenities03 from "../assets/images/amenities03.png";
import amenities04 from "../assets/images/amenities04.png";
import amenities05 from "../assets/images/amenities05.png";
import amenities06 from "../assets/images/amenities06.png";
import amenities07 from "../assets/images/amenities07.png";
import ami1 from "../assets/images/ami-1.png";
import bgPattern from "../assets/images/amenities07.png";
import placeholder from "../assets/images/amenities07.png";

const amenities = [
  { title: "Multiplex PVR", image: amenities02 },
  { title: "Savour The Flavours", image: amenities03 },
  { title: "SPA & Massage", image: amenities04 },
  { title: "Shopping", image: amenities05 },
  { title: "Private Club", image: amenities06 },
  { title: "Restaurant ", image: amenities07 },
  { title: "Fitness Center", image: ami1 },
];

function AmenityCard({ title, image, index }) {
  const handleError = (e) => {
    e.currentTarget.src = placeholder;
  };

  return (
    <motion.div
      className="relative group rounded-md overflow-hidden shadow-md hover:shadow-lg transition"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <img
        src={image}
        alt={title}
        onError={handleError}
        className="w-full h-60 object-cover  transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute text-lg top-0 left-0 w-full bg-gradient-to-b from-black/70 to-transparent text-white  font-semibold text-center py-2 px-2">
        {title}
      </div>
    </motion.div>
  );
}

function AmenitiesSection() {
  return (
    <section className="relative bg-[#f9f6ef] py-16 px-4 overflow-hidden">
      <div className="text-center mb-12 z-10 relative">
        <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-1">
          Project Amenities
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Amenities
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-10 relative">
        {amenities.map((item, index) => (
          <AmenityCard key={index} {...item} index={index} />
        ))}
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={bgPattern}
          alt="Background Pattern"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
    </section>
  );
}

export default AmenitiesSection;
