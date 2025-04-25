import React, {
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useState,
} from 'react';
import { GalleryCarouselContentProps } from '../../../contents/gallery/Gallery.Carousel';
import GalleryCarouselSlider from './GalleryCarousel.Slider';
import GalleryCarouselThumbnailSlider from './GalleryCarousel.ThumbnailSlider';
import GalleryCarouselBanner from './GalleryCarousel.Banner';

export interface GalleryCarouselMobileProps {
  ContentArray: GalleryCarouselContentProps[];
}

export interface GalleryCarouselDesktopProps {
  ElementRef: RefObject<HTMLDivElement>;
  ContentArray: GalleryCarouselContentProps[];
  BannerTextTransition: string;
  AutoPlay?: boolean;
  Duration?: number;
  ConstraintRef: RefObject<HTMLDivElement>;
  CarouselState: number;
  setCarouselState: Dispatch<SetStateAction<number>>;
  setBannerTextTransition: Dispatch<SetStateAction<string>>;
  ThumbnailArray: GalleryCarouselContentProps[];
}

export const GalleryCarouselMobile: FC<GalleryCarouselMobileProps> = (
  props,
) => {
  // Initialize state for mobile carousel
  const [carouselState, setCarouselState] = useState(0);
  const [bannerTextTransition, setBannerTextTransition] = useState('open');

  // Log content array to verify data
  console.log('Mobile Gallery Carousel Content:', props.ContentArray);

  return (
    <div className="relative m-0 box-border flex w-full flex-col overflow-x-hidden overflow-y-visible p-0">
      <GalleryCarouselSlider
        ContentArray={props.ContentArray}
        CarouselState={carouselState}
        setCarouselState={setCarouselState}
        BannerTextTransition={bannerTextTransition}
        setBannerTextTransition={setBannerTextTransition}
      />
    </div>
  );
};

export const GalleryCarouselDesktop: FC<GalleryCarouselDesktopProps> = (
  props,
) => {
  return (
    <div className="relative">
      <div className="relative m-0 box-border block w-full overflow-x-hidden overflow-y-visible bg-transparent p-0">
        <GalleryCarouselBanner
          ContentArray={props.ContentArray}
          ElementRef={props.ElementRef}
          CarouselState={props.CarouselState}
          BannerTextTransition={props.BannerTextTransition}
          setBannerTextTransition={props.setBannerTextTransition}
        />
        <div className="absolute -mt-[130px] block h-[130px] w-full bg-gradient-to-t from-[#181818]" />
        <GalleryCarouselThumbnailSlider
          AutoPlay={props.AutoPlay}
          Duration={props.Duration}
          ConstraintRef={props.ConstraintRef}
          ThumbnailArray={props.ContentArray}
          CarouselState={props.CarouselState}
          setCarouselState={props.setCarouselState}
          setBannerTextTransition={props.setBannerTextTransition}
        />
      </div>
    </div>
  );
};
