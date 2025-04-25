/* ---- Dialog ---- */

interface SetupCheckDialogProps {
  Open: boolean;
  PrevFullName?: string;
  PrevPhotoUrl?: string;
  NewFullName?: string;
  NewPhotoUrl?: string;
}

interface SetupSkipDialogProps {
  Open: boolean;
  onClose: () => void;
}

/* ---- Screen - Login ---- */

interface SetupLoginEmailScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  setScreen: Dispatch<AuthScreenType>;
  Loading: boolean;
}

interface SetupLoginForgotPasswordScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Loading: boolean;
  Animation: AuthAnimationType;
  setScreen: Dispatch<AuthScreenType>;
  setLoading: Dispatch<boolean>;
}

interface SetupLoginOtherAccountScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  CheckInfoHandler: VoidType;
  setScreen: Dispatch<AuthScreenType>;
  setLoading: Dispatch<boolean>;
  setErrorType: Dispatch<AuthErrorType>;
  setMainScreen: Dispatch<AuthMainScreenType>;
}

interface SetupLoginOTPScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  CheckInfoHandler: VoidType;
  setScreen: Dispatch<AuthScreenType>;
  setLoading: Dispatch<boolean>;
  setErrorType: Dispatch<AuthErrorType>;
  setMainScreen: Dispatch<AuthMainScreenType>;
  setResetCaptcha: Dispatch<boolean>;
  Loading: boolean;
}

interface SetupLoginPasswordScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  setScreen: Dispatch<AuthScreenType>;
  setLoading: Dispatch<boolean>;
  Loading: boolean;
}

interface SetupLoginPhoneScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  setScreen: Dispatch<AuthScreenType>;
  setLoading: Dispatch<boolean>;
  ResetCaptcha: boolean;
  setResetCaptcha: Dispatch<boolean>;
  Loading: boolean;
}

/* ---- Screen - Register ---- */

interface SetupRegisterBirthdayScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  CheckInfoHandler: VoidType;
  setScreen: Dispatch<AuthScreenType>;
  setSkipDialog: Dispatch<boolean>;
  setLoading: Dispatch<boolean>;
  Loading: boolean;
}

interface SetupRegisterEmailScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  CheckInfoHandler: VoidType;
  setScreen: Dispatch<AuthScreenType>;
  setSkipDialog: Dispatch<boolean>;
  setLoading: Dispatch<boolean>;
  Loading: boolean;
}

interface SetupRegisterGenderScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  CheckInfoHandler: VoidType;
  setScreen: Dispatch<AuthScreenType>;
  setSkipDialog: Dispatch<boolean>;
  setLoading: Dispatch<boolean>;
  Loading: boolean;
}

interface SetupRegisterNameScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  CheckInfoHandler: VoidType;
  setSkipDialog: Dispatch<boolean>;
  setLoading: Dispatch<boolean>;
  Loading: boolean;
}

interface SetupRegisterOTPScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  CheckInfoHandler: VoidType;
  setScreen: Dispatch<AuthScreenType>;
  setResetCaptcha: Dispatch<boolean>;
  setLoading: Dispatch<boolean>;
  Loading: boolean;
}

interface SetupRegisterPasswordScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  CheckInfoHandler: VoidType;
  setScreen: Dispatch<AuthScreenType>;
  setLoading: Dispatch<boolean>;
  Loading: boolean;
}

interface SetupRegisterPhoneScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  CheckInfoHandler: VoidType;
  setScreen: Dispatch<AuthScreenType>;
  ResetCaptcha: boolean;
  setResetCaptcha: Dispatch<boolean>;
  setSkipDialog: Dispatch<boolean>;
  setLoading: Dispatch<boolean>;
  Loading: boolean;
}

interface SetupRegisterProfilePictureScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  CheckInfoHandler: VoidType;
  setScreen: Dispatch<AuthScreenType>;
  setSkipDialog: Dispatch<boolean>;
  Loading: boolean;
}

interface SetupRegisterVerifyEmailScreenProps {
  ContentClassName?: string;
  ParentDivClassName?: string;
  Animation: AuthAnimationType;
  CheckInfoHandler: VoidType;
  setLoading: Dispatch<boolean>;
  Loading: boolean;
}

/* ---- Screen ---- */

interface SetupErrorScreenProps {
  Type: 'database-not-created' | 'get-user-failed' | undefined;
  ToastTitle: string;
  ToastDescription: string;
  ClassName?: string;
}

interface SetupFinishScreenProps {
  ClassName: string;
}
