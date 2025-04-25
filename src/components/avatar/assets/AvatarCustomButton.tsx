import Image from 'next/image';
import { IconButton } from '@mui/material';
import { CameraIcon } from '@heroicons/react/24/solid';
import { Circle_BlurDataURL } from 'components/loading/BlurDataURL';

interface IProps {
  onClick?: () => void;
  ImageURL: string;
}

export function AvatarCustomButton(props: IProps) {
  return (
    <IconButton
      onClick={props.onClick}
      disableRipple
      disableFocusRipple
      disableTouchRipple
      className="flex-shrink-0 flex-grow-0 cursor-default rounded-[50%] p-0 opacity-100 transition-opacity hover:opacity-50"
      sx={{ borderRadius: '50%' }}
    >
      <div className="relative flex">
        <div className="relative flex overflow-hidden rounded-[50%]">
          <Image
            height={125}
            width={125}
            className="rounded-[50%]"
            src={props.ImageURL}
            blurDataURL={Circle_BlurDataURL}
            placeholder="blur"
            alt=""
          />
        </div>
        <div className="absolute bottom-0 right-0 flex items-center justify-center rounded-[50%] bg-secondary-theme p-1.5">
          <CameraIcon className="h-[25px] w-[25px] text-white" />
        </div>
      </div>
    </IconButton>
  );
}
