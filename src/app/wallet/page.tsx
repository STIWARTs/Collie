'use client';

import { useState } from 'react';
import { Button, TextField, Box, Divider, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';
import { ArrowLeftIcon, PlusIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { useToast } from 'context/ToastContext';
import { useWallet, Transaction } from 'context/WalletContext';

export default function WalletPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { balance, addFunds, transactions } = useWallet();
  const [amount, setAmount] = useState('');
  const [showAddFunds, setShowAddFunds] = useState(false);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddFunds = () => {
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      showToast('Error', 'Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    addFunds(amountValue);
    showToast('Success', 'Funds Added', `₹${amountValue.toFixed(2)} has been added to your wallet.`);
    setAmount('');
    setShowAddFunds(false);
  };

  return (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center">
            <Button
              startIcon={<ArrowLeftIcon className="h-4 w-4" />}
              onClick={() => router.back()}
              className="text-white transition-all duration-200 ease-in-out hover:bg-white/10 hover:shadow-sm"
              sx={{ textTransform: 'none' }}
            >
              Back
            </Button>
            <h1 className="ml-4 text-2xl font-bold text-white">My Wallet</h1>
          </div>

          {/* Wallet Card */}
          <div className="mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-medium text-white/80">Current Balance</p>
                <h2 className="mt-2 text-4xl font-bold text-white">₹{balance.toFixed(2)}</h2>
              </div>
              <Button
                startIcon={<PlusIcon className="h-5 w-5" />}
                onClick={() => setShowAddFunds(!showAddFunds)}
                className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-md transition-all duration-200 hover:bg-white/90 md:mt-0"
                sx={{ textTransform: 'none' }}
              >
                Add Funds
              </Button>
            </div>

            {/* Add Funds Form */}
            {showAddFunds && (
              <div className="mt-6 rounded-lg bg-white/10 p-4">
                <div className="flex items-end space-x-3">
                  <TextField
                    label="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    variant="outlined"
                    type="number"
                    fullWidth
                    autoFocus
                    inputProps={{ min: 1 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                        '&:hover fieldset': { borderColor: 'white' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': { color: 'white' },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddFunds}
                    disabled={!amount || parseFloat(amount) <= 0}
                    className="h-14 whitespace-nowrap bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition-all duration-200 hover:bg-white/90"
                    sx={{ textTransform: 'none' }}
                  >
                    Add Funds
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Transaction History */}
          <div className="rounded-xl bg-[#181818] p-6">
            <h2 className="mb-6 text-xl font-semibold text-white">Transaction History</h2>

            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-gray-800 p-4">
                  <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-gray-400">No transactions yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 transition-all duration-200 hover:bg-gray-800/80"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            transaction.type === 'deposit'
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-red-500/20 text-red-500'
                          }`}
                        >
                          {transaction.type === 'deposit' ? (
                            <ArrowDownIcon className="h-5 w-5" />
                          ) : (
                            <ArrowUpIcon className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {transaction.type === 'deposit'
                              ? 'Added Funds'
                              : 'Payment'}
                          </p>
                          <p className="text-sm text-gray-400">
                            {transaction.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-semibold ${
                            transaction.type === 'deposit'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          {transaction.type === 'deposit' ? '+' : '-'}₹
                          {transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDate(transaction.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
} 