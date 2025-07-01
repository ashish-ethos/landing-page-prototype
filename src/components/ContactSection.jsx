import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiPhone, FiMapPin, FiClock } from "react-icons/fi";

function ContactSection() {
  const buttonControls = useAnimation();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    const pulseSequence = async () => {
      await buttonControls.start({ scale: 1.05, transition: { duration: 0.4 } });
      await buttonControls.start({ scale: 1, transition: { duration: 0.4 } });
    };
    const interval = setInterval(pulseSequence, 2000);
    return () => clearInterval(interval);
  }, [buttonControls]);

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
      const response = await axios.post(
        'https://the-omaxestate.com/practicelanding/form-data.php',
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          transformRequest: [(data) => {
            const params = new URLSearchParams();
            for (const key in data) {
              params.append(key, data[key]);
            }
            return params;
          }]
        }
      );

      if (response.data.status === 'success') {
        setFormStatus('Form submitted successfully!');
        setFormData({ name: '', phone: '', email: '' });
      } else {
        setFormStatus('Error: ' + response.data.message);
      }
    } catch (error) {
      setFormStatus('Error: Failed to submit form. Please try again.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <motion.section
      className="w-full flex flex-col md:flex-row bg-gray-100 px-10 md:px-16 py-12 gap-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Left Contact Info */}
      <motion.div
        className="md:w-1/2 w-full px-8 py-12 flex flex-col justify-center bg-white"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-md mx-auto space-y-8 text-gray-800">
          <div className="flex items-start gap-4">
            <FiPhone size={24} className="text-orange-600 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Call Us</h3>
              <p>1 (234) 567-891, 1 (234) 987-654</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FiMapPin size={24} className="text-orange-600 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Location</h3>
              <p>121 Rock Street, 21 Avenue, New York, NY 92103-9000</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FiClock size={24} className="text-orange-600 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Business Hours</h3>
              <p>Mon – Fri: 10 am – 8 pm</p>
              <p>Sat, Sun: Closed</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 pt-6">
            Image from <a href="https://www.freepik.com" className="underline">Freepik</a>
          </p>
        </div>
      </motion.div>

      {/* Right Form */}
      <motion.div
        className="md:w-1/2 w-full px-8 py-12 flex items-center bg-gray-200"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-md w-full mx-auto bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="w-full p-3  border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter a valid email address"
              value={formData.email}
              onChange={handleFormChange}
              required
              className="w-full p-3  border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="phone"
              placeholder="Enter phone with country code e.g. +1234567890"
              value={formData.phone}
              onChange={handleFormChange}
              required
              rows={4}
              className="w-full p-3  border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            ></input>

            {formStatus && (
              <p className={`text-sm text-center ${formStatus.includes("Error") ? "text-red-600" : "text-green-600"}`}>
                {formStatus}
              </p>
            )}

            <motion.button
              type="submit"
              className="w-full bg-[#caaa8591] text-lg border border-solid border text-white py-3 font-semibold transition duration-300 hover:border-dashed hover:border-black hover:bg-[#caaa85] "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={buttonControls}
            >
              Submit
            </motion.button>


          </form>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default ContactSection;
