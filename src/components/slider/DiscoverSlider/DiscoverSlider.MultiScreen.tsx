import { DiscoverSliderContentProps } from 'contents/home/discover/Home.Discover.Slider';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Virtual } from 'swiper/modules';
import SwiperCore from 'swiper';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';
import ScrollContainer from 'react-indiana-drag-scroll';
import ProductContextMenu from 'components/button/ProductContextMenu';
import { useRouter } from 'next/navigation';

const HeadingStyle =
  'text-size-14 font-[500] tracking-wide text-left w-full truncate';
const DescriptionStyle =
  'text-[13px] font-normal text-left w-full opacity-[0.75] leading-[18px] line-clamp-2';
const DiscountStyle =
  'bg-primary-blue-rgb font-[600] text-[11px] py-[5px] px-[10px] mr-[2px] rounded-md';
const OriginalPriceStyle = ' line-through text-[12px] opacity-70';
const DiscountedPriceStyle = ' text-[13px]';
const ImageStyle = 'rounded-xl';

export interface DiscoverSliderBrowserProps {
  ContentArray: DiscoverSliderContentProps[];
  sliderRef: React.RefObject<HTMLElement>;
  Wishlist: number;
  setWishlist: React.Dispatch<React.SetStateAction<number>>;
  setLeftDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setRightDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DiscoverSliderBrowser(props: DiscoverSliderBrowserProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      // synthetic event
      switch (event.type) {
        case 'contextmenu':
          setAnchorEl(event.currentTarget);
          break;
        case 'click':
          // Get the product name from the data attribute
          const productName =
            event.currentTarget.getAttribute('data-product-name');
          if (productName) {
            router.push(`/details?product=${encodeURIComponent(productName)}`);
          }
          break;
      }
      // native event
      switch (event.nativeEvent.button) {
        case 2:
          setAnchorEl(event.currentTarget);
          break;
      }
    },
    [router],
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ListenToSliderScroll = () => {
    const slider = props.sliderRef.current;
    if (slider) {
      if (slider.scrollLeft === 0) {
        props.setLeftDisabled(true);
      } else {
        props.setLeftDisabled(false);
      }
      const maxScroll = slider.scrollWidth - slider.offsetWidth;
      if (slider.scrollLeft === maxScroll) {
        props.setRightDisabled(true);
      } else {
        props.setRightDisabled(false);
      }
    }
  };

  useEffect(() => {
    const slider = props.sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', ListenToSliderScroll);
    }
    return () => {
      if (slider) slider.removeEventListener('scroll', ListenToSliderScroll);
    };
  });

  useEffect(() => {
    const slider = props.sliderRef.current;
    if (slider) {
      if (slider.scrollLeft === 0) props.setLeftDisabled(true);
      else props.setLeftDisabled(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const MenuContent = [
    {
      label: 'Open',
      icon: '/icons/open-link.svg',
    },
    {
      label: 'Add to cart',
      icon: '/icons/shopping-list-cart.svg',
    },
    {
      label: 'Save to wishlist',
      icon: '/icons/shopping-list-wishlist.svg',
    },
  ];

  const handleMenuItemClick = (action: string, productName: string) => {
    handleClose();

    // Find the product in the ContentArray
    const product = props.ContentArray.find(
      (item) => item.Heading === productName,
    );

    if (!product) return;

    switch (action) {
      case 'Open':
        router.push(`/details?product=${encodeURIComponent(productName)}`);
        break;
      case 'Add to cart':
        alert(`Added ${productName} to cart`);
        break;
      case 'Save to wishlist':
        const index = props.ContentArray.findIndex(
          (item) => item.Heading === productName,
        );
        if (index !== -1) {
          props.setWishlist(index);
        }
        alert(`Added ${productName} to wishlist`);
        break;
    }
  };

  return (
    <div className="box-border flex w-full">
      <>
        <ScrollContainer
          vertical={false}
          hideScrollbars={true}
          innerRef={props.sliderRef}
          component="ul"
          className="box-border flex w-full space-x-4 scroll-smooth px-0"
          style={{
            paddingRight: 12,
            paddingLeft: 12,
          }}
        >
          {props.ContentArray.map((value, index) => (
            <Button
              key={index}
              component="li"
              disableFocusRipple
              onClick={handleClick}
              onContextMenu={handleClick}
              data-product-name={value.Heading}
              className="button-text-lower group m-0 min-w-[220px] cursor-pointer space-y-1 rounded-xl bg-white/5 p-4 text-white transition-all hover:bg-white/10"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#ffffff80 !important',
                },
              }}
            >
              <div className="relative flex w-full flex-col space-y-2.5">
                <div className="relative w-full overflow-hidden">
                  <Image
                    height={240}
                    width={188}
                    className={`${ImageStyle} transition-transform duration-300 group-hover:scale-105`}
                    src={value.Image}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      maxHeight: 240,
                      maxWidth: 188,
                    }}
                    alt=""
                  />
                </div>
                <div className="flex w-full flex-col">
                  <div className={HeadingStyle}>{value.Heading}</div>
                  <h6 className={DescriptionStyle}>{value.Description}</h6>
                  <div className="block h-5 w-full" />
                  <div className="flex items-center space-x-2 pt-1 text-xs">
                    <h6 className={DiscountStyle}>{value.Discount}</h6>
                    <div className="flex space-x-2 rounded-md bg-white/5 px-[8px] py-[5px]">
                      <h6 className={OriginalPriceStyle}>
                        {`₹${value.OriginalPrice}`}
                      </h6>
                      <h6
                        className={DiscountedPriceStyle}
                      >{`₹${value.DiscountedPrice}`}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </ScrollContainer>
        <ProductContextMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          MenuContent={MenuContent}
          minWidth={220}
          TransformHorizontal={'center'}
          TransformVertical={'center'}
          AnchorHorizontal={'center'}
          AnchorVertical={'center'}
          onItemClick={(action) => {
            const productName =
              anchorEl?.getAttribute('data-product-name') || '';
            handleMenuItemClick(action, productName);
          }}
        />
      </>
    </div>
  );
}

export interface DiscoverSliderMobileProps {
  ContentArray: DiscoverSliderContentProps[];
  Wishlist: number;
  setWishlist: React.Dispatch<React.SetStateAction<number>>;
}

export function DiscoverSliderMobile(props: DiscoverSliderMobileProps) {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const [swiperInitialized, setSwiperInitialized] = useState(false);

  // Function to be called from outside to navigate left
  const slideLeft = useCallback(() => {
    if (swiperRef.current) {
      console.log('Sliding left in mobile slider');
      swiperRef.current.slidePrev();
    } else {
      console.error('Swiper instance not available for left navigation');
    }
  }, []);

  // Function to be called from outside to navigate right
  const slideRight = useCallback(() => {
    if (swiperRef.current) {
      console.log('Sliding right in mobile slider');
      swiperRef.current.slideNext();
    } else {
      console.error('Swiper instance not available for right navigation');
    }
  }, []);

  // Expose the navigation functions - with dependencies to ensure latest instance is used
  useEffect(() => {
    if (swiperInitialized) {
      console.log(
        'Registering global navigation functions with initialized swiper',
      );
      window.slideDiscoverLeft = slideLeft;
      window.slideDiscoverRight = slideRight;

      return () => {
        console.log('Unregistering global navigation functions');
        window.slideDiscoverLeft = undefined;
        window.slideDiscoverRight = undefined;
      };
    }
  }, [swiperInitialized, slideLeft, slideRight]);

  const handleWishlistClick = (index: number) => {
    const product = props.ContentArray[index];
    // Toggle wishlist status
    if (props.Wishlist === index) {
      // Already in wishlist, do nothing visual (keep heart solid)
      // But we could remove from wishlist context here if needed
    } else {
      // Add to wishlist
      props.setWishlist(index);
    }
  };

  return (
    <div className="flex h-full w-full">
      <Swiper
        onSwiper={(swiper) => {
          console.log('Swiper instance created and stored');
          swiperRef.current = swiper;
          setSwiperInitialized(true);
        }}
        modules={[FreeMode, Mousewheel, Virtual]}
        slidesPerView={3}
        spaceBetween={8}
        initialSlide={0}
        loop={true}
        freeMode={{
          enabled: true,
          sticky: false,
          momentumRatio: 0.25,
          momentumVelocityRatio: 0.5,
        }}
        mousewheel={{
          forceToAxis: true,
        }}
        touchRatio={1.5}
        touchAngle={30}
        grabCursor={true}
        wrapperTag="ul"
        className="mobile-product-slider flex w-full touch-pan-y"
        style={{
          paddingLeft: 12,
          paddingRight: 12,
        }}
      >
        {props.ContentArray.map((value, index) => (
          <SwiperSlide
            key={index}
            tag="li"
            className="m-0 box-border flex h-full w-full p-0"
          >
            <Button
              disableFocusRipple
              onClick={() =>
                router.push(
                  `/details?product=${encodeURIComponent(value.Heading)}`,
                )
              }
              className="button-text-lower group m-0 flex h-full w-full flex-col space-y-1 p-1 text-white"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#ffffff80 !important',
                },
              }}
            >
              <div className="flex w-full flex-col">
                <div className="relative w-full overflow-hidden rounded-lg">
                  <div className="absolute z-[1] flex h-[98%] w-full items-start justify-end rounded-md bg-gradient-to-bl from-[#0000004d] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <motion.div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistClick(index);
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer p-2"
                    >
                      {props.Wishlist === index ? (
                        <HeartIconSolid className="h-5 w-5 text-white opacity-100" />
                      ) : (
                        <HeartIconOutline className="h-5 w-5 text-white opacity-80" />
                      )}
                    </motion.div>
                  </div>
                  <Image
                    height={150}
                    width={110}
                    className={ImageStyle}
                    src={value.Image}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      height: 150,
                      width: '100%',
                      borderRadius: '8px',
                    }}
                    alt=""
                  />
                </div>
                <h6 className="text-size-12 mt-1 w-full truncate text-left font-[500] tracking-wide">
                  {value.Heading}
                </h6>
                <div className="flex items-center space-x-1 text-[10px]">
                  <h6 className="text-[10px] line-through opacity-70">
                    ₹{value.OriginalPrice}
                  </h6>
                  <h6 className="text-[11px]">₹{value.DiscountedPrice}</h6>
                </div>
              </div>
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
