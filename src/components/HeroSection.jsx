import { motion, useScroll, useTransform } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import Form from "./Form";

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.5]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        id="home"
        className="relative h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Background Image */}
        <motion.img
          src={`${process.env.PUBLIC_URL}/images/main-backgroundimage.png`}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ y, opacity }}
        />

        <div className="absolute justify-evenly inset-0 bg-black bg-opacity-60 flex flex-col md:flex-row items-center justify-center px-4 gap-10">
          {/* Left Card */}
          <div className="max-w-sm relative">
            <div className="absolute -top-4 -right-4 rotate-12 bg-yellow-400 text-blue-900 font-extrabold text-xs px-3 py-1 shadow-lg z-10">
              RERA APPROVED
            </div>

            <motion.div
              className="bg-white rounded-xl shadow-2xl p-6 text-gray-800 space-y-3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-xl font-bold text-black">SPJ Vedatam</h2>
              <p className="text-sm text-gray-600">Sector 14, Gurugram</p>
              <p className="text-sm font-medium text-gray-700">Ground Floor Shops</p>

              <div className="bg-yellow-100 text-black font-semibold px-3 py-1 rounded w-fit">
                Starts At : ₹ 1.49 Cr*
              </div>

              <p className="text-sm font-medium text-gray-700 mt-2">Premium Lockable Shops</p>

              <div className="bg-yellow-100 text-black font-semibold px-3 py-1 rounded w-fit">
                Starts At : ₹ 75 LACS*
              </div>

              <p className="bg-red-600 text-white font-bold text-sm px-3 py-2 rounded mt-2 w-fit">
                Multiplex Signed with PVR Cinemas
              </p>

              <ul className="space-y-2 mt-4">
                {[
                  "Assured 12% Return Per Annum",
                  "7% Post Possession Lease Guarantee",
                  "Pay ₹35 Lakh Now, ₹35 Lakh at Possession",
                  "₹35,000 Monthly Return from Day 1",
                  "Assured Returns Till Possession",
                  "Assured Rental Income Post Possession",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start font-bold text-black gap-2 text-sm text-gray-700"
                  >
                    <FaCheck className="text-green-600 mt-[3px]" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                className="mt-4 bg-black text-white font-bold w-full py-2 rounded hover:bg-gray-900 transition"
                onClick={() => setOpen(true)}
              >
                ENQUIRE NOW
              </button>
            </motion.div>
          </div>

          {/* Center About Section */}
          <motion.div
            className="text-white text-center max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="bg-yellow-400 text-black font-semibold px-4 py-1 rounded-full w-fit mx-auto mb-4">
              RERA APPROVED
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">SPJ Vedatam</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Luxury Retail Destination
            </h1>
            <p className="text-md md:text-xl max-w-xl mx-auto">
              Experience The Epitome of Premium Lockable Shop in the Heart of an Unorganized Market in SPJ Vedatam Sector 14, Gurgaon. Located in The Heart of Gurugram, Crafted for Lifestyle Excellence.
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* Modal Wrapper */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md mx-4"
          >
            <Form onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default HeroSection;
