import { Button } from '@mui/material';

interface IProps {
  label: string;
  onClick?: () => void;
}

export function BannerSmallButtonForBannerFour(props: IProps) {
  return (
    <Button
      onClick={props.onClick}
      className="button-text-lower absolute bottom-0 m-4 block cursor-default whitespace-nowrap rounded-lg bg-white/5 px-3 py-2 text-xs font-normal tracking-wide text-white hover:bg-white/10"
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
