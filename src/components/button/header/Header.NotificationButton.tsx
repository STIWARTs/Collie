'use client';

import { Badge, BadgeProps, IconButton, styled } from '@mui/material';
import { useState, useMemo } from 'react';
import { HeaderNotificationButtonMenuProps } from './Header.NotificationButton.Menu';
import { HomeNotificationContent } from 'contents/home/Home.Notification';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import TooltipDark from 'components/tooltip/TooltipDark';

const HeaderNotificationButtonMenu = dynamic<HeaderNotificationButtonMenuProps>(
  () => import('./Header.NotificationButton.Menu'),
  { ssr: false },
);

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#0084FF',
    top: 3,
    height: 22,
    width: 22,
    border: '2px solid #181818',
    padding: '0 4px',
    borderRadius: 11,
  },
}));

function HeaderNotificationButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Calculate unread notifications count
  const unreadCount = useMemo(() => {
    return HomeNotificationContent.filter((item) => item.isRead === 'no')
      .length;
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TooltipDark
        arrow
        placement="bottom"
        title={<h6 className="font-[400]">What&apos;s New</h6>}
      >
        <IconButton
          disableFocusRipple
          onClick={handleClick}
          aria-label="desktop-wishlist-button"
          className="button-text-lower flex h-[47px] w-[47px] items-center justify-center rounded-lg bg-transparent text-white transition-all duration-300 hover:bg-[#202020]"
          sx={{
            minWidth: 47,
            '.MuiTouchRipple-child': {
              borderRadius: '4px',
              backgroundColor: '#ffffff50 !important',
            },
          }}
        >
          <StyledBadge badgeContent={unreadCount > 0 ? unreadCount : null}>
            <Image
              width={22}
              height={22}
              src={
                open
                  ? '/icons/notification-thin-fill-white.svg'
                  : '/icons/notification-thin-white.svg'
              }
              alt=""
            />
          </StyledBadge>
        </IconButton>
      </TooltipDark>
      <HeaderNotificationButtonMenu
        ContentArray={HomeNotificationContent}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}

export default HeaderNotificationButton;
