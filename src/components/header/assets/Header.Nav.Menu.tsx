import { Menu, MenuItem } from '@mui/material';
import { Collections_Link, Home_Link, Offers_Link } from 'routers/RouterLinks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface HeaderNavMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  onValueChange: (
    value: 'Discover' | 'Offers' | 'Collections' | 'NFT Collection',
  ) => void;
  Value: string;
}

interface INavLabel {
  label: 'Discover' | 'Offers' | 'Collections';
  to: string;
  icon?: string;
}

const Links: INavLabel[] = [
  {
    label: 'Discover',
    to: Home_Link,
  },
  {
    label: 'Offers',
    to: Offers_Link,
  },
  {
    label: 'Collections',
    to: Collections_Link,
  },
];

const DisableButton = (props: string, value: string) => {
  if (props === value) {
    return true;
  } else {
    return false;
  }
};

const ActiveContent = (props: string, value: string) => {
  if (props === value) {
    return 'opacity-100 cursor-default hover:bg-transparent';
  } else {
    return 'opacity-50 cursor-default hover:opacity-100 hover:bg-[#ffffff10]';
  }
};

function HeaderNavMenu(props: HeaderNavMenuProps) {
  const router = useRouter();
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          background: '#28282880',
          mt: 1.1,
          ml: 8.3,
          borderRadius: 2,
          padding: 0.5,
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
            backgroundColor: '#ffffff30 !important',
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      className="block medium-screen:hidden"
    >
      {Links.map((value, idx) => (
        <MenuItem
          key={idx}
          aria-label="browser-header-NavMenu-button"
          disableRipple={Boolean(DisableButton(props.Value, value.label))}
          disableTouchRipple={Boolean(DisableButton(props.Value, value.label))}
          className={`${ActiveContent(
            props.Value,
            value.label,
          )} ${'button-text-lower m-0 h-full w-full cursor-default items-center justify-start whitespace-nowrap rounded-lg bg-transparent p-0 text-[13px] font-normal text-white transition-opacity ease-in disabled:cursor-not-allowed disabled:text-white'}`}
          onClick={() => {
            setTimeout(() => {
              if (props.Value != value.label) {
                router.push(value.to as any);
                props.onValueChange(value.label);
                props.onClose();
              }
            }, 200);
          }}
        >
          <div className="flex w-[180px] items-center justify-start p-3 text-left">
            {value.icon && (
              <img
                src={value.icon}
                alt={value.label}
                className="mr-2 h-4 w-4"
              />
            )}
            <p className="block w-full">{value.label}</p>
            {Boolean(DisableButton(props.Value, value.label)) && (
              <div className="block h-5 w-5 opacity-70">
                <Image
                  height={18}
                  width={18}
                  src="/icons/check-white-2.svg"
                  alt=""
                />
              </div>
            )}
          </div>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default HeaderNavMenu;
