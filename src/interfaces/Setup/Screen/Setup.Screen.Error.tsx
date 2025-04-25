'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Home_Link, Manage_Your_Account_Link } from 'routers/RouterLinks';
import SetupHeaderLabel from 'components/label/SetupHeaderLabel';
import SignInBackButton from 'components/button/Setup/SignInBackButton';
import SignInNextButton from 'components/button/Setup/SignInNextButton';
import YellowBulbHint from 'components/hint/YellowBulbHint';

function SetupErrorScreen(props: SetupErrorScreenProps) {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push(Home_Link);
  };

  const handleMoveToManageAccount = () => {
    router.push(Manage_Your_Account_Link);
  };

  return (
    <div
      className={`${props.ClassName}  relative flex w-full flex-col items-center justify-center px-5 pt-20 md:p-14`}
    >
      <Image
        height={100}
        width={100}
        className="pb-7 opacity-30"
        src="/vectors/emoji-face-error.svg"
        alt="setup-error"
      />
      <div className="relative flex w-full max-w-[500px] flex-col items-center justify-center space-y-5 overflow-hidden">
        <div className="flex">
          <SetupHeaderLabel>
            {props.Type === 'database-not-created' && 'Something went wrong'}
            {props.Type === 'get-user-failed' && 'Something went wrong'}
            {props.Type === undefined && props.ToastTitle}
          </SetupHeaderLabel>
        </div>
        <p className="w-full text-center text-[15px] font-normal text-white/75">
          {props.Type === 'database-not-created' &&
            'We apologize for the inconvenience, but there seems to be an error with the process of creation of database.'}
          {props.Type === 'get-user-failed' &&
            'We apologize for the inconvenience, but there seems to be an error with the user fetching or validating process.'}
          {props.Type === undefined && props.ToastDescription}
        </p>
        {props.Type !== undefined && (
          <div className="flex">
            <YellowBulbHint
              Tooltip
              TooltipPlacement="top"
              TooltipTitle={
                (props.Type === 'get-user-failed' &&
                  'Encountered a content loading failure. To resolve the issue, we recommend refreshing the page for a fresh attempt at loading the content.') ||
                (props.Type === 'database-not-created' &&
                  'To resolve the issue, please refresh your page to delete your account and then proceed to authenticate again. This will ensure a secure user experience.') ||
                ''
              }
              Label={
                (props.Type === 'get-user-failed' &&
                  'Pick up where you left off by simply reloading the page.') ||
                (props.Type === 'database-not-created' &&
                  'Proceed a fresh start by simply reloading the page.') ||
                ''
              }
            />
          </div>
        )}
      </div>
      <div className="mt-7 w-full max-w-[750px] flex-col space-y-2">
        <div className="flex w-full items-center justify-start">
          <SignInNextButton
            onClick={handleMoveToManageAccount}
            Label="Move to manage account"
          />
        </div>
        <div className="flex w-full items-center justify-start">
          <SignInBackButton onClick={handleBackToHome} Label="Back to home" />
        </div>
      </div>
    </div>
  );
}

export default SetupErrorScreen;
