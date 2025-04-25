import { DiscoverBannerFiveContentProps } from 'contents/home/discover/Home.Discover.Banner';
import { DiscoverBannerFiveBrowser } from './MultiScreen/DiscoverBannerFive.MultiScreen';

interface IProps {
  ContentArray: DiscoverBannerFiveContentProps[];
  Label: string;
}

function DiscoverBannerFive(props: IProps) {
  return (
    <div className="m-0 mt-[30px] box-border flex flex-col overflow-x-hidden overflow-y-visible p-0 text-white">
      <DiscoverBannerFiveBrowser
        Label={props.Label}
        ContentArray={props.ContentArray}
      />
      {/* <DiscoverBannerFiveMobile ContentArray={props.ContentArray} /> */}
    </div>
  );
}

export default DiscoverBannerFive;
