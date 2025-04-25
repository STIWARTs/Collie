import RotateSlider from 'components/slider/RotateSlider';

interface IProps {
  setRotateValue: React.Dispatch<React.SetStateAction<number>>;
  rotate: (value: number) => void;
  SliderRef: React.RefObject<HTMLElement>;
}

export function CropAvatarSlider(props: IProps) {
  return (
    <div className="relative mx-auto w-full px-5 pt-5 sm:max-w-[470px]">
      <RotateSlider
        SliderRef={props.SliderRef}
        getValue={(value) => {
          props.rotate(parseInt(value.toString()));
          props.setRotateValue(parseInt(value.toString()));
        }}
      />
    </div>
  );
}
