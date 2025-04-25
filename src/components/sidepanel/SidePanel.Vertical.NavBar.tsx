import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface IProps {
  Active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const PanelContentArray = [
  {
    Name: 'Home',
    Icon: '/icons/home-new.svg',
    IconActive: '/icons/home-fill-new.svg',
  },
  {
    Name: 'Gallery',
    Icon: '/icons/gallery.svg',
    IconActive: '/icons/gallery-fill.svg',
  },
];

function SidePanelVerticalNavBar(props: IProps) {
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
        `sidepanel-vertical-navbar-button-id-${Number}`,
      )?.offsetHeight;
      const PrevButtonOffsetTop = document.getElementById(
        `sidepanel-vertical-navbar-button-id-${Number}`,
      )?.offsetTop;
      const NextButtonHeight = document.getElementById(
        `sidepanel-vertical-navbar-button-id-${idx}`,
      )?.offsetHeight;
      const NextButtonOffsetTop = document.getElementById(
        `sidepanel-vertical-navbar-button-id-${idx}`,
      )?.offsetTop;
      const ContainerMarginTop = document.getElementById(
        'sidepanel-vertical-navbar-container-div',
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
      `sidepanel-vertical-navbar-button-id-${Number}`,
    )?.offsetHeight;
    const ButtonOffsetTop = document.getElementById(
      `sidepanel-vertical-navbar-button-id-${Number}`,
    )?.offsetTop;
    const ContainerMarginTop = document.getElementById(
      'sidepanel-vertical-navbar-container-div',
    )?.offsetTop;
    if (ButtonHeight && ButtonOffsetTop && ContainerMarginTop) {
      const FinalMargin = ButtonOffsetTop - ContainerMarginTop;
      const FinalHeight = ButtonHeight;
      setHeight(FinalHeight);
      setMarginTop(FinalMargin);
    }
  };

  return (
    <div className="mx-2 w-full rounded-xl bg-[#181818] py-5 pr-5">
      <div id="sidepanel-vertical-navbar-container-div" className="flex w-full">
        <motion.div
          animate="animate"
          initial="initial"
          variants={variants}
          onAnimationComplete={onAnimationComplete}
          transition={{ type: 'twin', duration: 0.125 }}
          className="z-10 ml-[3px] w-[3px] bg-white opacity-50"
        />
        <div className="z-10 flex w-full flex-col space-y-10">
          {PanelContentArray.map((value, idx) => (
            <motion.button
              key={idx}
              id={`sidepanel-vertical-navbar-button-id-${idx}`}
              className="group ml-5 flex w-full cursor-pointer space-x-4"
              onClick={() => {
                onClick(idx);
                props.setActive(value.Name);
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                height={20}
                width={20}
                className={`${
                  props.Active == value.Name
                    ? 'opacity-100'
                    : 'opacity-60 group-hover:opacity-100 group-hover:transition-opacity'
                }`}
                src={`${
                  props.Active == value.Name ? value.IconActive : value.Icon
                }`}
                alt=""
              />
              <p
                className={`${
                  props.Active == value.Name
                    ? 'opacity-100'
                    : 'opacity-60 group-hover:opacity-100 group-hover:transition-opacity'
                } trunacate text-[14px] font-[600] tracking-wide text-white`}
              >
                {value.Name}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
      {props.Active === 'Home' && (
        <div className="absolute left-[11px] top-[75px] h-[55px] w-[97%] rounded-lg bg-white opacity-[0.04]" />
      )}
      {props.Active === 'Gallery' && (
        <div className="absolute left-[11px] top-[135px] h-[55px] w-[97%] rounded-lg bg-white opacity-[0.04]" />
      )}
    </div>
  );
}

export default SidePanelVerticalNavBar;
