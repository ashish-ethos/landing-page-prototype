import { motion, useScroll, useTransform } from "framer-motion";
import "./Hero.css";

function HeroSection() {
  // Scroll-based parallax effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.5]);

  // Animation variants for hero section
  const heroVariants = {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  // Animation variants for staggered elements
  const staggerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  // Animation variants for individual words (multi-step for blur effect)
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

  // Animation variants for subtitle words (bottom direction, faster stagger)
  const subtitleWordVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 50 },
    visible: (i) => ({
      filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
      opacity: [0, 0.5, 1],
      y: [50, -5, 0],
      transition: {
        filter: { duration: 0.6, times: [0, 0.5, 1], delay: i * 0.15, ease: "easeOut" },
        opacity: { duration: 0.6, times: [0, 0.5, 1], delay: i * 0.15, ease: "easeOut" },
        y: { duration: 0.6, times: [0, 0.5, 1], delay: i * 0.15, ease: "easeOut" },
      },
    }),
  };

  // Split text into words
  const headingWords = "Discover Your Perfect Home".split(" ");
  const subtitleWords = "Luxury properties tailored to your lifestyle".split(" ");

  return (
    <motion.header
      id="home"
      className="relative bg-cover bg-center h-screen overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        y,
        opacity,
      }}
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <motion.div
          className="text-center text-white px-4"
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-5xl md:text-7xl font-bold mb-4 flex flex-wrap justify-center gap-x-2">
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
          <div className="text-lg md:text-2xl mb-6 flex flex-wrap justify-center gap-x-2">
            {subtitleWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block will-change-[transform,filter,opacity]"
                variants={subtitleWordVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
              >
                {word}
                {index < subtitleWords.length - 1 && "\u00A0"}
              </motion.span>
            ))}
          </div>
          <motion.a
            href="#properties"
            className=" border bg-[#caaa8591] text-white py-3 px-8  text-lg hover:bg-none transition duration-300"
            variants={heroVariants}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-search mr-2"></i> Explore Properties
          </motion.a>
        </motion.div>
      </div>
    </motion.header>
  );
}

export default HeroSection;