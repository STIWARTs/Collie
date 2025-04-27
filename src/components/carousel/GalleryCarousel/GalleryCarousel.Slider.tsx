import { RefObject, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { GalleryCarouselContentProps } from 'contents/gallery/Gallery.Carousel';
import WishlistSVG from '../../../../public/icons/wish.svg';
import { createRef } from 'react';
import { preloadImages, imageExists } from '../../../utils/imagePreload';

export interface GalleryCarouselSliderProps {
  ElementRef?: RefObject<HTMLDivElement>;
  ContentArray: GalleryCarouselContentProps[];
  CarouselState?: number;
  setCarouselState?: React.Dispatch<React.SetStateAction<number>>;
  BannerTextTransition?: string;
  setBannerTextTransition?: React.Dispatch<React.SetStateAction<string>>;
}

export default function GalleryCarouselSlider(
  props: GalleryCarouselSliderProps,
) {
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Define fallback image if needed
  const fallbackImage = '/agewear_white.svg';

  // Preload all images when component mounts
  useEffect(() => {
    console.log('Starting to preload carousel images');

    // Define an array of available images we know exist
    const availableImages = [
      '/images/avatar/illustration/1.png',
      '/images/avatar/illustration/2.png',
      '/images/avatar/illustration/4.png',
      '/images/avatar/illustration/5.png',
      '/images/avatar/illustration/6.png',
      '/images/avatar/illustration/7.png',
      '/images/avatar/illustration/8.png',
      '/images/avatar/illustration/9.png',
      '/images/avatar/illustration/10.png',
    ];

    // Update content array to use known images
    const updateContentArray = () => {
      if (props.ContentArray && props.ContentArray.length > 0) {
        for (let i = 0; i < props.ContentArray.length; i++) {
          if (i < availableImages.length) {
            // Use our available images instead
            const imgElement = document.querySelector(
              `.swiper-slide:nth-child(${i + 1}) img`,
            ) as HTMLImageElement;
            if (imgElement) {
              imgElement.src = availableImages[i];
            }
          }
        }
      }
    };

    // First check if images exist
    const verifyAndPreloadImages = async () => {
      try {
        // Use the preloadImages utility
        await preloadImages(availableImages);
        console.log('All carousel images preloaded successfully');
        setImagesPreloaded(true);

        // Update images after a short delay to ensure DOM is ready
        setTimeout(updateContentArray, 100);
      } catch (error) {
        console.error('Error preloading images:', error);
        // Continue anyway to show what images we can
        setImagesPreloaded(true);
      }
    };

    verifyAndPreloadImages();
  }, [props.ContentArray]);

  // Handle button click to redirect based on content type
  const handleButtonClick = (item: GalleryCarouselContentProps) => {
    // Using the static redirect.html file instead of direct navigation
    if (item.Button.toLowerCase() === 'order now') {
      window.location.href = `/redirect.html?type=order&product=${encodeURIComponent(
        item.Heading,
      )}&price=${item.DiscountedPrice}`;
    } else {
      window.location.href = `/redirect.html?type=details&product=${encodeURIComponent(
        item.Heading,
      )}`;
    }
  };

  // Add to wishlist function (placeholder)
  const addToWishlist = (item: GalleryCarouselContentProps) => {
    console.log(`Added ${item.Heading} to wishlist`);
    // Implement wishlist functionality here
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
    console.log(
      `Image ${index + 1} loaded successfully: ${
        props.ContentArray[index].Image
      }`,
    );
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
    console.error(
      `Failed to load image ${index + 1}: ${props.ContentArray[index].Image}`,
    );
    // If the target element exists, set a fallback source
    const imageElements = document.querySelectorAll('.swiper-slide img');
    if (imageElements[index]) {
      // Try an alternative image path if the original fails
      const originalPath = props.ContentArray[index].Image;
      const alternativePath = originalPath.replace(
        '/images/avatar/illustration',
        '/images/avatar',
      );

      // Use any of the alternative approaches below:
      // 1. Use a generic avatar image if available
      (imageElements[index] as HTMLImageElement).src =
        '/images/avatar/gsgs.png';

      console.log(`Applied fallback image for index ${index}`);
    }
  };

  // If images haven't been preloaded yet, show a simple loading indicator
  if (!imagesPreloaded) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div ref={props.ElementRef} className="relative box-border w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        className="gallery-carousel"
        slidesPerView={'auto'}
        grabCursor={true}
        spaceBetween={24}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        onAutoplayPause={() => {
          setAutoplayEnabled(false);
        }}
        onAutoplayResume={() => {
          setAutoplayEnabled(true);
        }}
        onActiveIndexChange={(swiper) => {
          props.setBannerTextTransition &&
            props.setBannerTextTransition('closed');
          props.setCarouselState && props.setCarouselState(swiper.activeIndex);
        }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        observer={true}
        observeParents={true}
      >
        {props.ContentArray.map((item, index) => (
          <SwiperSlide key={index} className="relative h-[250px] w-[200px]">
            <Image
              className="absolute left-0 top-0 z-[-2] h-full w-full object-cover"
              src={item.Image}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAcEAABBAMBAAAAAAAAAAAAAAASAAEDEQQGIQX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIJ6dkXCi0EUaOVDrJtS2vlUY1//2Q=="
              width={200}
              height={250}
              priority={true}
              alt={`Gallery image ${index + 1}`}
              onLoadingComplete={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
              unoptimized={true}
            />
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-[#00000010] via-[#00000020] to-[#000000c0]"></div>
            <div className="relative top-[60%] box-border flex w-full flex-col space-y-1 px-5 text-white">
              <h3 className="text-size-14 font-semibold">{item.Heading}</h3>
              <h5 className="text-[10px] opacity-70">
                {item.Description.substring(0, 40)}...
              </h5>
              <div className="flex items-center space-x-1">
                <h6 className="text-[10px] line-through opacity-70">
                  ₹{item.OriginalPrice}
                </h6>
                <h6 className="text-[12px]">₹{item.DiscountedPrice}</h6>
              </div>
              <div className="mt-1 flex items-center justify-start space-x-2">
                <button
                  onClick={() => handleButtonClick(item)}
                  className="rounded-md bg-white px-3 py-1 text-[10px] font-semibold text-black transition-all hover:bg-opacity-80 active:bg-opacity-70"
                >
                  {item.Button == 'See details' ? 'Explore' : 'Order now'}
                </button>
                <button
                  onClick={() => addToWishlist(item)}
                  className="grid h-[25px] w-[25px] place-items-center rounded-md border border-white text-[10px] font-semibold transition-all hover:bg-white hover:bg-opacity-10 active:bg-opacity-20"
                >
                  <Image
                    src={WishlistSVG.src}
                    alt="add to wishlist"
                    width={15}
                    height={15}
                  />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows */}
      <div className="absolute top-1/2 z-10 flex w-full -translate-y-1/2 justify-between px-4">
        <button
          onClick={() => swiperInstance?.slidePrev()}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/10 backdrop-blur-[3px] transition-all duration-300 hover:bg-white/20 active:bg-white/30"
        >
          <span className="sr-only">Previous</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={() => swiperInstance?.slideNext()}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/10 backdrop-blur-[3px] transition-all duration-300 hover:bg-white/20 active:bg-white/30"
        >
          <span className="sr-only">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
