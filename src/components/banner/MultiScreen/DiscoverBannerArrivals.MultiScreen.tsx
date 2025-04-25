import { DiscoverBannerLightingDealContentProps } from 'contents/home/discover/Home.Discover.Banner';
import { motion } from 'framer-motion';
import { Poster_BlurDataURL } from 'components/loading/BlurDataURL';
import Image from 'next/image';
import useScreenSize from 'functions/ScreenSizeDetection';

const HeadingStyle =
  'text-[14px] font-normal text-left overflow-hidden whitespace-nowrap text-ellipsis';
const DescriptionStyle =
  'text-[13px] whitespace-normal leading-[18px] font-sans font-normal text-left opacity-70 whitespace-nowrap overflow-hidden text-ellipsis';
const AvailableStyle =
  'flex w-full p-1.5 font-semibold uppercase tracking-wide text-center text-[11px] text-white flex-col rounded-b-xl';
const ContainerStyle =
  'p-0 m-0 flex flex-col relative box-border overflow-hidden rounded-xl hover:outline hover:outline-[#ffffff30] hover:outline-2 hover:outline-offset-[13px]';

interface IProps {
  ContentArray: DiscoverBannerLightingDealContentProps[];
}

export function DiscoverBannerArrivalsBrowser(props: IProps) {
  const { LargeScreen, MediumLargeScreen, MediumScreen, SmallMediumScreen } =
    useScreenSize();
  return (
    <motion.ul className="flex space-x-7">
      {props.ContentArray.slice(
        0,
        LargeScreen
          ? 5
          : MediumLargeScreen
          ? 4
          : MediumScreen
          ? 3
          : SmallMediumScreen
          ? 2
          : 0,
      ).map((value, index) => (
        <motion.li
          whileTap={{ scale: 0.9 }}
          key={index}
          className={ContainerStyle}
        >
          <Image
            className="rounded-xl"
            height={320}
            width={240}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src={value.Image}
            placeholder="blur"
            blurDataURL={Poster_BlurDataURL}
            alt=""
          />
          <div className="mt-3 space-y-1 overflow-hidden text-white">
            <h6 className={HeadingStyle}>{value.Heading}</h6>
            <h6 className={DescriptionStyle}>{value.Description}</h6>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function DiscoverBannerArrivalsMobile(props: IProps) {
  return (
    <div className="relative flex w-full flex-col space-y-7">
      <motion.ul className="flex w-full space-x-5">
        {props.ContentArray.slice(0, 2).map((value, index) => (
          <motion.li
            whileTap={{ scale: 0.9 }}
            key={index}
            className={ContainerStyle}
          >
            <Image
              className="absolute h-full w-full rounded-t-md"
              height={320}
              width={240}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src={value.Image}
              placeholder="blur"
              blurDataURL={Poster_BlurDataURL}
              alt=""
            />
            {value.Available ? (
              <h6 className={`${'bg-primary-blue-rgb'} ${AvailableStyle}`}>
                Order Now
              </h6>
            ) : (
              <h6 className={`${'bg-[#0f0f0f]'} ${AvailableStyle}`}>
                Sold Out
              </h6>
            )}
            <div className="mt-6 space-y-1 overflow-hidden text-white">
              <h6 className={HeadingStyle}>{value.Heading}</h6>
              <h6 className={DescriptionStyle}>{value.Description}</h6>
            </div>
          </motion.li>
        ))}
      </motion.ul>
      <motion.ul className="flex w-full space-x-5">
        {props.ContentArray.slice(2, 4).map((value, index) => (
          <motion.li
            whileTap={{ scale: 0.9 }}
            key={index}
            className={ContainerStyle}
          >
            <Image
              className="absolute h-full w-full rounded-t-md"
              height={320}
              width={240}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src={value.Image}
              placeholder="blur"
              blurDataURL={Poster_BlurDataURL}
              alt=""
            />
            {value.Available ? (
              <h6 className={`${'bg-primary-blue-rgb'} ${AvailableStyle}`}>
                Order Now
              </h6>
            ) : (
              <h6 className={`${'bg-[#0f0f0f]'} ${AvailableStyle}`}>
                Sold Out
              </h6>
            )}
            <div className="mt-6 space-y-1 overflow-hidden text-white">
              <h6 className={HeadingStyle}>{value.Heading}</h6>
              <h6 className={DescriptionStyle}>{value.Description}</h6>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
