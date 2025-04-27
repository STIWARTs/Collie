'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AIChatModal from './AIChatModal';

const FloatingAIButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-40 flex items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Notification indicator */}
        <motion.div
          className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1, duration: 0.5 }}
        />

        {/* Floating text prompt when hovered */}
        <motion.div
          className="absolute right-12 rounded-lg bg-gray-800 px-3 py-2 text-xs font-medium text-white shadow-lg"
          initial={{ opacity: 0, x: 10, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 10,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          Need fashion advice?
          <div className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 transform bg-gray-800" />
        </motion.div>

        {/* Main button with fancy animations */}
        <motion.button
          className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-r from-[#7928CA] to-[#FF0080] shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleButtonClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={false}
          animate={isChatOpen ? { rotate: 45 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Inner pulsing effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-70"
            animate={{
              boxShadow: [
                '0 0 0 0px rgba(255, 0, 128, 0.4)',
                '0 0 0 6px rgba(255, 0, 128, 0)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />

          {/* Icon with animation */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: isHovered && !isChatOpen ? [0, 15, -15, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            {isChatOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default FloatingAIButton;
