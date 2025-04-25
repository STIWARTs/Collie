import { motion } from 'framer-motion';
import Image from 'next/image';

interface IProps {
  onClick: () => void;
  animate: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

const LeftVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -50,
  },
};

const RightVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: 50,
  },
};

const ArrowClasses =
  'absolute p-0 z-[1] bottom-[48px] h-[32px] w-[20px] bg-white bg-opacity-70 hover:bg-white rounded-[4px] transition-colors color-transition Custom-DropShadow';
const ArrowIconClasses = 'h-full w-full flex items-center justify-center';

export function GalleryCarouselLeftArrowButton(props: IProps) {
  return (
    <motion.button
      variants={LeftVariants}
      initial={{ x: -50 }}
      whileTap={{ scale: 0.9 }}
      animate={props.animate}
      onClick={props.onClick}
      onHoverStart={props.onHoverStart}
      onHoverEnd={props.onHoverEnd}
      className={`left-3 ${ArrowClasses}`}
    >
      <div className={ArrowIconClasses}>
        <Image src="/icons/left-arrow-fill.svg" height={10} width={10} alt="" />
      </div>
    </motion.button>
  );
}

export function GalleryCarouselRightArrowButton(props: IProps) {
  return (
    <motion.button
      variants={RightVariants}
      initial={{ x: 50 }}
      whileTap={{ scale: 0.9 }}
      animate={props.animate}
      onClick={props.onClick}
      onHoverStart={props.onHoverStart}
      onHoverEnd={props.onHoverEnd}
      className={`right-3 ${ArrowClasses}`}
    >
      <div className={ArrowIconClasses}>
        <Image
          src="/icons/right-arrow-fill.svg"
          height={10}
          width={10}
          alt=""
        />
      </div>
    </motion.button>
  );
}
