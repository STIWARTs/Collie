'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { coinbaseWallet, injected } from 'wagmi/connectors';

// Create react-query client
const queryClient = new QueryClient();

// Define your Wallet Connect project ID
// In a real app, set this in your .env.local file
// For local development, we'll use a placeholder ID
const walletConnectProjectId =
  process.env.WALLET_CONNECT_PROJECT_ID ||
  // Demo-only placeholder - replace with your project ID from cloud.walletconnect.com
  '3f3c1f9b6700d15799a43086ce322e4e';

// Configure wagmi
const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  connectors: [
    injected({
      shimDisconnect: true,
    }),
    coinbaseWallet({
      appName: 'Digital Fashion Marketplace',
    }),
  ],
});

// Initialize Web3Modal - globally available but only on client
if (typeof window !== 'undefined') {
  try {
    createWeb3Modal({
      wagmiConfig: config,
      projectId: walletConnectProjectId,
      themeMode: 'dark',
      themeVariables: {
        '--w3m-accent': '#2A2A2A', // Updated to match our grey color scheme
      },
    });
  } catch (error) {
    console.error('Failed to initialize Web3Modal:', error);
  }
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
