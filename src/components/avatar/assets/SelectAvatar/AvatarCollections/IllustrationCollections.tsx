import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { FilmIcon } from '@heroicons/react/24/solid';
import { Button } from '@mui/material';
import { Poster_BlurDataURL } from 'components/loading/BlurDataURL';
import { m } from 'framer-motion';
import Image from 'next/image';
import ScrollContainer from 'react-indiana-drag-scroll';

interface IProps {
  show: () => void;
  getURL: (value: string) => void;
  backBool: (value: boolean) => void;
}

const Illustration1 = '/images/avatar/illustration/1.png';
const Illustration2 = '/images/avatar/illustration/2.png';
const Illustration3 = '/images/avatar/illustration/3.png';
const Illustration4 = '/images/avatar/illustration/4.png';
const Illustration5 = '/images/avatar/illustration/5.png';
const Illustration6 = '/images/avatar/illustration/6.png';
const Illustration7 = '/images/avatar/illustration/7.png';
const Illustration8 = '/images/avatar/illustration/8.png';
const Illustration9 = '/images/avatar/illustration/9.png';
const Illustration10 = '/images/avatar/illustration/10.png';
const Illustration11 = '/images/avatar/illustration/11.png';
const Illustration12 = '/images/avatar/illustration/12.png';
const Illustration13 = '/images/avatar/illustration/13.png';
const Illustration14 = '/images/avatar/illustration/14.png';
const Illustration15 = '/images/avatar/illustration/15.png';
const Illustration16 = '/images/avatar/illustration/16.png';
const Illustration17 = '/images/avatar/illustration/17.png';
const Illustration18 = '/images/avatar/illustration/18.png';
const Illustration19 = '/images/avatar/illustration/19.png';
const Illustration20 = '/images/avatar/illustration/20.png';
const Illustration21 = '/images/avatar/illustration/21.png';
const Illustration22 = '/images/avatar/illustration/22.png';
const Illustration23 = '/images/avatar/illustration/23.png';
const Illustration24 = '/images/avatar/illustration/24.png';
const Illustration25 = '/images/avatar/illustration/25.png';
const Illustration26 = '/images/avatar/illustration/26.png';
const Illustration27 = '/images/avatar/illustration/27.png';

const Illustrations = [
  Illustration1,
  Illustration2,
  Illustration3,
  Illustration4,
  Illustration5,
  Illustration6,
  Illustration7,
  Illustration8,
  Illustration9,
  Illustration10,
  Illustration11,
  Illustration12,
  Illustration13,
  Illustration14,
  Illustration15,
  Illustration16,
  Illustration17,
  Illustration18,
  Illustration19,
  Illustration20,
  Illustration21,
  Illustration22,
  Illustration23,
  Illustration24,
  Illustration25,
  Illustration26,
  Illustration27,
];

const blurDataURL = Poster_BlurDataURL;

const LeftVariants = {
  open: {
    x: 0,
    opacity: 1,
  },
  closed: {
    x: -20,
    opacity: 0,
  },
};

const RightVariants = {
  open: {
    x: 0,
    opacity: 1,
  },
  closed: {
    x: 20,
    opacity: 0,
  },
};

export function IllustrationCollections(props: IProps) {
  const sliderRef = useRef<HTMLElement>(null);
  const [LeftAnimate, setLeftAnimate] = useState('closed');
  const [RightAnimate, setRightAnimate] = useState('closed');
  const slideLeft = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - slider.offsetWidth;
    }
  };
  const slideRight = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + slider.offsetWidth;
    }
  };
  const ListenToIllustrationScroll = () => {
    const slider = sliderRef.current;
    if (slider) {
      if (slider.scrollLeft === 0) {
        setLeftAnimate('closed');
      } else {
        setLeftAnimate('open');
      }
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft === 0) {
        return;
      }
      if (slider.scrollLeft === maxScroll) {
        setRightAnimate('closed');
      } else {
        setRightAnimate('open');
      }
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', ListenToIllustrationScroll);
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', ListenToIllustrationScroll);
      }
    };
  }, [sliderRef]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft === maxScroll) setRightAnimate('closed');
      else setRightAnimate('open');
    }
  }, []);
  return (
    <div className="relative box-border flex w-full flex-col space-y-2 pb-1 text-white">
      {/* Heading */}
      <div className="flex items-center space-x-2 pl-3">
        <FilmIcon className="h-6" />
        <h6 className="text-center text-sm font-medium">
          Explore Illustrations
        </h6>
      </div>
      {/* Main */}
      <ScrollContainer
        vertical={false}
        horizontal={true}
        hideScrollbars={true}
        component="ul"
        innerRef={sliderRef}
        className="scrollbar-hide relative box-border h-full w-full space-x-[6px] scroll-smooth whitespace-nowrap px-3"
      >
        {Illustrations.map((illustrationURL) => (
          <Button
            aria-label="all-illustration-button"
            component="li"
            disableFocusRipple
            key={illustrationURL}
            onClick={() => {
              props.getURL(illustrationURL);
              props.show();
              props.backBool(true);
            }}
            className="inline-block w-[150px] cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff80 !important',
              },
            }}
          >
            <Image
              width={2143}
              height={3012}
              className="rounded-md"
              src={illustrationURL}
              blurDataURL={blurDataURL}
              placeholder="blur"
              alt=""
            />
          </Button>
        ))}
      </ScrollContainer>
      <m.button
        initial="open"
        onClick={() => slideLeft()}
        whileTap={{ scale: 0.9 }}
        variants={LeftVariants}
        animate={LeftAnimate}
        transition={{ duration: 0.15 }}
        className="Custom-DropShadow group absolute left-3 top-[calc(50%-15px)] z-[1] h-9 w-9 cursor-default rounded-[50%] bg-black/80 p-0 backdrop-blur-lg hover:bg-black/80"
      >
        <div className="flex h-full w-full items-center justify-center">
          <ChevronLeftIcon className="h-5 group-hover:h-6" />
        </div>
      </m.button>
      <m.button
        initial="open"
        onClick={() => slideRight()}
        whileTap={{ scale: 0.9 }}
        variants={RightVariants}
        animate={RightAnimate}
        transition={{ duration: 0.15 }}
        className="Custom-DropShadow group absolute right-3 top-[calc(50%-15px)] z-[1] h-9 w-9 cursor-default rounded-[50%] bg-black/80 p-0 backdrop-blur-lg hover:bg-black/80"
      >
        <div className="flex h-full w-full items-center justify-center">
          <ChevronRightIcon className="h-5 group-hover:h-6" />
        </div>
      </m.button>
    </div>
  );
}
