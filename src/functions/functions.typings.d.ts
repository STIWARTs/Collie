type UserProfileEncryptionKeyType =
  | 'FullName'
  | 'EmailAddress'
  | 'PhoneNumber'
  | 'PhotoURL'
  | 'DateOfBirth'
  | 'Age'
  | 'Gender';

interface RecaptchaProps {
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
  ResetCaptcha: boolean;
  Loading: Dispatch<boolean>;
}

interface ResendOTPProps {
  PhoneNumber: number;
  Loading: Dispatch<boolean>;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface VerifyOTPProps {
  OTP: number;
  EmptyOTPBox: VoidType;
  Redirect: (value: RouteType) => void;
  CreateDateBase: Dispatch<string>;
  Loading: Dispatch<boolean>;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface ConfirmVerifyEmailAddressProps {
  oobCode: string;
  Loading: Dispatch<boolean>;
  Screen: Dispatch<SetStateAction<'Success' | 'Error' | null>>;
  Updatedatabase: VoidType;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface PasswordResentProps {
  EmailAddress: string;
  Loading: Dispatch<boolean>;
  Next: VoidType;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface ConfirmPasswordResetProps {
  oobCode: string;
  Password: string;
  EmptyPassword: VoidType;
  Loading: Dispatch<boolean>;
  Next: VoidType;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface SignInWithPhoneNumberProps {
  PhoneNumber: number;
  EmptyPhoneNumber: VoidType;
  ResetCaptcha: boolean;
  setResetCaptcha: Dispatch<boolean>;
  MoveToOTPScreen: VoidType;
  Loading: Dispatch<boolean>;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface SignInWithEmailAndPasswordProps {
  EmailAddress: string;
  Password: string;
  Redirect: (value: RouteType) => void;
  Loading: Dispatch<boolean>;
  EmptyPasswordTextField: VoidType;
  BackToEmailScreen: VoidType;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}
interface SignInWithOtherAccountsProps {
  Loading: Dispatch<boolean>;
  Checkdatabase: (user: ClientUserType) => void;
  CreateDateBase: (user: ClientUserType) => void;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface AddFullNameProps {
  FullName: string;
  Loading: Dispatch<boolean>;
  Updatedatabase: VoidType;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface AddFullNameUsingServerProps {
  Uid: string;
  FullName: string;
  Loading: Dispatch<boolean>;
  Updatedatabase: VoidType;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface LinkWithEmailAndPasswordProps {
  EmailAddress: string;
  Password: string;
  Loading: Dispatch<boolean>;
  EmptyPasswordTextField: VoidType;
  BackToEmailScreen: VoidType;
  Next: VoidType;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface LinkWithPhoneNumberProps {
  PhoneNumber: number;
  EmptyPhoneNumber: VoidType;
  ResetCaptcha: boolean;
  setResetCaptcha: Dispatch<boolean>;
  Updatedatabase: VoidType;
  Loading: Dispatch<boolean>;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface VerifyOTPForLinkWithPhoneProps {
  OTP: number;
  EmptyOTPBox: VoidType;
  Updatedatabase: VoidType;
  Loading: Dispatch<boolean>;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface AddPhoneNumberProps {
  OTP: number;
  PhoneNumber: string;
  EmptyOTPBox: VoidType;
  updateUserData: () => void;
  Loading: Dispatch<boolean>;

  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface VerifyEmailProps {
  Next: VoidType;
  Loading: Dispatch<boolean>;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface UploadAvatarProps {
  Progress: Dispatch<string>;
  File: File | undefined;
  UpdatedatabaseWithURL: Dispatch<string>;
  Loading: Dispatch<boolean>;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface UploadAvatarUsingServerProps {
  Uid: string;
  Progress: Dispatch<string>;
  File: File | undefined;
  UpdatedatabaseWithURL: Dispatch<string>;
  Loading: Dispatch<boolean>;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface DeleteAvatarProps {
  AvatarURL: string;
  DeletePhotoURLFromdatabase: VoidType;
  Loading: Dispatch<boolean>;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

interface SignOutProps {
  Next: VoidType;
}

interface DeleteAccountProps {
  Loading: Dispatch<boolean>;
  Deletedatabase: Dispatch<string>;
  ShowToast: (
    title: string,
    description: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning' | '',
    show: boolean,
  ) => void;
}

type RetrieveUserDataType = {
  Uid: StringType;
  displayName: StringType;
  email: StringType;
  phoneNumber: StringType;
  photoURL: StringType;
  emailVerified: BooleanType;
};
