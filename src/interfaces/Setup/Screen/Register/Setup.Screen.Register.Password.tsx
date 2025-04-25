import Image from 'next/image';
import { m } from 'framer-motion';
import { useState } from 'react';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { userProfileHook } from 'hooks/global/Hooks.UserProfile';
import SignInBackButton from 'components/button/Setup/SignInBackButton';
import SetupSubmitButton from 'components/button/Setup/SetupSubmitButton';
import TooltipDark from 'components/tooltip/TooltipDark';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import YellowBulbHint from 'components/hint/YellowBulbHint';
import { LinkWithEmailAndPassword } from 'functions/AuthAlgorithms';
import SetupIconPasswordTextField from '../../Input/Setup.Input.IconPassword';

function SetupRegisterPasswordScreen(props: SetupRegisterPasswordScreenProps) {
  const [Password, setPassword] = useState('');
  const { EmailAddress } = userProfileHook();
  const { setToast } = ToastHook();

  // Validation
  const passwordExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  const ValidatePassword =
    passwordExpression.test(Password) && Password.length > 7;

  const EmptyPassword = () => {
    setPassword('');
  };

  // Screens
  const BackToEmailAddressScreen = () => {
    props.setScreen('register-email');
  };
  const MoveToEmailAddressVerification = () => {
    props.setScreen('register-verify-email');
    props.setLoading(false);
  };

  // Submit
  const PasswordSubmitClick = () => {
    if (ValidatePassword) {
      LinkWithEmailAndPassword({
        EmailAddress: EmailAddress,
        Password: Password,
        Loading: props.setLoading,
        EmptyPasswordTextField: EmptyPassword,
        BackToEmailScreen: BackToEmailAddressScreen,
        Next: MoveToEmailAddressVerification,
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
        <div className="flex w-full space-x-2 opacity-75">
          <TooltipDark
            arrow
            placement="top"
            title="Use a variety of characters, including uppercase and lowercase letters, numbers, and symbols. Make your password at least 8 characters long. Avoid using common words or phrases. Don't use personal information that can be easily guessed, such as your name, birthday, or address. Don't use the same password for multiple accounts."
          >
            <InformationCircleIcon className="h-5 text-white" />
          </TooltipDark>
          <p className="w-full text-left text-sm font-normal text-white">
            Your password should contain at least 8 or more characters with a
            mix of letters of uppercase and lowercase, numbers & symbols.
          </p>
        </div>
        <div className="flex w-full justify-start">
          <YellowBulbHint
            Tooltip
            TooltipPlacement="top"
            TooltipTitle="Some security-sensitive actions, such as creating password and link email-password authentication to your account, require that you have recently logged in. If you have not logged in recently, you will be prompted to do so before you can continue."
            Label="Requires recent login / authentication"
          />
        </div>
        <div className="flex w-full justify-start">
          <SignInBackButton Label="Back" onClick={BackToEmailAddressScreen} />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <div className="flex">
          <SetupSubmitButton
            Disabled={!ValidatePassword}
            onClick={PasswordSubmitClick}
            Loading={props.Loading}
          >
            Next
          </SetupSubmitButton>
        </div>
      </div>
    </m.div>
  );
}

export default SetupRegisterPasswordScreen;
