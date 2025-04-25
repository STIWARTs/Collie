'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import Image from 'next/image';
import {
  DIGITAL_FASHION_NFT_ADDRESS,
  DIGITAL_FASHION_NFT_ABI,
  NFTItem,
  getNFTMetadata,
} from '../../contracts/DigitalFashionNFT';

export const NFTCollection: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState<NFTItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock NFT data to display some sample NFTs
  const mockNFTs: NFTItem[] = [
    {
      id: 1,
      name: 'Premium Jacket',
      description: 'Digital version of Premium Jacket for virtual worlds',
      image:
        'https://firebasestorage.googleapis.com/v0/b/collie-shopping.appspot.com/o/carousel%2Ffit-one.jpg?alt=media',
      price: '0.01 ETH',
      owner: address || '0x0000000000000000000000000000000000000000',
    },
    {
      id: 2,
      name: 'Designer Shirt',
      description: 'Digital version of Designer Shirt for virtual worlds',
      image:
        'https://firebasestorage.googleapis.com/v0/b/collie-shopping.appspot.com/o/carousel%2Ffit-two.jpg?alt=media',
      price: '0.015 ETH',
      owner: address || '0x0000000000000000000000000000000000000000',
    },
    {
      id: 3,
      name: 'Luxury Suit',
      description: 'Digital version of Luxury Suit for virtual worlds',
      image:
        'https://firebasestorage.googleapis.com/v0/b/collie-shopping.appspot.com/o/carousel%2Ffit-three.jpg?alt=media',
      price: '0.02 ETH',
      owner: address || '0x0000000000000000000000000000000000000000',
    },
  ];

  useEffect(() => {
    // In a real app, this would fetch the user's NFTs from the blockchain
    // For now, we'll just use mock data
    if (isConnected) {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call delay
        setTimeout(() => {
          setNfts(mockNFTs);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching NFTs:', err);
        setError('Failed to load NFT collection. Please try again later.');
        setLoading(false);
      }
    } else {
      setNfts([]);
      setLoading(false);
    }
  }, [isConnected, address]);

  if (error) {
    return (
      <div className="rounded-lg bg-red-400/10 p-8 text-center">
        <h3 className="mb-4 text-xl font-semibold text-white">Error</h3>
        <p className="text-gray-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="rounded-lg bg-[#ffffff10] p-8 text-center">
        <h3 className="mb-4 text-xl font-semibold text-white">
          Connect your wallet to view your NFTs
        </h3>
        <p className="text-gray-300">
          Connect your wallet to see your digital fashion collection on Base
          blockchain
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-lg bg-[#ffffff10] p-8 text-center">
        <h3 className="mb-4 text-xl font-semibold text-white">
          Loading your digital fashion collection...
        </h3>
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#0052FF] border-t-transparent"></div>
      </div>
    );
  }

  if (nfts.length === 0 && !loading) {
    return (
      <div className="rounded-lg bg-[#ffffff10] p-8 text-center">
        <h3 className="mb-4 text-xl font-semibold text-white">No NFTs found</h3>
        <p className="text-gray-300">
          You don't own any digital fashion NFTs yet. Start shopping to build
          your collection!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Your Digital Fashion Collection
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className="overflow-hidden rounded-lg bg-[#ffffff10] shadow-lg transition-all hover:shadow-xl"
          >
            <div className="relative h-64 w-full">
              <Image
                src={nft.image}
                alt={nft.name}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
                <div className="flex items-center space-x-1">
                  <img src="/base-logo.svg" alt="Base" className="h-4 w-4" />
                  <span className="text-sm text-[#0052FF]">Base</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-300">{nft.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-white">
                  {nft.price}
                </span>
                <button className="rounded-lg bg-[#0052FF] px-3 py-1 text-xs text-white transition-colors hover:bg-[#003CC7]">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
