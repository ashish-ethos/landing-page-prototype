import React from 'react';
import { motion } from "framer-motion";
function Thankyou() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-600 mb-8">Your submission has been received.</p>
      <motion.button
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go Back
      </motion.button>
    </motion.div>
  );
}
export default Thankyou;