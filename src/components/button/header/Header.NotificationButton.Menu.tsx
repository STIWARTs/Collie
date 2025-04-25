'use client';

/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, Menu, MenuItem } from '@mui/material';
import {
  HomeNotificationContent,
  HomeNotificationContentProps,
} from 'contents/home/Home.Notification';
import Image from 'next/image';
import HotBadge from 'components/badge/HotBadge';
import TrendingBadge from 'components/badge/TrendingBadge';
import NewBadge from 'components/badge/NewBadge';
import MoreMenuButton from 'components/button/MoreMenuButton/MoreMenuButton';
import { useState, useEffect } from 'react';

export interface HeaderNotificationButtonMenuProps {
  ContentArray: HomeNotificationContentProps[];
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

function HeaderNotificationButtonMenu(
  props: HeaderNotificationButtonMenuProps,
) {
  const [notifications, setNotifications] = useState<
    HomeNotificationContentProps[]
  >(props.ContentArray);

  // Update notifications when ContentArray changes
  useEffect(() => {
    setNotifications(props.ContentArray);
  }, [props.ContentArray]);

  // Mark a single notification as read
  const markAsRead = (index: number) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index] = {
      ...updatedNotifications[index],
      isRead: 'yes',
    };
    setNotifications(updatedNotifications);
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: 'yes',
    }));
    setNotifications(updatedNotifications);
  };

  // Remove a single notification
  const removeNotification = (index: number) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  // Helper function for context menu
  const getContextMenu = (index: number) => [
    {
      label:
        notifications[index].isRead === 'no'
          ? 'Mark as Read'
          : 'Mark as Unread',
      icon: '/icons/notification-mark-as-read.svg',
      onClick: () => {
        const updatedNotifications = [...notifications];
        updatedNotifications[index] = {
          ...updatedNotifications[index],
          isRead: updatedNotifications[index].isRead === 'no' ? 'yes' : 'no',
        };
        setNotifications(updatedNotifications);
      },
    },
    {
      label: 'Remove',
      icon: '/icons/x-white-2.svg',
      onClick: () => removeNotification(index),
    },
  ];

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
          width: '100%',
          maxWidth: 400,
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
        key={0}
        disableRipple
        disableTouchRipple
        className="flex w-full cursor-default flex-col rounded-md bg-transparent p-0 text-white hover:bg-transparent"
      >
        <div className="flex w-full flex-col px-6 py-3">
          <h1 className="w-full truncate text-left text-[18px] font-[600] tracking-wide">
            What&apos;s New
          </h1>
          <p className="w-full text-left text-[13px] tracking-wide opacity-90">
            The latest updates from our store
          </p>
        </div>
        <div className="flex w-full items-center justify-between pb-1 pl-6 pr-[18px]">
          <div className="flex items-center">
            <p className="cursor-default truncate text-[13px] font-[400] tracking-wide text-white">
              {notifications.length} items
            </p>
            <MoreMenuButton
              ClassName="ml-2"
              Orientation="horizontal"
              MenuContent={[
                {
                  label: 'Mark all as Read',
                  icon: '/icons/notification-mark-as-read.svg',
                  onClick: markAllAsRead,
                },
                {
                  label: 'Remove all',
                  icon: '/icons/x-white-2.svg',
                  onClick: () => setNotifications([]),
                },
              ]}
            />
          </div>
          <Button
            className="button-text-lower m-0 block cursor-default truncate rounded-md bg-transparent px-2 text-[12px] font-[400] tracking-wide text-white opacity-90 hover:bg-[#ffffff20] hover:opacity-100"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff75 !important',
              },
            }}
            onClick={markAllAsRead}
          >
            Mark all as Read
          </Button>
        </div>
      </MenuItem>
      {notifications.map((value, idx) => (
        <MenuItem
          key={idx + 1}
          className={`${
            notifications.length === idx + 1 ? 'mb-1' : ''
          } mx-1 cursor-default rounded-md px-2 text-white hover:bg-[#ffffff15]`}
          onClick={() => markAsRead(idx)}
        >
          <div className="flex h-full w-full">
            <div className="flex w-full items-center py-2">
              {value.isRead === 'no' && (
                <div className="absolute left-0 pl-3">
                  <div className="h-[6px] min-h-[6px] w-[6px] min-w-[6px] rounded-full bg-[#369eff]" />
                </div>
              )}
              <div className="flex w-full pl-6">
                <div className="relative h-[50px] min-h-[50px] w-[50px] min-w-[50px] overflow-hidden">
                  <Image fill src={value.Image} className="rounded-md" alt="" />
                </div>
                <div className="h-full w-full items-center overflow-hidden pl-3">
                  <h2 className="w-full truncate text-left text-[14px] font-[500]">
                    {value.Heading}
                  </h2>
                  <p className="truncate text-[13px] opacity-75">
                    {value.Description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="pt-1">
                {value.Badge === 'hot' && <HotBadge />}
                {value.Badge === 'trending' && <TrendingBadge />}
                {value.Badge === 'new' && <NewBadge />}
              </div>
              <div className="pt-1">
                <MoreMenuButton
                  Orientation="vertical"
                  MenuContent={getContextMenu(idx)}
                />
              </div>
            </div>
          </div>
        </MenuItem>
      ))}
      {notifications.length === 0 && (
        <MenuItem className="mx-1 cursor-default rounded-md px-2 py-6 text-center text-white">
          <div className="flex w-full flex-col items-center justify-center">
            <Image
              width={60}
              height={60}
              src="/icons/notification-empty.svg"
              alt="No notifications"
              className="mb-2 opacity-50"
            />
            <p className="text-sm text-white/70">No notifications to display</p>
          </div>
        </MenuItem>
      )}
    </Menu>
  );
}

export default HeaderNotificationButtonMenu;
