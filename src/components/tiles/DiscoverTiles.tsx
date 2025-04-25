import { DiscoverTilesContentProps } from '../../contents/home/discover/Home.Discover.Tiles';
import { DiscoverTilesBrowser } from './MultiScreen/DiscoverTiles.MultiScreen';

interface IProps {
  ContentArray: DiscoverTilesContentProps[];
  Label: string;
}

function DiscoverTiles(props: IProps) {
  return (
    <div className="m-0 mt-5 box-border flex flex-col overflow-x-hidden overflow-y-visible p-0 px-3 text-white">
      <DiscoverTilesBrowser
        Label={props.Label}
        ContentArray={props.ContentArray}
      />
      {/* <DiscoverTilesMobile ContentArray={props.ContentArray} /> */}
    </div>
  );
}

export default DiscoverTiles;
