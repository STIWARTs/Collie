import { Button } from '@mui/material';
import Image from 'next/image';
import TooltipDark from 'components/tooltip/TooltipDark';

interface IProps {
  tooltip?: string;
  content: string;
  iconURL: string;
  onClick: React.ReactEventHandler;
}

function SmallIconButtonDark(props: IProps) {
  return (
    <TooltipDark title={props.tooltip} placement="top" arrow>
      <Button
        aria-label="small-icon-button"
        disableFocusRipple
        onClick={props.onClick}
        className="button-text-lower h-9 cursor-default rounded-md px-3 py-2 hover:bg-white/10"
        sx={{
          '.MuiTouchRipple-child': {
            backgroundColor: '#ffffff80 !important',
          },
        }}
      >
        <div className="flex items-center sm:space-x-2">
          <div className="flex max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]">
            <Image height={18} width={18} src={props.iconURL} alt="" />
          </div>
          <label className="font-sans hidden whitespace-nowrap text-[13px] font-normal text-white md:block">
            {props.content}
          </label>
        </div>
      </Button>
    </TooltipDark>
  );
}

export default SmallIconButtonDark;
