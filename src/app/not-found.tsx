import React from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0f0f0f] px-4 text-white">
      <div className="mb-8 w-full max-w-md text-center">
        <Image
          src="/vectors/404-icon.svg"
          width={180}
          height={180}
          alt="404"
          className="mx-auto mb-6 opacity-60"
          priority
          unoptimized
        />
        <h1 className="mb-2 text-3xl font-bold">Page Not Found</h1>
        <p className="mb-6 text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link href="/" passHref>
          <Button
            variant="contained"
            className="bg-white py-2 text-black hover:bg-gray-200"
          >
            Go Home
          </Button>
        </Link>
        <Link href="/gallery" passHref>
          <Button
            variant="outlined"
            className="border-white py-2 text-white hover:bg-[#ffffff20]"
          >
            Browse Collections
          </Button>
        </Link>
      </div>
    </div>
  );
} 