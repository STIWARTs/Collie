'use client';

import UserIcon from '../../../../../public/icons/user-fill.svg';
import { CircularProgress, IconButton } from '@mui/material';
import { useState } from 'react';
import { Setup_Link } from 'routers/RouterLinks';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { HeaderUserButtonMenuProps } from '../Header.UserButton.Menu';
import { SignOut } from 'functions/AuthAlgorithms';
import UseClientAuth, { ClientUserType } from 'authentication/UseClientAuth';

const HeaderUserButtonMenu = dynamic<HeaderUserButtonMenuProps>(
  () => import('../Header.UserButton.Menu'),
  { ssr: false },
);

export function HeaderMobileUserButton() {
  const { FirebaseUser, FirebaseLoading } = UseClientAuth();
  const router = useRouter();

  if (FirebaseLoading)
    return (
      <ContainerButton>
        <LoadingButton />
      </ContainerButton>
    );

  if (FirebaseUser)
    return (
      <ContainerButton>
        <UserButton user={FirebaseUser} />
      </ContainerButton>
    );

  return (
    <ContainerButton>
      <LoginButton
        onClick={() => {
          setTimeout(() => {
            router.push(Setup_Link);
          }, 150);
        }}
      />
    </ContainerButton>
  );
}

interface LoginButtonProps {
  onClick: () => void;
}

interface ContainerButtonProps {
  children: React.ReactNode;
}
interface UserButtonProps {
  user: ClientUserType;
}

function LoginButton(props: LoginButtonProps) {
  return (
    <IconButton
      aria-label="user-login-button"
      disableFocusRipple
      onClick={props.onClick}
      className="flex h-[35px] w-[35px] items-center justify-center p-0"
      sx={{
        '.MuiTouchRipple-child': {
          backgroundColor: 'transparent !important',
        },
      }}
      style={{ minWidth: 35, width: 35, maxWidth: 35 }}
    >
      <Image
        height={25}
        width={25}
        className="rounded-[50%] opacity-70"
        src={UserIcon}
        alt=""
      />
    </IconButton>
  );
}

function LoadingButton() {
  return (
    <>
      <IconButton
        disabled
        aria-label="user-button-loading"
        disableFocusRipple
        className="flex h-[35px] w-[35px] items-center justify-center p-0"
        sx={{
          '.MuiTouchRipple-child': {
            backgroundColor: 'transparent !important',
          },
        }}
        style={{ minWidth: 35, width: 35, maxWidth: 35 }}
      >
        <CircularProgress className="-ml-[5px] p-2.5 text-white" />
      </IconButton>
    </>
  );
}

function UserButton(props: UserButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const photoURL = props.user?.photoURL;

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
      <IconButton
        aria-label="user-popup-button"
        disableFocusRipple
        onClick={handleClick}
        className="flex h-[35px] w-[35px] items-center justify-center p-0"
        sx={{
          '.MuiTouchRipple-child': {
            backgroundColor: 'transparent !important',
          },
        }}
        style={{ minWidth: 35, width: 35, maxWidth: 35 }}
      >
        {photoURL ? (
          <Image
            height={35}
            width={35}
            className="rounded-[50%]"
            src={`${photoURL}`}
            alt=""
          />
        ) : (
          <Image
            height={25}
            width={25}
            className="rounded-[50%] opacity-70"
            src={UserIcon}
            alt=""
          />
        )}
      </IconButton>
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

function ContainerButton(props: ContainerButtonProps) {
  return (
    <div className="relative flex h-[35px] w-[35px] overflow-hidden">
      {props.children}
    </div>
  );
}
