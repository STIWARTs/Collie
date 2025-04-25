import { useRef, useState } from 'react';
import { DiscoverSliderContentProps } from '../../contents/home/discover/Home.Discover.Slider';
import { DiscoverSliderBrowser } from './DiscoverSlider/DiscoverSlider.MultiScreen';
import DiscoverSliderTitle from './DiscoverSlider/DiscoverSliderTitle';

interface IProps {
  ContentArray: DiscoverSliderContentProps[];
  Label: string;
}

function DiscoverSlider(props: IProps) {
  const [LeftDisabled, setLeftDisabled] = useState(false);
  const [RightDisabled, setRightDisabled] = useState(false);
  const [Wishlist, setWishlist] = useState(-1);
  const sliderRef = useRef<HTMLElement>(null);
  return (
    <div className="mt-5 flex flex-col space-y-2.5 overflow-x-hidden overflow-y-visible">
      <DiscoverSliderTitle
        label={props.Label}
        sliderRef={sliderRef}
        LeftDisabled={LeftDisabled}
        RightDisabled={RightDisabled}
      />
      <DiscoverSliderBrowser
        ContentArray={props.ContentArray}
        sliderRef={sliderRef}
        Wishlist={Wishlist}
        setWishlist={setWishlist}
        setLeftDisabled={setLeftDisabled}
        setRightDisabled={setRightDisabled}
      />
      {/* <DiscoverSliderMobile
          ContentArray={props.ContentArray}
          Wishlist={Wishlist}
          setWishlist={setWishlist}
        /> */}
    </div>
  );
}

export default DiscoverSlider;
