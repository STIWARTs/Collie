import { create } from 'zustand';

interface ILoaderHook {
  Loader: boolean;
  setLoader: Dispatch<boolean>;
}

export const LoaderHook = create<ILoaderHook>()((set) => ({
    Loader: false,
    setLoader: (value) => set(() => ({ Loader: value })),
  }));