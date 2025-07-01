import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

function FandQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const buttonControls = useAnimation();

  useEffect(() => {
    const pulseSequence = async () => {
      await buttonControls.start({ scale: 1.05, transition: { duration: 0.4 } });
      await buttonControls.start({ scale: 1, transition: { duration: 0.4 } });
    };
    const interval = setInterval(pulseSequence, 2000);
    return () => clearInterval(interval);
  }, [buttonControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, type: 'spring', stiffness: 100 },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -100, y: -50 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const faqs = [
    {
      question: 'What types of properties do you offer?',
      answer: 'We offer a wide range of properties, including luxury villas, modern condos, cozy cottages, and urban lofts.',
    },
    {
      question: 'How can I schedule a property viewing?',
      answer: 'You can schedule a viewing by contacting us through the form below or calling our office.',
    },
    {
      question: 'Are your properties available for rent or purchase?',
      answer: 'Most of our properties are for purchase, though some select listings may offer rental options.',
    },
    {
      question: 'What financing options are available?',
      answer: 'We work with trusted lenders to offer various financing options such as mortgages and flexible plans.',
    },
    {
      question: 'Do you provide virtual tours?',
      answer: 'Yes, we offer virtual tours for most properties. Just reach out to get a link!',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 md:p-14"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6"
          variants={headingVariants}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-500 mb-10"
          variants={paragraphVariants}
        >
          Discover answers to common inquiries about our properties and services.
        </motion.p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left text-gray-800 font-medium text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-100 rounded-full p-2"
                >
                  {openIndex === index ? (
                    <FaMinus className="h-5 w-5 text-gray-600" />
                  ) : (
                    <FaPlus className="h-5 w-5 text-gray-600" />
                  )}
                </motion.div>
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`px-6 overflow-hidden bg-gray-50 text-gray-700 text-base transition-all duration-300 ${
                  openIndex === index ? 'py-4' : 'py-0'
                }`}
              >
                <p>{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default FandQSection;
