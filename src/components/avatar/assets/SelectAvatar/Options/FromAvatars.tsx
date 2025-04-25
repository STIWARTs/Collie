import { AvatarCollections } from 'components/avatar/assets/SelectAvatar/AvatarCollections/AvatarCollections';
import { IllustrationCollections } from 'components/avatar/assets/SelectAvatar/AvatarCollections/IllustrationCollections';

interface IProps {
  show: () => void;
  backBool: (value: boolean) => void;
  ShowCollection: () => void;
  getURL: (value: string) => void;
  heading: (value: string) => void;
  avatarName: (value: string) => void;
}

function FromAvatars(props: IProps) {
  const AnimalClick = () => {
    props.heading('Animals');
    props.avatarName('Animal');
    props.ShowCollection();
  };
  const EmojiClick = () => {
    props.heading('Emojies');
    props.avatarName('Emoji');
    props.ShowCollection();
  };
  const FestivalClick = () => {
    props.heading('Festivals');
    props.avatarName('Festival');
    props.ShowCollection();
  };
  const HandDrwaingClick = () => {
    props.heading('Hand Drawings');
    props.avatarName('Handdrawing');
    props.ShowCollection();
  };
  const FlatClick = () => {
    props.heading('Flats');
    props.avatarName('Flat');
    props.ShowCollection();
  };
  const HipsterClick = () => {
    props.heading('Hipsters');
    props.avatarName('Hipster');
    props.ShowCollection();
  };
  const PaintClick = () => {
    props.heading('Paints');
    props.avatarName('Paint');
    props.ShowCollection();
  };
  const MinimalClick = () => {
    props.heading('Minimals');
    props.avatarName('Minimal');
    props.ShowCollection();
  };
  const PlainClick = () => {
    props.heading('Plains');
    props.avatarName('Plain');
    props.ShowCollection();
  };
  return (
    <div className="box-border flex h-full w-full flex-col items-center space-y-5 overflow-y-auto overflow-x-hidden scroll-smooth py-3">
      <AvatarCollections
        AnimalClick={AnimalClick}
        EmojiClick={EmojiClick}
        FestivalClick={FestivalClick}
        HandDrawingClick={HandDrwaingClick}
        FlatClick={FlatClick}
        HispterClick={HipsterClick}
        PaintClick={PaintClick}
        MinimalClick={MinimalClick}
        PlainClick={PlainClick}
        getURL={props.getURL}
        show={props.show}
        backBool={props.backBool}
      />
      <IllustrationCollections
        getURL={props.getURL}
        show={props.show}
        backBool={props.backBool}
      />
    </div>
  );
}

export default FromAvatars;
