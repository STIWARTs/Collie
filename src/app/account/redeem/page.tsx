'use client';

import { useState } from 'react';
import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';
import {
  ArrowLeftIcon,
  GiftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useToast } from 'context/ToastContext';

export default function RedeemPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [giftCode, setGiftCode] = useState('');
  const [redeemSuccess, setRedeemSuccess] = useState<{
    code: string;
    amount: string;
    expiry: string;
  } | null>(null);

  const handleRedeem = () => {
    if (!giftCode) {
      showToast(
        'Warning',
        'Missing Information',
        'Please enter a gift code or card number.',
      );
      return;
    }

    // Validate code format
    const isValidFormat = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(
      giftCode,
    );
    if (!isValidFormat) {
      showToast(
        'Error',
        'Invalid Format',
        'Please enter a valid gift code in the format XXXX-XXXX-XXXX.',
      );
      return;
    }

    // In a real app, this would check the code with a backend
    // Mock successful redemption
    setRedeemSuccess({
      code: giftCode,
      amount: '₹2,000',
      expiry: 'December 31, 2023',
    });

    showToast(
      'Success',
      'Code Redeemed',
      `Gift code ${giftCode} has been successfully redeemed!`,
    );
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
            <h1 className="ml-4 text-2xl font-bold text-white">
              Redeem Code or Gift Card
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Left column - Redeem form */}
            <div className="md:col-span-3">
              <Paper className="rounded-xl bg-[#181818] p-6">
                <div className="flex items-center space-x-3">
                  <GiftIcon className="h-6 w-6 text-purple-400" />
                  <Typography variant="h6" className="text-white">
                    Redeem Your Code
                  </Typography>
                </div>

                <Typography variant="body2" className="mt-2 text-gray-400">
                  Enter your gift card code or promo code below to apply it to
                  your account.
                </Typography>

                <div className="mt-6 space-y-4">
                  <TextField
                    fullWidth
                    label="Gift Code or Card Number"
                    value={giftCode}
                    onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                    variant="outlined"
                    placeholder="XXXX-XXXX-XXXX"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': { color: 'white' },
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 py-2.5 text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-xl"
                    onClick={handleRedeem}
                    disabled={!giftCode}
                    sx={{ textTransform: 'none', mt: 2 }}
                  >
                    Redeem Code
                  </Button>
                </div>

                {redeemSuccess && (
                  <div className="mt-6 rounded-lg bg-purple-900/20 p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      <Typography
                        variant="body1"
                        className="font-medium text-white"
                      >
                        Code Successfully Redeemed!
                      </Typography>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <Typography variant="body2" className="text-gray-400">
                          Code:
                        </Typography>
                        <Typography variant="body2" className="text-white">
                          {redeemSuccess.code}
                        </Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography variant="body2" className="text-gray-400">
                          Amount:
                        </Typography>
                        <Typography variant="body2" className="text-white">
                          {redeemSuccess.amount}
                        </Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography variant="body2" className="text-gray-400">
                          Expires:
                        </Typography>
                        <Typography variant="body2" className="text-white">
                          {redeemSuccess.expiry}
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="body2" className="mt-3 text-green-400">
                      The amount has been added to your account balance.
                    </Typography>
                  </div>
                )}
              </Paper>
            </div>

            {/* Right column - Information */}
            <div className="md:col-span-2">
              <Paper className="rounded-xl bg-[#181818] p-6">
                <Typography variant="h6" className="mb-3 text-white">
                  How to Redeem
                </Typography>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start space-x-2">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                      1
                    </div>
                    <Typography variant="body2">
                      Enter the 12-digit code found on your gift card or in your
                      email.
                    </Typography>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                      2
                    </div>
                    <Typography variant="body2">
                      Click on &quot;Redeem Code&quot; to apply the credit to
                      your account.
                    </Typography>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                      3
                    </div>
                    <Typography variant="body2">
                      The amount will be automatically applied to your next
                      purchase.
                    </Typography>
                  </div>
                </div>

                <Divider className="my-4 border-gray-700" />

                <div className="rounded-lg bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-4">
                  <Typography
                    variant="subtitle2"
                    className="font-medium text-white"
                  >
                    Need Help?
                  </Typography>
                  <Typography variant="body2" className="mt-1 text-gray-300">
                    If you&apos;re having issues with your code, please contact
                    our customer support team.
                  </Typography>
                  <Button
                    variant="outlined"
                    className="mt-3 border-white/30 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10"
                    size="small"
                    onClick={() =>
                      showToast(
                        'Info',
                        'Help Requested',
                        'Our support team will contact you shortly.',
                      )
                    }
                    sx={{ textTransform: 'none' }}
                  >
                    Contact Support
                  </Button>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
}
