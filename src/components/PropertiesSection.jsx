import { motion, useMotionValue, useTransform } from "framer-motion";

function PropertiesSection() {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  // Tilt effect logic
  const TiltCard = ({ property, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = (event.clientX - rect.left - centerX) / centerX;
      const mouseY = (event.clientY - rect.top - centerY) / centerY;
      x.set(mouseX);
      y.set(mouseY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        key={index}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        variants={cardVariants}
        whileHover="hover"
        transition={{ delay: index * 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          perspective: 1000,
        }}
      >
        <motion.img
          src={property.img}
          alt={property.title}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
          <p className="text-gray-600 font-bold">{property.price}</p>
          <p className="text-gray-500 text-sm">{property.desc}</p>
          <p className="text-gray-500 text-sm mt-1">
            <i className="fas fa-map-marker-alt mr-1"></i> {property.location}
          </p>
          <motion.a
            href="#"
            className="mt-4 inline-block font-semibold text-white hover:bg-black py-2 px-4 globalbutton  transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.a>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="properties" className="py-16 px-4 md:px-16 bg-gray-100">
      <motion.h2
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Featured Properties
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={staggerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          {
            img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            title: "Modern Villa",
            price: "$1,250,000",
            desc: "4 Beds, 3 Baths, 2,800 sqft",
            location: "Beverly Hills, CA",
          },
          {
            img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            title: "Luxury Condo",
            price: "$850,000",
            desc: "3 Beds, 2 Baths, 1,900 sqft",
            location: "Miami, FL",
          },
          {
            img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            title: "Cozy Cottage",
            price: "$450,000",
            desc: "2 Beds, 1 Bath, 1,200 sqft",
            location: "Asheville, NC",
          },
        ].map((property, index) => (
          <TiltCard key={index} property={property} index={index} />
        ))}
      </motion.div>
    </section>
  );
}

export default PropertiesSection;