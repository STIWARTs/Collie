'use client';

import dynamic from 'next/dynamic';
import { AvatarCustomButton } from './assets/AvatarCustomButton';
import { AvatarButtonDialogProps } from './AvatarButtonDialog';
import {
  SetupAvatarContent,
  SetupAvatarContentProps,
} from '../../contents/setup/Setup.Avatar';
import { DeleteAvatar, UploadAvatar } from 'functions/AuthAlgorithms';
import { useEffect, useState } from 'react';
import { EncryptData } from 'functions/security/CryptionSecurity';
import UserProfileEncryptionKey from 'functions/security/CryptionKey';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import UseClientAuth from 'authentication/UseClientAuth';
import OperateUserProfile from 'databases/controllers/Controller.UserProfile';

const AvatarButtonDialog = dynamic<AvatarButtonDialogProps>(
  () => import('./AvatarButtonDialog'),
  { ssr: false },
);

function AvatarButton() {
  const { FirebaseUser, FirebaseLoading } = UseClientAuth();
  const { setToast } = ToastHook();
  const userPhoto = FirebaseUser?.photoURL?.toString();

  // State
  const [AvatarDialog, setAvatarDialog] = useState(false);
  const [ChangeAvatar, setChangeAvatar] = useState(true);
  const [AvatarURL, setAvatarURL] = useState(
    FirebaseLoading
      ? '/images/loader/dark-circle.png'
      : userPhoto && ChangeAvatar
        ? userPhoto
        : '/images/default/user.png',
  );
  const [CropAvatarURL, setCropAvatarURL] = useState('');
  const [AvatarContainer, setAvatarContainer] = useState<AvatarContainerType>(
    'Remove-Avatar-Container',
  );
  const [Collection, setCollection] = useState<SetupAvatarContentProps[]>([]);
  const [Collectionheading, setCollectionHeading] = useState('');
  const [CollectionBackBool, setCollectionBackBool] = useState(false);
  const [AvatarScreen, setAvatarScreen] =
    useState<AvatarScreenType>('remove-avatar');
  const [RemoveDisabled, setRemoveDisabled] = useState(true);
  const [ChangeDisabled, setChangeDisabled] = useState(false);
  const [AvatarLoading, setAvatarLoading] = useState(false);
  const [UploadProgess, setUploadProgess] = useState('');

  // Handle Dialog
  const ShowAvatarDialog = () => {
    setAvatarDialog(true);
  };
  const HideAvatarDialog = () => {
    setAvatarDialog(false);
    setTimeout(() => {
      setAvatarContainer('Show-Avatar-Container');
      setAvatarScreen('show-avatar');
    }, 500);
  };

  // Avatar Screens
  const ShowAvatarScreen = () => {
    setAvatarContainer('Show-Avatar-Container');
    setAvatarScreen('show-avatar');
  };
  const RemoveAvatarScreen = () => {
    setAvatarContainer('Remove-Avatar-Container');
    setAvatarScreen('remove-avatar');
  };
  const SelectAvatarScreen = () => {
    setAvatarContainer('Select-And-Crop-Avatar-Container');
    setAvatarScreen('select-avatar');
  };
  const AvatarCollectionScreen = () => {
    setAvatarContainer('Select-And-Crop-Avatar-Container');
    setAvatarScreen('collection-for-avatar');
  };
  const CropAvatarScreen = () => {
    setAvatarContainer('Select-And-Crop-Avatar-Container');
    setAvatarScreen('crop-avatar');
  };
  const BackToShowAvatarScreenWithPhotoURLCondition = () => {
    if (!FirebaseUser?.photoURL) setAvatarURL('/images/default/user.png');
    setAvatarContainer('Show-Avatar-Container');
    setAvatarScreen('show-avatar');
  };

  // Handle Image
  const ChangeImageDisabled = (value: boolean) => {
    setChangeDisabled(value);
  };
  const RemoveImageDisabled = (value: boolean) => {
    setRemoveDisabled(value);
  };
  const GetImageURL = (value: string) => {
    ImageURLToCrop(value);
  };
  const GetServerImageURL = (value: string) => {
    setAvatarURL(value);
  };
  const GetCropImageURL = (value: string) => {
    setAvatarURL(value);
  };
  const ImageURLToCrop = (value: string) => {
    setCropAvatarURL(value);
  };
  const CollectionReducerName = (value: string) => {
    if (value === 'Animal') {
      setCollection(SetupAvatarContent.Animal);
    }
    if (value === 'Emoji') {
      setCollection(SetupAvatarContent.Emoji);
    }
    if (value === 'Festival') {
      setCollection(SetupAvatarContent.Festival);
    }
    if (value === 'Handdrawing') {
      setCollection(SetupAvatarContent.Handdrawing);
    }
    if (value === 'Flat') {
      setCollection(SetupAvatarContent.Flat);
    }
    if (value === 'Hipster') {
      setCollection(SetupAvatarContent.Hipster);
    }
    if (value === 'Paint') {
      setCollection(SetupAvatarContent.Paint);
    }
    if (value === 'Minimal') {
      setCollection(SetupAvatarContent.Minimal);
    }
    if (value === 'Plain') {
      setCollection(SetupAvatarContent.Plain);
    }
  };
  const CollectionHeading = (value: string) => {
    setCollectionHeading(value);
  };
  const CollectionBool = (value: boolean) => {
    setCollectionBackBool(value);
  };

  // Avatar handle
  const AvatarUploadProgress = (value: string) => {
    setUploadProgess(value);
  };
  const AvatarClick = () => {
    ShowAvatarScreen();
    ShowAvatarDialog();
  };
  async function UpdatedatabaseWithURL(value: string) {
    if (FirebaseUser) {
      const UserPhotoURL = await EncryptData(
        await UserProfileEncryptionKey(FirebaseUser?.uid, 'PhotoURL'),
        value,
      );
      const _data: IUserProfileDataUpdate = {
        '_data.photoURL': UserPhotoURL,
      };
      OperateUserProfile('UPDATE', { uid: FirebaseUser.uid, update: _data })
        .then(() => {
          GetServerImageURL(value);
          RemoveImageDisabled(false);
          ChangeImageDisabled(false);
          setAvatarLoading(false);
          setToast({
            Title: 'Avatar updated successfully',
            Description:
              'You profile picture has been updated for your account.',
            Type: 'Success',
            Show: true,
          });
        })
        .catch((error) => {
          if (error instanceof Error) {
            setAvatarLoading(false);
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
  function DeletePhotoURLFromdatabase() {
    if (FirebaseUser) {
      const _data: IUserProfileDataUpdate = {
        '_data.photoURL': '',
      };
      OperateUserProfile('UPDATE', { uid: FirebaseUser.uid, update: _data })
        .then(() => {
          setAvatarURL('/images/default/user.png');
          ChangeImageDisabled(false);
          RemoveImageDisabled(true);
          setAvatarLoading(false);
          setToast({
            Title: 'Avatar deleted successfully',
            Description:
              'You profile picture has been removed from your account.',
            Type: 'Success',
            Show: true,
          });
        })
        .catch((error) => {
          if (error instanceof Error) {
            setAvatarLoading(false);
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
  const AvatarSubmit = (value: File) => {
    if (value) {
      setChangeAvatar(false);
      RemoveImageDisabled(true);
      ChangeImageDisabled(true);
      ShowAvatarScreen();
      UploadAvatar({
        File: value,
        Progress: AvatarUploadProgress,
        Loading: setAvatarLoading,
        UpdatedatabaseWithURL: UpdatedatabaseWithURL,
        ShowToast: (Title, Description, Type, Show) =>
          setToast({
            Title: Title,
            Description: Description,
            Type: Type,
            Show: Show,
          }),
      });
    }
  };
  function RemoveImageClick() {
    if (FirebaseUser)
      if (FirebaseUser.photoURL) {
        RemoveImageDisabled(true);
        ChangeImageDisabled(true);
        ShowAvatarScreen();
        DeleteAvatar({
          AvatarURL: FirebaseUser.photoURL,
          Loading: setAvatarLoading,
          DeletePhotoURLFromdatabase: DeletePhotoURLFromdatabase,
          ShowToast: (Title, Description, Type, Show) =>
            setToast({
              Title: Title,
              Description: Description,
              Type: Type,
              Show: Show,
            }),
        });
      }
  }

  useEffect(() => {
    if (FirebaseUser) {
      if (FirebaseUser.photoURL && ChangeAvatar) {
        setAvatarURL(FirebaseUser.photoURL);
      }
    }
  }, [AvatarURL, ChangeAvatar, FirebaseUser]);

  return (
    <>
      <AvatarCustomButton onClick={AvatarClick} ImageURL={AvatarURL} />
      <AvatarButtonDialog
        AvatarURL={AvatarURL}
        AvatarDialog={AvatarDialog}
        setAvatarDialog={HideAvatarDialog}
        AvatarContainer={AvatarContainer}
        AvatarScreen={AvatarScreen}
        RemoveClick={RemoveImageClick}
        ChangeDisabled={ChangeDisabled}
        RemoveDisabled={
          RemoveDisabled && !FirebaseUser?.photoURL && ChangeAvatar
        }
        UploadLoadingScreen={AvatarLoading}
        UploadProgress={UploadProgess}
        MoveToRemoveAvatar={RemoveAvatarScreen}
        MoveToSelectAvatar={SelectAvatarScreen}
        MoveToCropAvatar={CropAvatarScreen}
        BackToShowAvatar={BackToShowAvatarScreenWithPhotoURLCondition}
        BackToSelectAvatar={SelectAvatarScreen}
        BackToAvatarCollection={
          CollectionBackBool === true
            ? SelectAvatarScreen
            : AvatarCollectionScreen
        }
        GetImageURL={GetImageURL}
        GetCropImageURL={GetCropImageURL}
        ImageURLToCrop={CropAvatarURL}
        CollectionShow={AvatarCollectionScreen}
        CollectionReducerName={CollectionReducerName}
        CollectionHeading={CollectionHeading}
        CollectionShowHeading={Collectionheading}
        CollectionReducer={Collection}
        CollectionBackBool={CollectionBool}
        AvatarSubmit={AvatarSubmit}
      />
    </>
  );
}

export default AvatarButton;
