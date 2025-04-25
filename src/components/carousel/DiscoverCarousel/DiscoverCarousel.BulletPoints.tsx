import { motion } from 'framer-motion';
import { DiscoverCarouselContentProps } from 'contents/home/discover/Home.Discover.Carousel';

interface IProps {
  BulletArray: DiscoverCarouselContentProps[];
  CarouselState: number;
}

function DiscoverCarouselBulletPoints(props: IProps) {
  const GetCarouselState = (index: number) => {
    if (index > 9) return (index - 10) as number;
    else return index as number;
  };

  return (
    <div className="flex w-full items-center justify-center p-3">
      {props.BulletArray.map((value, idx) => (
        <motion.button
          key={idx}
          className={`${
            GetCarouselState(props.CarouselState) === idx ? 'px-1' : 'px-1'
          } group block cursor-default bg-transparent py-3`}
        >
          <div
            className={`${
              GetCarouselState(props.CarouselState) === idx
                ? 'h-[6px] min-h-[6px] w-[6px] min-w-[6px] opacity-90'
                : 'h-[4px] min-h-[4px] w-[4px] min-w-[4px] opacity-50'
            } block rounded-full bg-white`}
          />
        </motion.button>
      ))}
    </div>
  );
}

export default DiscoverCarouselBulletPoints;
