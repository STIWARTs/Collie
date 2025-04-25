import { motion } from 'framer-motion';
import { DiscoverCarouselContentProps } from 'contents/home/discover/Home.Discover.Carousel';
import { Button } from '@mui/material';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import DiscoverCarouselPieTimer from './DiscoverCarousel.PieTimer';
import Image from 'next/image';

interface IProps {
  IntervalStatus: string;
  AutoPlay?: boolean;
  BannerContentArray: DiscoverCarouselContentProps[];
  CarouselState: number;
  CarouselOrder: string;
  DisabledCarousel: boolean;
  onClick: (idx: number) => void;
}

const Variants = {
  open: {
    width: 850,
  },
  closed: {
    width: 300,
  },
};

function DiscoverCarouselBannerContent(props: IProps) {
  return (
    <>
      {props.CarouselOrder == 'left' && (
        <BannerContent
          CustomIndex={0}
          Id="Discover-Carousel-Banner-Content-Left"
          AutoPlay={props.AutoPlay}
          IntervalStatus={props.IntervalStatus}
          onClick={props.onClick}
          BannerContentArray={props.BannerContentArray}
          DisabledCarousel={props.DisabledCarousel}
          CarouselState={props.CarouselState}
        />
      )}
      <BannerContent
        CustomIndex={props.BannerContentArray.length}
        Id="Discover-Carousel-Banner-Content-Center"
        AutoPlay={props.AutoPlay}
        IntervalStatus={props.IntervalStatus}
        onClick={props.onClick}
        BannerContentArray={props.BannerContentArray}
        DisabledCarousel={props.DisabledCarousel}
        CarouselState={props.CarouselState}
      />
      {props.CarouselOrder == 'right' && (
        <BannerContent
          CustomIndex={0}
          Id="Discover-Carousel-Banner-Content-Right"
          AutoPlay={props.AutoPlay}
          IntervalStatus={props.IntervalStatus}
          onClick={props.onClick}
          BannerContentArray={props.BannerContentArray}
          DisabledCarousel={props.DisabledCarousel}
          CarouselState={props.CarouselState}
        />
      )}
    </>
  );
}

interface BannerContentProps {
  Id: string;
  IntervalStatus: string;
  AutoPlay?: boolean;
  CustomIndex: number;
  CarouselState: number;
  BannerContentArray: DiscoverCarouselContentProps[];
  DisabledCarousel: boolean;
  onClick: (idx: number) => void;
}

const DescriptionAnimationVariant = {
  open: {
    marginLeft: 0,
    scale: 1,
    height: 40,
    opacity: 0.8,
  },
  closed: {
    marginLeft: -40,
    scale: 0.65,
    height: 0,
    opacity: 0,
  },
};

const HeaderAnimationVariant = {
  open: {
    scale: 1,
    marginLeft: 0,
  },
  closed: {
    scale: 0.65,
    marginLeft: -40,
  },
};

function BannerContent(props: BannerContentProps) {
  // Function to handle button click
  const handleButtonClick = (item: DiscoverCarouselContentProps) => {
    // Determine the redirect URL based on the button text
    const redirectUrl =
      item.Button.toLowerCase() === 'order now'
        ? `/redirect.html?type=order&product=${encodeURIComponent(
            item.HeadingLine1 + ' ' + item.HeadingLine2,
          )}&price=${item.DiscountedPrice}`
        : `/redirect.html?type=details&product=${encodeURIComponent(
            item.HeadingLine1 + ' ' + item.HeadingLine2,
          )}`;

    // Navigate to the URL
    window.location.href = redirectUrl;
  };

  return (
    <div id={props.Id} className="flex space-x-3">
      {props.BannerContentArray.map((value, idx) => (
        <motion.div
          key={idx + props.CustomIndex}
          id={`Discover-Carousel-Banner-${idx + props.CustomIndex}`}
          initial={
            props.CarouselState === idx + props.CustomIndex ? 'open' : 'closed'
          }
          animate={
            props.CarouselState === idx + props.CustomIndex ? 'open' : 'closed'
          }
          variants={Variants}
          onClick={() => props.onClick(idx + props.CustomIndex)}
          transition={{ type: 'tween' }}
          className={`bg-${value.Color}-shadow relative inline-block w-[300px] min-w-[300px] overflow-hidden rounded-xl text-white`}
        >
          {/* Image */}
          <div className="flex h-full w-full">
            <Image
              fill
              className=""
              src={value.Image}
              sizes="(max-width: 800px) 800px"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              alt=""
            />
          </div>
          {/* Content */}
          <div
            className={`${
              props.CarouselState === idx + props.CustomIndex
                ? `bg-gradient-to-r from-${value.Color}`
                : `bg-${value.Color}-50`
            } absolute bottom-0 left-0 z-[10] flex h-full w-full items-end overflow-hidden px-10 pb-[150px]`}
          >
            <div className="z-[20] flex w-full flex-col space-y-10">
              {/* Content */}
              <div className="flex w-full flex-col space-y-2">
                {/* Price */}
                <div className="flex w-full justify-start space-x-2">
                  <div
                    className={`bg-${value.ColorDark} flex space-x-2 rounded-md px-3 py-1 text-[11px]`}
                  >
                    <p className="text-[#CFCFCF] line-through">
                      ₹{value.OriginalPrice}
                    </p>
                    <p>₹{value.DiscountedPrice}</p>
                  </div>
                </div>
                {/* Heading */}
                <motion.h1
                  initial={
                    props.CarouselState === idx + props.CustomIndex
                      ? 'open'
                      : 'closed'
                  }
                  animate={
                    props.CarouselState === idx + props.CustomIndex
                      ? 'open'
                      : 'closed'
                  }
                  variants={HeaderAnimationVariant}
                  transition={{ type: 'tween', duration: 0.4 }}
                  className="-ml-[40px] truncate text-[30px] font-[500] tracking-wide"
                >
                  {value.HeadingLine1} <br /> {value.HeadingLine2} <br />{' '}
                  {value.HeadingLine3}
                </motion.h1>
                {/* Description */}
                <motion.p
                  initial={
                    props.CarouselState === idx + props.CustomIndex
                      ? 'open'
                      : 'closed'
                  }
                  animate={
                    props.CarouselState === idx + props.CustomIndex
                      ? 'open'
                      : 'closed'
                  }
                  variants={DescriptionAnimationVariant}
                  transition={{ type: 'tween', duration: 0.4 }}
                  className="w-full truncate text-[13px] font-[400] tracking-wide"
                >
                  {value.DescriptionLine1} <br /> {value.DescriptionLine2}{' '}
                  <br /> {value.DescriptionLine3}
                </motion.p>
              </div>
              {/* Button */}
              <div className="flex w-full justify-start">
                <Button
                  className={`bg-${value.ColorDark} button-text-lower z-[1] flex h-8 items-center rounded-lg px-8 text-white`}
                  sx={{
                    '.MuiTouchRipple-child': {
                      backgroundColor: '#ffffff50 !important',
                    },
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent onClick
                    handleButtonClick(value);
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ChevronRightIcon className="h-4" />
                    <p className="text-[12px] font-[400] tracking-wide">
                      {value.Button === 'See details'
                        ? 'Explore Now'
                        : value.Button}
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          {props.CarouselState === idx + props.CustomIndex &&
            !props.DisabledCarousel &&
            props.AutoPlay &&
            props.IntervalStatus === 'running' && (
              <div className="absolute bottom-0 left-0 z-[30] p-[25px] opacity-30">
                <DiscoverCarouselPieTimer Hide={props.IntervalStatus} />
              </div>
            )}
        </motion.div>
      ))}
    </div>
  );
}

export default DiscoverCarouselBannerContent;
