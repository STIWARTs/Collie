'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import UseClientAuth from '../../authentication/UseClientAuth';
import { useRouter } from 'next/navigation';

// Create a simple wallet button component
function ConnectWalletButtonComponent() {
  const router = useRouter();
  const { FirebaseUser, FirebaseLoading } = UseClientAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => {
    // Clear any existing errors
    setError(null);

    // Check if user is signed in
    if (!FirebaseUser) {
      setError('Please sign in to connect your wallet');
      // Show error for 3 seconds then clear it
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Generate a mock ETH address
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
    setAddress(mockAddress);
    setIsConnected(true);
    console.log('Connected wallet with address:', mockAddress);
  };

  const handleDisconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setOpen(false);
    console.log('Wallet disconnected');
  };

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <div className="flex flex-col">
      {isConnected ? (
        <div className="relative">
          <Button
            onClick={() => setOpen(!open)}
            className="relative flex items-center space-x-1 rounded-md bg-[#2a2a2a] px-3 py-2 text-white transition-all hover:bg-[#3a3a3a]"
          >
            <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-[#3a3a3a]">
              <img
                src="/icons/wallet-2.svg"
                width={14}
                height={14}
                alt="Wallet"
                className="opacity-70"
              />
            </div>
            <span className="text-xs font-medium">
              {address
                ? `${address.substring(0, 6)}...${address.substring(
                    address.length - 4,
                  )}`
                : 'Wallet'}
            </span>
            <ChevronDownIcon className="h-3.5 w-3.5 opacity-70" />
          </Button>

          {open && (
            <div className="absolute right-0 top-10 z-10 min-w-[150px] rounded-md bg-[#1c1c1c] p-2 shadow-2xl">
              <button
                onClick={handleDisconnect}
                className="flex w-full items-center rounded-md px-3 py-2 text-xs text-white hover:bg-white/5"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          <Button
            onClick={handleConnect}
            className="flex items-center space-x-1.5 rounded-md bg-[#2a2a2a] px-3 py-2 text-xs font-medium text-white transition-all hover:bg-[#3a3a3a]"
          >
            <div className="flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-[#3a3a3a]">
              <img
                src="/icons/wallet-2.svg"
                width={12}
                height={12}
                alt="Wallet"
                className="opacity-90"
              />
            </div>
            <span>Connect Wallet</span>
          </Button>

          {error && (
            <div className="mt-2 flex items-center space-x-2">
              <p className="text-xs text-red-400">{error}</p>
              <Button
                onClick={handleSignIn}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Export directly without dynamic import
export default ConnectWalletButtonComponent;
