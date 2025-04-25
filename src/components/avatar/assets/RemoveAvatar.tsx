import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import TooltipDark from '../../tooltip/TooltipDark';
import Image from 'next/image';
import { Circle_BlurDataURL } from '../../loading/BlurDataURL';

interface IProps {
  backward: () => void;
  moreInfo: (event: React.MouseEvent<HTMLElement>) => void;
  URL: string;
  remove: () => void;
}

export function RemoveAvatar(props: IProps) {
  return (
    <div className=" Remove-Avatar-Container flex h-full w-full flex-col items-center justify-between overflow-auto scroll-smooth bg-secondary-theme">
      {/* Header */}
      <div className="z-10 flex w-full items-center justify-between p-1">
        <TooltipDark placement="bottom" title="Back" arrow>
          <IconButton
            disableFocusRipple
            onClick={props.backward}
            className="p-3 hover:bg-white/5"
          >
            <ArrowLeftIcon className="h-5 text-white" />
          </IconButton>
        </TooltipDark>
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
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="flex w-full flex-col items-center overflow-y-auto overflow-x-hidden scroll-smooth px-5">
          {/* Center */}
          <div className="remove-avatar-profile-photo relative box-content flex min-h-[96px] min-w-[96px] justify-center overflow-hidden rounded-[50%]">
            <div className="relative h-full w-full rounded-full">
              <Image
                fill
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
          {/* Heading */}
          <h6 className="mt-5 w-full text-center text-xl font-normal text-white">
            Remove profile picture ?
          </h6>
          {/* Sub Heading */}
          <h6 className="mt-1 w-full max-w-[300px] text-center text-sm text-white/75">
            A picture helps people recognize you and lets you know when
            you&apos;re signed in to your account.
          </h6>
        </div>
      </div>
      {/* Bottom */}
      <div className="flex w-full space-x-2 px-5 pb-5 pt-2">
        <Button
          disableFocusRipple
          onClick={props.backward}
          aria-label="cancel-image-button"
          className="button-text-lower w-full cursor-default rounded-lg bg-white/5 py-2  text-sm font-[600] text-red-400 hover:bg-white/[0.03]"
          sx={{
            '.MuiTouchRipple-child': {
              backgroundColor: '#ffffff80 !important',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          disableFocusRipple
          onClick={props.remove}
          aria-label="remove-image-button"
          className="button-text-lower w-full cursor-default rounded-lg bg-dark-blue py-2 text-sky-400 hover:bg-dark-blue/70"
          sx={{
            '.MuiTouchRipple-child': {
              backgroundColor: '#38bdf880 !important',
            },
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            <TrashIcon className="block h-[18px]" />
            <h6 className="flex truncate pt-[2px] text-sm font-[700]">
              Remove
            </h6>
          </div>
        </Button>
      </div>
    </div>
  );
}
