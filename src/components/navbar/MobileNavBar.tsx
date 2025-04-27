import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';

interface MobileNavBarProps {
  active: string;
  setActive: (name: string) => void;
  items?: Array<{
    name: string;
    icon: string;
    activeIcon: string;
  }>;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({
  active,
  setActive,
  items,
}) => {
  const { isMobile } = useScreenDimensions();

  // Default navigation items if none provided
  const defaultItems = [
    {
      name: 'Home',
      icon: '/icons/home-new.svg',
      activeIcon: '/icons/home-fill-new.svg',
    },
    {
      name: 'Gallery',
      icon: '/icons/gallery.svg',
      activeIcon: '/icons/gallery-fill.svg',
    },
    {
      name: 'Cart',
      icon: '/icons/cart.svg',
      activeIcon: '/icons/cart-fill.svg',
    },
    {
      name: 'Profile',
      icon: '/icons/user.svg',
      activeIcon: '/icons/user-fill.svg',
    },
  ];

  const navItems = items || defaultItems;

  if (!isMobile) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 z-50 w-full bg-[#181818] shadow-lg"
    >
      <div className="flex h-16 w-full items-center justify-around px-2">
        {navItems.map((item) => (
          <motion.button
            key={item.name}
            className="flex flex-col items-center justify-center space-y-1"
            whileTap={{ scale: 0.9 }}
            onClick={() => setActive(item.name)}
          >
            <Image
              src={active === item.name ? item.activeIcon : item.icon}
              alt={item.name}
              width={24}
              height={24}
              className={active === item.name ? 'opacity-100' : 'opacity-60'}
            />
            <span
              className={`text-[10px] ${
                active === item.name ? 'font-medium opacity-100' : 'opacity-60'
              } text-white`}
            >
              {item.name}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileNavBar;
