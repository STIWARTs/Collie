/* eslint-disable @typescript-eslint/no-empty-function */
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DiscoverBannerFiveContentProps } from 'contents/home/discover/Home.Discover.Banner';
import { Rectangle_BlurDataURL } from 'components/loading/BlurDataURL';
import { BannerSmallButtonForBannerFour } from 'components/button/banner/Banner.SmallButton.ForBannerFour';
import BannerTitleButton from 'components/button/banner/Banner.TitleButton';
import BannerUnderlineButton from 'components/button/banner/Banner.UnderlineButton';
import useScreenSize from 'functions/ScreenSizeDetection';

const ContainerStyle =
  'text-white group relative p-0 m-0 rounded-xl bg-gradient-to-b overflow-hidden';
const TextContainerStyle = 'px-4 pt-4 pb-[100px] space-y-2';
const HeadingStyle = 'font-[500] tracking-wide text-left w-full';
const DescriptionStyle =
  'text-[14px] whitespace-normal leading-[18px] font-normal text-left w-full opacity-70';
const GetColor = (index: number) => {
  if (index === 0) return 'from-dark-red';
  if (index === 1) return 'from-dark-pink';
  if (index === 2) return 'from-dark-blue';
  if (index === 3) return 'from-dark-yellow';
  if (index === 4) return 'from-dark-purple';
};

export interface DiscoverBannerFiveBrowserProps {
  ContentArray: DiscoverBannerFiveContentProps[];
  Label: string;
}
export function DiscoverBannerFiveBrowser(
  props: DiscoverBannerFiveBrowserProps,
) {
  const {
    LargeScreen,
    MediumLargeScreen,
    MediumScreen,
    SmallMediumScreen,
    SmallScreen,
  } = useScreenSize();
  return (
    <div className="relative m-0 w-full flex-col space-y-2.5 p-0">
      <div className="flex justify-start pl-3">
        <BannerTitleButton Label={props.Label} onClick={() => {}} />
      </div>
      <div className="relative box-border flex w-full space-x-5">
        <Swiper
          slidesPerView={
            LargeScreen || MediumLargeScreen
              ? 5
              : MediumScreen
              ? 4
              : SmallMediumScreen
              ? 3
              : SmallScreen
              ? 1
              : 2
          }
          spaceBetween={MediumLargeScreen ? 24 : 15}
          wrapperTag="ul"
          className="flex w-full"
          style={{
            paddingRight: 12,
            paddingLeft: 12,
          }}
        >
          {props.ContentArray.map((value, index) => (
            <SwiperSlide
              key={index}
              tag="li"
              className={`${GetColor(index)} ${ContainerStyle}`}
            >
              <div className="m-0 p-0">
                <div className={TextContainerStyle}>
                  <div className={HeadingStyle}>{value.Heading}</div>
                  <h6 className={DescriptionStyle}>{value.Description}</h6>
                </div>
              </div>
              <BannerUnderlineButton label="Learn more" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export interface DiscoverBannerFiveMobileProps {
  ContentArray: DiscoverBannerFiveContentProps[];
}
export function DiscoverBannerFiveMobile(props: DiscoverBannerFiveMobileProps) {
  return (
    <div className="relative m-0 flex w-full flex-col space-y-5 p-0">
      <h6 className="mx-5 text-[18px]">Our services</h6>
      <div className="relative box-border flex w-full space-x-5">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={15}
          wrapperTag="ul"
          className="flex w-full"
          style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          {props.ContentArray.map((value, index) => (
            <SwiperSlide
              key={index}
              tag="li"
              className={`rounded-xl ${ContainerStyle}`}
            >
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
              <BannerSmallButtonForBannerFour label="Learn More" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
