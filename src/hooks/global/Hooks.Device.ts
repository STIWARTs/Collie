'use client';

import { create } from 'zustand';
import { useEffect } from 'react';
import { useScreenDimensions } from '../useScreenDimensions';

interface IDeviceHook {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

// Create the store with initial state
export const DeviceHook = create<IDeviceHook>()((set) => ({
  isMobile: false,
  setIsMobile: (value) => set(() => ({ isMobile: value })),
}));

// Create a wrapper hook that syncs with useScreenDimensions
export const useDeviceHook = () => {
  const store = DeviceHook();
  const { isMobile } = useScreenDimensions();

  useEffect(() => {
    store.setIsMobile(isMobile);
  }, [isMobile, store]);

  return store;
};
