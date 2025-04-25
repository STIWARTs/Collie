import { useState, RefObject, useEffect } from 'react';
import { easeIn, easeInOut, motion } from 'framer-motion';
import { GalleryCarouselContentProps } from 'contents/gallery/Gallery.Carousel';
import Image from 'next/image';
import { gsap } from 'gsap';

export interface GalleryCarouselBannerProps {
  ElementRef: RefObject<HTMLDivElement>;
  ContentArray: GalleryCarouselContentProps[];
  CarouselState: number;
  BannerTextTransition: string;
  setBannerTextTransition: React.Dispatch<React.SetStateAction<string>>;
  AnimationState: string;
}

export default function GalleryCarouselBanner(
  props: GalleryCarouselBannerProps,
) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define the correct order of images for slides 1 through 10
  const correctImageOrder = [
    '/images/avatar/illustration/1.png', // Slide 1
    '/images/avatar/illustration/2.png', // Slide 2
    '/images/avatar/illustration/3.png', // Slide 3
    '/images/avatar/illustration/4.png', // Slide 4
    '/images/avatar/illustration/5.png', // Slide 5
    '/images/avatar/illustration/6.png', // Slide 6
    '/images/avatar/illustration/7.png', // Slide 7
    '/images/avatar/illustration/8.png', // Slide 8
    '/images/avatar/illustration/9.png', // Slide 9
    '/images/avatar/illustration/10.png', // Slide 10
  ];

  // Create a modified ContentArray with correct image paths
  const correctedContentArray = props.ContentArray.map((item, index) => {
    if (index < correctImageOrder.length) {
      return {
        ...item,
        Image: correctImageOrder[index],
      };
    }
    return item;
  });

  /* animation settings : framer motion */
  const defaultAnimationSettings = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.7,
      ease: easeInOut,
    },
  };

  /* Delay animation settings : framer motion */
  const delayAnimationSettings = [0.15, 0.25, 0.35, 0.45, 0.55];

  useEffect(() => {
    // Auto update the banner text transition state
    if (props.BannerTextTransition === 'closed') {
      const timeout = setTimeout(() => {
        props.setBannerTextTransition('opened');
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [props.BannerTextTransition, props.setBannerTextTransition]);

  // Animation variants for banner elements
  const animateBanner = {
    initialButton: {
      opacity: 0,
      y: 40,
    },
    animateButton: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.6,
      },
    },
  };

  // Function to handle button click
  const handleButtonClick = () => {
    const item = props.ContentArray[props.CarouselState];
    // Determine the redirect URL based on the button text
    const redirectUrl =
      item.Button.toLowerCase() === 'order now'
        ? `/redirect.html?type=order&product=${encodeURIComponent(
            item.Heading,
          )}&price=${item.DiscountedPrice}`
        : `/redirect.html?type=details&product=${encodeURIComponent(
            item.Heading,
          )}`;

    // Navigate to the URL
    window.location.href = redirectUrl;
  };

  // Get the current content with the correct image
  const currentContent =
    correctedContentArray[props.CarouselState] ||
    props.ContentArray[props.CarouselState];

  return (
    <div
      ref={props.ElementRef}
      className="relative box-border h-full w-full overflow-x-hidden"
    >
      {isClient && (
        <div className="relative box-border h-full w-full">
          <Image
            className="absolute left-0 top-0 z-[-2] h-full w-full object-cover opacity-70"
            src={currentContent.Image}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAcEAABBAMBAAAAAAAAAAAAAAASAAEDEQQGIQX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIJ6dkXCi0EUaOVDrJtS2vlUY1//2Q=="
            width={400}
            height={400}
            priority={true}
            alt="Banner image"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#000000dd] via-[#00000080] to-[#00000000]"></div>

          <div className="absolute left-[5%] top-[25%] w-[70%]">
            {/* Animate the heading */}
            <motion.h2
              key={`heading-${props.CarouselState}`}
              {...defaultAnimationSettings}
              transition={{
                ...defaultAnimationSettings.transition,
                delay:
                  props.BannerTextTransition === 'opened'
                    ? delayAnimationSettings[0]
                    : 0,
              }}
              className="mb-2 text-2xl font-semibold text-white"
            >
              {currentContent.Heading}
            </motion.h2>

            {/* Animate the description */}
            <motion.p
              key={`description-${props.CarouselState}`}
              {...defaultAnimationSettings}
              transition={{
                ...defaultAnimationSettings.transition,
                delay:
                  props.BannerTextTransition === 'opened'
                    ? delayAnimationSettings[1]
                    : 0,
              }}
              className="mb-4 line-clamp-2 text-sm text-[#ffffffcc]"
            >
              {currentContent.Description}
            </motion.p>

            {/* Animate the original price */}
            <motion.h6
              key={`originalPrice-${props.CarouselState}`}
              {...defaultAnimationSettings}
              transition={{
                ...defaultAnimationSettings.transition,
                delay:
                  props.BannerTextTransition === 'opened'
                    ? delayAnimationSettings[2]
                    : 0,
              }}
              className="text-[12px] text-[#ffffff99] line-through"
            >
              ₹{currentContent.OriginalPrice}
            </motion.h6>

            {/* Animate the discounted price */}
            <motion.h5
              key={`discountedPrice-${props.CarouselState}`}
              {...defaultAnimationSettings}
              transition={{
                ...defaultAnimationSettings.transition,
                delay:
                  props.BannerTextTransition === 'opened'
                    ? delayAnimationSettings[3]
                    : 0,
              }}
              className="mb-5 text-xl font-semibold text-white"
            >
              ₹{currentContent.DiscountedPrice}
            </motion.h5>

            {/* Animate the button */}
            <motion.div
              className="flex w-full justify-start"
              variants={animateBanner}
              initial="initialButton"
              animate={
                props.AnimationState === 'running'
                  ? 'animateButton'
                  : 'initialButton'
              }
            >
              <button
                className="button-text-lower z-[1] flex h-8 items-center justify-center rounded-lg bg-[#FFFFFF1A] px-8 text-white hover:bg-[#FFFFFF33]"
                style={{
                  cursor: 'pointer',
                }}
                onClick={handleButtonClick}
              >
                {currentContent.Button === 'See details'
                  ? 'Explore Now'
                  : currentContent.Button}
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
