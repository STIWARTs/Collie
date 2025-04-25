'use client';

/* eslint-disable @typescript-eslint/no-empty-function */
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@mui/material';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import AuthErrorMessage from 'authentication/AuthErrorMessage';
import { _firebaseAuth, _firebaseStorage } from 'authentication/clientApp';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { Home_Link } from 'routers/RouterLinks';
import { EncryptData } from 'functions/security/CryptionSecurity';
import UserProfileEncryptionKey from 'functions/security/CryptionKey';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import UseClientAuth from 'authentication/UseClientAuth';
import OperateUserProfile from 'databases/controllers/Controller.UserProfile';
import TooltipDark from 'components/tooltip/TooltipDark';
import DialogContainerDark from 'components/dialog/DialogContainerDark';

const LoadingLinearProgress = dynamic(
  () => import('components/loading/Loading.LinearProgress'),
  { ssr: false },
);

function SetupCheckDialog(props: SetupCheckDialogProps) {
  const [Loading, setLoading] = useState(false);
  const { FirebaseUser } = UseClientAuth();
  const { setToast } = ToastHook();
  const router = useRouter();

  const handleDontUpdate = () => {
    if (FirebaseUser) {
      setLoading(true);
      _firebaseAuth
        .updateProfile(FirebaseUser, {
          displayName: props.PrevFullName,
          photoURL: props.PrevPhotoUrl,
        })
        .then(() => {
          setLoading(false);
          router.push(Home_Link);
        })
        .catch((error) => {
          setLoading(false);
          const message = AuthErrorMessage(error.code);
          setToast({
            Title: 'Something went wrong',
            Description: message
              ? message
              : 'There is an error from server side of authentication.',
            Type: 'Error',
            Show: true,
          });
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

  const handleUpdate = () => {
    if (FirebaseUser) {
      if (props.PrevPhotoUrl) {
        setLoading(true);
        const storage = _firebaseStorage.getStorage();
        const avatarRef = _firebaseStorage.ref(storage, props.PrevPhotoUrl);
        _firebaseStorage.deleteObject(avatarRef).then(() => {
          try {
            const UserPrevFullName = props.PrevFullName
              ? EncryptData(
                  UserProfileEncryptionKey(FirebaseUser.uid, 'FullName'),
                  props.PrevFullName,
                )
              : '';
            const UserPrevPhotoUrl = props.PrevPhotoUrl
              ? EncryptData(
                  UserProfileEncryptionKey(FirebaseUser.uid, 'PhotoURL'),
                  props.PrevPhotoUrl,
                )
              : '';
            const UserNewFullName = props.NewFullName
              ? EncryptData(
                  UserProfileEncryptionKey(FirebaseUser.uid, 'FullName'),
                  props.NewFullName,
                )
              : undefined;
            const UserNewPhotoUrl = props.NewPhotoUrl
              ? EncryptData(
                  UserProfileEncryptionKey(FirebaseUser.uid, 'PhotoURL'),
                  props.NewPhotoUrl,
                )
              : undefined;
            const _data: IUserProfileDataUpdate = {
              '_data.fullName': UserNewFullName
                ? UserNewFullName
                : UserPrevFullName,
              '_data.photoURL': UserNewPhotoUrl
                ? UserNewPhotoUrl
                : UserPrevPhotoUrl,
            };
            OperateUserProfile('UPDATE', {
              uid: FirebaseUser.uid,
              update: _data,
            })
              .then(() => {
                setLoading(false);
                router.push(Home_Link);
              })
              .catch((error: unknown) => {
                if (error instanceof Error) {
                  setLoading(false);
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
              setLoading(false);
              setToast({
                Title: 'Something went wrong',
                Description: error.message,
                Type: 'Error',
                Show: true,
              });
            }
          }
        });
      } else {
        setToast({
          Title: 'Something went wrong',
          Description: 'It seems like profile photo is not there.',
          Type: 'Error',
          Show: true,
        });
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

  return (
    <DialogContainerDark
      show={props.Open}
      onClose={() => {}}
      disableClickAwayClose
    >
      <div className="relative flex h-full w-full max-w-[500px] flex-col items-center justify-center space-y-4 overflow-hidden p-5">
        <h5 className="flex truncate pt-2 text-xl font-bold tracking-wide text-white">
          Want to update ?
        </h5>
        <h6 className="flex w-full px-5 text-justify text-sm font-normal text-white/75">
          It appears that the latest information you&apos;ve provided does not
          align with the previously recorded data. Do you prefer to proceed with
          the most recent updates or maintain the continuity of the existing
          information ?
        </h6>
        <h6 className="flex w-full px-5 text-left text-sm font-normal text-white/75">
          Here is how your data will appear after the updates :
        </h6>
        {props.PrevPhotoUrl && props.NewPhotoUrl && (
          <CustomCheckData_Image
            Label="Profile Picture"
            PrevValue={props.PrevPhotoUrl}
            NewValue={props.NewPhotoUrl}
          />
        )}
        {props.PrevFullName && props.NewFullName && (
          <CustomCheckData_String
            Label="Full Name"
            PrevValue={props.PrevFullName}
            NewValue={props.NewFullName}
            ToolTipPrevValue="Full name that you provided previously"
            ToolTipNewValue="Full name that you provided newly"
          />
        )}
        <div className="flex w-full space-x-2 pt-10">
          <div className="flex h-10 w-full">
            <Button
              disableFocusRipple
              onClick={handleDontUpdate}
              className="button-text-lower w-full cursor-default truncate rounded-lg bg-transparent px-7 py-2 text-sm font-medium tracking-wide text-red-400 transition-all hover:bg-white/5"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#ffffff80 !important',
                },
              }}
            >
              Don&apos;t Update
            </Button>
          </div>
          <div className="flex h-10 w-full">
            <Button
              disableFocusRipple
              onClick={handleUpdate}
              className="button-text-lower w-full cursor-default truncate rounded-lg bg-dark-blue px-7 py-2 text-sm font-medium tracking-wide text-sky-400 transition-all hover:bg-dark-blue/70"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#38bdf880 !important',
                },
              }}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
      {Loading && <LoadingLinearProgress />}
    </DialogContainerDark>
  );
}

function CustomCheckData_String(props: {
  Label: string;
  PrevValue: string;
  NewValue: string;
  ToolTipPrevValue: string;
  ToolTipNewValue: string;
}) {
  return (
    <div className="flex w-full cursor-default flex-col space-y-2 px-5">
      <div className="w-full text-left text-sm text-white">{props.Label} :</div>
      <div className="relative flex w-full space-x-3">
        <TooltipDark arrow placement="top" title={props.ToolTipPrevValue}>
          <div className="w-full truncate rounded-lg bg-white/10 px-3 py-2 text-[15px] font-normal text-white/75">
            {props.PrevValue}
          </div>
        </TooltipDark>
        <div className="flex items-center justify-center">
          <ArrowRightIcon className="h-4 text-white " />
        </div>
        <TooltipDark arrow placement="top" title={props.ToolTipNewValue}>
          <div className="w-full truncate rounded-lg bg-green-600/30 px-3 py-2 text-[15px] font-normal text-white">
            {props.NewValue}
          </div>
        </TooltipDark>
      </div>
    </div>
  );
}

function CustomCheckData_Image(props: {
  Label: string;
  PrevValue: string;
  NewValue: string;
}) {
  return (
    <div className="flex w-full cursor-default flex-col space-y-2 px-5">
      <div className="w-full text-left text-sm text-white">{props.Label} :</div>
      <div className="relative flex w-full justify-center space-x-3">
        <TooltipDark
          arrow
          placement="top"
          title="Image that you provided previously"
        >
          <Image
            height={100}
            width={100}
            src={props.PrevValue}
            alt="previous image"
            className="rounded-full text-xs text-white opacity-75"
          />
        </TooltipDark>
        <div className="flex items-center justify-center">
          <ArrowRightIcon className="h-4 text-white" />
        </div>
        <TooltipDark
          arrow
          placement="top"
          title="Image that you provided newly"
        >
          <Image
            height={100}
            width={100}
            src={props.NewValue}
            alt="new image"
            className="rounded-full text-xs text-white"
          />
        </TooltipDark>
      </div>
    </div>
  );
}

export default SetupCheckDialog;
