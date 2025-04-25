import { motion } from 'framer-motion';
import { useState } from 'react';

const ContentArray = [{ name: 'Home' }, { name: 'Gallery' }];

function VerticalNavBar() {
  const [Number, setNumber] = useState(0);
  const [Height, setHeight] = useState(0);
  const [MarginTop, setMarginTop] = useState(0);

  const variants = {
    initial: { height: Height, marginTop: 0 },
    animate: { height: Height, marginTop: MarginTop },
  };

  const onClick = (idx: number) => {
    if (Number != idx) {
      const PrevButtonHeight = document.getElementById(
        `vertical-navbar-button-id-${Number}`,
      )?.offsetHeight;
      const PrevButtonOffsetTop = document.getElementById(
        `vertical-navbar-button-id-${Number}`,
      )?.offsetTop;
      const NextButtonHeight = document.getElementById(
        `vertical-navbar-button-id-${idx}`,
      )?.offsetHeight;
      const NextButtonOffsetTop = document.getElementById(
        `vertical-navbar-button-id-${idx}`,
      )?.offsetTop;
      const ContainerMarginTop = document.getElementById(
        'vertical-navbar-container-div',
      )?.offsetTop;
      if (
        PrevButtonHeight &&
        NextButtonHeight &&
        PrevButtonOffsetTop &&
        NextButtonOffsetTop &&
        ContainerMarginTop
      ) {
        if (Number < idx) {
          const NextMargin = NextButtonOffsetTop - PrevButtonOffsetTop;
          const InitialMargin = PrevButtonOffsetTop - ContainerMarginTop;
          const InitialHeight = NextButtonHeight + NextMargin;
          setHeight(InitialHeight);
          setMarginTop(InitialMargin);
        }
        if (Number > idx) {
          const PrevMargin = PrevButtonOffsetTop - NextButtonOffsetTop;
          const InitialMargin = NextButtonOffsetTop - ContainerMarginTop;
          const InitialHeight = PrevButtonHeight + PrevMargin;
          setMarginTop(InitialMargin);
          setHeight(InitialHeight);
        }
        setNumber(idx);
      }
    }
  };

  const onAnimationComplete = () => {
    const ButtonHeight = document.getElementById(
      `vertical-navbar-button-id-${Number}`,
    )?.offsetHeight;
    const ButtonOffsetTop = document.getElementById(
      `vertical-navbar-button-id-${Number}`,
    )?.offsetTop;
    const ContainerMarginTop = document.getElementById(
      'vertical-navbar-container-div',
    )?.offsetTop;
    if (ButtonHeight && ButtonOffsetTop && ContainerMarginTop) {
      const FinalMargin = ButtonOffsetTop - ContainerMarginTop;
      const FinalHeight = ButtonHeight;
      setHeight(FinalHeight);
      setMarginTop(FinalMargin);
    }
  };

  return (
    <div id="vertical-navbar-container-div" className="flex">
      <motion.div
        animate="animate"
        initial="initial"
        variants={variants}
        onAnimationComplete={onAnimationComplete}
        transition={{ type: 'twin', duration: 0.125 }}
        className="w-[2px] bg-white"
      />
      <div className="flex flex-col space-y-10">
        {ContentArray.map((value, idx) => (
          <div
            key={idx}
            id={`vertical-navbar-button-id-${idx}`}
            className="ml-5 cursor-default"
            onClick={() => onClick(idx)}
          >
            {value.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerticalNavBar;
