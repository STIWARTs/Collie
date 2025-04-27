'use client';

import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0f0f0f] px-4 text-white">
      <div className="mb-8 w-full max-w-md text-center">
        <Image
          src="/vectors/error-icon.svg"
          width={120}
          height={120}
          alt="Error"
          className="mx-auto mb-6 opacity-60"
          priority
        />
        <h1 className="mb-2 text-3xl font-bold">Something went wrong</h1>
        <p className="mb-6 text-gray-400">
          {error.message || "We're having trouble loading this page"}
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
        <Button
          variant="outlined"
          className="border-white py-2 text-white hover:bg-[#ffffff20]"
          onClick={() => router.push('/')}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
