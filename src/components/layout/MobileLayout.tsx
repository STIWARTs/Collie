'use client';

import React from 'react';
import { Box } from '@mui/material';
import MobileNavigation from '../navigation/MobileNavigation';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

export default function MobileLayout({
  children,
  hideNavigation = false,
}: MobileLayoutProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        pt: '64px',
        pb: hideNavigation ? 0 : '60px',
        minHeight: '100vh',
      }}
      className="bg-[#0f0f0f]"
    >
      {!hideNavigation && <MobileNavigation />}
      <Box sx={{ pb: 4 }}>{children}</Box>
    </Box>
  );
}
