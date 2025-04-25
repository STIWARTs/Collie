import { Menu, MenuItem, Button } from '@mui/material';
import {
  Manage_Your_Account_Link,
  Track_Order_Link,
  Cart_Link,
  Redeem_Gift_Codes_Link,
} from 'routers/RouterLinks';
import Image from 'next/image';
import UserIcon from '../../../../public/icons/user-fill.svg';
import { ClientUserType } from 'authentication/UseClientAuth';
import { useRouter } from 'next/navigation';

export interface HeaderUserButtonMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  user: ClientUserType;
  handleClose: () => void;
  SignOutUser: () => void;
}

function HeaderUserButtonMenu(props: HeaderUserButtonMenuProps) {
  const router = useRouter();
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          background: '#28282880',
          mt: 1.43,
          borderRadius: 2,
          overflow: 'visible',
          filter: 'drop-shadow(0px 0px 25px #000000)',
          backdropFilter: 'blur(50px)',
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
    >
      <MenuItem
        key={1}
        disableRipple
        disableTouchRipple
        className="m-1 cursor-default rounded-md p-2 pr-10 hover:bg-[transparent]"
      >
        <div className="relative flex space-x-3">
          <div className="relative block">
            {props.user?.photoURL ? (
              <Image
                height={50}
                width={50}
                className="rounded-[50%]"
                src={`${props.user.photoURL}`}
                alt=""
              />
            ) : (
              <Image
                height={50}
                width={50}
                className="rounded-[50%] opacity-70"
                src={UserIcon}
                alt=""
              />
            )}
          </div>
          <div className="relative block">
            <h5 className="font-sans whitespace-nowrap text-[15px] text-white">{`${
              props.user?.displayName ? props.user.displayName : 'User'
            }`}</h5>
            <p className="mr-8 whitespace-nowrap text-[11px] text-white opacity-[0.85]">{`${
              props.user?.email
                ? props.user.email
                : 'No email address has been added'
            }`}</p>
            <div className="relative block">
              <Button
                aria-label="user-sign-out-button"
                disableFocusRipple
                onClick={props.SignOutUser}
                className="button-text-lower relative mt-[8px] block bg-[#ffffff15] p-[2px] text-[11px] font-normal text-white hover:bg-[#ffffff30]"
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </MenuItem>
      <div className="h-[1px] w-full bg-[#ffffff20]" />
      <MenuItem
        key={2}
        onClick={() => {
          setTimeout(() => {
            props.handleClose();
            router.push(Manage_Your_Account_Link);
          }, 150);
        }}
        className="m-1 cursor-default rounded-md py-2 hover:bg-[#ffffff15]"
      >
        <div className="relative flex space-x-[10px] opacity-90">
          <Image height={17} width={17} src="/icons/folder.svg" alt="" />
          <h6 className="font-sans text-[14px] font-[400] text-white">
            Manage your account
          </h6>
        </div>
      </MenuItem>
      <MenuItem
        key={3}
        onClick={() => {
          setTimeout(() => {
            props.handleClose();
            router.push(Track_Order_Link);
          }, 150);
        }}
        className="m-1 cursor-default rounded-md py-2 hover:bg-[#ffffff15]"
      >
        <div className="relative flex space-x-[10px] opacity-90">
          <Image height={18} width={18} src="/icons/truck.svg" alt="" />
          <h6 className="font-sans text-[14px] font-[400] text-white">
            Track orders
          </h6>
        </div>
      </MenuItem>
      <MenuItem
        key={4}
        onClick={() => {
          setTimeout(() => {
            props.handleClose();
            router.push(Cart_Link);
          }, 150);
        }}
        className="m-1 cursor-default rounded-md py-2 hover:bg-[#ffffff15]"
      >
        <div className="relative flex space-x-[10px] opacity-90">
          <Image height={17} width={17} src="/icons/shopping-bag.svg" alt="" />
          <h6 className="font-sans text-[14px] font-[400] text-white">
            View all orders
          </h6>
        </div>
      </MenuItem>
      <MenuItem
        key={5}
        onClick={() => {
          setTimeout(() => {
            props.handleClose();
            router.push(Redeem_Gift_Codes_Link);
          }, 150);
        }}
        className="m-1 cursor-default rounded-md py-2 hover:bg-[#ffffff15]"
      >
        <div className="relative flex space-x-[10px] opacity-90">
          <Image height={17} width={17} src="/icons/gift.svg" alt="" />
          <h6 className="font-sans text-[14px] font-[400] text-white">
            Redeem code or gift cards
          </h6>
        </div>
      </MenuItem>
    </Menu>
  );
}

export default HeaderUserButtonMenu;
