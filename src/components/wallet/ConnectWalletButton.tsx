'use client';

import React, { useState } from 'react';
import { useWeb3ModalState, useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import dynamic from 'next/dynamic';
import UseClientAuth from '../../authentication/UseClientAuth';
import { useRouter } from 'next/navigation';
import { Setup_Link } from '../../routers/RouterLinks';

interface ConnectWalletButtonProps {
  className?: string;
}

// Create a component that only renders on the client side
const ClientOnlyWalletButton = ({
  className = '',
}: ConnectWalletButtonProps) => {
  // It's now safe to use these hooks directly since this component only renders on the client
  const web3Modal = useWeb3Modal();
  const { selectedNetworkId } = useWeb3ModalState();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { FirebaseUser, FirebaseLoading } = UseClientAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = async () => {
    // Check if user is authenticated
    if (!FirebaseUser) {
      setError('Please sign in first to connect your wallet');
      setTimeout(() => {
        router.push(Setup_Link);
      }, 2000);
      return;
    }

    if (isConnected) {
      try {
        setIsLoading(true);
        await disconnect();
      } catch (err) {
        console.error('Error disconnecting wallet:', err);
        setError('Failed to disconnect wallet');
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        setError(null);
        await web3Modal.open();
      } catch (err) {
        console.error('Error connecting wallet:', err);
        setError('Failed to open wallet connection');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Show loading state while checking auth
  if (FirebaseLoading) {
    return (
      <div>
        <button
          disabled={true}
          className={`cursor-not-allowed rounded-lg bg-gradient-to-l from-[#ffffff30] px-6 py-2 text-[13px] font-[500] tracking-[0.075em] text-white opacity-70 ring-[#ffffff30] transition-all ${className}`}
        >
          <span className="flex items-center">
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
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
            Loading...
          </span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className={`rounded-lg bg-gradient-to-l from-[#ffffff30] px-6 py-2 text-[13px] font-[500] tracking-[0.075em] text-white ring-[#ffffff30] transition-all hover:bg-white hover:bg-opacity-10 hover:ring-1 ${
          isLoading ? 'cursor-not-allowed opacity-70' : ''
        } ${className}`}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
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
            {isConnected ? 'Disconnecting...' : 'Connecting...'}
          </span>
        ) : (
          <>
            {!FirebaseUser
              ? 'Sign in to Connect'
              : isConnected && address
                ? formatAddress(address as string)
                : 'Connect Wallet'}
          </>
        )}
      </button>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
};

// Dynamically import the client-only component with ssr: false
const ConnectWalletButton = dynamic(
  () => Promise.resolve(ClientOnlyWalletButton),
  { ssr: false },
);

export { ConnectWalletButton };
