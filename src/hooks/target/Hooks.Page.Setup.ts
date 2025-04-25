import { create } from 'zustand';

interface ISetupPageHook {
  ResetCaptcha: boolean;
  SkipDialog: boolean;
  Loading: boolean;
  Screen: AuthScreenType;
  ErrorType: AuthErrorType;
  MainScreen: AuthMainScreenType;
}

export const SetupPageHook = create<ISetupPageHook>()(() => ({
  ResetCaptcha: false,
  SkipDialog: false,
  Loading: false,
  Screen: undefined,
  ErrorType: undefined,
  MainScreen: 'CheckInfo',
}));
