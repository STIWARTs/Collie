import { Button } from '@mui/material';

interface IProps {
  label: string;
}

function BannerUnderlineButton(props: IProps) {
  return (
    <Button
      className="font-sans button-text-lower text-size-14 absolute bottom-0 mx-5 mb-4 block whitespace-nowrap p-0 font-normal text-white underline-offset-4 hover:underline"
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

export default BannerUnderlineButton;
