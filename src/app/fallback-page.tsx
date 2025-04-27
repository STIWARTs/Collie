'use client';

import React from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function FallbackPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0f0f0f] p-4 text-white">
      <div className="mb-8 w-full max-w-md text-center">
        <h1 className="mb-4 text-3xl font-bold">Collie Fashion</h1>
        <p className="mb-6 text-gray-400">
          Welcome to Collie - Your Personal Fashion Assistant
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/discover" passHref>
          <Button
            variant="contained"
            className="w-full bg-white p-4 text-black hover:bg-gray-200"
          >
            Discover
          </Button>
        </Link>
        <Link href="/collections" passHref>
          <Button
            variant="outlined"
            className="w-full border-white p-4 text-white hover:bg-[#ffffff20]"
          >
            Collections
          </Button>
        </Link>
        <Link href="/offers" passHref>
          <Button
            variant="outlined"
            className="w-full border-white p-4 text-white hover:bg-[#ffffff20]"
          >
            Offers
          </Button>
        </Link>
        <Link href="/profile" passHref>
          <Button
            variant="outlined"
            className="w-full border-white p-4 text-white hover:bg-[#ffffff20]"
          >
            Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
