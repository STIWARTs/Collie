/* eslint-disable react-hooks/exhaustive-deps */
import { LazyMotion, domAnimation } from 'framer-motion';
import { SetupImages } from 'contents/setup/Setup.Image';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import SetupLoadingSkeleton from 'components/loading/Setup/SetupLoading';
import CheckInfoHandler from 'functions/CheckInfoHandler';
import UseClientAuth from 'authentication/UseClientAuth';

const ToastDark = dynamic<ToastDarkProps>(
  () => import('components/toast/ToastDark'),
  { ssr: false },
);
const SetupErrorScreen = dynamic<SetupErrorScreenProps>(
  () => import('interfaces/Setup/Screen/Setup.Screen.Error'),
  { ssr: false },
);
const SetupFinishScreen = dynamic<SetupFinishScreenProps>(
  () => import('interfaces/Setup/Screen/Setup.Screen.Finish'),
  { ssr: false },
);
const SetupSkipDialog = dynamic<SetupSkipDialogProps>(
  () => import('interfaces/Setup/Dialog/Setup.Dialog.Skip'),
  { ssr: false },
);

interface IProps {
  children: React.ReactNode;
  MainClassName: string;
  MainScreen: AuthMainScreenType;
  setMainScreen: Dispatch<AuthMainScreenType>;
  ErrorType: AuthErrorType;
  setErrorType: Dispatch<AuthErrorType>;
  Screen: AuthScreenType;
  setScreen: Dispatch<AuthScreenType>;
  SkipDialog: boolean;
  Loading: boolean;
  setSkipDialog: Dispatch<boolean>;
  setLoading: Dispatch<boolean>;
}

function SetupScreenMain({
  children,
  MainClassName,
  MainScreen,
  setMainScreen,
  ErrorType,
  setErrorType,
  Screen,
  Loading,
  setLoading,
  setScreen,
  SkipDialog,
  setSkipDialog,
}: IProps) {
  const { FirebaseUser, FirebaseLoading, FirebaseError } = UseClientAuth();
  const { Toast, setToast } = ToastHook();

  const ActiveImageSrc =
    SetupImages.find((value) => Screen === value.Alt)?.Image || '';
  const ActiveImageAlt =
    SetupImages.find((value) => Screen === value.Alt)?.Alt || '';

  const CheckInfoData = {
    FirebaseUser: FirebaseUser,
    FirebaseLoading: FirebaseLoading,
    FirebaseError: FirebaseError,
    setErrorType: setErrorType,
    setScreen: setScreen,
    setMainScreen: setMainScreen,
    setToast: setToast,
    setLoading: setLoading,
  };

  const SetCheckInfo = (Screen: ICheckInfoScreen) => {
    CheckInfoHandler({ ...CheckInfoData, Screen: Screen });
  };

  const ProceedLogin = () => {
    setMainScreen('Setup');
    setScreen('login-phone');
  };

  useEffect(() => {
    if (!FirebaseLoading) {
      if (!FirebaseUser) ProceedLogin();
      else SetCheckInfo('initial-login-load');
    }
  }, [FirebaseLoading]);

  return (
    <LazyMotion features={domAnimation} strict>
      {Loading && (
        <div className="absolute top-0 z-30 h-full w-full bg-transparent" />
      )}
      {MainScreen === 'Error' && (
        <SetupErrorScreen
          Type={ErrorType}
          ClassName={MainClassName}
          ToastTitle={Toast.Title}
          ToastDescription={Toast.Description}
        />
      )}
      {MainScreen === 'CheckInfo' && (
        <SetupLoadingSkeleton ClassName={MainClassName} />
      )}
      {MainScreen === 'Setup' && (
        <main
          className={`${MainClassName} relative box-border flex w-full flex-col items-center justify-center md:flex-row`}
        >
          <div className="relative ml-14 hidden h-full w-full items-center justify-center p-14 md:flex">
            {Screen && (
              <Image
                height={370}
                width={370}
                src={ActiveImageSrc}
                alt={ActiveImageAlt}
              />
            )}
          </div>
          <div className="relative box-border flex w-full flex-col items-center justify-center space-y-5 overflow-hidden p-5 md:min-w-[415px] md:p-14 md-1000:min-w-[500px]">
            {children}
          </div>
        </main>
      )}
      {MainScreen === 'Finish' && (
        <SetupFinishScreen ClassName={MainClassName} />
      )}
      <SetupSkipDialog Open={SkipDialog} onClose={() => setSkipDialog(false)} />
      <ToastDark
        Toast={{
          Open: Toast.Show,
          onClose: (value) => setToast({ ...Toast, Show: value }),
          MessageTitle: Toast.Title,
          MessageDescription: Toast.Description,
          Type: Toast.Type,
        }}
        SlideDirection="down"
        Vertical="top"
        Horizontal="center"
        HideDuration={6}
      />
    </LazyMotion>
  );
}

export default SetupScreenMain;
