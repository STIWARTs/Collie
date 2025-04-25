'use client';

import HomeAndGalleryChildLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ChildLayout';
import HomeAndGalleryParentLayout from 'components/layout/HomeAndGallery/HomeAndGallery.ParentLayout';
import DiscoverInterface from 'interfaces/Discover.Interface';
import { Button, Box } from '@mui/material';
import { useState } from 'react';

function Page() {
  const [showDebug, setShowDebug] = useState(false);

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

  return (
    <HomeAndGalleryParentLayout>
      <HomeAndGalleryChildLayout>
        <DiscoverInterface />

        {/* Debug Panel - Click 10 times in the bottom right corner to show */}
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
  );
}

export default Page;
