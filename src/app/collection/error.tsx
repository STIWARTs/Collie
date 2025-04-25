'use client';

import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';

export default function ErrorCollection({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <div className="mx-auto max-w-7xl py-6">
          <div className="flex flex-col px-4">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Something went wrong
                </h1>
                <p className="mt-2 text-gray-300">
                  We encountered an error while loading the NFT collection
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-red-400/10 p-8 text-center">
              <h2 className="mb-4 text-xl font-semibold text-white">
                Error Details
              </h2>
              <p className="mb-6 text-gray-300">
                {error.message || 'An unexpected error occurred'}
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="contained"
                  className="bg-[#0052FF] py-2 text-white hover:bg-[#003CC7]"
                  onClick={() => reset()}
                >
                  Try Again
                </Button>
                <Button
                  variant="outlined"
                  className="border-white py-2 text-white hover:bg-[#ffffff20]"
                  onClick={() => router.push('/')}
                >
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </HomeAndGalleryChildLayout>
    </HomeAndGalleryParentLayout>
  );
}
