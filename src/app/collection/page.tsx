'use client';

import React from 'react';
import { Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';
import { NFTCollection } from 'components/nft/NFTCollection';
import { ConnectWalletButton } from 'components/wallet/ConnectWalletButton';

export default function CollectionPage() {
  const router = useRouter();

  return (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <div className="mx-auto max-w-7xl py-6">
          <div className="flex flex-col px-4">
            {/* Back button */}
            <Button
              startIcon={<ArrowLeftIcon className="h-4 w-4" />}
              onClick={() => router.back()}
              className="mb-6 self-start text-white hover:bg-[#ffffff20]"
            >
              Back
            </Button>

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Digital Fashion Collection
                </h1>
                <p className="mt-2 text-gray-300">
                  View your digital fashion NFTs minted on Base blockchain
                </p>
              </div>
              <ConnectWalletButton />
            </div>

            <div className="mb-6 rounded-lg bg-gradient-to-r from-[#0052FF20] to-[#00A3FF20] p-4">
              <div className="flex items-center space-x-3">
                <img src="/base-logo.svg" alt="Base" className="h-8 w-8" />
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Base Blockchain
                  </h2>
                  <p className="text-sm text-gray-300">
                    Your digital fashion items are securely stored on Base
                    blockchain
                  </p>
                </div>
              </div>
            </div>

            <NFTCollection />
          </div>
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
}
