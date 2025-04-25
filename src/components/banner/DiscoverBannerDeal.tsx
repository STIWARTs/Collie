import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { DiscoverBannerLightingDealContentProps } from 'contents/home/discover/Home.Discover.Banner';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import ProductContextMenu from 'components/button/ProductContextMenu';

interface IProps {
  ContentArray: DiscoverBannerLightingDealContentProps[];
  Badge: React.ReactNode;
  Label: string;
  Description: string;
}

function DiscoverBannerDeal(props: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // synthetic event
    switch (event.type) {
      case 'contextmenu':
        setAnchorEl(event.currentTarget);
        break;
    }
    // native event
    switch (event.nativeEvent.button) {
      case 2:
        setAnchorEl(event.currentTarget);
        break;
    }
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  return (
    <div className="relative flex w-full p-3 mt-8">
      <div className="relative flex items-center w-full space-x-5 overflow-hidden rounded-xl bg-white/5">
        {/* Title */}
        <div className="mx-auto flex w-full min-w-[300px] max-w-[300px] cursor-default flex-col space-y-4 py-10 pl-10 text-white">
          <div className="flex justify-start">{props.Badge}</div>
          <div className="flex flex-col w-full space-y-2">
            <div className="text-[30px] font-[500] leading-[35px] tracking-wide text-white">
              {props.Label}
            </div>
            <div className="text-[13px] font-[300] tracking-wide text-white opacity-[0.85]">
              {props.Description}
            </div>
          </div>
          <div className="flex justify-start w-full pt-2">
            <Button
              className={`button-text-lower z-[1] flex h-8 cursor-default items-center rounded-lg bg-white/5 px-8 text-white hover:bg-white/10`}
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#ffffff50 !important',
                },
              }}
            >
              <div className="flex items-center justify-center space-x-2">
                <ChevronRightIcon className="h-4" />
                <p className="text-[12px] font-[400] tracking-wide">
                  See details
                </p>
              </div>
            </Button>
          </div>
        </div>
        {/* Content */}
        <>
          <Swiper
            effect='creative'
            slidesPerView={5}
            spaceBetween={16}
            wrapperTag="ul"
            className="relative flex h-full"
            style={{
              paddingTop: 16,
              paddingBottom: 16,
              paddingLeft: 40,
              margin: 0,
            }}
          >
            {props.ContentArray.map((value, idx) => (
              <SwiperSlide
                key={idx}
                tag="li"
                onClick={handleClick}
                onContextMenu={handleClick}
                className={`bg-${value.Color}-shadow button-text-lower group max-w-[220px] cursor-default space-y-1 rounded-xl bg-white/5 p-4 text-white transition-all hover:bg-white/10`}
              >
                <div className="relative flex flex-col w-full">
                  <div className="relative w-full overflow-hidden">
                    <Image
                      height={240}
                      width={188}
                      className="rounded-xl"
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
                  <div className="mt-2.5 w-full truncate text-left text-[14px] font-[500] tracking-wide">
                    {value.Heading}
                  </div>
                  <h6 className="mt-1 line-clamp-2 w-full text-left text-[13px] font-normal leading-[18px] opacity-[0.75]">
                    {value.Description}
                  </h6>
                  <div className="block w-full h-5" />
                  <div className="flex items-center pt-1 space-x-2 text-xs">
                    <div className="flex space-x-2 rounded-md bg-white/5 px-[8px] py-[5px]">
                      <h6 className="text-[12px] line-through opacity-70">
                        {`₹${value.OriginalPrice}`}
                      </h6>
                      <h6 className="text-[13px]">{`₹${value.DiscountedPrice}`}</h6>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
          />
        </>
      </div>
    </div>
  );
}

export default DiscoverBannerDeal;
