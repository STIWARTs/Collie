import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { IconButton } from '@mui/material';
import { CollectionMap } from './CollectionForAvatar/CollectionMap';
import { SetupAvatarContentProps } from 'contents/setup/Setup.Avatar';
import TooltipDark from 'components/tooltip/TooltipDark';

interface IProps {
  AvatarReducer: SetupAvatarContentProps[];
  backward: () => void;
  moreInfo: (event: React.MouseEvent<HTMLElement>) => void;
  forward: () => void;
  getURL: (value: string) => void;
  heading: string;
}

function CollectionForAvatar(props: IProps) {
  return (
    <div className=" flex h-full w-full flex-col items-center overflow-auto scroll-smooth bg-secondary-theme text-white">
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
        <div className="flex w-full items-center justify-start space-x-1.5 px-1 sm:justify-center">
          <h6 className="text-lg font-normal tracking-wide text-white">
            {props.heading}
          </h6>
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
      <CollectionMap
        AvatarReducer={props.AvatarReducer}
        forward={props.forward}
        getURL={props.getURL}
      />
    </div>
  );
}

export default CollectionForAvatar;
