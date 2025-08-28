import { motion } from "framer-motion";
import { useRef, useEffect, useMemo, useState } from "react";
import Form from "./Form"; 

function AboutSection() {
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const wordVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: -50 },
    visible: (i) => ({
      filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
      opacity: [0, 0.5, 1],
      y: [-50, 5, 0],
      transition: {
        filter: { duration: 0.7, delay: i * 0.2, ease: "easeOut" },
        opacity: { duration: 0.7, delay: i * 0.2, ease: "easeOut" },
        y: { duration: 0.7, delay: i * 0.2, ease: "easeOut" },
      },
    }),
  };

  const paragraphWordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const buttonPulseVariants = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
    },
  };

  const headingWords = "SPJ Vedatam".split(" ");
  const paragraphText =
    "In the heart of Gurgaon, Vedatam is a 21 storeys of curated space where exclusive brands symbolize refined ambition. Welcome to Vedatam, where success takes the spotlight on a sunlit stage of prosperity built on the foundation of values Vedatam is an upcoming premier commercial hub, designed to redefine business and retail experiences for modern entrepreneurs and enterprises. Strategically located in Sector 14, Gurugram, Vedatam is set to be a bustling commercial centre that draws significant foot traffic, providing businesses with the ideal platform to thrive and grow.";

  const letterRefs = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const fromFontVariationSettings = "'wght' 400";
  const toFontVariationSettings = "'wght' 700";
  const radius = 100;
  const falloff = "gaussian";
  const positionRef = useRef({ x: 0, y: 0 });

  // Mouse tracking for font weight interpolation
  useEffect(() => {
    const updatePosition = (x, y) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      }
    };

    const handleMouseMove = (ev) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev) => updatePosition(ev.touches[0].clientX, ev.touches[0].clientY);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const parsedSettings = useMemo(() => {
    const parse = (str) =>
      new Map(
        str.split(",").map((s) => {
          const [k, v] = s.trim().split(" ");
          return [k.replace(/['"]/g, ""), parseFloat(v)];
        })
      );
    const from = parse(fromFontVariationSettings);
    const to = parse(toFontVariationSettings);

    return Array.from(from.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: to.get(axis) ?? fromValue,
    }));
  }, []);

  const calculateDistance = (x1, y1, x2, y2) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = (distance) => {
    const norm = Math.max(1 - distance / radius, 0);
    switch (falloff) {
      case "exponential":
        return norm ** 2;
      case "gaussian":
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case "linear":
      default:
        return norm;
    }
  };

  useEffect(() => {
    let frameId;
    const loop = () => {
      const containerRect = sectionRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const { x, y } = positionRef.current;

      letterRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 - containerRect.left;
        const centerY = rect.top + rect.height / 2 - containerRect.top;
        const distance = calculateDistance(x, y, centerX, centerY);

        if (distance >= radius) {
          ref.style.fontVariationSettings = fromFontVariationSettings;
          return;
        }

        const falloffValue = calculateFalloff(distance);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolated = fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${interpolated}`;
          })
          .join(", ");

        interpolatedSettingsRef.current[index] = newSettings;
        ref.style.fontVariationSettings = newSettings;
      });

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [parsedSettings]);

  const words = paragraphText.split(" ");
  let letterIndex = 0;

  const handleOpenModal = () => {
    if (!isModalOpen && !isButtonDisabled) {
      setIsModalOpen(true);
      setIsButtonDisabled(true);
      setTimeout(() => setIsButtonDisabled(false), 300);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="about" className="py-16 px-4 md:px-16 bg-[#fffbfb]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl font-bold text-gray-800 mb-6 mt-10 flex flex-wrap justify-center md:justify-start gap-x-2">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block will-change-[transform,filter,opacity]"
                variants={wordVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                {word}{" "}
              </motion.span>
            ))}
          </div>

          <div className="text-lg text-gray-600 mb-8 flex flex-wrap justify-center md:justify-start gap-x-1">
            {words.map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                style={{ display: "inline-block", whiteSpace: "nowrap" }}
                variants={paragraphWordVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={wordIndex}
              >
                {word.split("").map((letter) => {
                  const currentLetterIndex = letterIndex++;
                  return (
                    <motion.span
                      key={currentLetterIndex}
                      ref={(el) => (letterRefs.current[currentLetterIndex] = el)}
                      style={{ display: "inline-block" }}
                      aria-hidden="true"
                    >
                      {letter}
                    </motion.span>
                  );
                })}
                {wordIndex < words.length - 1 && <span>&nbsp;</span>}
              </motion.span>
            ))}
          </div>

          <motion.button
            onClick={handleOpenModal}
            className="border-1 bg-[#caaa8591] globalbutton text-white py-3 px-6 text-lg transition duration-300 border-transparent hover:border-dashed hover:border-black 
             hover:bg-[#caaa85] transition "
            variants={buttonPulseVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={isButtonDisabled}
          >
            <i className="fas fa-users mr-2"></i> Download Brochure
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="w-full md:w-1/2 mt-10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Luxe Realty Property"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </motion.div>
      </div>

      {/* ✅ Use the shared Form modal here */}
      {isModalOpen && <Form onClose={handleCloseModal} />}
    </section>
  );
}

export default AboutSection;
