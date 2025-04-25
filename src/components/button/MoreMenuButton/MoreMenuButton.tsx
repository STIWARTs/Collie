import {
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { MoreMenuButtonMenuProps } from './MoreMenuButton.Menu';
import dynamic from 'next/dynamic';

const MoreMenuButtonMenu = dynamic<MoreMenuButtonMenuProps>(
  () => import('./MoreMenuButton.Menu'),
  { ssr: false },
);

interface IProps {
  ClassName?: string;
  Orientation: string;
  MenuContent: { label: string; icon: string; onClick: () => void }[];
}

function MoreMenuButton(props: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        disableFocusRipple
        onClick={handleClick}
        className={`${props.ClassName} block cursor-default items-center justify-center rounded-md bg-transparent p-1 text-white opacity-75 hover:bg-[#ffffff15] hover:opacity-100`}
        sx={{
          '.MuiTouchRipple-child': {
            borderRadius: '2px',
            backgroundColor: '#ffffff40 !important',
          },
        }}
      >
        {props.Orientation === 'horizontal' ? (
          <EllipsisHorizontalIcon className="h-5" />
        ) : (
          <EllipsisVerticalIcon className="h-5" />
        )}
      </IconButton>
      <MoreMenuButtonMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        MenuContent={props.MenuContent}
      />
    </>
  );
}

export default MoreMenuButton;
