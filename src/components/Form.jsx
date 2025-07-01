import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const Form = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^\+\d{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFormStatus('Error: Please enter a valid phone number with country code (e.g., +12025550123).');
      return;
    }

    try {
      const response = await axios.post('https://the-omaxestate.com/practicelanding/form-data.php', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [(data) => {
          const params = new URLSearchParams();
          for (const key in data) {
            params.append(key, data[key]);
          }
          return params;
        }]
      });

      if (response.data.status === 'success') {
        setFormStatus('Form submitted successfully!');
        setShowModal(false);
        setFormData({ name: '', phone: '', email: '' });
      } else {
        setFormStatus('Error: ' + response.data.message);
      }
    } catch (error) {
      setFormStatus('Error: Failed to submit form. Please try again.');
      console.error('Form submission error:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormStatus(null);
  };

  return (
    <>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white  p-8 max-w-md w-full relative"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-300 transition duration-200"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal"
            >
              <IoClose size={24} />
            </motion.button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Get In Touch with Luxe Realty
            </h2>
            {formStatus && (
              <p className={`text-center mb-4 ${formStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {formStatus}
              </p>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full p-3  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full p-3  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter your phone number (e.g., +12025550123)"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full p-3  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-[#caaa8591] text-lg border border-solid border text-white py-3 font-semibold transition duration-300 hover:border-dashed hover:border-black hover:bg-[#caaa85] "
                onClick={handleFormSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-paper-plane mr-2"></i> Submit
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Form;