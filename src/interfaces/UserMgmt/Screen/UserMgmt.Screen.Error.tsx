'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SetupHeaderLabel from 'components/label/SetupHeaderLabel';
import { Home_Link, Manage_Your_Account_Link } from 'routers/RouterLinks';
import SignInBackButton from 'components/button/Setup/SignInBackButton';
import SignInNextButton from 'components/button/Setup/SignInNextButton';

function UserMgmtErrorScreen() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push(Home_Link);
  };

  const handleMoveToManageAccount = () => {
    router.push(Manage_Your_Account_Link);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-5 pt-20 md:h-[652px] md:p-14">
      <Image
        height={100}
        width={100}
        className="pb-7 text-xs text-white opacity-30"
        src="/vectors/emoji-face-error.svg"
        alt="setup-error"
      />
      <div className="relative flex w-full max-w-[500px] flex-col items-center justify-center space-y-5 overflow-hidden">
        <div className="flex">
          <SetupHeaderLabel>Something went wrong</SetupHeaderLabel>
        </div>
        <h6 className="w-full text-center text-[15px] font-normal text-white/75">
          We apologize for the inconvenience, but there seems to be an error
          with the mode process.
        </h6>
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

export default UserMgmtErrorScreen;
