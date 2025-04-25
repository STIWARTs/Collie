import { m } from 'framer-motion';
import { VerifyEmailAddress } from 'functions/AuthAlgorithms';
import { userProfileHook } from 'hooks/global/Hooks.UserProfile';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { useEffect } from 'react';
import { FirebaseAuth } from 'authentication/clientApp';
import SetupSubmitButton from 'components/button/Setup/SetupSubmitButton';
import SignInNextButton from 'components/button/Setup/SignInNextButton';
import GreenSuccessHint from 'components/hint/GreenSuccessHint';

function SetupRegisterVerifyEmailScreen(
  props: SetupRegisterVerifyEmailScreenProps,
) {
  const { isEmailVerified, setIsEmailVerified } = userProfileHook();
  const { setToast } = ToastHook();

  // Submit
  const VerifyEmailClick = () => {
    if (!isEmailVerified) {
      VerifyEmailAddress({
        Loading: props.setLoading,
        Next: () => {},
        ShowToast: (Title, Description, Type, Show) =>
          setToast({
            Title: Title,
            Description: Description,
            Type: Type,
            Show: Show,
          }),
      });
    } else {
      props.CheckInfoHandler();
    }
  };

  useEffect(() => {
    if (!FirebaseAuth) return;
    return FirebaseAuth.onIdTokenChanged(async (user) => {
      if (!user) return;
      if (user.emailVerified) setIsEmailVerified(true);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        {isEmailVerified ? (
          <GreenSuccessHint Label="Your email address has been verified successfully." />
        ) : (
          <>
            <p className="w-full text-left text-sm font-normal tracking-wide text-white/75">
              To verify your email address, click Verify Email. A verification
              email will be sent to the email address you provided. Click the
              link in the email to verify your address.
            </p>
            <div className="flex w-full justify-start">
              <SignInNextButton
                Label="I will verify later"
                onClick={props.CheckInfoHandler}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex w-full justify-end">
        <div className="flex">
          <SetupSubmitButton
            Loading={props.Loading}
            Disabled={props.Loading}
            onClick={VerifyEmailClick}
          >
            {isEmailVerified ? 'Next' : 'Verify Email'}
          </SetupSubmitButton>
        </div>
      </div>
    </m.div>
  );
}

export default SetupRegisterVerifyEmailScreen;
