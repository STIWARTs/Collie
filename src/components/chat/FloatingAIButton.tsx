'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AIChatModal from './AIChatModal';

const FloatingAIButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-40 flex items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Notification indicator */}
        <motion.div
          className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1, duration: 0.5 }}
        />

        {/* Floating text prompt when hovered */}
        <motion.div
          className="absolute right-16 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-lg"
          initial={{ opacity: 0, x: 10, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 10,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          Hi there! Shop with Collie?
          <div className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 transform bg-white" />
        </motion.div>

        {/* Main button with fancy animations */}
        <motion.button
          className="relative h-14 w-14 overflow-hidden rounded-full bg-gradient-to-r from-[#7928CA] to-[#FF0080] shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleButtonClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Inner pulsing effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-70"
            animate={{
              boxShadow: [
                '0 0 0 0px rgba(255, 0, 128, 0.4)',
                '0 0 0 8px rgba(255, 0, 128, 0)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />

          {/* Star icon with fancy animation */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: isHovered ? [0, 15, -15, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L14.5 9H21.5L16 13.5L18 20.5L12 16L6 20.5L8 13.5L2.5 9H9.5L12 2Z"
                fill="white"
              />
            </svg>
          </motion.div>
        </motion.button>
      </motion.div>

      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default FloatingAIButton;
