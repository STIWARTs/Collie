'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the context shape
interface WalletContextType {
  balance: number;
  addFunds: (amount: number) => void;
  withdrawFunds: (amount: number) => boolean;
  transactions: Transaction[];
}

// Transaction type
export type Transaction = {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  description: string;
  timestamp: number;
};

// Create the context with a default value
const WalletContext = createContext<WalletContextType>({
  balance: 0,
  addFunds: () => {},
  withdrawFunds: () => false,
  transactions: [],
});

// Custom hook to use the wallet context
export const useWallet = () => useContext(WalletContext);

// Provider component
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load wallet data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBalance = localStorage.getItem('wallet_balance');
      const savedTransactions = localStorage.getItem('wallet_transactions');

      if (savedBalance) {
        setBalance(parseFloat(savedBalance));
      } else {
        // Initialize with demo balance of 5000
        setBalance(5000);
        localStorage.setItem('wallet_balance', '5000');
      }

      if (savedTransactions) {
        try {
          setTransactions(JSON.parse(savedTransactions));
        } catch (e) {
          console.error('Failed to parse wallet transactions:', e);
          setTransactions([]);
        }
      }
    }
  }, []);

  // Save wallet data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wallet_balance', balance.toString());
      localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
    }
  }, [balance, transactions]);

  // Add funds to wallet
  const addFunds = (amount: number) => {
    if (amount <= 0) return;
    
    const newBalance = balance + amount;
    setBalance(newBalance);
    
    // Record transaction
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'deposit',
      amount,
      description: 'Funds added to wallet',
      timestamp: Date.now(),
    };
    
    setTransactions(prev => [transaction, ...prev]);
  };

  // Withdraw funds from wallet
  const withdrawFunds = (amount: number): boolean => {
    if (amount <= 0) return false;
    if (balance < amount) return false;
    
    const newBalance = balance - amount;
    setBalance(newBalance);
    
    // Record transaction
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'withdrawal',
      amount,
      description: 'Funds withdrawn from wallet',
      timestamp: Date.now(),
    };
    
    setTransactions(prev => [transaction, ...prev]);
    return true;
  };

  return (
    <WalletContext.Provider value={{ balance, addFunds, withdrawFunds, transactions }}>
      {children}
    </WalletContext.Provider>
  );
}; 