import Image from 'next/image';
import { Button } from '@mui/material';
import { NFT_Collection_Link } from 'routers/RouterLinks';

interface NFTCollectionButtonProps {
  onValueChange: (
    value: 'Discover' | 'Offers' | 'Collections' | 'NFT Collection',
  ) => void;
}

export function NFTCollectionButton({
  onValueChange,
}: NFTCollectionButtonProps) {
  const handleClick = () => {
    onValueChange('NFT Collection');
    window.location.href = NFT_Collection_Link;
  };

  return (
    <Button
      id="mobile-header-nft-button"
      aria-label="mobile-nft-button"
      onClick={handleClick}
      className="button-text-lower z-10 ml-2 flex min-w-0 items-center justify-center rounded-full bg-[#7C3AED] px-3 py-1 text-[12px] font-medium outline-none hover:bg-[#6D28D9] active:bg-[#5B21B6]"
    >
      <img
        src="/base-logo.svg"
        alt="Base"
        className="mr-1 inline-block h-4 w-4"
      />
      <span className="text-white">NFT</span>
    </Button>
  );
}
