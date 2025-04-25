import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DiscoverBannerFourContentProps } from 'contents/home/discover/Home.Discover.Banner';
import { Rectangle_BlurDataURL } from 'components/loading/BlurDataURL';
import { BannerSmallButtonForBannerFour } from 'components/button/banner/Banner.SmallButton.ForBannerFour';
import useScreenSize from 'functions/ScreenSizeDetection';

const ContainerStyle =
  'text-white bg-white/5 relative button-text-lower p-0 m-0 rounded-xl overflow-hidden';
const TextContainerStyle = 'px-4 pt-4 pb-[80px] space-y-2';
const HeadingStyle = 'font-[500] tracking-wide text-left w-full';
const DescriptionStyle =
  'text-[13px] whitespace-normal leading-[18px] font-normal text-left w-full opacity-[0.75]';

export interface DiscoverBannerFourBrowserProps {
  ContentArray: DiscoverBannerFourContentProps[];
}
export function DiscoverBannerFourBrowser(
  props: DiscoverBannerFourBrowserProps,
) {
  const { LargeScreen, MediumLargeScreen, MediumScreen, SmallScreen } =
    useScreenSize();
  return (
    <div className="relative box-border w-full">
      <Swiper
        slidesPerView={
          LargeScreen || MediumLargeScreen
            ? 4
            : MediumScreen
              ? 3
              : SmallScreen
                ? 1
                : 2
        }
        spaceBetween={MediumLargeScreen ? 24 : 15}
        wrapperTag="ul"
        className="flex h-full w-full"
        style={{
          paddingRight: 12,
          paddingLeft: 12,
        }}
      >
        {props.ContentArray.map((value, index) => (
          <SwiperSlide key={index} tag="li" className={ContainerStyle}>
            <div className="m-0 p-0">
              <div className="relative h-full w-full">
                <div className="absolute z-[1] h-full w-full bg-gradient-to-t from-[#242424]" />
                <Image
                  className="max-h-[275px] rounded-t-xl"
                  width={490}
                  height={275}
                  src={value.Image}
                  placeholder="blur"
                  blurDataURL={Rectangle_BlurDataURL}
                  alt=""
                />
              </div>
              <div className={TextContainerStyle}>
                <div className={HeadingStyle}>{value.Heading}</div>
                <h6 className={DescriptionStyle}>{value.Description}</h6>
              </div>
            </div>
            <BannerSmallButtonForBannerFour label="Explore Now" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export interface DiscoverBannerFourMobileProps {
  ContentArray: DiscoverBannerFourContentProps[];
}
export function DiscoverBannerFourMobile(props: DiscoverBannerFourMobileProps) {
  return (
    <div className="relative box-border flex w-full space-x-5">
      <Swiper
        slidesPerView={1.2}
        spaceBetween={15}
        centeredSlides={true}
        wrapperTag="ul"
        className="flex w-full"
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        {props.ContentArray.map((value, index) => (
          <SwiperSlide key={index} tag="li" className={ContainerStyle}>
            <div className="m-0 p-0">
              <div className="relative h-full w-full">
                <div className="absolute z-[1] h-full w-full bg-transparent" />
                <Image
                  className="rounded-xl"
                  width={490}
                  height={275}
                  src={value.Image}
                  placeholder="blur"
                  blurDataURL={Rectangle_BlurDataURL}
                  alt=""
                />
              </div>
              <div className={TextContainerStyle}>
                <h6 className={`text-[16px] ${HeadingStyle}`}>
                  {value.Heading}
                </h6>
                <h6 className={DescriptionStyle}>{value.Description}</h6>
              </div>
            </div>
            <BannerSmallButtonForBannerFour label="Explore Now" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
