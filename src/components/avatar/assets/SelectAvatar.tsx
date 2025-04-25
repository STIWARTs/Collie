import { useState } from 'react';
import { IconButton, useTheme } from '@mui/material';
import TooltipDark from 'components/tooltip/TooltipDark';
import {
  SparklesIcon,
  DeviceTabletIcon,
  EllipsisVerticalIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import FromAvatars from './SelectAvatar/Options/FromAvatars';
import FromComputer from './SelectAvatar/Options/FromComputer';
import SelectAvatarTabItem from 'components/tab/SelectAvatar/SelectAvatarTabItem';
import SelectAvatarTabs from 'components/tab/SelectAvatar/SelectAvatarTabs';
import SelectAvatarTabPanel from 'components/tab/SelectAvatar/SelectAvatarTabPanel';
import SwipeableViews from '../../../../packages/react-swipeable-views/src/index';

interface IProps {
  backward: () => void;
  moreInfo: (event: React.MouseEvent<HTMLElement>) => void;
  forward: () => void;
  getURL: (value: string) => void;
  ShowCollection: () => void;
  CollectionHeading: (value: string) => void;
  AvatarName: (value: string) => void;
  backBool: (value: boolean) => void;
}

function SelectAvatar(props: IProps) {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, index: number) => {
    setValue(index);
  };

  return (
    <div className=" Select-And-Crop-Avatar-Container flex h-full w-full flex-col items-center overflow-auto scroll-smooth bg-secondary-theme">
      {/* Header */}
      <div className="z-10 flex w-full items-center justify-between p-1">
        <TooltipDark placement="bottom" title="Back" arrow>
          <IconButton
            disableFocusRipple
            onClick={props.backward}
            className="p-3 hover:bg-white/5"
          >
            <ArrowLeftIcon className="h-5 text-white" />
          </IconButton>
        </TooltipDark>
        <div className="flex w-full items-center justify-start space-x-1.5 px-1 sm:justify-center">
          <h6 className="text-lg font-normal tracking-wide text-white">
            Change profile picture
          </h6>
        </div>
        <TooltipDark placement="bottom" title="Menu" arrow>
          <IconButton
            disableFocusRipple
            onClick={props.moreInfo}
            className="p-3 hover:bg-white/5"
          >
            <EllipsisVerticalIcon className="h-5 text-white" />
          </IconButton>
        </TooltipDark>
      </div>
      {/* Tab & sub heading */}
      <div className="flex w-full flex-col items-center justify-center space-y-3">
        {/* Sub Heading */}
        <h6 className="w-full px-6 text-left text-sm text-white/75 sm:text-center">
          You can choose your profile picture from our one of the best avatar
          collections.
        </h6>
        {/* Tab */}
        <SelectAvatarTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <SelectAvatarTabItem
            icon={<SparklesIcon className="h-5" />}
            label="From Avatars"
          />
          <SelectAvatarTabItem
            icon={<DeviceTabletIcon className="h-5" />}
            label="From Device"
          />
        </SelectAvatarTabs>
        {/* Tab Content */}
      </div>
      {/* Divider */}
      <div className="z-[1] h-[1px] w-full bg-white/20" />
      {/* Main */}
      <SwipeableViews
        index={value}
        disabled={true}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        className="h-full w-full"
        id="SelectAvatarSwipeableViews"
        containerStyle={{
          height: '100%',
          width: '100%',
          transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
        }}
      >
        <SelectAvatarTabPanel value={value} index={0} dir={theme.direction}>
          <FromAvatars
            show={props.forward}
            getURL={props.getURL}
            backBool={props.backBool}
            ShowCollection={props.ShowCollection}
            heading={props.CollectionHeading}
            avatarName={props.AvatarName}
          />
        </SelectAvatarTabPanel>
        <SelectAvatarTabPanel value={value} index={1} dir={theme.direction}>
          <FromComputer
            backBool={props.backBool}
            show={props.forward}
            getURL={props.getURL}
          />
        </SelectAvatarTabPanel>
      </SwipeableViews>
    </div>
  );
}

export default SelectAvatar;
