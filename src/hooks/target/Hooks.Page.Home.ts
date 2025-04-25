import { create } from 'zustand';

interface IHomePageHook {
  HomePage: 'Discover' | 'Offers' | 'Collections' | 'NFT Collection';
  setHomePage: (
    value: 'Discover' | 'Offers' | 'Collections' | 'NFT Collection',
  ) => void;
}

export const HomePageHook = create<IHomePageHook>()((set) => ({
  HomePage: 'Discover',
  setHomePage: (value) => set(() => ({ HomePage: value })),
}));
