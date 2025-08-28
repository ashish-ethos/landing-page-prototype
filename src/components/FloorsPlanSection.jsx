import React from "react";
import { motion } from "framer-motion";

import lowerGround from "../assets/images/retail-min.png";
import first from "../assets/images/first-floor-min.png";
import second from "../assets/images/second-min.png";
import third from "../assets/images/multiplex-min.png";
import fourth from "../assets/images/fourth-min.png";
import fifth from "../assets/images/fifth-zoom.png";
import sixth from "../assets/images/studio-min.png";

const floors = [
  { title: "Lower Ground Floor", image: lowerGround },
  { title: "First Floor", image: first },
  { title: "Second Floor", image: second },
  { title: "Third Floor", image: third },
  { title: "Fourth Floor", image: fourth },
  { title: "Fifth Floor", image: fifth },
  { title: "Sixth Floor", image: sixth },
];

function FloorPlansSection() {
  return (
    <section className="py-16 px-4 bg-[#f9f6ef]">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-gray-500 font-medium">
          Project Floors Plan
        </p>
        <h2 className="text-4xl font-bold text-gray-800 mt-1">Plans</h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {floors.map((floor, index) => (
          <motion.div
            key={index}
            className="relative border bg-white rounded-md overflow-hidden shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Floor Image */}
            <img
              src={floor.image}
              alt={floor.title}
              className="w-full h-56 object-contain"
            />

            {/* Blur Overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/30 pointer-events-none" />

            {/* Title */}
            <div className="relative bg-yellow-300 text-center py-2 text-gray-800 font-semibold text-lg z-10">
              {floor.title}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FloorPlansSection;
