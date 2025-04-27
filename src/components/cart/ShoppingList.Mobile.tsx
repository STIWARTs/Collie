import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ShoppingListProps {
  items: Array<{
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
  }>;
  onRemove?: (id: string) => void;
}

const ShoppingListMobile: React.FC<ShoppingListProps> = ({
  items,
  onRemove,
}) => {
  // Example data if no items provided
  const defaultItems = [
    {
      id: '1',
      name: 'Denim Jacket - Classic Blue',
      category: 'Outerwear',
      price: '₹1999.00',
      image: '/icons/jacket.svg',
    },
    {
      id: '2',
      name: 'Pleated Midi Skirt - Beige',
      category: 'Bottom Wear',
      price: '₹1499.00',
      image: '/icons/skirt.svg',
    },
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <div className="w-full px-1 py-2">
      {displayItems.map((item, index) => (
        <motion.div
          key={item.id}
          className="shopping-list-item mb-3 flex w-full items-center justify-between rounded-lg bg-[#181818] p-3"
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-[#212121]">
              <Image
                src={item.image}
                alt={item.name}
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] font-semibold text-white">
                {item.name}
              </p>
              <p className="text-[11px] text-gray-400">{item.category}</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="mr-2 text-[13px] font-semibold text-white">
              {item.price}
            </p>
            {onRemove && (
              <button
                onClick={() => onRemove(item.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#212121]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ShoppingListMobile;
