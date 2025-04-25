import { m } from 'framer-motion';
import { userProfileHook } from 'hooks/global/Hooks.UserProfile';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { EncryptData } from 'functions/security/CryptionSecurity';
import UserProfileEncryptionKey from 'functions/security/CryptionKey';
import SignInBackButton from 'components/button/Setup/SignInBackButton';
import SignInNextButton from 'components/button/Setup/SignInNextButton';
import RadioGroupDark from 'components/radiogroup/RadioGroupDark';
import UseClientAuth from 'authentication/UseClientAuth';
import OperateUserProfile from 'databases/controllers/Controller.UserProfile';
import SetupSubmitButton from 'components/button/Setup/SetupSubmitButton';
import SetupSkipAllButton from 'components/button/Setup/RegisterSkipAllButton';

function SetupRegisterGenderScreen(props: SetupRegisterGenderScreenProps) {
  const { Gender, setGender } = userProfileHook();
  const { setToast } = ToastHook();
  const { FirebaseUser } = UseClientAuth();

  // Validation
  const ValidateGender = Gender === '' && Gender.length < 1;

  // database
  const updateUserData = () => {
    if (FirebaseUser) {
      props.setLoading(true);
      try {
        const UserGender = EncryptData(
          UserProfileEncryptionKey(FirebaseUser.uid, 'Gender'),
          Gender,
        );
        const _data: IUserProfileDataUpdate = {
          '_data.gender': UserGender,
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          props.setLoading(false);
          setToast({
            Title: 'Something went wrong',
            Description: error.message,
            Type: 'Error',
            Show: true,
          });
        }
      }
    } else {
      setToast({
        Title: 'Something went wrong',
        Description: 'It seems like user is not exist.',
        Type: 'Error',
        Show: true,
      });
    }
  };

  const BackToBirthday = () => {
    props.setScreen('register-date-of-birth');
  };

  // Submit
  const SubmitClick = () => {
    updateUserData();
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
        <div className="flex w-full items-start pt-2">
          <RadioGroupDark
            content={['Male', 'Female', 'Others']}
            value={Gender}
            onChange={(value) => (value ? setGender(value as string) : '')}
          />
        </div>
        <div className="flex w-full flex-col space-y-1">
          <div className="flex w-full justify-start">
            <SignInNextButton
              Label="I will add later"
              onClick={props.CheckInfoHandler}
            />
          </div>
          {/* <div className="flex justify-start w-full">
            <SignInBackButton Label="Back" onClick={BackToBirthday} />
          </div> */}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <div className="flex space-x-2">
          <SetupSkipAllButton onClick={() => props.setSkipDialog(true)}>
            Skip all
          </SetupSkipAllButton>
          <SetupSubmitButton
            Disabled={ValidateGender}
            onClick={SubmitClick}
            Loading={props.Loading}
          >
            Next
          </SetupSubmitButton>
        </div>
      </div>
    </m.div>
  );
}

export default SetupRegisterGenderScreen;
