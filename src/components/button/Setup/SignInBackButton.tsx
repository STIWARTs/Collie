import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { m } from 'framer-motion';

interface IProps {
  Label: string;
  onClick?: () => void;
}

const Variants = {
  open: {
    marginLeft: 0,
  },
  closed: {
    marginLeft: -12,
  },
};

function SignInBackButton(props: IProps) {
  const [Animate, setAnimate] = useState('closed');

  const onHoverStart = () => {
    if (Animate === 'closed') setAnimate('open');
  };
  const onHoverEnd = () => {
    if (Animate === 'open') setAnimate('closed');
  };
  return (
    <m.button
      whileTap={{ scale: 0.95 }}
      onClick={props.onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="group cursor-default rounded-lg px-[12px] py-2 hover:bg-white/5"
    >
      <m.div
        initial="open"
        animate={Animate}
        variants={Variants}
        className="flex items-center space-x-2 opacity-100 group-hover:opacity-75"
      >
        <ChevronLeftIcon className="mb-[2px] h-4 text-sky-400" />
        <label className="truncate text-[14px] font-medium text-sky-400">
          {props.Label}
        </label>
      </m.div>
    </m.button>
  );
}

export default SignInBackButton;
