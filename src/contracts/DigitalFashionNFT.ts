import { Address } from 'viem';

// Mock contract address - in a real app, you would deploy and use an actual contract address
export const DIGITAL_FASHION_NFT_ADDRESS: Address =
  '0x0000000000000000000000000000000000000000';

// ABI for interaction with the NFT contract
export const DIGITAL_FASHION_NFT_ABI = [
  // View functions
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  // Minting function
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'string', name: 'uri', type: 'string' },
    ],
    name: 'mint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
];

// Interface for an NFT item
export interface NFTItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  owner: Address;
}

// Example function to get NFT metadata (in a real app, this would fetch from IPFS or a server)
export function getNFTMetadata(tokenId: number): Promise<NFTItem> {
  // Mock data - in a real app, this would fetch actual metadata from IPFS or a server
  return Promise.resolve({
    id: tokenId,
    name: `Digital Fashion Item #${tokenId}`,
    description:
      'A unique digital fashion item that can be worn in virtual environments',
    image: `/images/nft-${(tokenId % 5) + 1}.jpg`, // Mock image paths
    price: `${((tokenId % 5) + 1) * 0.05} ETH`,
    owner: '0x0000000000000000000000000000000000000000',
  });
}
