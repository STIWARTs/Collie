import { create } from 'zustand';

interface IDeviceHook {
  isMobile: boolean;
  setIsMobile: Dispatch<boolean>;
}

export const DeviceHook = create<IDeviceHook>()((set) => ({
  isMobile: false,
  setIsMobile: (value) => set(() => ({ isMobile: value })),
}));
