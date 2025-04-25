import { Button } from '@mui/material';

interface IProps {
  label: string;
}

function UnderlineButtonDark(props: IProps) {
  return (
    <Button
      className="font-sans button-text-lower m-0 block whitespace-nowrap p-0 text-[14px] font-normal text-white underline-offset-4 hover:underline"
      sx={{
        '.MuiTouchRipple-child': {
          backgroundColor: '#ffffff00 !important',
        },
      }}
    >
      {props.label}
    </Button>
  );
}

export default UnderlineButtonDark;
