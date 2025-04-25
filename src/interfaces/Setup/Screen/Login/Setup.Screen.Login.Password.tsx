import Image from 'next/image';
import { m } from 'framer-motion';
import { useState } from 'react';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { userProfileHook } from 'hooks/global/Hooks.UserProfile';
import { SignInWithEmailAndPassword } from 'functions/AuthAlgorithms';
import SignInBackButton from 'components/button/Setup/SignInBackButton';
import SignInNextButton from 'components/button/Setup/SignInNextButton';
import SetupSubmitButton from 'components/button/Setup/SetupSubmitButton';
import SetupIconPasswordTextField from 'interfaces/Setup/Input/Setup.Input.IconPassword';
import { useRouter } from 'next/navigation';

function SetupLoginPasswordScreen(props: SetupLoginPasswordScreenProps) {
  const [Password, setPassword] = useState('');
  const { EmailAddress } = userProfileHook();
  const { setToast } = ToastHook();
  const router = useRouter();

  // Validation
  const passwordExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  const ValidatePassword =
    passwordExpression.test(Password) && Password.length > 7;

  const EmptyPassword = () => {
    setPassword('');
  };

  // Screens
  const BackToEmailScreen = () => {
    props.setScreen('login-email');
  };
  const MoveToForgotPassword = () => {
    props.setScreen('login-forgot-password');
  };

  // Submit
  const PasswordSubmitClick = () => {
    if (ValidatePassword) {
      SignInWithEmailAndPassword({
        EmailAddress: EmailAddress,
        Password: Password,
        EmptyPasswordTextField: EmptyPassword,
        Loading: props.setLoading,
        BackToEmailScreen: BackToEmailScreen,
        Redirect: (value) => router.push(value),
        ShowToast: (Title, Description, Type, Show) =>
          setToast({
            Title: Title,
            Description: Description,
            Type: Type,
            Show: Show,
          }),
      });
    } else {
      setToast({
        Title: 'Incorrect email',
        Description: 'Please enter a valid email address.',
        Type: 'Error',
        Show: true,
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
        <div className="flex w-full items-center justify-center">
          <div className="flex items-center justify-center space-x-2 rounded-full bg-white/5 py-1 pl-1 pr-3">
            <div className="min-h-[20px] min-w-[20px]">
              <Image
                height={20}
                width={20}
                src="/images/default/user.png"
                className="rounded-full"
                alt=""
              />
            </div>
            <p className="text-[13px] font-[300] text-white">{EmailAddress}</p>
          </div>
        </div>
        <SetupIconPasswordTextField
          Value={Password}
          setValue={setPassword}
          ValidateValue={ValidatePassword}
          HandleSubmit={PasswordSubmitClick}
        />
        <div className="flex w-full flex-col space-y-1">
          <div className="flex w-full justify-start">
            <SignInNextButton
              Label="Forgot password ?"
              onClick={MoveToForgotPassword}
            />
          </div>
          <div className="flex w-full justify-start">
            <SignInBackButton Label="Back" onClick={BackToEmailScreen} />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <div className="flex">
          <SetupSubmitButton
            Disabled={!ValidatePassword}
            onClick={PasswordSubmitClick}
            Loading={props.Loading}
          >
            Login
          </SetupSubmitButton>
        </div>
      </div>
    </m.div>
  );
}

export default SetupLoginPasswordScreen;
