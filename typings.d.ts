type ChildrenType = {
  children: React.ReactNode;
};

type VoidType = () => void;

type Dispatch<A> = (value: A) => void;

type DATAType = IUserProfile;

type UPDATE_DATAType = IUserProfileDataUpdate;

type GETType = {
  _uid: string;
};

type POSTType = {
  _data: IUserProfile;
};

type PUTType = {
  _uid: string;
  _data: IUserProfileDataUpdate;
};

type DELETEType = {
  _uid: string;
};

type FetchType = 'CREATE' | 'UPDATE' | 'DELETE';

type FetchDataType = {
  uid?: string;
  create?: IUserProfile;
  update?: IUserProfileDataUpdate;
};

type ParamType = Promise<{
  _uid: string;
}>;

interface ISuccess {
  name: string;
  message: string;
}

interface IError {
  name: string;
  message: string;
}

interface IServerError {
  status: number;
  statusText: string;
}

interface IUserProfileDataUpdate {
  '_data.fullName'?: string;
  '_data.emailAddress'?: string;
  '_data.phoneNumber'?: string;
  '_data.photoURL'?: string;
  '_data.dateOfBirth'?: string;
  '_data.age'?: string;
  '_data.gender'?: string;
  '_data.address'?: string;
  '_data.isVerified.phoneNumber'?: boolean;
  '_data.isVerified.emailAddress'?: boolean;
}

interface IUserProfileData {
  fullName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  photoURL?: string;
  dateOfBirth?: string;
  age?: string;
  gender?: string;
  address?: string;
  isVerified?: {
    phoneNumber?: boolean;
    emailAddress?: boolean;
  };
}

interface IUserProfileDataConstructor {
  _data: IUserProfileData;
}

interface IUserProfileID {
  _uid: string;
}

interface IUserProfile extends IUserProfileID, IUserProfileDataConstructor {}

type AuthScreenType =
  | 'login-phone'
  | 'login-email'
  | 'login-others'
  | 'login-otp'
  | 'login-password'
  | 'login-forgot-password'
  | 'register-name'
  | 'register-phone'
  | 'register-otp'
  | 'register-email'
  | 'register-password'
  | 'register-verify-email'
  | 'register-profile-picture'
  | 'register-date-of-birth'
  | 'register-gender'
  | undefined;

type AuthAnimationType = {
  Initial: {
    x: number;
    opacity: number;
  };
  Final: {
    x: number;
    opacity: number;
  };
  Transition: {
    type: string;
  };
};

type AuthErrorType = 'database-not-created' | 'get-user-failed' | undefined;

type ToastSettingType = {
  Show: boolean;
  Title: string;
  Description: string;
  Type: 'Error' | 'Success' | 'Info' | 'Warning' | '' | '';
};

type AuthMainScreenType = 'Error' | 'CheckInfo' | 'Finish' | 'Setup';

interface IToastDark {
  Open: boolean;
  onClose: Dispatch<boolean>;
  MessageTitle: string;
  MessageDescription: string;
  Type: string;
}

type ICheckInfoScreen =
  | 'initial-login-load'
  | 'after-name'
  | 'after-phone'
  | 'after-email'
  | 'after-verify-email'
  | 'after-profile-picture'
  | 'after-date-of-birth'
  | 'after-gender';

interface ToastDarkProps {
  SlideDirection: 'left' | 'right' | 'up' | 'down';
  Vertical: 'top' | 'bottom';
  Horizontal: 'left' | 'center' | 'right';
  HideDuration: number;
  Toast: {
    Open: boolean;
    onClose: Dispatch<boolean>;
    MessageTitle: string;
    MessageDescription: string;
    Type: 'Error' | 'Success' | 'Info' | 'Warning' | '';
  };
}

type StringType = string | undefined | null;
type BooleanType = boolean | undefined | null;
type NumberType = number | undefined | null;

type RouteType = __next_route_internal_types__.RouteImpl<string>;
