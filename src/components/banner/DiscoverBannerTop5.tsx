import { useRef } from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
import ScrollContainer from 'react-indiana-drag-scroll';
import TrendingBadge from 'components/badge/TrendingBadge';
import { DiscoverBannerTop5ContentProps } from '../../contents/home/discover/Home.Discover.Banner';

interface IProps {
  ContentArray: DiscoverBannerTop5ContentProps[];
}

function DiscoverBannerTop5(props: IProps) {
  const sliderRef = useRef<HTMLElement>(null);
  // const [LeftAnimate, setLeftAnimate] = useState('closed');
  // const [RightAnimate, setRightAnimate] = useState('closed');

  // const slideLeft = () => {
  //   const slider = sliderRef.current;
  //   if (slider) {
  //     slider.scrollLeft = slider.scrollLeft - slider.offsetWidth;
  //   }
  // };
  // const slideRight = () => {
  //   const slider = sliderRef.current;
  //   if (slider) {
  //     slider.scrollLeft = slider.scrollLeft + slider.offsetWidth;
  //   }
  // };

  // const ListenToSliderScroll = () => {
  //   const slider = sliderRef.current;
  //   if (slider) {
  //     if (slider.scrollLeft === 0) {
  //       setLeftAnimate('closed');
  //     } else {
  //       setLeftAnimate('open');
  //     }
  //     let maxScroll = slider.scrollWidth - slider.offsetWidth;
  //     if (slider.scrollLeft === maxScroll) {
  //       setRightAnimate('closed');
  //     } else {
  //       setRightAnimate('open');
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const slider = sliderRef.current;
  //   if (slider) {
  //     slider.addEventListener('scroll', ListenToSliderScroll);
  //   }
  //   return () => {
  //     if (slider) slider.removeEventListener('scroll', ListenToSliderScroll);
  //   };
  // });

  // useEffect(() => {
  //   const slider = sliderRef.current;
  //   if (slider) {
  //     if (slider.scrollLeft === 0) setLeftAnimate('closed');
  //     else setLeftAnimate('open');
  //   }
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative flex w-full p-3">
      <div className="relative flex w-full items-center space-x-5 overflow-hidden rounded-xl bg-white/5">
        {/* Title */}
        <div className="flex min-w-[300px] max-w-[300px] cursor-default flex-col space-y-4 py-10 pl-10 text-white">
          <div className="flex justify-start">
            <TrendingBadge />
          </div>
          <div className="text-[30px] font-[500] leading-[35px] tracking-wide text-white">
            Top 5 - Trends of the week
          </div>
          <div className="text-[13px] font-[300] tracking-wide text-white opacity-[0.85]">
            Make your creative vision a reality with these AI-powered effects
          </div>
        </div>
        {/* Content */}
        <ScrollContainer
          innerRef={sliderRef}
          vertical={false}
          hideScrollbars={true}
          component="ul"
          className="relative flex h-full w-full"
          style={{
            paddingLeft: 40,
            paddingRight: 25,
            paddingTop: 25,
            paddingBottom: 25,
          }}
        >
          {props.ContentArray.map((value, idx) => (
            <li
              key={idx}
              className="button-text-lower relative flex min-w-[299px] cursor-default"
            >
              <div className="relative z-[2] -ml-[15px] -mr-[45px] flex items-center">
                <div
                  className={`bg-${value.Color}-50 group flex h-[75px] min-h-[75px] w-[75px] min-w-[75px] items-center justify-center rounded-full text-[25px] font-[500] tracking-wide text-white backdrop-blur-xl`}
                >
                  {idx + 1}
                </div>
              </div>
              <Button
                disableFocusRipple
                className={`bg-${value.Color}-shadow button-text-lower relative m-0 flex h-full min-h-[200px] w-full min-w-[285px] cursor-default overflow-hidden rounded-[15px] p-0`}
                sx={{
                  '.MuiTouchRipple-child': {
                    backgroundColor: '#ffffff95 !important',
                  },
                }}
              >
                <Image
                  height={150}
                  width={300}
                  src={value.Image}
                  sizes="(max-width: 285px) 285px"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    maxWidth: 285,
                    maxHeight: 200,
                    borderRadius: 15,
                  }}
                  alt=""
                />
                <div className="absolute z-[1] flex h-full w-full items-center justify-start bg-gradient-to-r from-primary-theme/80 pl-14">
                  <div className="block max-w-[75%] text-start text-[16px] font-[500] tracking-wide text-white">
                    Trends of the week Heading 1
                  </div>
                </div>
              </Button>
            </li>
          ))}
        </ScrollContainer>
        <div className="absolute bottom-0 left-[300px] top-0 z-[2] h-full w-[30px] bg-gradient-to-r from-[#242424]" />
      </div>
    </div>
  );
}

export default DiscoverBannerTop5;
