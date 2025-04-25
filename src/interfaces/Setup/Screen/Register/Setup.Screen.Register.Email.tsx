import { m } from 'framer-motion';
import { userProfileHook } from 'hooks/global/Hooks.UserProfile';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { EncryptData } from 'functions/security/CryptionSecurity';
import UserProfileEncryptionKey from 'functions/security/CryptionKey';
import SetupSkipAllButton from 'components/button/Setup/RegisterSkipAllButton';
import SignInNextButton from 'components/button/Setup/SignInNextButton';
import SetupSubmitButton from 'components/button/Setup/SetupSubmitButton';
import UseClientAuth from 'authentication/UseClientAuth';
import SetupIconTextField from '../../Input/Setup.Input.Icon';
import OperateUserProfile from 'databases/controllers/Controller.UserProfile';
import SignInBackButton from 'components/button/Setup/SignInBackButton';

function SetupRegisterEmailScreen(props: SetupRegisterEmailScreenProps) {
  const { FirebaseUser } = UseClientAuth();
  const { EmailAddress, setEmailAddress } = userProfileHook();
  const { setToast } = ToastHook();

  // Validation
  const emailExpression =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const ValidateEmailAddress =
    (EmailAddress.toLowerCase().match(emailExpression) &&
      EmailAddress.length > 1) ||
    false;

  // Screens
  const MoveToPasswordScreen = () => {
    props.setScreen('register-password');
  };
  const BackToPhone = () => {
    props.setScreen('register-phone');
  };

  // database
  const Updatedatabase = () => {
    if (FirebaseUser) {
      props.setLoading(true);
      const UserEmailAddress = EncryptData(
        UserProfileEncryptionKey(FirebaseUser.uid, 'EmailAddress'),
        EmailAddress,
      );
      const _data: IUserProfileDataUpdate = {
        '_data.emailAddress': UserEmailAddress,
      };
      OperateUserProfile('UPDATE', { uid: FirebaseUser.uid, update: _data })
        .then(() => {
          props.setLoading(false);
          MoveToPasswordScreen();
        })
        .catch((error) => {
          if (error instanceof Error) {
            props.setLoading(false);
            setToast({
              Title: 'Something went wrong',
              Description: error.message,
              Type: 'Error',
              Show: true,
            });
          }
        });
    } else {
      setToast({
        Title: 'Something went wrong',
        Description: 'It seems like user is not exist.',
        Type: 'Error',
        Show: true,
      });
    }
  };

  // Submit
  const EmailSubmitClick = () => {
    if (ValidateEmailAddress) {
      Updatedatabase();
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
        <SetupIconTextField
          Type="Email"
          Value={EmailAddress}
          setValue={setEmailAddress}
          HandleSubmit={EmailSubmitClick}
          ValidateValue={ValidateEmailAddress}
        />
        <div className="flex w-full flex-col space-y-1">
          <div className="flex w-full justify-start">
            <SignInNextButton
              Label="I will add later"
              onClick={props.CheckInfoHandler}
            />
          </div>
          {/* <div className="flex justify-start w-full">
            <SignInBackButton Label="Back" onClick={BackToPhone} />
          </div> */}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <div className="flex space-x-2">
          <SetupSkipAllButton onClick={() => props.setSkipDialog(true)}>
            Skip all
          </SetupSkipAllButton>
          <SetupSubmitButton
            Disabled={!ValidateEmailAddress}
            onClick={EmailSubmitClick}
            Loading={props.Loading}
          >
            Next
          </SetupSubmitButton>
        </div>
      </div>
    </m.div>
  );
}

export default SetupRegisterEmailScreen;
