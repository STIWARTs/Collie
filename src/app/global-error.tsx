'use client';

import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0f0f0f] px-4 text-white">
          <div className="mb-8 w-full max-w-md text-center">
            <h1 className="mb-2 text-3xl font-bold">Critical Error</h1>
            <p className="mb-6 text-gray-400">
              A critical error has occurred while loading the application.
            </p>
            <div className="text-xs text-gray-500">
              {error.digest && <p>Error ID: {error.digest}</p>}
            </div>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              variant="contained"
              className="bg-white py-2 text-black hover:bg-gray-200"
              onClick={() => reset()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
