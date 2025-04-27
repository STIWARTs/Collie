import { useRef, useState, useEffect } from 'react';
import { DiscoverSliderContentProps } from '../../contents/home/discover/Home.Discover.Slider';
import {
  DiscoverSliderBrowser,
  DiscoverSliderMobile,
} from './DiscoverSlider/DiscoverSlider.MultiScreen';
import DiscoverSliderTitle from './DiscoverSlider/DiscoverSliderTitle';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';

interface IProps {
  ContentArray: DiscoverSliderContentProps[];
  Label: string;
}

// Add type definition to window object
declare global {
  interface Window {
    slideDiscoverLeft?: () => void;
    slideDiscoverRight?: () => void;
  }
}

function DiscoverSlider(props: IProps) {
  const [LeftDisabled, setLeftDisabled] = useState(false);
  const [RightDisabled, setRightDisabled] = useState(false);
  const [Wishlist, setWishlist] = useState(-1);
  const sliderRef = useRef<HTMLElement>(null);
  const { isMobile } = useScreenDimensions();

  // Handle navigation for mobile slider
  const handleMobileNavigationLeft = () => {
    if (window.slideDiscoverLeft) {
      window.slideDiscoverLeft();
      console.log('Mobile left navigation called');
    } else {
      console.warn('Mobile left navigation function not registered');
    }
  };

  const handleMobileNavigationRight = () => {
    if (window.slideDiscoverRight) {
      window.slideDiscoverRight();
      console.log('Mobile right navigation called');
    } else {
      console.warn('Mobile right navigation function not registered');
    }
  };

  const slideLeft = () => {
    if (isMobile) {
      handleMobileNavigationLeft();
    } else {
      // Desktop slider navigation
      const slider = sliderRef.current;
      if (slider) {
        slider.scrollLeft = slider.scrollLeft - slider.offsetWidth;
      }
    }
  };

  const slideRight = () => {
    if (isMobile) {
      handleMobileNavigationRight();
    } else {
      // Desktop slider navigation
      const slider = sliderRef.current;
      if (slider) {
        slider.scrollLeft = slider.scrollLeft + slider.offsetWidth;
      }
    }
  };

  // For mobile, we always keep navigation enabled
  useEffect(() => {
    if (isMobile) {
      setLeftDisabled(false);
      setRightDisabled(false);
    }
  }, [isMobile]);

  return (
    <div className="mt-5 flex flex-col space-y-2.5 overflow-x-hidden overflow-y-visible">
      <DiscoverSliderTitle
        label={props.Label}
        sliderRef={sliderRef}
        LeftDisabled={isMobile ? false : LeftDisabled}
        RightDisabled={isMobile ? false : RightDisabled}
        onClickLeft={slideLeft}
        onClickRight={slideRight}
      />

      {!isMobile ? (
        <DiscoverSliderBrowser
          ContentArray={props.ContentArray}
          sliderRef={sliderRef}
          Wishlist={Wishlist}
          setWishlist={setWishlist}
          setLeftDisabled={setLeftDisabled}
          setRightDisabled={setRightDisabled}
        />
      ) : (
        <DiscoverSliderMobile
          ContentArray={props.ContentArray}
          Wishlist={Wishlist}
          setWishlist={setWishlist}
        />
      )}
    </div>
  );
}

export default DiscoverSlider;
