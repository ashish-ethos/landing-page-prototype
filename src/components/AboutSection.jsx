import { motion } from "framer-motion";
import { useRef, useEffect, useMemo } from "react";
import "./Hero.css";

function AboutSection() {
  const sectionRef = useRef(null);

  const wordVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: -50 },
    visible: (i) => ({
      filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
      opacity: [0, 0.5, 1],
      y: [-50, 5, 0],
      transition: {
        filter: { duration: 0.7, times: [0, 0.5, 1], delay: i * 0.2, ease: "easeOut" },
        opacity: { duration: 0.7, times: [0, 0.5, 1], delay: i * 0.2, ease: "easeOut" },
        y: { duration: 0.7, times: [0, 0.5, 1], delay: i * 0.2, ease: "easeOut" },
      },
    }),
  };

  const paragraphWordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const buttonPulseVariants = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        scale: { duration: 0.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
      },
    },
  };

  const headingWords = "About Luxe Realty".split(" ");

  const paragraphText =
    "At Luxe Realty, we specialize in connecting you with exceptional properties that match your unique vision. With over a decade of experience, our team is dedicated to providing personalized service, ensuring you find a home that feels just right.";

  const letterRefs = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const fromFontVariationSettings = "'wght' 400";
  const toFontVariationSettings = "'wght' 700";
  const radius = 100;
  const falloff = "gaussian";

  const positionRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const updatePosition = (x, y) => {
      if (sectionRef?.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Parse font variation settings
  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr) =>
      new Map(
        settingsStr
          .split(",")
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(" ");
            return [name.replace(/['"]/g, ""), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1, y1, x2, y2) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = (distance) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
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
      if (!sectionRef?.current) return;
      const containerRect = sectionRef.current.getBoundingClientRect();
      const { x, y } = positionRef.current;

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;

        const rect = letterRef.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

        const distance = calculateDistance(
          positionRef.current.x,
          positionRef.current.y,
          letterCenterX,
          letterCenterY
        );

        if (distance >= radius) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
          return;
        }

        const falloffValue = calculateFalloff(distance);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${interpolatedValue}`;
          })
          .join(", ");

        interpolatedSettingsRef.current[index] = newSettings;
        letterRef.style.fontVariationSettings = newSettings;
      });

      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [parsedSettings]);

  const words = paragraphText.split(" ");
  let letterIndex = 0;

  return (
    <section id="about" className="py-16 px-4 md:px-16 bg-[#fffbfb]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Section - Content */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl font-bold text-gray-800 mb-6 mt-10 flex flex-wrap justify-center md:justify-start gap-x-2">
            {headingWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block will-change-[transform,filter,opacity]"
                variants={wordVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
              >
                {word}
                {index < headingWords.length - 1 && "\u00A0"}
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
                viewport={{ once: true, amount: 0.3 }}
                custom={wordIndex}
              >
                {word.split("").map((letter) => {
                  const currentLetterIndex = letterIndex++;
                  return (
                    <motion.span
                      key={currentLetterIndex}
                      ref={(el) => (letterRefs.current[currentLetterIndex] = el)}
                      style={{
                        display: "inline-block",
                        fontVariationSettings:
                          interpolatedSettingsRef.current[currentLetterIndex],
                      }}
                      aria-hidden="true"
                    >
                      {letter}
                    </motion.span>
                  );
                })}
                {wordIndex < words.length - 1 && (
                  <span style={{ display: "inline-block" }}> </span>
                )}
              </motion.span>
            ))}
            <span className="sr-only">{paragraphText}</span>
          </div>
          <motion.a
            href="#contact"
            className="border bg-[#caaa8591] globalbutton text-white py-3 px-6 text-lg transition duration-300"
            variants={buttonPulseVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-users mr-2"></i> Our Team
          </motion.a>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div
          className="w-full md:w-1/2 mt-10 "
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
    </section>
  );
}

export default AboutSection;