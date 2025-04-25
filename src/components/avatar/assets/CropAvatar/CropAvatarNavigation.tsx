import SmallIconButtonDark from 'components/button/SmallIconButtonDark';
import TooltipDark from 'components/tooltip/TooltipDark';
import { Button } from '@mui/material';

interface IProps {
  Changed: boolean;
  ResetClick: () => void;
  RotateLeft: () => void;
  RotateRight: () => void;
  FlipX: () => void;
  FlipY: () => void;
}

export function CropAvatarNavigation(props: IProps) {
  return (
    <div className="flex w-full items-center justify-center p-5">
      <div className="flex h-[44px] items-center justify-center rounded-lg bg-white/10 px-3 py-1 shadow-xl backdrop-blur-2xl">
        <SmallIconButtonDark
          onClick={props.RotateLeft}
          tooltip="Rotate image 90 degrees anti-clockwise"
          content="Rotate left"
          iconURL="/icons/rotate-left.svg"
        />
        <SmallIconButtonDark
          onClick={props.RotateRight}
          tooltip="Rotate image 90 degrees clockwise"
          content="Rotate right"
          iconURL="/icons/rotate-right.svg"
        />
        <SmallIconButtonDark
          onClick={props.FlipX}
          tooltip="Flip image vertically"
          content="Flip vertical"
          iconURL="/icons/flip-x.svg"
        />
        <SmallIconButtonDark
          onClick={props.FlipY}
          tooltip="Flip image horizontally"
          content="Flip horizontal"
          iconURL="/icons/flip-y.svg"
        />
        <div className="mx-3 block h-7 w-[2px] bg-white/50" />
        <TooltipDark
          title="Reset all edits performed on the image"
          placement="top"
          arrow
        >
          <Button
            aria-label="small-icon-button"
            disableFocusRipple
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={!props.Changed ? () => {} : props.ResetClick}
            className={`${
              !props.Changed
                ? 'opacity-50 hover:bg-transparent'
                : 'opacity-100 hover:bg-white/10'
            } button-text-lower h-9 cursor-default rounded-md px-4 py-2 text-[13px] text-white`}
            sx={{
              minWidth: 0,
              '.MuiTouchRipple-child': {
                backgroundColor: !props.Changed
                  ? '#ffffff00 !important'
                  : '#ffffff80 !important',
              },
            }}
          >
            Reset
          </Button>
        </TooltipDark>
      </div>
    </div>
  );
}
