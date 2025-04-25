import { Button, CircularProgress } from '@mui/material';

interface IProps {
  Disabled: boolean;
  onClick: () => void;
  ClassName?: string;
  Loading?: boolean;
  children: React.ReactNode;
}

function SetupSubmitButton(props: IProps) {
  return (
    <Button
      disableFocusRipple
      disabled={props.Disabled}
      onClick={props.onClick}
      className={`${props.ClassName} ${
        props.Loading
          ? '!bg-primary-blue/50 !text-transparent'
          : '!bg-primary-blue !text-white'
      } button-text-lower !relative !cursor-default !rounded-lg !px-14 !py-2 !text-[13px] !font-[700] !tracking-wide transition-all duration-200 ease-in-out hover:!bg-primary-blue/70`}
      sx={{
        '.MuiTouchRipple-child': {
          backgroundColor: '#ffffff80 !important',
        },
      }}
    >
      {props.children}
      {props.Loading && (
        <div className="absolute flex h-full w-full items-center justify-center">
          <CircularProgress className="text-white" size={20} />
        </div>
      )}
    </Button>
  );
}

export default SetupSubmitButton;
