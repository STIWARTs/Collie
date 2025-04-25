import { m } from 'framer-motion';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { EncryptData } from 'functions/security/CryptionSecurity';
import { userProfileHook } from 'hooks/global/Hooks.UserProfile';
import { LinkWithPhoneNumber } from 'functions/AuthAlgorithms';
import UserProfileEncryptionKey from 'functions/security/CryptionKey';
import SignInNextButton from 'components/button/Setup/SignInNextButton';
import SetupSubmitButton from 'components/button/Setup/SetupSubmitButton';
import SetupSkipAllButton from 'components/button/Setup/RegisterSkipAllButton';
import SignInBackButton from 'components/button/Setup/SignInBackButton';
import UseClientAuth from 'authentication/UseClientAuth';
import SetupIconNumberTextField from 'interfaces/Setup/Input/Setup.Input.IconNumber';
import OperateUserProfile from 'databases/controllers/Controller.UserProfile';

function SetupRegisterPhoneScreen(props: SetupRegisterPhoneScreenProps) {
  const { FirebaseUser } = UseClientAuth();
  const { PhoneNumber, setPhoneNumber } = userProfileHook();
  const { setToast } = ToastHook();

  const EmptyPhoneNumber = () => {
    setPhoneNumber('');
  };

  // Validation
  const ValidatePhoneNumber =
    PhoneNumber.length === 10 && PhoneNumber.length > 9;

  // Screens
  const MoveToOTPScreen = () => {
    props.setScreen('register-otp');
  };
  const BackToName = () => {
    props.setScreen('register-name');
  };

  // database
  const Updatedatabase = () => {
    if (FirebaseUser) {
      const UserPhoneNumber = EncryptData(
        UserProfileEncryptionKey(FirebaseUser.uid, 'PhoneNumber'),
        PhoneNumber.toString(),
      );
      const _data: IUserProfileDataUpdate = {
        '_data.phoneNumber': UserPhoneNumber,
      };
      OperateUserProfile('UPDATE', { uid: FirebaseUser.uid, update: _data })
        .then(() => {
          props.setLoading(false);
          MoveToOTPScreen();
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
  const PhoneSubmitClick = () => {
    if (ValidatePhoneNumber) {
      LinkWithPhoneNumber({
        PhoneNumber: parseInt(PhoneNumber),
        EmptyPhoneNumber: EmptyPhoneNumber,
        Loading: props.setLoading,
        ResetCaptcha: props.ResetCaptcha,
        setResetCaptcha: props.setResetCaptcha,
        Updatedatabase: Updatedatabase,
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
        Title: 'Incorrect phone number',
        Description: 'Please enter a valid phone number.',
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
        <SetupIconNumberTextField
          Value={PhoneNumber}
          setValue={setPhoneNumber}
          HandleSubmit={PhoneSubmitClick}
          ValidateValue={ValidatePhoneNumber}
        />
        <div className="flex flex-col w-full space-y-1">
          <div className="flex justify-start w-full">
            <SignInNextButton
              Label="I will add later"
              onClick={props.CheckInfoHandler}
            />
          </div>
          {/* <div className="flex justify-start w-full">
            <SignInBackButton Label="Back" onClick={BackToName} />
          </div> */}
        </div>
      </div>
      <div className="flex justify-end w-full">
        <div className="flex space-x-2">
          <SetupSkipAllButton onClick={() => props.setSkipDialog(true)}>
            Skip all
          </SetupSkipAllButton>
          <SetupSubmitButton
            Disabled={!ValidatePhoneNumber}
            onClick={PhoneSubmitClick}
            Loading={props.Loading}
          >
            Next
          </SetupSubmitButton>
        </div>
      </div>
    </m.div>
  );
}

export default SetupRegisterPhoneScreen;
