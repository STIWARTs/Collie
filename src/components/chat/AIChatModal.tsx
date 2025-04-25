'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendGroqRequest } from '../../utils/groqApi';
import Image from 'next/image';
import Link from 'next/link';
import {
  DiscoverSliderContent,
  SummerSaleContent,
} from '../../contents/home/discover/Home.Discover.Slider';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
}

interface Product {
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  description: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! 👋 I'm your Collie shopping assistant. I can help you find the perfect outfit, recommend products, or answer any questions about our store. What can I help you with today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to extract product names from assistant response
  const extractProductRecommendations = (content: string): Product[] => {
    const allProducts = [...DiscoverSliderContent, ...SummerSaleContent];
    const products: Product[] = [];

    // Check for product mentions in the response
    allProducts.forEach((product) => {
      if (content.includes(product.Heading)) {
        products.push({
          name: product.Heading,
          price: product.DiscountedPrice,
          originalPrice: product.OriginalPrice,
          discount: product.Discount,
          image: product.Image,
          description: product.Description,
        });
      }
    });

    // Limit to 3 products max to avoid UI clutter
    return products.slice(0, 3);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendGroqRequest(input);
      const aiResponse = response.choices[0].message.content;

      // Extract any product recommendations from the AI response
      const recommendedProducts = extractProductRecommendations(aiResponse);

      const assistantMessage = {
        role: 'assistant' as const,
        content: aiResponse,
        products:
          recommendedProducts.length > 0 ? recommendedProducts : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I had trouble responding. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-[#7928CA] to-[#FF0080] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/20">
                  <svg
                    className="absolute inset-0 h-full w-full p-1 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L14.5 9H21.5L16 13.5L18 20.5L12 16L6 20.5L8 13.5L2.5 9H9.5L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Collie Assistant</h3>
                  <p className="text-xs text-white/70">
                    Fashion expert at your service
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-white/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="h-[28rem] overflow-y-auto bg-gray-50 p-4">
              {messages.map((message, index) => (
                <div key={index} className="mb-6">
                  <div
                    className={`mb-2 flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="mr-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-[#7928CA] to-[#FF0080]">
                        <svg
                          className="h-full w-full p-1 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2L14.5 9H21.5L16 13.5L18 20.5L12 16L6 20.5L8 13.5L2.5 9H9.5L12 2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white'
                          : 'bg-white text-gray-800 shadow'
                      }`}
                    >
                      {message.content.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < message.content.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                    {message.role === 'user' && (
                      <div className="ml-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-[#7928CA] to-[#FF0080]">
                        <svg
                          className="h-full w-full p-1.5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product recommendations display */}
                  {message.products && message.products.length > 0 && (
                    <div className="ml-10 mt-2 flex flex-wrap gap-3">
                      {message.products.map((product, productIndex) => (
                        <Link
                          href={`/details?product=${encodeURIComponent(
                            product.name,
                          )}`}
                          key={productIndex}
                        >
                          <div className="group relative w-56 cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                            <div className="relative h-48 w-full overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform group-hover:scale-110"
                              />
                              <div className="absolute right-2 top-2 rounded bg-[#FF0080] px-2 py-1 text-xs font-bold text-white">
                                {product.discount}
                              </div>
                            </div>
                            <div className="p-3">
                              <h3 className="line-clamp-1 font-medium">
                                {product.name}
                              </h3>
                              <p className="line-clamp-2 text-xs text-gray-600">
                                {product.description}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="font-bold text-[#FF0080]">
                                  ₹{product.price}
                                </span>
                                <span className="text-xs text-gray-500 line-through">
                                  ₹{product.originalPrice}
                                </span>
                              </div>
                              <div className="mt-2 text-xs font-medium text-[#7928CA]">
                                Click to view details
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="mr-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-[#7928CA] to-[#FF0080]">
                    <svg
                      className="h-full w-full p-1 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L14.5 9H21.5L16 13.5L18 20.5L12 16L6 20.5L8 13.5L2.5 9H9.5L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="max-w-[80%] rounded-lg bg-white p-3 text-gray-800 shadow">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#7928CA]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#9C55D1] delay-100"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#FF0080] delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <textarea
                  className="flex-1 resize-none rounded-lg border border-gray-300 p-3 focus:border-[#7928CA] focus:outline-none focus:ring-2 focus:ring-[#7928CA]/20"
                  placeholder="Ask about products, styles, or fashion advice..."
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <button
                  className="flex-shrink-0 rounded-lg bg-gradient-to-r from-[#7928CA] to-[#FF0080] px-4 font-medium text-white transition-all hover:opacity-90 disabled:from-gray-400 disabled:to-gray-300"
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                >
                  Send
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <button
                  onClick={() => setInput('What summer items are on sale?')}
                  className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200"
                  disabled={isLoading}
                >
                  Summer sale items
                </button>
                <button
                  onClick={() =>
                    setInput('Recommend outfit for office meeting')
                  }
                  className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200"
                  disabled={isLoading}
                >
                  Office outfit ideas
                </button>
                <button
                  onClick={() => setInput('What is your return policy?')}
                  className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200"
                  disabled={isLoading}
                >
                  Return policy
                </button>
              </div>
              <div className="mt-2 text-center text-xs text-gray-500">
                Powered by Collie AI
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatModal;
