import { useState } from 'react';
import { DiscoverCarouselContentProps } from '../../contents/home/discover/Home.Discover.Carousel';
import DiscoverCarouselBanner from './DiscoverCarousel/DiscoverCarousel.Banner';
import DiscoverCarouselBulletPoints from './DiscoverCarousel/DiscoverCarousel.BulletPoints';

interface IProps {
  ContentArray: DiscoverCarouselContentProps[];
}

function DiscoverCarousel(props: IProps) {
  const [CarouselState, setCarouselState] = useState(10); // Default
  return (
    <div className="relative w-full overflow-hidden pt-8">
      <DiscoverCarouselBanner
        AutoPlay={true}
        Duration={11} // Default
        CarouselState={CarouselState}
        setCarouselState={setCarouselState}
        BannerArray={props.ContentArray}
      />
      <DiscoverCarouselBulletPoints
        CarouselState={CarouselState}
        BulletArray={props.ContentArray}
      />
    </div>
  );
}

export default DiscoverCarousel;
