"use client";

import { motion } from "framer-motion";

export default function WhatsAppButton() {
  // Direct Link to WhatsApp. Using a demo Pune number: +91 98230 12345
  const whatsappUrl = "https://wa.me/918796644348?text=Hi%20PowerFit%20Pune!%20I'd%20like%20to%20book%20a%20free%20trial%20session%20and%20know%20more%20about%20membership%20plans.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      {/* Pulse Outer Ring */}
      <span className="absolute w-14 h-14 bg-neon-green/30 rounded-full animate-pulse-ring" />
      
      {/* Main WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Contact us on WhatsApp"
      >
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45h.005c5.437 0 9.857-4.42 9.86-9.858a9.785 9.785 0 0 0-2.88-6.969 9.79 9.79 0 0 0-6.98-2.87c-5.441 0-9.859 4.42-9.863 9.858-.002 1.93.498 3.814 1.448 5.429L2.122 22l4.525-1.846zm11.51-7.75c-.22-.11-1.302-.643-1.503-.717-.202-.074-.348-.109-.496.11-.148.22-.574.717-.704.865-.13.147-.26.165-.48.055-.22-.11-.93-.343-1.773-1.096-.655-.584-1.097-1.306-1.226-1.527-.13-.22-.014-.34.096-.45.1-.099.22-.256.33-.385.11-.128.147-.22.22-.366.073-.147.036-.275-.018-.385-.055-.11-.497-1.196-.68-1.637-.179-.43-.377-.371-.518-.378-.133-.007-.285-.008-.436-.008-.152 0-.4.056-.61.285-.21.23-.8.78-.8 1.902 0 1.122.817 2.204.931 2.353.114.15 1.606 2.451 3.89 3.435.544.234.968.374 1.3.479.547.174 1.045.15 1.439.09.439-.067 1.302-.532 1.485-1.046.183-.514.183-.956.128-1.047-.054-.09-.2-.147-.42-.257z" />
        </svg>
      </motion.a>
    </div>
  );
}
