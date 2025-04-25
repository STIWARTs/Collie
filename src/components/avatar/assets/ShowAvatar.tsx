import Image from 'next/image';
import { IconButton, Button } from '@mui/material';
import {
  CameraIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { UsersIcon } from '@heroicons/react/24/solid';
import TooltipDark from 'components/tooltip/TooltipDark';
import { Circle_BlurDataURL } from 'components/loading/BlurDataURL';
import dynamic from 'next/dynamic';

const LoadingLinearProgress = dynamic(
  () => import('components/loading/Loading.LinearProgress'),
);

interface IProps {
  backward: () => void;
  moreInfo: (event: React.MouseEvent<HTMLElement>) => void;
  forward: () => void;
  URL: string;
  remove: () => void;
  removedisabled: boolean;
  changedisabled: boolean;
  ShowProgress: boolean;
  Progress: string;
}

function ShowAvatar(props: IProps) {
  return (
    <div className="Show-Avatar-Container flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden scroll-smooth bg-secondary-theme text-white">
      {/* Header */}
      <div className="z-10 flex w-full items-center justify-between p-1">
        <TooltipDark placement="bottom" title="Close profile picture" arrow>
          <IconButton
            disableFocusRipple
            onClick={props.backward}
            className="p-3 hover:bg-white/5"
          >
            <XMarkIcon className="h-5 text-white" />
          </IconButton>
        </TooltipDark>
        <div className="flex w-full items-center justify-start space-x-1.5 px-1 sm:justify-center">
          <h6 className="text-xl font-[600] tracking-wide text-white">
            Emotion
          </h6>
          <h6 className="text-xl font-normal text-white/[0.95]">Account</h6>
        </div>
        <TooltipDark placement="bottom" title="Menu" arrow>
          <IconButton
            disableFocusRipple
            onClick={props.moreInfo}
            className="p-3 hover:bg-white/5"
          >
            <EllipsisVerticalIcon className="h-5 text-white" />
          </IconButton>
        </TooltipDark>
      </div>
      {/* Main */}
      <div className="flex h-full w-full flex-col items-center space-y-2 overflow-y-auto overflow-x-hidden scroll-smooth px-5 pb-5 pt-2">
        {/* Heading */}
        <h6 className="w-full text-left text-lg font-normal text-white">
          Profile picture
        </h6>
        {/* Sub Heading */}
        <h6 className="w-full text-left text-sm text-white/75">
          A picture helps people recognize you and lets you know when
          you&apos;re signed in to your account.
        </h6>
        {/* Info Heading */}
        <div className="flex w-full items-center space-x-2 pb-4 pt-2">
          <UsersIcon className="h-5 text-white opacity-75" />
          <h6 className="w-full text-left text-sm text-white/75">
            Visible across Emotion services.
          </h6>
        </div>
        {/* Center */}
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="show-avatar-profile-photo relative box-content flex min-h-[96px] min-w-[96px] justify-center overflow-hidden rounded-[50%]">
            <div className="relative h-full w-full rounded-full">
              <Image
                fill
                onClick={props.forward}
                className="cursor-default overflow-hidden rounded-[50%] transition-all"
                src={props.URL ? props.URL : '/images/loader/dark-circle.png'}
                style={{
                  objectFit: 'fill',
                }}
                alt=""
                placeholder="blur"
                blurDataURL={Circle_BlurDataURL}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="flex w-full space-x-2 px-5 pb-5 pt-2">
        <Button
          disableFocusRipple
          aria-label="change-image-button"
          onClick={props.forward}
          disabled={props.changedisabled}
          className="button-text-lower w-full cursor-default rounded-lg border border-solid border-white/30 py-2 text-sky-400 hover:bg-transparent active:bg-transparent disabled:cursor-not-allowed disabled:text-sky-400 disabled:opacity-50"
          sx={{
            '.MuiTouchRipple-child': {
              backgroundColor: '#ffffff80 !important',
            },
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            {!props.removedisabled ? (
              <PencilIcon className="block h-[18px]" />
            ) : (
              <CameraIcon className="block h-[18px]" />
            )}
            <h6 className="flex truncate pt-[2px] text-sm font-[600]">
              {!props.removedisabled ? 'Change' : 'Add profile picture'}
            </h6>
          </div>
        </Button>
        {!props.removedisabled && (
          <Button
            aria-label="remove-image-button"
            disableFocusRipple
            onClick={props.remove}
            disabled={props.changedisabled}
            className="button-text-lower w-full cursor-default rounded-lg border border-solid border-white/30 py-2 text-sky-400 hover:bg-transparent active:bg-transparent disabled:cursor-not-allowed disabled:text-sky-400 disabled:opacity-50"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff80 !important',
              },
            }}
          >
            <div className="flex items-center justify-center space-x-2">
              <TrashIcon className="block h-[18px]" />
              <h6 className="flex truncate pt-[2px] text-sm font-[600]">
                Remove
              </h6>
            </div>
          </Button>
        )}
      </div>
      {props.ShowProgress && <LoadingLinearProgress backDrop />}
    </div>
  );
}

export default ShowAvatar;
