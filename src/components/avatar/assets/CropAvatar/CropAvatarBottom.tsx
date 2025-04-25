import { CheckIcon } from '@heroicons/react/24/solid';
import { Button } from '@mui/material';

interface IProps {
  back: () => void;
  submitClick?: () => void;
}

export function CropAvatarBottom(props: IProps) {
  return (
    <div className="relative box-border flex w-full justify-center px-5 pb-5 sm:justify-between sm:px-6 sm:pb-6">
      <div className="relative hidden h-[40px] w-full items-center justify-center sm:flex sm:max-w-[165px]">
        <Button
          disableFocusRipple
          onClick={props.back}
          aria-label="cancel-image-button"
          className="button-text-lower w-full cursor-default rounded-lg bg-white/5 py-2  text-sm font-[600] text-red-400 backdrop-blur-2xl hover:bg-white/[0.03]"
          sx={{
            '.MuiTouchRipple-child': {
              backgroundColor: '#ffffff80 !important',
            },
          }}
        >
          Cancel
        </Button>
      </div>
      <div className="relative flex h-[40px] w-full items-center justify-center sm:max-w-[165px]">
        <Button
          aria-label="set-image-button"
          disableFocusRipple
          onClick={props.submitClick}
          className="button-text-lower h-full w-full cursor-default rounded-lg bg-dark-blue text-sky-400 hover:bg-dark-blue/70"
          sx={{
            '.MuiTouchRipple-child': {
              backgroundColor: '#38bdf880 !important',
            },
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            <CheckIcon className="block h-5" />
            <h6 className="flex truncate pt-[2px] text-sm font-[700]">Set</h6>
          </div>
        </Button>
      </div>
    </div>
  );
}
