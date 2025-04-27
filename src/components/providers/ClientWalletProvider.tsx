'use client';

import { WalletProvider } from '../../context/WalletContext';

export default function ClientWalletProvider({ children }: { children: React.ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
} 