import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HammerOverlay = ({ isOpen, onClose }) => {
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
      if (isOpen) {
        setShow(true);
        setTimeout(() => {
          setShow(false);
          onClose();
        }, 10000); // Auto-hide after 10 seconds
      }
    }, [isOpen, onClose]);
  
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white z-50">
        <motion.div
          initial={{ y: -50, rotate: -30 }}
          animate={{ y: 20, rotate: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          🔨 {/* Replace with an actual hammer animation */}
        </motion.div>
        <p className="mt-4 text-xl font-bold">Bid Placed!</p>
      </div>
    );
};

export default HammerOverlay;
