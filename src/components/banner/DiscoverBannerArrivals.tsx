import { Button } from '@mui/material';
import Image from 'next/image';
import { DiscoverBannerLightingDealContentProps } from 'contents/home/discover/Home.Discover.Banner';
import { DiscoverBannerArrivalsBrowser } from './MultiScreen/DiscoverBannerArrivals.MultiScreen';

interface IProps {
  ContentArray: DiscoverBannerLightingDealContentProps[];
}

export function DiscoverBannerArrivals(props: IProps) {
  return (
    <div className="relative box-border flex w-full overflow-hidden pr-3">
      <div className="mt-10 flex w-full space-x-7 rounded-3xl bg-gradient-to-l from-dark-green p-10 px-7 text-white">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-3 small-medium-screen:items-start">
            <div className="flex items-center justify-center space-x-3">
              <Image height={30} width={30} src="/icons/arrivals.svg" alt="" />
              <h6 className="text-[18px]">New arrivals</h6>
            </div>
            <Button
              className="button-text-lower cursor-default rounded-lg bg-gradient-to-l from-[#ffffff20] px-[42px] py-3 text-xs font-normal tracking-[1px] text-white transition-colors duration-300 ease-out"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#ffffff20 !important',
                },
              }}
            >
              See details
            </Button>
          </div>
        </div>
        <DiscoverBannerArrivalsBrowser ContentArray={props.ContentArray} />
        {/* <DiscoverBannerArrivalsMobile ContentArray={props.ContentArray} /> */}
      </div>
    </div>
  );
}
