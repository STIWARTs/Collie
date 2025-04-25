import { m } from 'framer-motion';
import { AddFullName } from 'functions/AuthAlgorithms';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { EncryptData } from 'functions/security/CryptionSecurity';
import UserProfileEncryptionKey from 'functions/security/CryptionKey';
import { userProfileHook } from 'hooks/global/Hooks.UserProfile';
import SetupSkipAllButton from 'components/button/Setup/RegisterSkipAllButton';
import SignInNextButton from 'components/button/Setup/SignInNextButton';
import SetupSubmitButton from 'components/button/Setup/SetupSubmitButton';
import UseClientAuth from 'authentication/UseClientAuth';
import SetupIconTextField from '../../Input/Setup.Input.Icon';
import OperateUserProfile from 'databases/controllers/Controller.UserProfile';

function SetupRegisterNameScreen(props: SetupRegisterNameScreenProps) {
  const { FirebaseUser } = UseClientAuth();
  const { FullName, setFullName } = userProfileHook();
  const { setToast } = ToastHook();

  // Validation
  const ValidateFullName = FullName.length > 2;

  // database
  function Updatedatabase() {
    if (FirebaseUser) {
      const UserFullName = EncryptData(
        UserProfileEncryptionKey(FirebaseUser.uid, 'FullName'),
        FullName,
      );
      const _data: IUserProfileDataUpdate = {
        '_data.fullName': UserFullName,
      };
      OperateUserProfile('UPDATE', { uid: FirebaseUser.uid, update: _data })
        .then(() => {
          props.CheckInfoHandler();
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
  }

  // Submit
  const FullNameSubmitClick = () => {
    if (ValidateFullName) {
      AddFullName({
        FullName: FullName,
        Loading: props.setLoading,
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
        Title: 'FullName is empty',
        Description: 'Please enter a your full name.',
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
          Type="Name"
          Value={FullName}
          setValue={setFullName}
          ValidateValue={ValidateFullName}
          HandleSubmit={FullNameSubmitClick}
        />
        <div className="flex w-full justify-start">
          <SignInNextButton
            Label="I will add later"
            onClick={props.CheckInfoHandler}
          />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <div className="flex space-x-2">
          <SetupSkipAllButton onClick={() => props.setSkipDialog(true)}>
            Skip all
          </SetupSkipAllButton>
          <SetupSubmitButton
            Disabled={!ValidateFullName}
            onClick={FullNameSubmitClick}
            Loading={props.Loading}
          >
            Next
          </SetupSubmitButton>
        </div>
      </div>
    </m.div>
  );
}

export default SetupRegisterNameScreen;
