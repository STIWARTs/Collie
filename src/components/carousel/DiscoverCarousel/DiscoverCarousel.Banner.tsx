import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { DiscoverCarouselContentProps } from 'contents/home/discover/Home.Discover.Carousel';
import { DiscoverCarouselArrowButtonProps } from './DiscoverCarousel.ArrowButton';
import DiscoverCarouselBannerContent from './DiscoverCarousel.BannerContent';
import dynamic from 'next/dynamic';

const DiscoverCarouselLeftArrowButton =
  dynamic<DiscoverCarouselArrowButtonProps>(
    () =>
      import('./DiscoverCarousel.ArrowButton').then(
        (x) => x.DiscoverCarouselLeftArrowButton,
      ),
    { ssr: false },
  );

const DiscoverCarouselRightArrowButton =
  dynamic<DiscoverCarouselArrowButtonProps>(
    () =>
      import('./DiscoverCarousel.ArrowButton').then(
        (x) => x.DiscoverCarouselRightArrowButton,
      ),
    { ssr: false },
  );

interface IProps {
  AutoPlay?: boolean;
  Duration?: number;
  BannerArray: DiscoverCarouselContentProps[];
  CarouselState: number;
  setCarouselState: React.Dispatch<React.SetStateAction<number>>;
}

function DiscoverCarouselBanner(props: IProps) {
  const x = useMotionValue(-3065);
  const animation = useAnimation();
  const ContainerRef = useRef<HTMLDivElement>(null);
  const [CarouselOrder, setCarouselOrder] = useState('left');
  const [DisabledCarousel, setDisabledCarousel] = useState(false);
  const [LeftAnimate, setLeftAnimate] = useState('closed');
  const [RightAnimate, setRightAnimate] = useState('closed');
  const [IntervalStatus, setIntervalStatus] = useState('running');

  const setIntervalTime =
    props.Duration && props.AutoPlay ? props.Duration * 1000 : undefined;
  let CarouselInterval: ReturnType<typeof setInterval> | undefined;
  const IntervalTime = setIntervalTime;

  const StartCarousel = () => {
    CarouselInterval = setInterval(
      () => NextCarouselByAutoPlay(),
      IntervalTime,
    );
  };

  const ClearCarousel = () => {
    if (CarouselInterval) clearInterval(CarouselInterval);
  };

  const CarouselHoverStart = () => {
    if (props.AutoPlay && props.Duration && IntervalStatus === 'running') {
      ClearCarousel();
      CarouselInterval = undefined;
      setIntervalStatus('pause');
    }
    if (LeftAnimate === 'closed' && RightAnimate === 'closed') {
      setLeftAnimate('open');
      setRightAnimate('open');
    }
  };

  const CarouselHoverEnd = () => {
    if (LeftAnimate === 'open' && RightAnimate === 'open') {
      setLeftAnimate('closed');
      setRightAnimate('closed');
    }
    if (props.AutoPlay && props.Duration && IntervalStatus === 'pause') {
      StartCarousel();
      ClearCarousel();
      setIntervalStatus('running');
    }
  };

  const ArrowButtonHover = () => {
    ClearCarousel();
    CarouselInterval = undefined;
    setIntervalStatus('pause');
    setLeftAnimate('open');
    setRightAnimate('open');
  };

  const LeftArrowButtonClick = () => {
    NextCarouselByLeftArrow();
  };

  const RightArrowButtonClick = () => {
    NextCarouselByRightArrow();
  };

  const NextCarouselByLeftArrow = () => {
    setDisabledCarousel(true);
    const CarouselIndex =
      props.CarouselState > 0 ? props.CarouselState - 1 : 19;
    NextCarouselByIndex(CarouselIndex);
  };

  const NextCarouselByRightArrow = () => {
    setDisabledCarousel(true);
    const CarouselIndex =
      props.CarouselState < 19 ? props.CarouselState + 1 : 0;
    NextCarouselByIndex(CarouselIndex);
  };

  const AnimationValue = (index: number) => {
    const LeftSpacing = 55;
    const CarouselSpacing = 12 * index;
    const CarouselWidth = -300 * index;
    const ExtraSpacing = index > 0 ? LeftSpacing : 0;
    const AnimationValue = CarouselWidth - CarouselSpacing + ExtraSpacing;
    return AnimationValue as number;
  };

  const NextCarouselByAutoPlay = () => {
    setDisabledCarousel(true);
    const CarouselIndex =
      props.CarouselState < 19 ? props.CarouselState + 1 : 0;
    const LeftSpacing = 55;
    const TotalLeftCarouselValue = -3065 - LeftSpacing;
    const ZeroIndexCarouselAnimationValue =
      AnimationValue(CarouselIndex) - TotalLeftCarouselValue - LeftSpacing;
    const SecondCarouselAnimationValue =
      AnimationValue(CarouselIndex) - TotalLeftCarouselValue;
    const FirstCarouselAnimationValue =
      CarouselIndex < 1
        ? -ZeroIndexCarouselAnimationValue
        : AnimationValue(CarouselIndex) + TotalLeftCarouselValue;
    const CarouselOrderAnimationValue =
      CarouselOrder === 'left'
        ? AnimationValue(CarouselIndex)
        : CarouselIndex > 9
          ? SecondCarouselAnimationValue
          : FirstCarouselAnimationValue;
    if (CarouselIndex === 6 || CarouselIndex === 16) {
      animation.start({ x: -1817 });
    } else {
      animation.start({ x: CarouselOrderAnimationValue });
    }
    props.setCarouselState(CarouselIndex);
  };

  const NextCarouselByIndex = (CarouselIndex: number) => {
    setDisabledCarousel(true);
    const LeftSpacing = 55;
    const TotalLeftCarouselValue = -3065 - LeftSpacing;
    const ZeroIndexCarouselAnimationValue =
      AnimationValue(CarouselIndex) - TotalLeftCarouselValue - LeftSpacing;
    const SecondCarouselAnimationValue =
      AnimationValue(CarouselIndex) - TotalLeftCarouselValue;
    const FirstCarouselAnimationValue =
      CarouselIndex < 1
        ? -ZeroIndexCarouselAnimationValue
        : AnimationValue(CarouselIndex) + TotalLeftCarouselValue;
    const CarouselOrderAnimationValue =
      CarouselOrder === 'left'
        ? AnimationValue(CarouselIndex)
        : CarouselIndex > 9
          ? SecondCarouselAnimationValue
          : FirstCarouselAnimationValue;
    animation.start({ x: CarouselOrderAnimationValue });
    props.setCarouselState(CarouselIndex);
  };

  const LoopCarousel = () => {
    setDisabledCarousel(false);

    // 5
    if (props.CarouselState === 4) {
      setCarouselOrder('right');
      animation.set({ x: -4313 });
      return;
    }
    if (props.CarouselState === 14) {
      setCarouselOrder('left');
      animation.set({ x: -4313 });
      return;
    }

    // 6
    if (props.CarouselState === 5) {
      setCarouselOrder('left');
      animation.set({ x: -1505 });
      return;
    }
    if (props.CarouselState === 15) {
      setCarouselOrder('right');
      animation.set({ x: -1505 });
      return;
    }

    // 7
    if (props.CarouselState === 6) {
      setCarouselOrder('left');
      animation.set({ x: -1817 });
      return;
    }
    if (props.CarouselState === 16) {
      setCarouselOrder('right');
      animation.set({ x: -1817 });
      return;
    }

    // 8
    if (props.CarouselState === 7) {
      setCarouselOrder('left');
      animation.set({ x: -2129 });
      return;
    }
    if (props.CarouselState === 17) {
      setCarouselOrder('right');
      animation.set({ x: -2129 });
      return;
    }

    // 9
    if (props.CarouselState === 8) {
      setCarouselOrder('left');
      animation.set({ x: -2441 });
      return;
    }
    if (props.CarouselState === 18) {
      setCarouselOrder('right');
      animation.set({ x: -2441 });
      return;
    }

    // 10
    if (props.CarouselState === 9) {
      setCarouselOrder('left');
      animation.set({ x: -2753 });
      return;
    }
    if (props.CarouselState === 19) {
      setCarouselOrder('right');
      animation.set({ x: -2753 });
      return;
    }
  };

  useEffect(() => {
    if (props.AutoPlay && props.Duration) {
      if (IntervalStatus === 'running') {
        StartCarousel();
        return () => ClearCarousel();
      }
    }
  }, [props.CarouselState, IntervalStatus, props.AutoPlay, props.Duration]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={ContainerRef}
      onHoverStart={CarouselHoverStart}
      onHoverEnd={CarouselHoverEnd}
      className="relative flex h-[500px] min-h-[500px] w-full"
    >
      <motion.div className="relative box-content h-full">
        <motion.div
          style={{ x }}
          animate={animation}
          onAnimationComplete={LoopCarousel}
          transition={{ type: 'spring', bounce: 0 }}
          className="flex h-full w-full space-x-3 px-3"
        >
          <DiscoverCarouselBannerContent
            AutoPlay={props.AutoPlay}
            IntervalStatus={IntervalStatus}
            BannerContentArray={props.BannerArray}
            onClick={(idx) => NextCarouselByIndex(idx)}
            CarouselState={props.CarouselState}
            CarouselOrder={CarouselOrder}
            DisabledCarousel={DisabledCarousel}
          />
        </motion.div>
      </motion.div>
      <DiscoverCarouselLeftArrowButton
        animate={LeftAnimate}
        onClick={LeftArrowButtonClick}
        onHoverStart={ArrowButtonHover}
        onHoverEnd={ArrowButtonHover}
      />
      <DiscoverCarouselRightArrowButton
        animate={RightAnimate}
        onClick={RightArrowButtonClick}
        onHoverStart={ArrowButtonHover}
        onHoverEnd={ArrowButtonHover}
      />
      {DisabledCarousel && (
        <div className="absolute z-[1] h-full w-full bg-transparent" />
      )}
    </motion.div>
  );
}

export default DiscoverCarouselBanner;
