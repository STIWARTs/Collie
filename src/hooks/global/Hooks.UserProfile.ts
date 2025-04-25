import { create } from 'zustand';

interface IUserProfileHook {
  FullName: string;
  EmailAddress: string;
  PhoneNumber: string;
  PhotoUrl: string;
  DateOfBirth: string;
  Gender: string;
  isEmailVerified: boolean | undefined;
  setFullName: Dispatch<string>;
  setEmailAddress: Dispatch<string>;
  setPhoneNumber: Dispatch<string>;
  setPhotoUrl: Dispatch<string>;
  setDateOfBirth: Dispatch<string>;
  setGender: Dispatch<string>;
  setIsEmailVerified: Dispatch<boolean | undefined>;
}

export const userProfileHook = create<IUserProfileHook>()((set) => ({
  FullName: '',
  EmailAddress: '',
  PhoneNumber: '',
  PhotoUrl: '',
  DateOfBirth: '',
  Gender: '',
  isEmailVerified: undefined,
  setFullName: (value) => set(() => ({ FullName: value })),
  setEmailAddress: (value) => set(() => ({ EmailAddress: value })),
  setPhoneNumber: (value) => set(() => ({ PhoneNumber: value })),
  setPhotoUrl: (value) => set(() => ({ PhotoUrl: value })),
  setDateOfBirth: (value) => set(() => ({ DateOfBirth: value })),
  setGender: (value) => set(() => ({ Gender: value })),
  setIsEmailVerified: (value) => set(() => ({ isEmailVerified: value })),
}));
