'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
// Import the default export from ConnectWalletButton
import ConnectWalletButton from '../wallet/ConnectWalletButton';

interface MintNFTButtonProps {
  productName?: string;
  productImage?: string | null;
  productDescription?: string;
  price?: string;
  className?: string;
}

export default function MintNFTButton({
  productName = 'Product',
  productImage = null,
  productDescription = 'Digital collectible',
  price = '0.01',
  className = '',
}: MintNFTButtonProps) {
  const [isMinting, setIsMinting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock connected state - in a real app this would come from useAccount hook
  const isConnected = false;

  const handleMint = async () => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsMinting(true);
      setError(null);

      // Mock API call to mint NFT
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success!
      setIsSuccess(true);

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error('Error minting NFT:', err);
      setError(err.message || 'Failed to mint NFT');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {!isConnected ? (
        <ConnectWalletButton />
      ) : (
        <Button
          onClick={handleMint}
          disabled={isMinting}
          className={`group flex items-center justify-center space-x-2 rounded-md bg-gradient-to-br from-purple-500 to-blue-500 px-4 py-2.5 font-medium text-white transition-all hover:from-purple-600 hover:to-blue-600 disabled:opacity-70 ${
            isMinting ? 'cursor-not-allowed' : ''
          }`}
        >
          {isMinting ? (
            <>
              <svg
                className="mr-2 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Minting...</span>
            </>
          ) : isSuccess ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Minted!</span>
            </>
          ) : (
            <>
              <Image
                src="/icons/nft-icon.svg"
                width={20}
                height={20}
                alt="NFT"
                className="group-hover:animate-pulse"
              />
              <span>Mint NFT</span>
            </>
          )}
        </Button>
      )}
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
