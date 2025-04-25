import Image from 'next/image';
import { Button } from '@mui/material';
import { Rectangle_BlurDataURL } from '../loading/BlurDataURL';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function DiscoverCatalog() {
  return (
    <div className="relative my-[50px] box-border flex h-full w-full overflow-x-hidden overflow-y-visible bg-transparent px-3">
      <div className="relative box-border flex h-[250px] w-full flex-row space-x-14 small-medium-screen:h-[300px]">
        <div className="flex h-full w-full max-w-[0%] small-medium-screen:max-w-[50%] medium-screen:max-w-[65%]">
          <div className="absolute z-[1] h-full w-full rounded-xl bg-gradient-to-l from-dark-orange" />
          <Image
            className="rounded-xl"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src="/images/avatar/illustration/5.png"
            blurDataURL={Rectangle_BlurDataURL}
            alt=""
          />
        </div>
        <div className="relative z-[2] flex h-full w-full max-w-[65%] items-center justify-start small-medium-screen:max-w-[50%] medium-screen:max-w-[35%]">
          <div className="flex flex-col w-full space-y-2 text-white">
            <div className="w-full text-[14px] font-[500] small-screen:text-[30px]">
              Explore our Gallery
            </div>
            <h6 className="w-full whitespace-normal text-left text-[13px] font-normal leading-[18px] opacity-[0.75] small-screen:text-[16px]">
              Browse by genre, features, price and more to find your next
              favorite look.
            </h6>
            <div className="flex justify-start w-full">
              <Button
                disableFocusRipple
                className="button-text-lower cursor-default rounded-lg bg-super-dark-orange px-8 py-2 text-[12px] font-[500] tracking-wide text-white transition-all small-screen:mt-3 small-screen:px-10 small-medium-screen:mt-10"
                sx={{
                  '.MuiTouchRipple-child': {
                    backgroundColor: '#ffffff30 !important',
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
        </div>
      </div>
    </div>
  );
}
