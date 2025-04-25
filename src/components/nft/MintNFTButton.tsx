'use client';

import React, { useState, useEffect } from 'react';
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from 'wagmi';
import { parseEther } from 'viem';
import {
  DIGITAL_FASHION_NFT_ADDRESS,
  DIGITAL_FASHION_NFT_ABI,
} from '../../contracts/DigitalFashionNFT';
import { ConnectWalletButton } from '../wallet/ConnectWalletButton';
import dynamic from 'next/dynamic';

interface MintNFTButtonProps {
  productName: string;
  productImage: string | null;
  productDescription: string;
  price: string;
  className?: string;
}

// Create the client-only component
const ClientOnlyMintNFTButton: React.FC<MintNFTButtonProps> = ({
  productName,
  productImage,
  productDescription,
  price,
  className = '',
}) => {
  const [isMinted, setIsMinted] = useState(false);
  const [tokenId, setTokenId] = useState<number | null>(null);

  // For writing to the contract (minting)
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  // Get wallet connection status
  const { address, isConnected } = useAccount();

  // For waiting for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const handleMint = async () => {
    if (!isConnected || !address) return;

    // In a real app, this would be uploaded to IPFS
    const metadata = {
      name: productName,
      description: productDescription,
      image: productImage,
    };

    try {
      // In a real implementation, this would be a call to upload to IPFS first
      const metadataURI = `ipfs://mock-uri/${productName
        .replace(/\s+/g, '-')
        .toLowerCase()}`;

      await writeContract({
        address: DIGITAL_FASHION_NFT_ADDRESS,
        abi: DIGITAL_FASHION_NFT_ABI,
        functionName: 'mint',
        args: [address, metadataURI],
        value: parseEther(price),
      });
    } catch (err) {
      console.error('Error minting NFT:', err);
    }
  };

  // Set isMinted and tokenId when transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      setIsMinted(true);
      // In a real app, you would get the actual tokenId from the transaction receipt
      setTokenId(Math.floor(Math.random() * 1000));
    }
  }, [isConfirmed]);

  if (!isConnected) {
    return <ConnectWalletButton className={className} />;
  }

  if (isMinted && tokenId !== null) {
    return (
      <button
        className={`rounded-lg bg-green-500 px-6 py-2 text-[13px] font-[500] tracking-[0.075em] text-white ${className}`}
        disabled
      >
        Minted on Base! (Token #{tokenId})
      </button>
    );
  }

  return (
    <button
      onClick={handleMint}
      disabled={isPending || isConfirming}
      className={`rounded-lg bg-[#00A3FF] px-6 py-2 text-[13px] font-[500] tracking-[0.075em] text-white transition-all hover:bg-[#0089D6] ${className}`}
    >
      {isPending || isConfirming ? 'Minting...' : 'Mint on Base'}
    </button>
  );
};

// Use dynamic import with ssr: false to prevent hydration errors
const MintNFTButton = dynamic(() => Promise.resolve(ClientOnlyMintNFTButton), {
  ssr: false,
  loading: () => (
    <div className="rounded-lg bg-[#00A3FF] px-6 py-2 text-[13px] font-[500] tracking-[0.075em] text-white opacity-70">
      Loading...
    </div>
  ),
});

export { MintNFTButton };
