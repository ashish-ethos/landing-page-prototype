import { motion } from "framer-motion";

function FooterSection() {
  return (
    <footer className="py-8 bg-gray-800 text-white text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-lg mb-4">
          Luxe Realty - Your Trusted Real Estate Partner
        </p>
        <div className="flex justify-center space-x-6">
          <motion.a
            href="#"
            className="text-white hover:text-blue-400 transition duration-300"
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <i className="fab fa-facebook-f"></i>
          </motion.a>
          <motion.a
            href="#"
            className="text-white hover:text-blue-400 transition duration-300"
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <i className="fab fa-instagram"></i>
          </motion.a>
          <motion.a
            href="#"
            className="text-white hover:text-blue-400 transition duration-300"
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <i className="fab fa-twitter"></i>
          </motion.a>
        </div>
        <p className="mt-4">© 2025 Luxe Realty. All rights reserved.</p>
      </motion.div>
    </footer>
  );
}

export default FooterSection;