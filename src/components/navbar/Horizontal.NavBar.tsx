import { motion } from 'framer-motion';
import { useState } from 'react';

const ContentArray = [
  { name: 'Discover' },
  { name: 'Offers' },
  { name: 'Collections' },
];

function HorizontalNavBar() {
  const [Number, setNumber] = useState(0);
  const [Width, setWidth] = useState(0);
  const [MarginLeft, setMarginLeft] = useState(0);

  const variants = {
    initial: { width: Width, marginLeft: 0 },
    animate: { width: Width, marginLeft: MarginLeft },
  };

  const onClick = (idx: number) => {
    if (Number != idx) {
      const PrevButtonWidth = document.getElementById(
        `horizontal-navbar-button-id-${Number}`,
      )?.offsetWidth;
      const PrevButtonOffsetLeft = document.getElementById(
        `horizontal-navbar-button-id-${Number}`,
      )?.offsetLeft;
      const NextButtonWidth = document.getElementById(
        `horizontal-navbar-button-id-${idx}`,
      )?.offsetWidth;
      const NextButtonOffsetLeft = document.getElementById(
        `horizontal-navbar-button-id-${idx}`,
      )?.offsetLeft;
      const ContainerMarginLeft = document.getElementById(
        'horizontal-navbar-container-div',
      )?.offsetLeft;
      if (
        PrevButtonWidth &&
        NextButtonWidth &&
        PrevButtonOffsetLeft &&
        NextButtonOffsetLeft &&
        ContainerMarginLeft
      ) {
        if (Number < idx) {
          const NextMargin = NextButtonOffsetLeft - PrevButtonOffsetLeft;
          const InitialMargin = PrevButtonOffsetLeft - ContainerMarginLeft;
          const InitialWidth = NextButtonWidth + NextMargin;
          setWidth(InitialWidth);
          setMarginLeft(InitialMargin);
        }
        if (Number > idx) {
          const PrevMargin = PrevButtonOffsetLeft - NextButtonOffsetLeft;
          const InitialMargin = NextButtonOffsetLeft - ContainerMarginLeft;
          const InitialWidth = PrevButtonWidth + PrevMargin;
          setMarginLeft(InitialMargin);
          setWidth(InitialWidth);
        }
        setNumber(idx);
      }
    }
  };

  const onAnimationComplete = () => {
    const ButtonWidth = document.getElementById(
      `horizontal-navbar-button-id-${Number}`,
    )?.offsetWidth;
    const ButtonOffsetLeft = document.getElementById(
      `horizontal-navbar-button-id-${Number}`,
    )?.offsetLeft;
    const ContainerMarginLeft = document.getElementById(
      'horizontal-navbar-container-div',
    )?.offsetLeft;
    if (ButtonWidth && ButtonOffsetLeft && ContainerMarginLeft) {
      const FinalMargin = ButtonOffsetLeft - ContainerMarginLeft;
      const FinalWidth = ButtonWidth;
      setWidth(FinalWidth);
      setMarginLeft(FinalMargin);
    }
  };

  return (
    <div id="horizontal-navbar-container-div" className="flex w-full flex-col">
      <div className="flex justify-between">
        {ContentArray.map((value, idx) => (
          <div
            key={idx}
            id={`horizontal-navbar-button-id-${idx}`}
            className="cursor-default py-3"
            onClick={() => onClick(idx)}
          >
            {value.name}
          </div>
        ))}
      </div>
      <motion.div
        animate="animate"
        initial="initial"
        variants={variants}
        onAnimationComplete={onAnimationComplete}
        transition={{ type: 'twin', duration: 0 }}
        className="h-[2px] bg-white"
      />
    </div>
  );
}

export default HorizontalNavBar;
