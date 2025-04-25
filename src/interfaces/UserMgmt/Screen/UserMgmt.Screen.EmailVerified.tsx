'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Home_Link,
  Manage_Your_Account_Link,
  Setup_Link,
} from 'routers/RouterLinks';
import SignInNextButton from 'components/button/Setup/SignInNextButton';
import SignInBackButton from 'components/button/Setup/SignInBackButton';
import SetupHeaderLabel from 'components/label/SetupHeaderLabel';
import { ConfirmVerifyEmailAddress } from 'functions/AuthAlgorithms';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import UseClientAuth from 'authentication/UseClientAuth';
import OperateUserProfile from 'databases/controllers/Controller.UserProfile';
import SetupConfirmEmailVerifySkeleton from 'components/loading/Setup/ConfirmEmailVerifyLoading';

function UserMgmtEmailVerifiedScreen(props: UserMgmtEmailVerifiedScreenProps) {
  const [Loading, setLoading] = useState(true); // true
  const [Screen, setScreen] = useState<'Success' | 'Error' | null>(null);
  const { FirebaseUser } = UseClientAuth();
  const { Toast, setToast } = ToastHook();
  const router = useRouter();

  const handleBackToHome = () => {
    router.push(Home_Link);
  };

  const handleMoveToManageAccount = () => {
    router.push(Manage_Your_Account_Link);
  };

  const handleContinueWithSetup = () => {
    router.push(Setup_Link);
  };

  // database
  const Updatedatabase = () => {
    if (FirebaseUser) {
      const _data: IUserProfileDataUpdate = {
        '_data.isVerified.emailAddress': true,
      };
      OperateUserProfile('UPDATE', { uid: FirebaseUser.uid, update: _data })
        .then(() => {
          setLoading(false);
          setScreen('Success');
        })
        .catch((error) => {
          if (error instanceof Error) {
            setScreen('Error');
            setLoading(false);
            setToast({
              Title: 'Something went wrong',
              Description: error.message,
              Type: 'Error',
              Show: true,
            });
          }
        });
    } else {
      setLoading(false);
      setScreen('Error');
      setToast({
        Title: 'Something went wrong',
        Description: 'It seems like user is not exist.',
        Type: 'Error',
        Show: true,
      });
    }
  };

  useEffect(() => {
    if (props.oobCode && props.isEmailVerified === false) {
      ConfirmVerifyEmailAddress({
        oobCode: props.oobCode.toString(),
        Screen: setScreen,
        Loading: setLoading,
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
      if (props.isEmailVerified !== undefined) setLoading(false);
      if (props.isEmailVerified === true) setScreen('Success');
      if (props.isEmailVerified === false) setScreen('Error');
    }
  }, [props.oobCode, props.isEmailVerified]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Loading && (
        <SetupConfirmEmailVerifySkeleton ClassName={props.MainClassName} />
      )}
      {Screen === 'Success' && (
        <>
          <div className="relative flex h-full w-full items-center justify-center pb-7 pt-20 md:ml-14 md:p-14">
            <div className="flex h-[125px] md:h-auto">
              <Image
                height={370}
                width={370}
                src="/vectors/register-verify-email.svg"
                alt="verify-email-success"
                className="text-xs text-white"
              />
            </div>
          </div>
          <div className="relative flex w-full flex-col items-center justify-center space-y-5 overflow-hidden md:min-w-[400px] md:p-9 md-1000:min-w-[500px]">
            <div className="relative flex items-start justify-center space-x-5 px-5">
              <Image
                height={30}
                width={30}
                className="mt-1.5"
                src="/icons/check-circle-green.svg"
                alt=""
              />
              <SetupHeaderLabel>Your email is verified</SetupHeaderLabel>
            </div>
            <h6 className="w-full px-5 text-center text-[15px] font-normal text-white/75">
              Congratulations! Your email has been successfully verified.
              You&apos;re now few step closer to unlocking a world of
              possibilities.
            </h6>
            <BottomLinkButton
              ManageAccountClick={handleMoveToManageAccount}
              SetupClick={handleContinueWithSetup}
              HomeClick={handleBackToHome}
            />
          </div>
        </>
      )}
      {Screen === 'Error' && (
        <>
          <div className="relative flex h-full w-full items-center justify-center pb-7 pt-20 md:ml-14 md:p-14">
            <div className="flex h-[125px] md:h-auto">
              <Image
                height={370}
                width={370}
                src="/vectors/register-verify-email-error.svg"
                alt="verify-email-error"
                className="text-xs text-white"
              />
            </div>
          </div>
          <div className="relative flex w-full flex-col items-center justify-center space-y-5 overflow-hidden md:min-w-[400px] md:p-9 md-1000:min-w-[500px]">
            <div className="relative flex items-start justify-center space-x-5 px-5">
              <Image
                height={30}
                width={30}
                className="mt-[7px]"
                src="/icons/x-circle-red.svg"
                alt=""
              />
              <SetupHeaderLabel>
                {Toast?.Title && Toast.Title.length > 0
                  ? Toast.Title
                  : 'Something went wrong'}
              </SetupHeaderLabel>
            </div>
            <h6 className="w-full px-5 text-center text-[15px] font-normal text-white/75">
              {Toast?.Description && Toast.Description.length > 0
                ? Toast.Description
                : 'We apologize for the inconvenience, but there seems to be an error with the email verification process.'}
            </h6>
            <BottomLinkButton
              ManageAccountClick={handleMoveToManageAccount}
              SetupClick={handleContinueWithSetup}
              HomeClick={handleBackToHome}
            />
          </div>
        </>
      )}
    </>
  );
}

function BottomLinkButton(props: {
  ManageAccountClick: () => void;
  SetupClick: () => void;
  HomeClick: () => void;
}) {
  return (
    <div className="w-full flex-col space-y-2">
      <div className="flex w-full items-center justify-start px-5">
        <SignInNextButton
          onClick={props.ManageAccountClick}
          Label="Move to manage account"
        />
      </div>
      <div className="flex w-full items-center justify-start px-5">
        <SignInNextButton
          onClick={props.SetupClick}
          Label="Continue with setup"
        />
      </div>
      <div className="flex w-full items-center justify-start px-5">
        <SignInBackButton onClick={props.HomeClick} Label="Back to home" />
      </div>
    </div>
  );
}

export default UserMgmtEmailVerifiedScreen;
