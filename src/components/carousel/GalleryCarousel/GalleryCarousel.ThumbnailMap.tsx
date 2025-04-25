import { GalleryCarouselContentProps } from 'contents/gallery/Gallery.Carousel';
import { Rectangle_BlurDataURL } from 'components/loading/BlurDataURL';
import { AnimationControls, motion } from 'framer-motion';
import Image from 'next/image';

interface IProps {
  AutoPlay?: boolean;
  Duration?: number;
  Animation: AnimationControls;
  ThumbnailRef: React.RefObject<HTMLButtonElement>;
  ConstraintRef: React.RefObject<HTMLDivElement>;
  CarouselState: number;
  setCarouselState: React.Dispatch<React.SetStateAction<number>>;
  LeftIndicator: boolean;
  RightIndicator: boolean;
  setLeftIndicator: React.Dispatch<React.SetStateAction<boolean>>;
  setRightIndicator: React.Dispatch<React.SetStateAction<boolean>>;
  setBannerTextTransition: React.Dispatch<React.SetStateAction<string>>;
  ThumbnailArray: GalleryCarouselContentProps[];
}

const ThumbnailSizes = 'w-[220px] h-[120px] min-w-[220px] min-h-[120px]';

function GalleryCarouselThumbnailMap(props: IProps) {
  // Define the correct order of images for thumbnails 1 through 10
  const correctImageOrder = [
    '/images/avatar/illustration/1.png', // Thumbnail 1
    '/images/avatar/illustration/2.png', // Thumbnail 2
    '/images/avatar/illustration/3.png', // Thumbnail 3
    '/images/avatar/illustration/4.png', // Thumbnail 4
    '/images/avatar/illustration/5.png', // Thumbnail 5
    '/images/avatar/illustration/6.png', // Thumbnail 6
    '/images/avatar/illustration/7.png', // Thumbnail 7
    '/images/avatar/illustration/8.png', // Thumbnail 8
    '/images/avatar/illustration/9.png', // Thumbnail 9
    '/images/avatar/illustration/10.png', // Thumbnail 10
  ];

  // Create a modified ThumbnailArray with correct image paths
  const correctedThumbnailArray = props.ThumbnailArray.map((item, index) => {
    if (index < correctImageOrder.length) {
      return {
        ...item,
        Image: correctImageOrder[index],
      };
    }
    return item;
  });

  const CorouselClick = (idx: number) => {
    if (props.CarouselState !== idx) {
      const ThumbnailWidth = props.ThumbnailRef.current;
      const ContainerWidth = props.ConstraintRef.current;
      if (ThumbnailWidth && ContainerWidth) {
        const IndexValue = idx + 2;
        const ContentExceed = ThumbnailWidth.offsetWidth * IndexValue;
        if (ContainerWidth.offsetWidth < ContentExceed) {
          const getThubnailValue = ContainerWidth.offsetWidth - ContentExceed;
          const AnimationValue = getThubnailValue + 0; //40
          props.Animation.start({
            x: AnimationValue,
          });
        } else {
          props.Animation.start({
            x: 0,
          });
        }
      }
    }
    props.setBannerTextTransition('closed');
    setTimeout(() => props.setCarouselState(idx), 150);
  };

  return (
    <>
      {correctedThumbnailArray.map((value, idx) => (
        <motion.button
          onClick={() => CorouselClick(idx)}
          key={idx}
          ref={props.ThumbnailRef}
          whileTap={{ scale: 0.9 }}
          className={`${
            props.CarouselState === idx
              ? 'ring-[3.5px]'
              : 'ring-0 hover:ring-[3.5px]'
          } ${ThumbnailSizes} ${'group relative m-0 box-border flex items-center justify-center overflow-hidden rounded-xl p-0 ring-white ring-opacity-50 transition-shadow duration-300'}`}
        >
          <Image
            fill
            className={`${
              props.CarouselState === idx
                ? 'translate-x-0 scale-100'
                : '-translate-x-3 scale-[1.2] group-hover:translate-x-0 group-hover:scale-100'
            } ${' transform-gpu transition-all duration-300 ease-out'}`}
            src={value.Image}
            placeholder="blur"
            blurDataURL={Rectangle_BlurDataURL}
            alt={`Thumbnail ${idx + 1}`}
            priority={true}
          />
          <h6
            className={`${
              props.CarouselState === idx
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100'
            } ${'z-[1] flex h-full w-full items-center bg-gradient-to-r from-[#000000b3] p-5 pr-[30%] text-left text-xs font-medium text-white backdrop-blur-[2px] transition-all duration-300 ease-out'}`}
          >
            {value.ThumbnailHeading}
          </h6>
          <div className="absolute bottom-0 z-[2] h-auto w-full bg-transparent p-[2px]">
            {props.CarouselState === idx &&
              props.AutoPlay &&
              props.LeftIndicator && (
                <motion.div
                  animate={{ width: '100%', opacity: 1 }}
                  onAnimationComplete={() => {
                    if (props.LeftIndicator) props.setLeftIndicator(false);
                    if (!props.RightIndicator) props.setRightIndicator(true);
                  }}
                  transition={{
                    ease: 'anticipate',
                    type: 'tween',
                    duration: props.Duration ? props.Duration * 0.5 : 0,
                  }}
                  className={`${
                    props.LeftIndicator ? 'flex' : 'hidden'
                  } ${'mr-auto h-[3px] w-0 rounded-b-3xl bg-white opacity-0'}`}
                />
              )}
            {props.CarouselState === idx &&
              props.AutoPlay &&
              props.RightIndicator && (
                <motion.div
                  animate={{ width: 0, opacity: 0.5 }}
                  onAnimationComplete={() => {
                    if (props.RightIndicator) props.setRightIndicator(false);
                  }}
                  transition={{
                    ease: 'anticipate',
                    type: 'tween',
                    duration: props.Duration ? props.Duration * 0.5 : 0,
                  }}
                  className={`${
                    props.RightIndicator ? 'flex' : 'hidden'
                  } ${'ml-auto h-[3px] w-full rounded-b-3xl bg-white opacity-100'}`}
                />
              )}
          </div>
        </motion.button>
      ))}
    </>
  );
}

export default GalleryCarouselThumbnailMap;
