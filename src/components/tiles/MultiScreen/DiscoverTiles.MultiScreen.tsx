/* eslint-disable @typescript-eslint/no-empty-function */
import { DiscoverTilesContentProps } from 'contents/home/discover/Home.Discover.Tiles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rectangle_BlurDataURL } from 'components/loading/BlurDataURL';
import BannerSmallButton from 'components/button/banner/Banner.SmallButton';
import useScreenSize from 'functions/ScreenSizeDetection';
import UnderlineButtonDark from 'components/button/UnderlineButtonDark';
import BannerTitleButton from 'components/button/banner/Banner.TitleButton';
import Image from 'next/image';

const SwiperSlideStyle =
  'h-full w-full flex relative m-0 p-0 text-white overflow-hidden rounded-xl bg-gradient-to-r';
const TopHeadingContainerStyle =
  'flex flex-col relative px-3.5 py-3 h-full w-full justify-between';
const BottomHeadingContainerStyle =
  'flex absolute left-0 right-0 bottom-0 pl-1.5 pr-3 py-1.5 w-full items-center justify-between';
const GetColor = (index: number) => {
  if (index === 0) return 'from-dark-red' as string;
  if (index === 1) return 'from-dark-pink' as string;
  if (index === 2) return 'from-dark-blue' as string;
  if (index === 3) return 'from-dark-yellow' as string;
  else return '';
};
const GetColorDark = (index: number) => {
  if (index === 0) return 'bg-super-dark-red' as string;
  if (index === 1) return 'bg-super-dark-pink' as string;
  if (index === 2) return 'bg-super-dark-blue' as string;
  if (index === 3) return 'bg-super-dark-yellow' as string;
  else return '';
};

export interface DiscoverTilesBrowserProps {
  ContentArray: DiscoverTilesContentProps[];
  Label: string;
}
export function DiscoverTilesBrowser(props: DiscoverTilesBrowserProps) {
  const {
    LargeScreen,
    MediumLargeScreen,
    MediumScreen,
    SmallMediumScreen,
    SmallScreen,
  } = useScreenSize();

  return (
    <div className="flex w-full flex-col space-y-2.5">
      <div className="flex justify-start">
        <BannerTitleButton Label={props.Label} onClick={() => {}} />
      </div>
      <Swiper
        slidesPerView={
          LargeScreen || MediumLargeScreen || MediumScreen
            ? 4
            : SmallMediumScreen
            ? 3
            : SmallScreen
            ? 1
            : 2
        }
        spaceBetween={20}
        wrapperTag="ul"
        className="h-[140px] w-full"
        style={{
          paddingRight: 12,
        }}
      >
        {props.ContentArray.map((value, index) => (
          <SwiperSlide
            tag="li"
            key={index}
            className={`${SwiperSlideStyle} ${GetColor(index)}`}
          >
            <div className={`space-y-5 ${TopHeadingContainerStyle}`}>
              <div className="flex flex-col space-y-1">
                <div className="font-[500] tracking-wide">{value.Heading}</div>
                <h6 className="text-[13px] font-normal opacity-[0.75]">
                  {value.Description}
                </h6>
              </div>
              <div className={BottomHeadingContainerStyle}>
                <div
                  className={`${GetColorDark(
                    index,
                  )} flex space-x-1 rounded-md bg-super-dark-red px-3 py-2 text-xs`}
                >
                  <h6 className="block whitespace-nowrap">Starts from</h6>
                  <h6 className="whitespace-nowrap">{`₹${value.Price}`}</h6>
                </div>
                {/* <UnderlineButtonDark label="View More" /> */}
                <BannerSmallButton label="View More" onClick={() => {}} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export interface DiscoverTilesMobileProps {
  ContentArray: DiscoverTilesContentProps[];
}
export function DiscoverTilesMobile(props: DiscoverTilesMobileProps) {
  return (
    <div className="flex w-full flex-col space-y-5 sm:hidden">
      <h6 className="mx-5 text-[18px]">What&apos;s new</h6>
      <Swiper
        slidesPerView={1.1}
        spaceBetween={15}
        wrapperTag="ul"
        className="h-[125px] w-full"
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {props.ContentArray.map((value, index) => (
          <SwiperSlide tag="li" key={index} className={SwiperSlideStyle}>
            <Image
              height={100}
              width={150}
              src={value.Image}
              alt=""
              placeholder="blur"
              blurDataURL={Rectangle_BlurDataURL}
            />
            <div className={TopHeadingContainerStyle}>
              <div className="flex flex-col">
                <h6>{value.Heading}</h6>
                <h6 className="text-xs opacity-70">
                  Plain t-shirt from different category
                </h6>
              </div>
              <div className={BottomHeadingContainerStyle}>
                <div className="flex space-x-1 text-xs">
                  <h6 className="hidden whitespace-nowrap xs-400:block">
                    Starts at
                  </h6>
                  <h6 className="whitespace-nowrap">{`₹${value.Price}`}</h6>
                </div>
                <UnderlineButtonDark label="View More" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
