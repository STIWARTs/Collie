import { useState } from 'react';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ResentOTP } from 'functions/AuthAlgorithms';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { userProfileHook } from 'hooks/global/Hooks.UserProfile';
import { EncryptData } from 'functions/security/CryptionSecurity';
import { DeleteAccount, VerifyOTP } from 'functions/AuthAlgorithms';
import OTPTimer from 'components/timer/OTPTimer';
import UserProfileEncryptionKey from 'functions/security/CryptionKey';
import SetupOTPTextField from 'interfaces/Setup/Input/Setup.Input.OTP';
import SignInBackButton from 'components/button/Setup/SignInBackButton';
import SignInNextButton from 'components/button/Setup/SignInNextButton';
import SetupSubmitButton from 'components/button/Setup/SetupSubmitButton';
import OperateUserProfile from 'databases/controllers/Controller.UserProfile';

function SetupLoginOTPScreen(props: SetupLoginOTPScreenProps) {
  const [OTPs, setOTPs] = useState({
    OTP1: '',
    OTP2: '',
    OTP3: '',
    OTP4: '',
    OTP5: '',
    OTP6: '',
  });
  const [Bool, setBool] = useState(false);
  const { Toast, setToast } = ToastHook();
  const { PhoneNumber } = userProfileHook();
  const router = useRouter();

  // Validation
  const ValidateOTP: boolean =
    OTPs.OTP1.length > 0 &&
    OTPs.OTP1.length == 1 &&
    OTPs.OTP2.length > 0 &&
    OTPs.OTP2.length == 1 &&
    OTPs.OTP3.length > 0 &&
    OTPs.OTP3.length == 1 &&
    OTPs.OTP4.length > 0 &&
    OTPs.OTP4.length == 1 &&
    OTPs.OTP5.length > 0 &&
    OTPs.OTP5.length == 1 &&
    OTPs.OTP6.length > 0 &&
    OTPs.OTP6.length == 1;

  // Handle OTP
  const CancelOTPVerification = () => {
    setToast({ ...Toast, Show: false });
    clearOTP();
    setBool(false);
    props.setResetCaptcha(true);
    props.setScreen('login-phone');
    setToast({
      Title: 'Verification process failed',
      Description: 'You have cancelled the otp verification.',
      Type: 'Error',
      Show: true,
    });
  };
  const clearOTP = () => {
    setOTPs({ OTP1: '', OTP2: '', OTP3: '', OTP4: '', OTP5: '', OTP6: '' });
  };
  const showResend = () => {
    setBool(true);
  };

  // database
  const CreateDateBase = async (_uid: string) => {
    const UserPhoneNumber = EncryptData(
      UserProfileEncryptionKey(_uid, 'PhoneNumber'),
      PhoneNumber,
    );
    if (!_uid) throw new Error('_uid is required');
    const _data: IUserProfile = {
      _uid: _uid,
      _data: {
        fullName: '',
        emailAddress: '',
        phoneNumber: UserPhoneNumber,
        photoURL: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        isVerified: {
          phoneNumber: true,
          emailAddress: false,
        },
      },
    };
    OperateUserProfile('CREATE', { create: _data })
      .then(() => {
        props.setScreen('register-name');
        props.setLoading(false);
      })
      .catch((error) => {
        if (error instanceof Error)
          setToast({
            Title: 'Something went wrong',
            Description: error.message,
            Type: 'Error',
            Show: true,
          });
        DeleteAccount({
          Loading: props.setLoading,
          ShowToast: (Title, Description, Type, Show) => {
            setToast({
              Title: Title,
              Description: Description,
              Type: Type,
              Show: Show,
            });
          },
          Deletedatabase: () => {
            // Delete database if by any change it has been created,
            props.setLoading(false);
            props.setMainScreen('Error');
            props.setErrorType('database-not-created');
          },
        });
      });
  };

  // OTP Submit
  const OTPResend = () => {
    ResentOTP({
      PhoneNumber: parseInt(PhoneNumber),
      Loading: props.setLoading,
      ShowToast: (Title, Description, Type, Show) => {
        setToast({
          Title: Title,
          Description: Description,
          Type: Type,
          Show: Show,
        });
      },
    });
    setBool(false);
  };

  const OTPSubmitClick = () => {
    if (ValidateOTP) {
      VerifyOTP({
        OTP: parseInt(
          OTPs.OTP1 + OTPs.OTP2 + OTPs.OTP3 + OTPs.OTP4 + OTPs.OTP5 + OTPs.OTP6,
        ),
        Redirect: (value) => router.push(value),
        EmptyOTPBox: clearOTP,
        Loading: props.setLoading,
        CreateDateBase: CreateDateBase,
        ShowToast: (Title, Description, Type, Show) => {
          setToast({
            Title: Title,
            Description: Description,
            Type: Type,
            Show: Show,
          });
        },
      });
    }
  };

  return (
    <m.div
      className={`${props.ParentDivClassName} relative w-full`}
      initial={props.Animation.Initial}
      animate={props.Animation.Final}
      transition={props.Animation.Transition}
    >
      <div
        className={`${props.ContentClassName} flex w-full flex-col space-y-4`}
      >
        <div className="flex items-center space-x-1 pb-1.5">
          <p className="text-[14px] font-normal tracking-wide text-white/75">
            Verification code sent to
          </p>
          <p className="text-[14px] font-[500] tracking-wide text-white">
            {PhoneNumber}
          </p>
        </div>
        <SetupOTPTextField
          OTP1={OTPs.OTP1}
          OTP2={OTPs.OTP2}
          OTP3={OTPs.OTP3}
          OTP4={OTPs.OTP4}
          OTP5={OTPs.OTP5}
          OTP6={OTPs.OTP6}
          setOTP1={(value) => setOTPs({ ...OTPs, OTP1: value })}
          setOTP2={(value) => setOTPs({ ...OTPs, OTP2: value })}
          setOTP3={(value) => setOTPs({ ...OTPs, OTP3: value })}
          setOTP4={(value) => setOTPs({ ...OTPs, OTP4: value })}
          setOTP5={(value) => setOTPs({ ...OTPs, OTP5: value })}
          setOTP6={(value) => setOTPs({ ...OTPs, OTP6: value })}
          HandleSubmit={OTPSubmitClick}
          Loading={props.Loading}
        />
        <div className="flex h-8 w-full justify-start">
          {Bool ? (
            <SignInNextButton onClick={OTPResend} Label="Resend OTP" />
          ) : (
            <div className="pt-2">
              <OTPTimer min={1} sec={30} resend={showResend} />
            </div>
          )}
        </div>
        <div className="flex w-full justify-start">
          <SignInBackButton Label="Back" onClick={CancelOTPVerification} />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <SetupSubmitButton
          Disabled={!ValidateOTP}
          onClick={OTPSubmitClick}
          Loading={props.Loading}
        >
          Verify OTP
        </SetupSubmitButton>
      </div>
    </m.div>
  );
}

export default SetupLoginOTPScreen;
