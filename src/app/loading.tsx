import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0f0f0f]">
      <div className="flex flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
        <p className="mt-4 text-white opacity-70">Loading...</p>
      </div>
    </div>
  );
}
