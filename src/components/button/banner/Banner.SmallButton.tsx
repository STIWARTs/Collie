import { Button } from '@mui/material';

interface IProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

function BannerSmallButton(props: IProps) {
  return (
    <Button
      onClick={props.onClick}
      className={`${props.className} button-text-lower m-0 block cursor-default whitespace-nowrap rounded-lg bg-transparent px-3 py-2 text-xs font-normal tracking-wide text-white hover:bg-white/10`}
      sx={{
        '.MuiTouchRipple-child': {
          backgroundColor: '#ffffff50 !important',
        },
      }}
    >
      {props.label}
    </Button>
  );
}

export default BannerSmallButton;
