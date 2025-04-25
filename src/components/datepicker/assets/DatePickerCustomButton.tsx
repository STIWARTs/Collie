import { CalendarIcon } from '@heroicons/react/24/outline';
import { Button } from '@mui/material';

interface IProps {
  onClick?: () => void;
  label: string;
}

function DatePickerCustomButton(props: IProps) {
  return (
    <Button
      aria-label="select-dob-button"
      disableFocusRipple
      onClick={props.onClick}
      className="button-text-lower cursor-default rounded-lg bg-[#0f0f0f] px-4 py-3 text-white opacity-100 transition-opacity hover:bg-[#0f0f0f] hover:opacity-75"
      sx={{
        '.MuiTouchRipple-child': {
          backgroundColor: '#ffffff80 !important',
        },
      }}
    >
      <div className="flex space-x-3">
        <CalendarIcon className="h-5 text-white" />
        <h6 className="text-sm font-[600] text-white">{props.label}</h6>
      </div>
    </Button>
  );
}

export default DatePickerCustomButton;
