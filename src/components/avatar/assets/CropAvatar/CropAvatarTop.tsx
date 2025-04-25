import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { IconButton } from '@mui/material';
import TooltipDark from 'components/tooltip/TooltipDark';

interface IProps {
  back: () => void;
  moreInfo: (event: React.MouseEvent<HTMLElement>) => void;
  heading: string;
}

export function CropAvatarTop(props: IProps) {
  return (
    <div className="z-10 flex w-full items-center justify-between p-1">
      <TooltipDark placement="bottom" title="Back" arrow>
        <IconButton
          disableFocusRipple
          onClick={props.back}
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
  );
}
