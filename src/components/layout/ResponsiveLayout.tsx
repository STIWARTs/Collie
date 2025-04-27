'use client';

import React from 'react';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';
import MobileLayout from './MobileLayout';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

export default function ResponsiveLayout({
  children,
  hideNavigation = false,
}: ResponsiveLayoutProps) {
  const { isMobile } = useScreenDimensions();

  if (isMobile) {
    return (
      <MobileLayout hideNavigation={hideNavigation}>{children}</MobileLayout>
    );
  }

  // For desktop view
  return <div className="min-h-screen bg-[#0f0f0f]">{children}</div>;
}
