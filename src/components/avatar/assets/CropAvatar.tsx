import { useRef, useState } from 'react';
import {
  CircleStencil,
  FixedCropper,
  CropperProps,
  isNumber,
  isInitializedState,
  ImageRestriction,
  FixedCropperRef,
  FixedCropperSettings,
  DefaultSize,
  ExtendedSettings,
  CropperState,
  Size,
  StencilSize,
} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import 'react-advanced-cropper/dist/themes/compact.css';
import { CropAvatarBottom } from './CropAvatar/CropAvatarBottom';
import { CropAvatarNavigation } from './CropAvatar/CropAvatarNavigation';
import { CropAvatarSlider } from './CropAvatar/CropAvatarSlider';
import { CropAvatarZoom } from './CropAvatar/CropAvatarZoom';
import { CropAvatarTop } from './CropAvatar/CropAvatarTop';
import {
  isEqualState,
  getAbsoluteZoom,
  getVisibleAreaSize,
} from './cropper/CropperAlgorithms';

export interface DefaultCropperProps extends CropperProps {
  URL: string;
  getURL: (value: string) => void;
  back: () => void;
  submit: (value: File) => void;
  moreInfo: (event: React.MouseEvent<HTMLElement>) => void;
}

function CropAvatar({ URL, back, ...props }: DefaultCropperProps) {
  const [changed, setChanged] = useState(false);
  const [RotateValue, setRotateValue] = useState(0);
  const [ZoomValue, setZoomValue] = useState(0);

  const cropperRef = useRef<FixedCropperRef>(null);
  const sliderRef = useRef<HTMLElement>(null);

  const defaultSize: DefaultSize<ExtendedSettings<FixedCropperSettings>> = (
    state: CropperState,
  ): Size => {
    const { imageSize, visibleArea } = state;
    return {
      width: (visibleArea || imageSize).width,
      height: (visibleArea || imageSize).height,
    };
  };

  const stencilSize: StencilSize<ExtendedSettings<FixedCropperSettings>> = (
    state: CropperState,
  ): Size => {
    const { imageSize } = state;
    return {
      width: imageSize.height,
      height: imageSize.height,
    };
  };

  const onChange = (cropper: FixedCropperRef) => {
    const currentCoordinates = cropper.getCoordinates();
    const defaultCoordinates = cropper.getDefaultState()?.coordinates;
    const currentFlip = cropper.getTransforms().flip;
    const defaultFlip = cropper.getDefaultState()?.transforms.flip;
    const currentRotate = cropper.getTransforms().rotate;
    const defaultRotate = cropper.getDefaultState()?.transforms.rotate;
    if (currentCoordinates && defaultCoordinates && defaultFlip)
      setChanged(
        isEqualState(currentCoordinates, defaultCoordinates) ||
          isEqualState(currentFlip, defaultFlip) ||
          currentRotate !== defaultRotate,
      );
    ChangeZoomValue();
  };

  const flip = (horizontal: boolean, vertical: boolean) => {
    const cropper = cropperRef.current;
    if (cropper) {
      if (cropper.getTransforms().rotate % 180 !== 0)
        cropper.flipImage(!horizontal, !vertical);
      else cropper.flipImage(horizontal, vertical);
    }
  };

  const rotate = (angle: number) => {
    const cropper = cropperRef.current;
    if (cropper) cropper.rotateImage(RotateValue - angle);
  };

  const onZoom = (value: number) => {
    const cropper = cropperRef.current;
    if (cropper) {
      const state = cropper.getState();
      const settings = cropper.getSettings();
      const absoluteZoom = isInitializedState(state)
        ? getAbsoluteZoom(state, cropper.getSettings())
        : 0;
      if (cropper && isInitializedState(state)) {
        cropper.zoomImage(
          getVisibleAreaSize(state, settings, absoluteZoom) /
            getVisibleAreaSize(state, settings, value),
          {
            transitions: !!true,
          },
        );
      }
    }
  };

  const onZoomIn = () => {
    if (isNumber(ZoomValue)) {
      setZoomValue(Math.min(1, ZoomValue + 0.1));
      onZoom(Math.min(1, ZoomValue + 0.1));
    }
  };

  const onZoomOut = () => {
    if (isNumber(ZoomValue)) {
      setZoomValue(Math.min(1, ZoomValue - 0.1));
      onZoom(Math.min(1, ZoomValue - 0.1));
    }
  };

  const ChangeZoomValue = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const state = cropper.getState();
      const absoluteZoom = isInitializedState(state)
        ? getAbsoluteZoom(state, cropper.getSettings())
        : 0;
      setZoomValue(absoluteZoom);
    }
  };

  const reset = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      cropper.setState(cropper.getDefaultState());
      setZoomValue(0);
      setRotateValue(0);
      const slider = sliderRef.current;
      if (slider) {
        slider.scrollTo({ left: 544, top: 0, behavior: 'smooth' });
      }
    }
  };

  const RotateLeft = () => rotate(90);

  const RotateRight = () => rotate(-90);

  const FlipX = () => flip(true, false);

  const FlipY = () => flip(false, true);

  const submit = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      cropper.getCanvas()?.toBlob((blob: unknown) => {
        const ImageFile = new File([blob as BlobPart], 'userAvatar.png', {
          type: 'image/png',
        });
        if (ImageFile) {
          props.getURL(`${cropper.getCanvas()?.toDataURL()}`);
          props.submit(ImageFile);
        }
      }, 'image/png');
    }
  };

  return (
    <div className="Select-And-Crop-Avatar-Container relative box-border flex h-full w-full flex-col items-center overflow-hidden overscroll-none bg-secondary-theme">
      <div className="z-[1] flex h-[150px] w-full flex-col">
        <CropAvatarTop
          heading="Edit profile picture"
          back={back}
          moreInfo={props.moreInfo}
        />
        <CropAvatarNavigation
          ResetClick={reset}
          Changed={changed}
          RotateLeft={RotateLeft}
          RotateRight={RotateRight}
          FlipX={FlipX}
          FlipY={FlipY}
        />
      </div>
      <FixedCropper
        src={URL}
        ref={cropperRef}
        onChange={onChange}
        defaultSize={defaultSize}
        stencilSize={stencilSize}
        stencilComponent={CircleStencil}
        imageRestriction={ImageRestriction.stencil}
        stencilProps={{
          movable: false,
          grid: true,
          gridClassName: 'CropAvatar-Stencil-grid',
          overlayClassName: 'CropAvatar-Stencil-overlay',
          previewClassName: 'CropAvatar-Stencil-preview',
          handlerClassNames: { default: 'CropAvatar-Stencil-handler' },
          lineClassNames: { default: 'CropAvatar-Stencil-line' },
        }}
        className={
          'cropper circle-stencil CropAvatar-background relative -mb-[228px] -mt-[150px] flex h-full w-full cursor-grab px-5 pb-[234px] pt-[156px] active:cursor-grabbing'
        }
      />
      <div className="relative z-[1] flex h-[228px] w-full flex-col">
        <CropAvatarSlider
          rotate={rotate}
          SliderRef={sliderRef}
          setRotateValue={setRotateValue}
        />
        <CropAvatarZoom
          ZoomValue={ZoomValue}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
        />
        <CropAvatarBottom back={back} submitClick={submit} />
      </div>
    </div>
  );
}

export default CropAvatar;
