/* eslint-disable @typescript-eslint/no-empty-function */
import AvatarContainerDialog from '../dialog/AvatarContainerDialog';
import ShowAvatar from './assets/ShowAvatar';
import SelectAvatar from './assets/SelectAvatar';
import CollectionForAvatar from './assets/CollectionForAvatar';
import CropAvatar from './assets/CropAvatar';
import { useState } from 'react';
import { MoreInfoDialog } from './assets/MoreInfoDialog';
import { RemoveAvatar } from './assets/RemoveAvatar';
import { SetupAvatarContentProps } from '../../contents/setup/Setup.Avatar';

export interface AvatarButtonDialogProps {
  AvatarDialog: boolean;
  setAvatarDialog: () => void;
  AvatarContainer: AvatarContainerType;
  AvatarScreen: AvatarScreenType;
  MoveToSelectAvatar: () => void;
  AvatarURL: string;
  RemoveClick: () => void;
  ChangeDisabled: boolean;
  RemoveDisabled: boolean;
  UploadLoadingScreen: boolean;
  UploadProgress: string;
  BackToShowAvatar: () => void;
  MoveToCropAvatar: () => void;
  MoveToRemoveAvatar: () => void;
  GetImageURL: (value: string) => void;
  CollectionBackBool: (value: boolean) => void;
  CollectionReducerName: (value: string) => void;
  CollectionHeading: (value: string) => void;
  CollectionShowHeading: string;
  CollectionShow: () => void;
  BackToSelectAvatar: () => void;
  CollectionReducer: SetupAvatarContentProps[];
  BackToAvatarCollection: () => void;
  ImageURLToCrop: string;
  GetCropImageURL: (value: string) => void;
  AvatarSubmit: (value: File) => void;
}

const MoreInfoContent = [
  { label: 'Help', icon: '/icons/help-circle.svg', onClick: () => {} },
  { label: 'Feedback', icon: '/icons/feedback-message.svg', onClick: () => {} },
];

function AvatarButtonDialog(props: AvatarButtonDialogProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const MoreInfoOpen = Boolean(anchorEl);

  const MoreInfoClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const MoreInfoClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AvatarContainerDialog
        onClose={props.setAvatarDialog}
        show={props.AvatarDialog}
        className={props.AvatarContainer}
        disableClickAwayClose
      >
        {props.AvatarScreen === 'show-avatar' && (
          <ShowAvatar
            moreInfo={MoreInfoClick}
            URL={props.AvatarURL}
            remove={props.MoveToRemoveAvatar}
            changedisabled={props.ChangeDisabled}
            removedisabled={props.RemoveDisabled}
            backward={props.setAvatarDialog}
            forward={props.MoveToSelectAvatar}
            ShowProgress={props.UploadLoadingScreen}
            Progress={props.UploadProgress}
          />
        )}
        {props.AvatarScreen === 'remove-avatar' && (
          <RemoveAvatar
            moreInfo={MoreInfoClick}
            URL={props.AvatarURL}
            remove={props.RemoveClick}
            backward={props.BackToShowAvatar}
          />
        )}
        {props.AvatarScreen === 'select-avatar' && (
          <SelectAvatar
            moreInfo={MoreInfoClick}
            backward={props.BackToShowAvatar}
            forward={props.MoveToCropAvatar}
            getURL={props.GetImageURL}
            backBool={props.CollectionBackBool}
            ShowCollection={props.CollectionShow}
            CollectionHeading={props.CollectionHeading}
            AvatarName={props.CollectionReducerName}
          />
        )}
        {props.AvatarScreen === 'collection-for-avatar' && (
          <CollectionForAvatar
            moreInfo={MoreInfoClick}
            heading={props.CollectionShowHeading}
            backward={props.BackToSelectAvatar}
            forward={props.MoveToCropAvatar}
            getURL={props.GetImageURL}
            AvatarReducer={props.CollectionReducer}
          />
        )}
        {props.AvatarScreen === 'crop-avatar' && (
          <CropAvatar
            moreInfo={MoreInfoClick}
            back={props.BackToAvatarCollection}
            submit={props.AvatarSubmit}
            URL={props.ImageURLToCrop}
            getURL={props.GetCropImageURL}
          />
        )}
      </AvatarContainerDialog>
      <MoreInfoDialog
        anchorEl={anchorEl}
        open={MoreInfoOpen}
        handleClose={MoreInfoClose}
        MenuContent={MoreInfoContent}
      />
    </>
  );
}

export default AvatarButtonDialog;
