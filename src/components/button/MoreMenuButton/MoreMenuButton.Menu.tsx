import { Menu, MenuItem } from '@mui/material';
import Image from 'next/image';

export interface MoreMenuButtonMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  MenuContent: { label: string; icon: string; onClick: () => void }[];
}

function MoreMenuButtonMenu(props: MoreMenuButtonMenuProps) {
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          background: '#ffffff10',
          borderRadius: 2,
          minWidth: 200,
          overflow: 'visible',
          filter: 'drop-shadow(0px 0px 0px #000000)',
          backdropFilter: 'blur(15px)',
          '.MuiMenu-list': {
            padding: '1px 0',
          },
          '.MuiMenuItem-root': {
            minHeight: 0,
          },
          '.MuiTouchRipple-child': {
            backgroundColor: '#ffffff50 !important',
          },
        },
      }}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      {props.MenuContent.map((value, idx) => (
        <MenuItem
          key={idx + 1}
          onClick={value.onClick}
          className={`${
            props.MenuContent.length === idx + 1 ? 'mb-1' : ''
          } mx-1 mt-1 cursor-default space-x-3 rounded-md px-3 py-2 hover:bg-[#ffffff20]`}
        >
          <Image height={19} width={19} src={value.icon} alt="" />
          <label className="text-left text-[13px] font-[400] text-white">
            {value.label}
          </label>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default MoreMenuButtonMenu;
