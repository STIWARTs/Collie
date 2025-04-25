'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the FloatingAIButton with no SSR
const FloatingAIButton = dynamic(() => import('./FloatingAIButton'), {
  ssr: false,
});

export default function AIButtonWrapper() {
  const [mounted, setMounted] = useState(false);

  // Only render the button after the component is mounted client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  // Render the button only on client-side
  return <FloatingAIButton />;
}
