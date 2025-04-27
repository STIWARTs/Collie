'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button, Box } from '@mui/material';

// Dynamically import components to avoid initial loading errors
const HomeAndGalleryParentLayout = dynamic(
  () => import('components/layout/HomeAndGallery/HomeAndGallery.ParentLayout'),
  { ssr: false },
);

const HomeAndGalleryChildLayout = dynamic(
  () => import('components/layout/HomeAndGallery/HomeAndGallery.ChildLayout'),
  { ssr: false },
);

const DiscoverInterface = dynamic(
  () => import('interfaces/Discover.Interface'),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#0f0f0f]">
        <div className="flex flex-col items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          <p className="mt-4 text-white opacity-70">Loading...</p>
        </div>
      </div>
    ),
  },
);

export default function Page() {
  const [showDebug, setShowDebug] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Only render on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Navigation test functions
  const navigateToOrder = () => {
    window.location.href = '/order?product=Test+Product&price=1999';
  };

  const navigateToDetails = () => {
    window.location.href = '/details?product=Test+Product';
  };

  const navigateToRedirect = () => {
    window.location.href =
      '/redirect.html?type=order&product=Test+Product&price=1999';
  };

  if (!isClient) {
    return null; // Don't render anything during SSR
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0f0f0f] p-4 text-white">
        <div className="mb-8 w-full max-w-md text-center">
          <h1 className="mb-4 text-3xl font-bold">Something went wrong</h1>
          <p className="mb-6 text-gray-400">{error.message}</p>
        </div>
        <Button
          variant="contained"
          className="bg-white text-black hover:bg-gray-200"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center bg-[#0f0f0f]">
          <div className="flex flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            <p className="mt-4 text-white opacity-70">Loading...</p>
          </div>
        </div>
      }
    >
      <HomeAndGalleryParentLayout>
        <HomeAndGalleryChildLayout>
          <DiscoverInterface />

          {/* Debug Panel - Click in the bottom right corner to show */}
          <div
            className="fixed bottom-4 right-4 z-50 h-10 w-10 cursor-pointer rounded-full bg-transparent"
            onClick={() => setShowDebug((prev) => !prev)}
          />

          {showDebug && (
            <Box
              className="fixed bottom-16 right-4 z-50 rounded-lg bg-black/90 p-4"
              sx={{ width: 280 }}
            >
              <h4 className="mb-3 text-white">Navigation Debug</h4>
              <div className="flex flex-col space-y-2">
                <Button
                  variant="contained"
                  className="w-full bg-blue-600 text-white"
                  onClick={navigateToOrder}
                >
                  Test Order Page
                </Button>
                <Button
                  variant="contained"
                  className="w-full bg-green-600 text-white"
                  onClick={navigateToDetails}
                >
                  Test Details Page
                </Button>
                <Button
                  variant="contained"
                  className="w-full bg-purple-600 text-white"
                  onClick={navigateToRedirect}
                >
                  Test Redirect
                </Button>
              </div>
            </Box>
          )}
        </HomeAndGalleryChildLayout>
      </HomeAndGalleryParentLayout>
    </React.Suspense>
  );
}
