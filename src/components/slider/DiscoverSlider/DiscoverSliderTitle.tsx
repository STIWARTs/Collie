/* eslint-disable @typescript-eslint/no-empty-function */
import { IconButton } from '@mui/material';
import BannerTitleButton from 'components/button/banner/Banner.TitleButton';
import Image from 'next/image';

export interface DiscoverSliderTitleProps {
  label: string;
  sliderRef: React.RefObject<HTMLElement>;
  LeftDisabled: boolean;
  RightDisabled: boolean;
  onClickLeft?: () => void;
  onClickRight?: () => void;
}

function DiscoverSliderTitle(props: DiscoverSliderTitleProps) {
  const handleLeftClick = () => {
    console.log('Left button clicked');
    if (props.onClickLeft) {
      props.onClickLeft();
    } else {
      const slider = props.sliderRef.current;
      if (slider) {
        slider.scrollLeft = slider.scrollLeft - slider.offsetWidth;
      }
    }
  };

  const handleRightClick = () => {
    console.log('Right button clicked');
    if (props.onClickRight) {
      props.onClickRight();
    } else {
      const slider = props.sliderRef.current;
      if (slider) {
        slider.scrollLeft = slider.scrollLeft + slider.offsetWidth;
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-between space-y-2.5 px-3 text-white">
      <div className="flex justify-start">
        <BannerTitleButton Label={props.label} onClick={() => {}} />
      </div>
      <div className="flex space-x-2">
        <NavigationButton
          Direction="left"
          onClick={handleLeftClick}
          Disabled={props.LeftDisabled}
        />
        <NavigationButton
          Direction="right"
          onClick={handleRightClick}
          Disabled={props.RightDisabled}
        />
      </div>
    </div>
  );
}

interface NavigationButtonProps {
  onClick: () => void;
  Disabled: boolean;
  Direction: string;
}

const ArrowIconClasses =
  'relative h-[10px] w-[10px] group-hover:h-[12px] group-hover:w-[12px] flex items-center justify-center opacity-75 group-hover:opacity-90';

function NavigationButton(props: NavigationButtonProps) {
  const handleClick = () => {
    if (!props.Disabled) {
      console.log(`${props.Direction} navigation button clicked`);
      props.onClick();
    } else {
      console.log(`${props.Direction} navigation button is disabled`);
    }
  };

  return (
    <IconButton
      onClick={handleClick}
      disabled={props.Disabled}
      disableFocusRipple
      className="button-text-lower group flex h-[35px] w-[35px] cursor-default bg-white/5 opacity-100 transition-all duration-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:bg-white/10 disabled:opacity-40"
      sx={{
        '.MuiTouchRipple-child': {
          backgroundColor: '#ffffff80 !important',
        },
      }}
    >
      {props.Direction === 'left' && (
        <div className={ArrowIconClasses}>
          <Image src="/icons/left-arrow-fill-white.svg" fill alt="" />
        </div>
      )}
      {props.Direction === 'right' && (
        <div className={ArrowIconClasses}>
          <Image src="/icons/right-arrow-fill-white.svg" fill alt="" />
        </div>
      )}
    </IconButton>
  );
}

export default DiscoverSliderTitle;
