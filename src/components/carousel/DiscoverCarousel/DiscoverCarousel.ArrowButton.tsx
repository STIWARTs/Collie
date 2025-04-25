import { motion } from 'framer-motion';
import Image from 'next/image';

export interface DiscoverCarouselArrowButtonProps {
  onClick: () => void;
  animate: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

const LeftVariants = {
  open: {
    x: 0,
    opacity: 1,
  },
  closed: {
    x: -10,
    opacity: 0,
  },
};

const RightVariants = {
  open: {
    x: 0,
    opacity: 1,
  },
  closed: {
    x: 10,
    opacity: 0,
  },
};

const ArrowClasses =
  'absolute flex items-center justify-center group p-0 z-[1] cursor-default top-[45%] h-[40px] w-[20px] bg-black bg-opacity-70 rounded-[4px] transition-colors color-transition backdrop-blur-md Custom-DropShadow-1';
const ArrowIconClasses =
  'relative h-[10px] w-[10px] group-hover:h-[12px] group-hover:w-[12px] flex items-center justify-center opacity-75 group-hover:opacity-90';

export function DiscoverCarouselLeftArrowButton(
  props: DiscoverCarouselArrowButtonProps,
) {
  return (
    <motion.button
      variants={LeftVariants}
      initial={{ x: -10, opacity: 0 }}
      whileTap={{ scale: 0.9 }}
      animate={props.animate}
      onClick={props.onClick}
      onHoverStart={props.onHoverStart}
      onHoverEnd={props.onHoverEnd}
      className={`left-[18px] ${ArrowClasses}`}
    >
      <div className={ArrowIconClasses}>
        <Image src="/icons/left-arrow-fill-white.svg" fill alt="" />
      </div>
    </motion.button>
  );
}

export function DiscoverCarouselRightArrowButton(
  props: DiscoverCarouselArrowButtonProps,
) {
  return (
    <motion.button
      variants={RightVariants}
      initial={{ x: 10, opacity: 0 }}
      whileTap={{ scale: 0.9 }}
      animate={props.animate}
      onClick={props.onClick}
      onHoverStart={props.onHoverStart}
      onHoverEnd={props.onHoverEnd}
      className={`right-[18px] ${ArrowClasses}`}
    >
      <div className={ArrowIconClasses}>
        <Image src="/icons/right-arrow-fill-white.svg" fill alt="" />
      </div>
    </motion.button>
  );
}
