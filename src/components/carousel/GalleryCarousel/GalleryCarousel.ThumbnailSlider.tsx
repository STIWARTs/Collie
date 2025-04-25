import { motion, useAnimation, useMotionValue } from 'framer-motion';
import {
  GalleryCarouselLeftArrowButton,
  GalleryCarouselRightArrowButton,
} from './GalleryCarousel.ThumbnailArrow';
import { useEffect, useRef, useState } from 'react';
import { GalleryCarouselContentProps } from 'contents/gallery/Gallery.Carousel';
import GalleryCarouselThumbnailMap from './GalleryCarousel.ThumbnailMap';

export interface GalleryCarouselThumbnailSliderProps {
  AutoPlay?: boolean;
  Duration?: number;
  ConstraintRef: React.RefObject<HTMLDivElement>;
  CarouselState: number;
  setCarouselState: React.Dispatch<React.SetStateAction<number>>;
  setBannerTextTransition: React.Dispatch<React.SetStateAction<string>>;
  ThumbnailArray: GalleryCarouselContentProps[];
}

function GalleryCarouselThumbnailSlider(
  props: GalleryCarouselThumbnailSliderProps,
) {
  const animation = useAnimation();
  const x = useMotionValue(0);
  const dragRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLButtonElement>(null);
  const [ExceptionalHover, setExceptionalHover] = useState(false);
  const [DragHover, setDragHover] = useState(false);
  const [LeftHide, setLeftHide] = useState(false);
  const [RightHide, setRightHide] = useState(false);
  const [LeftAnimate, setLeftAnimate] = useState('closed');
  const [RightAnimate, setRightAnimate] = useState('closed');
  const [ContentExceed, setContentExceed] = useState(false);
  const [LeftIndicator, setLeftIndicator] = useState(true);
  const [RightIndicator, setRightIndicator] = useState(false);
  const [IntervalStatus, setIntervalStatus] = useState('running');
  const setIntervalTime =
    props.Duration && props.AutoPlay ? props.Duration * 1000 : undefined;
  let CarouselInterval: ReturnType<typeof setInterval> | undefined;
  const intervalTime = setIntervalTime;

  const NextCarousel = () => {
    const CarouselIndex =
      props.CarouselState === props.ThumbnailArray.length - 1
        ? 0
        : props.CarouselState + 1;
    const ThumbnailWidth = thumbnailRef.current;
    const ContainerWidth = props.ConstraintRef.current;
    if (ThumbnailWidth && ContainerWidth) {
      const IndexValue = CarouselIndex + 2;
      const ContentExceed = ThumbnailWidth.offsetWidth * IndexValue;
      if (ContainerWidth.offsetWidth < ContentExceed) {
        const getThubnailValue = ContainerWidth.offsetWidth - ContentExceed;
        const AnimationValue = getThubnailValue + 0; //40
        animation.start({
          x: AnimationValue,
        });
      } else {
        animation.start({
          x: 0,
        });
      }
    }
    props.setBannerTextTransition('closed');
    setLeftIndicator(true);
    setRightIndicator(false);
    props.setCarouselState(CarouselIndex);
  };

  /* const PrevCarousel = () => {
    setCarouselActive(
      CarouselActive === 0 ? Thumbnail.length - 1 : CarouselActive - 1
    );
  }; */

  const StartCarousel = () => {
    CarouselInterval = setInterval(() => NextCarousel(), intervalTime);
  };
  const ClearCarousel = () => {
    if (CarouselInterval) clearInterval(CarouselInterval);
  };

  const onHoverCarouselStart = () => {
    ClearCarousel();
    CarouselInterval = undefined;
    setIntervalStatus('pause');
    setLeftIndicator(false);
    setRightIndicator(false);
  };
  const onHoverCarouselEnd = () => {
    StartCarousel();
    ClearCarousel();
    setIntervalStatus('running');
    setLeftIndicator(true);
    setRightIndicator(false);
  };

  const LeftClick = () => {
    const xPos = x.get();
    const width = props.ConstraintRef.current;
    if (width) {
      const newXPosition = xPos + width.offsetWidth;
      animation.start({
        x: newXPosition > 0 ? 0 : newXPosition,
      });
    }
    HideButton();
  };
  const RightClick = () => {
    const xPos = x.get();
    const width = props.ConstraintRef.current;
    const scrollWidth = dragRef.current;
    if (width && scrollWidth) {
      const newXPosition = xPos - width.offsetWidth;
      const maxScroll = scrollWidth.scrollWidth - scrollWidth.offsetWidth;
      animation.start({
        x: newXPosition < -maxScroll ? -maxScroll - 32 : newXPosition,
      });
    }
    HideButton();
  };

  const DragHoverStart = () => {
    setDragHover(true);
    setExceptionalHover(false);
    if (LeftHide) setLeftAnimate('open');
    if (RightHide) setRightAnimate('open');
  };
  const DragHoverEnd = () => {
    if (LeftHide) setLeftAnimate('closed');
    if (RightHide) setRightAnimate('closed');
    setExceptionalHover(true);
    setDragHover(false);
  };
  const ParentDragHoverEnd = () => {
    if (LeftHide) setLeftAnimate('closed');
    if (RightHide) setRightAnimate('closed');
    setExceptionalHover(true);
    setTimeout(() => {
      setDragHover(false);
    }, 50);
  };

  const ExceptionalDragHover = () => {
    if (ExceptionalHover) {
      if (LeftHide === true && LeftAnimate === 'open') {
        setLeftAnimate('closed');
      }
      if (RightHide === true && RightAnimate === 'open') {
        setRightAnimate('closed');
      }
    }
  };

  const HideButton = () => {
    const xPos = x.get();
    const width = props.ConstraintRef.current;
    const scrollWidth = dragRef.current;
    // Hide Left Button
    if (xPos >= -5) {
      setLeftAnimate('closed');
      setLeftHide(false);
    } else {
      setLeftAnimate('open');
      setLeftHide(true);
    }
    // Hide Right Button
    if (width && scrollWidth) {
      const maxScroll = scrollWidth.scrollWidth - scrollWidth.offsetWidth - 5;
      if (xPos <= -maxScroll) {
        setRightAnimate('closed');
        setRightHide(false);
      } else {
        setRightAnimate('open');
        setRightHide(true);
      }
    }
  };

  const HideButtonInitialState = () => {
    const xPos = x.get();
    const width = props.ConstraintRef.current;
    const scrollWidth = dragRef.current;
    // Hide Arrow Left Button
    if (xPos >= -5) {
      setLeftHide(false);
    } else {
      setLeftHide(true);
    }
    // Hide Arrow Right Button
    if (width && scrollWidth) {
      const maxScroll = scrollWidth.scrollWidth - scrollWidth.offsetWidth - 5;
      if (xPos <= -maxScroll) {
        setRightHide(false);
      } else {
        setRightHide(true);
      }
    }
  };
  const IsContentExceed = () => {
    const xPos = x.get();
    const scrollWidth = dragRef.current;
    if (scrollWidth) {
      if (scrollWidth.scrollWidth - scrollWidth.offsetWidth > 0) {
        setContentExceed(true);
      } else {
        // console.log(ContentExceed);
        setContentExceed(false);
        if (xPos < 0) {
          animation.start({
            x: 0,
          });
        }
      }
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

  /* Initial State */
  useEffect(() => {
    IsContentExceed();
    HideButtonInitialState();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    x.on('change', HideButton);
  });

  useEffect(() => {
    window.addEventListener('resize', IsContentExceed);
    return () => window.removeEventListener('resize', IsContentExceed);
  });

  return (
    <motion.div
      onPointerMove={() => {
        DragHoverStart();
      }}
      onHoverStart={() => {
        DragHoverStart();
      }}
      onHoverEnd={() => {
        ParentDragHoverEnd();
        onHoverCarouselEnd();
      }}
      className={`${
        ContentExceed ? 'ml-auto' : 'mr-auto'
      } ${'relative z-[1] box-content'}`}
    >
      <motion.div
        ref={dragRef}
        animate={animation}
        onHoverStart={() => {
          DragHoverStart();
          onHoverCarouselStart();
        }}
        onAnimationComplete={ExceptionalDragHover}
        onDragTransitionEnd={ExceptionalDragHover}
        onPointerLeave={() => setExceptionalHover(true)}
        transition={{ type: 'spring', bounce: 0 }}
        style={{ x }}
        className={`${
          ContentExceed ? 'ml-auto' : 'mr-auto'
        } ${'-mt-[80px] flex w-auto space-x-4 px-8 pb-1'}`}
      >
        <GalleryCarouselThumbnailMap
          AutoPlay={props.AutoPlay}
          Duration={props.Duration}
          Animation={animation}
          ThumbnailArray={props.ThumbnailArray}
          ThumbnailRef={thumbnailRef}
          ConstraintRef={props.ConstraintRef}
          CarouselState={props.CarouselState}
          LeftIndicator={LeftIndicator}
          RightIndicator={RightIndicator}
          setCarouselState={props.setCarouselState}
          setLeftIndicator={setLeftIndicator}
          setRightIndicator={setRightIndicator}
          setBannerTextTransition={props.setBannerTextTransition}
        />
      </motion.div>
      {ContentExceed && DragHover && (
        <>
          <GalleryCarouselLeftArrowButton
            animate={LeftAnimate}
            onClick={() => LeftClick()}
            onHoverStart={DragHoverStart}
            onHoverEnd={DragHoverEnd}
          />
          <GalleryCarouselRightArrowButton
            animate={RightAnimate}
            onClick={() => RightClick()}
            onHoverStart={DragHoverStart}
            onHoverEnd={DragHoverEnd}
          />
        </>
      )}
    </motion.div>
  );
}

export default GalleryCarouselThumbnailSlider;
