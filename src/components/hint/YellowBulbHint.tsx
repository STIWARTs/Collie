import Image from 'next/image';
import dynamic from 'next/dynamic';
import { TooltipProps } from '@mui/material';

const TooltipDark = dynamic<TooltipProps>(
  () => import('../tooltip/TooltipDark'),
  { ssr: false },
);

interface IProps {
  Label: string;
  Tooltip?: true;
  TooltipTitle?: string;
  TooltipPlacement?:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start';
}

function YellowBulbHint(props: IProps) {
  return (
    <div className="flex w-full justify-start">
      <div className="flex items-center space-x-1 rounded-md bg-[#b48a0090] py-1 pl-1 pr-2 text-white">
        <div className="mt-1 h-full min-w-[15px] items-start">
          {props.Tooltip ? (
            <TooltipDark
              arrow
              placement={props.TooltipPlacement}
              title={props.TooltipTitle}
            >
              <Image
                height={15}
                width={15}
                src="/icons/light-bulb-color.svg"
                alt=""
              />
            </TooltipDark>
          ) : (
            <Image
              height={15}
              width={15}
              src="/icons/light-bulb-color.svg"
              alt=""
            />
          )}
        </div>
        <p className="flex text-[13px] font-medium text-white">{props.Label}</p>
      </div>
    </div>
  );
}

export default YellowBulbHint;
