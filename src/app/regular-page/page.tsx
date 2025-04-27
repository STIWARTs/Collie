'use client';

import React, { useEffect } from 'react';
import { Button } from '@mui/material';

export default function RegularPage() {
  useEffect(() => {
    // Redirect to home page
    window.location.href = '/';
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0f0f0f] p-4 text-white">
      <div className="flex flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
        <p className="mt-4 text-white opacity-70">
          Loading full application...
        </p>
      </div>
    </div>
  );
}
