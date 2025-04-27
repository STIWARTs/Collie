'use client';

import React from 'react';

export default function SimplifiedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#0f0f0f] text-white">
          <main className="container mx-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
