import { Button } from '@mui/material';

interface IProps {
  onClick: () => void;
  ClassName?: string;
  children: React.ReactNode;
}

function SetupSkipAllButton(props: IProps) {
  return (
    <div className="flex h-10">
      <Button
        disableFocusRipple
        onClick={props.onClick}
        className={`${props.ClassName} button-text-lower cursor-default truncate rounded-lg bg-transparent px-14 py-2 text-[13px] font-medium tracking-wide text-sky-400 transition-all hover:bg-white/5`}
        sx={{
          '.MuiTouchRipple-child': {
            backgroundColor: '#38bdf880 !important',
          },
        }}
      >
        {props.children}
      </Button>
    </div>
  );
}

export default SetupSkipAllButton;
