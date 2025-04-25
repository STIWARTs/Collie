import { DiscoverSliderContentProps } from 'contents/home/discover/Home.Discover.Slider';
import { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';
import ScrollContainer from 'react-indiana-drag-scroll';
import ProductContextMenu from 'components/button/ProductContextMenu';
import { useRouter } from 'next/navigation';

const HeadingStyle =
  'text-[14px] font-[500] tracking-wide text-left w-full truncate';
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
        slidesPerView={2}
        spaceBetween={15}
        loop={true}
        wrapperTag="ul"
        className="flex w-full"
        style={{
          paddingLeft: 20,
          paddingRight: 20,
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
              className="button-text-lower group m-0 flex h-full w-full space-y-1 p-0 text-white"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#ffffff80 !important',
                },
              }}
            >
              <div className="flex w-full flex-col">
                <div className="relative w-full overflow-hidden">
                  <div className="absolute z-[1] flex h-[98%] w-full items-start justify-end rounded-md bg-gradient-to-bl from-[#0000004d] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <motion.button
                      onClick={() => handleWishlistClick(index)}
                      whileTap={{ scale: 0.9 }}
                      className="p-2"
                    >
                      {props.Wishlist === index ? (
                        <HeartIconSolid className="h-7 w-7 text-white opacity-100" />
                      ) : (
                        <HeartIconOutline className="h-7 w-7 text-white opacity-80" />
                      )}
                    </motion.button>
                  </div>
                  <Image
                    height={240}
                    width={188}
                    className={ImageStyle}
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
                <h6 className={HeadingStyle}>{value.Heading}</h6>
                <div className="flex items-center space-x-1 pt-2 text-xs sm-500:space-x-2">
                  <h6 className={`hidden xs-400:block ${DiscountStyle}`}>
                    {value.Discount}
                  </h6>
                  <h6 className={OriginalPriceStyle}>
                    {`₹${value.OriginalPrice}`}
                  </h6>
                  <h6
                    className={DiscountedPriceStyle}
                  >{`₹${value.DiscountedPrice}`}</h6>
                </div>
              </div>
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
