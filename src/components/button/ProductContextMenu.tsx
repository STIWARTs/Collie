import { Menu, MenuItem } from '@mui/material';
import Image from 'next/image';

export interface ProductContextMenuProps {
  MenuContent: { label: string; icon: string; onClick?: () => void }[];
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  minWidth?: number;
  TransformHorizontal?: 'left' | 'right' | 'center' | number;
  TransformVertical?: 'top' | 'bottom' | 'center' | number;
  AnchorHorizontal?: 'left' | 'right' | 'center' | number;
  AnchorVertical?: 'top' | 'bottom' | 'center' | number;
  onItemClick?: (action: string) => void;
}

function ProductContextMenu(props: ProductContextMenuProps) {
  const handleItemClick = (value: { label: string; onClick?: () => void }) => {
    if (value.onClick) {
      value.onClick();
    } else if (props.onItemClick) {
      props.onItemClick(value.label);
    }
    props.handleClose();
  };

  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          background: '#28282875',
          borderRadius: 2,
          minWidth: props.minWidth ? props.minWidth : 250,
          overflow: 'visible',
          filter: 'drop-shadow(0px 0px 20px #000000)',
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
      transformOrigin={{
        horizontal: props.TransformHorizontal
          ? props.TransformHorizontal
          : 'left',
        vertical: props.TransformVertical ? props.TransformVertical : 'top',
      }}
      anchorOrigin={{
        horizontal: props.AnchorHorizontal ? props.AnchorHorizontal : 'right',
        vertical: props.AnchorVertical ? props.AnchorVertical : 'top',
      }}
    >
      {props.MenuContent.map((value, idx) => (
        <MenuItem
          key={idx + 1}
          onClick={() => handleItemClick(value)}
          className={`${
            props.MenuContent.length === idx + 1 ? 'mb-1' : ''
          } mx-1 mt-1 cursor-default space-x-3 rounded-md px-3 py-2 hover:bg-[#ffffff10]`}
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

export default ProductContextMenu;
