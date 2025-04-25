'use client';

import React from 'react';
import { motion } from 'framer-motion';

const GroqAIBadge = () => {
  const handleBadgeClick = () => {
    console.log('Groq AI Assistant');
  };

  return (
    <div className="mt-6 flex justify-center">
      <motion.div
        className="relative flex cursor-pointer items-center gap-2 rounded-full bg-[#0C0C0F] px-4 py-2 text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBadgeClick}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'linear-gradient(90deg, #7928CA, #FF0080)',
            filter: 'blur(8px)',
            zIndex: -1,
          }}
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L14.5 9H21.5L16 13.5L18 20.5L12 16L6 20.5L8 13.5L2.5 9H9.5L12 2Z"
            fill="#FF0080"
          />
        </svg>
        <span className="text-sm font-medium">AI by Groq</span>
      </motion.div>
    </div>
  );
};

export default GroqAIBadge;
