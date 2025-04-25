import { m } from 'framer-motion';
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
    marginLeft: -12,
  },
};

function SignInNextButton(props: IProps) {
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
      <m.label
        initial="open"
        animate={Animate}
        variants={Variants}
        className="truncate text-[14px] font-medium text-sky-400 opacity-100 group-hover:opacity-75"
      >
        {props.Label}
      </m.label>
    </m.button>
  );
}

export default SignInNextButton;
