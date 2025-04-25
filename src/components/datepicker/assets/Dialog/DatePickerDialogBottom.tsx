import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button } from '@mui/material';

interface IProps {
  cancel: () => void;
  submit: () => void;
  submitActive: boolean;
}

function DatePickerDialogBottom(props: IProps) {
  return (
    <div className="relative flex justify-end space-x-3 p-3">
      <Button
        aria-label="dob-cancel-button"
        disableFocusRipple
        onClick={props.cancel}
        className="group h-8 w-[calc(100%/3)] cursor-default rounded-lg bg-white/5 outline-none hover:bg-white/5"
        sx={{
          '.MuiTouchRipple-child': {
            backgroundColor: '#ffffff80 !important',
          },
        }}
      >
        <XMarkIcon className="h-5 text-red-400 group-hover:text-white" />
      </Button>
      <Button
        aria-label="dob-submit-button"
        disableFocusRipple
        disabled={!props.submitActive}
        onClick={props.submit}
        className="group h-8 w-[calc(100%/3)] cursor-default rounded-lg bg-dark-blue outline-none hover:bg-dark-blue disabled:cursor-not-allowed disabled:opacity-50"
        sx={{
          '.MuiTouchRipple-child': {
            backgroundColor: '#ffffff80 !important',
          },
        }}
      >
        <CheckIcon className="h-6 text-sky-400 group-hover:text-white" />
      </Button>
    </div>
  );
}

export default DatePickerDialogBottom;
