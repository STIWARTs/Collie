import { MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from '@heroicons/react/24/outline';
import TooltipDark from 'components/tooltip/TooltipDark';
import { m } from 'framer-motion';

interface IProps {
  ZoomValue: number;
  onZoomOut: () => void;
  onZoomIn: () => void;
}

export function CropAvatarZoom(props: IProps) {
  const toFixed = (x: string) => {
    return Number.parseFloat(x).toFixed(0);
  };

  const Zoom = parseInt(toFixed(`${props.ZoomValue * 100}`));

  return (
    <div className="relative mx-auto flex w-full justify-between px-5 py-4 sm:max-w-[470px]">
      <CustomButton
        Content="Zoom Out"
        Tooltip="Zoom out of the image"
        Disabled={Zoom === 0}
        onClick={props.onZoomOut}
        Icon={<MagnifyingGlassMinusIcon className="h-[18px] text-white" />}
      />
      {/* <TooltipDark
        title="Shows the zoom percentage of the image"
        placement="bottom"
        arrow
      >
        <div className="cursor-default h-[44px] w-[80px] border border-solid border-white/10 relative flex text-sm font-normal whitespace-nowrap text-white items-center justify-center">
          {Zoom} %
        </div>
      </TooltipDark> */}
      <CustomButton
        Content="Zoom In"
        Tooltip="Zoom into the image"
        Disabled={Zoom === 100}
        onClick={props.onZoomIn}
        Icon={<MagnifyingGlassPlusIcon className="h-[18px] text-white" />}
      />
    </div>
  );
}

interface CustomButtonProps {
  Content: string;
  Tooltip: string;
  Icon: React.ReactNode;
  onClick: () => void;
  Disabled: boolean;
}

function CustomButton(props: CustomButtonProps) {
  return (
    <div className="relative flex h-[44px] w-full max-w-[110px] items-center justify-center p-1">
      <TooltipDark title={props.Tooltip} placement="bottom" arrow>
        <m.button
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={props.Disabled ? () => {} : props.onClick}
          whileTap={{ scale: props.Disabled ? 1 : 0.9 }}
          className={`${
            props.Disabled ? 'opacity-50' : 'opacity-100'
          } relative flex h-full w-full cursor-default items-center justify-center rounded-lg bg-white/10 backdrop-blur-2xl`}
        >
          <div className="flex items-center">
            {props.Icon}
            {/* <h6 className="text-[13px] text-white font-normal font-sans whitespace-nowrap hidden md:block">
              {props.Content}
            </h6> */}
          </div>
        </m.button>
      </TooltipDark>
    </div>
  );
}
