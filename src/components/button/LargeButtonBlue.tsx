import { Button, CircularProgress } from '@mui/material';

export interface LargeButtonBlueProps {
  content: string;
  onClick: React.ReactEventHandler;
  Disabled: boolean;
  Loading: boolean;
}

function LargeButtonBlue(props: LargeButtonBlueProps) {
  return (
    <div className="relative w-full">
      <Button
        aria-label="all-purpose-blue-button"
        disableFocusRipple
        sx={{
          '.MuiTouchRipple-child': {
            backgroundColor: '#ffffff80 !important',
          },
        }}
        disabled={props.Disabled}
        onClick={props.onClick}
        className="h-[60px] w-full rounded-md bg-primary-blue text-xs text-white transition-all ease-in hover:bg-primary-blue disabled:cursor-not-allowed disabled:text-white disabled:opacity-50"
      >
        {props.content}
      </Button>
      {props.Loading && (
        <div className="absolute top-0 flex h-full w-full items-center justify-center rounded-md bg-[#104A82] transition-all ease-in">
          <CircularProgress
            className="text-white opacity-75"
            size={20}
            thickness={3}
          />
        </div>
      )}
    </div>
  );
}

export default LargeButtonBlue;
