import { m } from 'framer-motion';
import SetupSkipAllButton from 'components/button/Setup/RegisterSkipAllButton';
import SetupSubmitButton from 'components/button/Setup/SetupSubmitButton';
import SignInBackButton from 'components/button/Setup/SignInBackButton';
import SignInNextButton from 'components/button/Setup/SignInNextButton';
import AvatarButton from 'components/avatar/AvatarButton';

function SetupRegisterProfilePictureScreen(
  props: SetupRegisterProfilePictureScreenProps,
) {
  // Screen
  const BackToEmail = () => {
    props.setScreen('register-email');
  };
  const MoveToBirthday = () => {
    props.setScreen('register-date-of-birth');
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
        <div className="flex items-start justify-center w-full pt-2">
          <AvatarButton />
        </div>
        <div className="flex flex-col w-full space-y-1">
          <div className="flex justify-start w-full">
            <SignInNextButton
              Label="I will add later"
              onClick={props.CheckInfoHandler}
            />
          </div>
          {/* <div className="flex justify-start w-full">
            <SignInBackButton Label="Back" onClick={BackToEmail} />
          </div> */}
        </div>
      </div>
      <div className="flex justify-end w-full">
        <div className="flex space-x-2">
          <SetupSkipAllButton onClick={() => props.setSkipDialog(true)}>
            Skip all
          </SetupSkipAllButton>
          <SetupSubmitButton
            Disabled={false}
            onClick={MoveToBirthday}
            Loading={props.Loading}
          >
            Next
          </SetupSubmitButton>
        </div>
      </div>
    </m.div>
  );
}

export default SetupRegisterProfilePictureScreen;
