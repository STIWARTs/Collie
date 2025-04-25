import React from 'react';
import { NFT_Collection_Link } from 'routers/RouterLinks';
import { ShimmerButton } from '../../ui/shimmer-button';

interface NFTCollectionDesktopButtonProps {
  onValueChange: (
    value: 'Discover' | 'Offers' | 'Collections' | 'NFT Collection',
  ) => void;
}

export function NFTCollectionDesktopButton({
  onValueChange,
}: NFTCollectionDesktopButtonProps) {
  const handleClick = () => {
    onValueChange('NFT Collection');
    window.location.href = NFT_Collection_Link;
  };

  return (
    <ShimmerButton
      id="desktop-header-nft-button"
      aria-label="desktop-nft-button"
      onClick={handleClick}
      className="ml-2 inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm font-medium"
      background="#2A2A2A"
      shimmerDuration="2.5s"
    >
      <img src="/base-logo.svg" alt="Base" className="h-4 w-4" />
      <span>NFT Collection</span>
    </ShimmerButton>
  );
}
