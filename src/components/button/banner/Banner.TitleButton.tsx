import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface IProps {
  Label: string;
  onClick?: () => void;
}

const Variants = {
  open: {
    marginLeft: 0,
  },
  closed: {
    marginLeft: -17,
  },
};

function BannerTitleButton(props: IProps) {
  const [Animate, setAnimate] = useState('closed');

  const onHoverStart = () => {
    if (Animate === 'closed') setAnimate('open');
  };
  const onHoverEnd = () => {
    if (Animate === 'open') setAnimate('closed');
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={props.onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="group flex cursor-default items-center justify-center rounded-xl py-2 pl-[17px] pr-3 hover:bg-white/5"
    >
      <motion.div
        animate={Animate}
        variants={Variants}
        className="flex items-center justify-center space-x-1"
      >
        <label className="text-[20px] font-[500] tracking-wide text-white opacity-100 group-hover:opacity-75">
          {props.Label}
        </label>
        <ChevronRightIcon className="h-5 opacity-50" />
      </motion.div>
    </motion.button>
  );
}

export default BannerTitleButton;
