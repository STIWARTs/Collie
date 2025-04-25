'use client';

import React from 'react';
import { Web3Provider } from '../providers/Web3Provider';

export default function Web3ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Web3Provider>{children}</Web3Provider>;
}
