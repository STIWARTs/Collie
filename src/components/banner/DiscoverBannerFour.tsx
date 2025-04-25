import { DiscoverBannerFourContentProps } from 'contents/home/discover/Home.Discover.Banner';
import { DiscoverBannerFourBrowser } from './MultiScreen/DiscoverBannerFour.MultiScreen';

interface IProps {
  ContentArray: DiscoverBannerFourContentProps[];
}

function DiscoverBannerFour(props: IProps) {
  return (
    <div className="mt-10 flex w-full overflow-x-hidden overflow-y-visible">
      <DiscoverBannerFourBrowser ContentArray={props.ContentArray} />
      {/* <DiscoverBannerFourMobile ContentArray={props.ContentArray} /> */}
    </div>
  );
}

export default DiscoverBannerFour;
