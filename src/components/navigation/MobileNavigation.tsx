'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function MobileNavigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const mainNavItems = [
    {
      name: 'Home',
      icon: '/icons/home-new.svg',
      activeIcon: '/icons/home-fill-new.svg',
      path: '/',
    },
    {
      name: 'Gallery',
      icon: '/icons/gallery.svg',
      activeIcon: '/icons/gallery-fill.svg',
      path: '/gallery',
    },
    {
      name: 'Cart',
      icon: '/icons/cart.svg',
      activeIcon: '/icons/cart-fill.svg',
      path: '/cart',
    },
    {
      name: 'Profile',
      icon: '/icons/user.svg',
      activeIcon: '/icons/user-fill.svg',
      path: '/profile',
    },
  ];

  const fullMenuItems = [
    { name: 'Discover', path: '/discover' },
    { name: 'Collections', path: '/collections' },
    { name: 'Offers', path: '/offers' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'NFT', path: '/nft' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-[#0f0f0f] px-4 shadow-lg">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#ffffff15]"
          >
            <Image
              src="/icons/menu.svg"
              alt="Menu"
              width={24}
              height={24}
              className="opacity-80"
            />
          </button>

          <Link href="/" className="flex items-center">
            <Image
              src="/agewear_white.svg"
              alt="Collie"
              width={36}
              height={36}
              className="mr-2"
            />
            <span className="text-xl font-bold text-white">Collie</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#ffffff15]"
          >
            <Image
              src="/icons/notification.svg"
              alt="Notifications"
              width={24}
              height={24}
              className="opacity-80"
            />
          </button>
        </div>
      </div>

      {/* Side Navigation Bar - Slides in from left */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={toggleSidebar}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-50 h-full w-[75%] max-w-[300px] bg-[#181818] p-5 shadow-xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/agewear_white.svg"
                    alt="AgeWear"
                    width={40}
                    height={40}
                  />
                  <span className="ml-2 text-xl font-bold text-white">
                    AgeWear
                  </span>
                </Link>
                <button
                  onClick={toggleSidebar}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#ffffff15]"
                >
                  <Image
                    src="/icons/x-white-2.svg"
                    alt="Close"
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                </button>
              </div>

              <div className="space-y-6">
                {fullMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`block rounded-lg px-3 py-2 text-lg text-white ${
                      pathname === item.path
                        ? 'bg-[#ffffff20] font-medium'
                        : 'hover:bg-[#ffffff10]'
                    }`}
                    onClick={toggleSidebar}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full Menu - Slides in from top */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            className="fixed left-0 top-16 z-30 w-full bg-[#202020] shadow-lg"
          >
            <div className="grid grid-cols-2 gap-4 p-4">
              {fullMenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center justify-center rounded-lg py-3 text-center ${
                    pathname === item.path
                      ? 'bg-[#ffffff20] text-white'
                      : 'bg-[#ffffff10] text-white/80'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around bg-[#181818] shadow-lg">
        {mainNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="flex flex-col items-center space-y-1"
          >
            <Image
              src={pathname === item.path ? item.activeIcon : item.icon}
              alt={item.name}
              width={24}
              height={24}
              className={pathname === item.path ? 'opacity-100' : 'opacity-60'}
            />
            <span
              className={`text-[10px] ${
                pathname === item.path
                  ? 'font-medium opacity-100'
                  : 'opacity-60'
              } text-white`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
