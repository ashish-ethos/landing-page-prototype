import React, { useState } from "react";
import { motion } from "framer-motion";
import Form from "./Form"; // Adjust path if needed

function PriceCard({ title, size, price, index, onEnquireClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative bg-[#fdf9f0] p-6 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition duration-300"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-700">
        <strong>Size :</strong> {size}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        <strong>Price :</strong> {price}
      </p>
      <button
        onClick={onEnquireClick}
        className="bg-[#e8d7ae] text-gray-800 text-sm font-medium py-2 px-4 rounded-sm 
             border border-transparent hover:border-dashed hover:border-black 
             hover:bg-[#caaa85] transition duration-300"
      >
        Enquire Now
      </button>

      <span className="absolute bottom-3 right-3 text-4xl text-gray-300 font-bold opacity-30">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

function PriceListSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const priceList = [
    { title: "Retail Shops(LGF)", size: "699 Sq. Ft.", price: "₹ 1.49 Cr*" },
    { title: "Retail Shops(First Floor)", size: "608 Sq. Ft.", price: "On Request" },
    { title: "Premium Lockable Shop", size: "300 Sq. Ft.", price: "₹ 75 LACS" },
    { title: "Multiplex", size: "6000 Sq. Ft.", price: "On Request" },
    { title: "Clubhouse", size: "On Request", price: "On Request" },
    { title: "3 BHK Apartment", size: "On Request", price: "On Request" },
  ];

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <section className="relative py-16 px-4 bg-[#f7f4ee] overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 z-10 relative">
        <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold mb-1">
          Project Price List
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Price List</h2>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
        {priceList.map((item, i) => (
          <PriceCard key={i} {...item} index={i} onEnquireClick={openForm} />
        ))}
      </div>

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/bg-pattern.png"
          alt="bg pattern"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Form Modal */}
      {isFormOpen && <Form onClose={closeForm} />}
    </section>
  );
}

export default PriceListSection;
