'use client';

import {
  DiscoverSliderContent,
  SummerSaleContent,
} from 'contents/home/discover/Home.Discover.Slider';
import { DiscoverCarouselContent } from 'contents/home/discover/Home.Discover.Carousel';
import { DiscoverBannerFourContent } from 'contents/home/discover/Home.Discover.Banner';
import { DiscoverTilesContent } from 'contents/home/discover/Home.Discover.Tiles';
import {
  DiscoverBannerFiveContent,
  DiscoverBannerDealContent,
  DiscoverBannerTop5Content,
} from 'contents/home/discover/Home.Discover.Banner';
import DiscoverSlider from 'components/slider/DiscoverSlider';
import DiscoverBannerTop5 from 'components/banner/DiscoverBannerTop5';
import DiscoverTiles from 'components/tiles/DiscoverTiles';
import DiscoverBannerFour from 'components/banner/DiscoverBannerFour';
import DiscoverBannerFive from 'components/banner/DiscoverBannerFive';
import DiscoverCatalog from 'components/catalog/DiscoverCatalog';
import DiscoverCarousel from 'components/carousel/DiscoverCarousel';
import DiscoverBannerDeal from 'components/banner/DiscoverBannerDeal';
import LightningBadge from 'components/badge/LightningBadge';
import NewBadge from 'components/badge/NewBadge';

function DiscoverInterface() {
  return (
    <div className="relative z-10 w-full rounded-xl">
      <DiscoverCarousel ContentArray={DiscoverCarouselContent} />
      <DiscoverBannerTop5 ContentArray={DiscoverBannerTop5Content} />
      <DiscoverTiles Label="Our Category" ContentArray={DiscoverTilesContent} />
      <DiscoverSlider
        Label="Recommended for you"
        ContentArray={DiscoverSliderContent}
      />
      <DiscoverBannerFour ContentArray={DiscoverBannerFourContent} />
      <DiscoverBannerDeal
        Label="Top 5 Trends of the Week"
        Description="Discover the hottest fashion items making waves on social media"
        Badge={<LightningBadge />}
        ContentArray={DiscoverBannerDealContent}
      />
      <DiscoverSlider
        Label="Best summer sale"
        ContentArray={SummerSaleContent}
      />
      <DiscoverBannerFive
        Label="Our services"
        ContentArray={DiscoverBannerFiveContent}
      />
      <DiscoverCatalog />
    </div>
  );
}

export default DiscoverInterface;
