'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Setup_Link } from 'routers/RouterLinks';
import { HeaderUserButtonMenuProps } from './Header.UserButton.Menu';
import { SignOut } from 'functions/AuthAlgorithms';
import UseClientAuth, { ClientUserType } from 'authentication/UseClientAuth';
import TooltipDark from 'components/tooltip/TooltipDark';

const HeaderUserButtonMenu = dynamic<HeaderUserButtonMenuProps>(
  () => import('./Header.UserButton.Menu'),
  { ssr: false },
);

function HeaderUserButton() {
  const { FirebaseUser, FirebaseLoading } = UseClientAuth();
  const Router = useRouter();

  if (FirebaseLoading)
    return (
      <Container>
        <UserLoading />
      </Container>
    );

  if (FirebaseUser)
    return (
      <Container>
        <UserButton user={FirebaseUser} />
      </Container>
    );

  return (
    <Container>
      <LoginButton
        onClick={() => {
          Router.push(Setup_Link);
        }}
      />
    </Container>
  );
}

interface LoginButtonProps {
  onClick: () => void;
}

interface ContainerProps {
  children: React.ReactNode;
}
interface UserButtonProps {
  user: ClientUserType;
}

function LoginButton(props: LoginButtonProps) {
  return (
    <TooltipDark
      arrow
      placement="bottom"
      title={<h6 className="font-[400]">Account</h6>}
    >
      <Button
        aria-label="user-login-button"
        disableFocusRipple
        onClick={props.onClick}
        className="button-text-lower flex h-full items-center justify-center bg-transparent hover:bg-[#202020]"
        sx={{
          minWidth: 47,
          '.MuiTouchRipple-child': {
            backgroundColor: '#ffffff50 !important',
          },
        }}
      >
        <Image
          height={20}
          width={20}
          className="opacity-70"
          src="/icons/user-fill.svg"
          alt=""
        />
      </Button>
    </TooltipDark>
  );
}

const UserLoading = () => {
  return (
    <Button
      disabled
      className="button-text-lower flex h-full min-w-[47px] items-center justify-center bg-transparent"
    >
      <CircularProgress className="p-2.5 text-white" thickness={4} />
    </Button>
  );
};

function UserButton(props: UserButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const SignOutUser = () => {
    SignOut({ Next: handleClose });
  };

  return (
    <>
      <TooltipDark
        arrow
        placement="bottom"
        title={<h6 className="font-[400]">Account</h6>}
      >
        <Button
          aria-label="user-popup-button"
          disableFocusRipple
          onClick={handleClick}
          className="button-text-lower flex h-full items-center justify-center bg-transparent hover:bg-[#202020]"
          sx={{
            minWidth: 47,
            '.MuiTouchRipple-child': {
              backgroundColor: '#ffffff50 !important',
            },
          }}
        >
          {props.user?.photoURL ? (
            <Image
              height={35}
              width={35}
              className="rounded-[50%]"
              src={
                props.user.photoURL
                  ? props.user.photoURL
                  : '/images/loader/dark-circle.png'
              }
              alt=""
            />
          ) : (
            <Image
              height={20}
              width={20}
              className="opacity-70"
              src="/icons/user-fill.svg"
              alt=""
            />
          )}
        </Button>
      </TooltipDark>
      <HeaderUserButtonMenu
        anchorEl={anchorEl}
        open={open}
        user={props.user}
        handleClose={handleClose}
        SignOutUser={SignOutUser}
      />
    </>
  );
}

function Container(props: ContainerProps) {
  return (
    <div className="relative box-border flex h-[47px] min-h-[47px] overflow-hidden rounded-lg">
      {props.children}
    </div>
  );
}

export default HeaderUserButton;
