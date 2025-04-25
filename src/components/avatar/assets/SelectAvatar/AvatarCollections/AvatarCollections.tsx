import { PhotoIcon } from '@heroicons/react/24/solid';
import { Button } from '@mui/material';
import {
  Banner_BlurDataURL,
  Square_BlurDataURL,
} from 'components/loading/BlurDataURL';
import Image from 'next/image';

interface IProps {
  AnimalClick: () => void;
  EmojiClick: () => void;
  FestivalClick: () => void;
  HandDrawingClick: () => void;
  FlatClick: () => void;
  HispterClick: () => void;
  PaintClick: () => void;
  MinimalClick: () => void;
  PlainClick: () => void;
  getURL: (value: string) => void;
  backBool: (value: boolean) => void;
  show: () => void;
}

const BlurDataUrl = Banner_BlurDataURL;
const BlurDataUrlSquare = Square_BlurDataURL;

const AnimalBannerImage = '/images/avatar/banner/animal.png';
const EmojiBannerImage = '/images/avatar/banner/emoji.png';
const FestivalBannerImage = '/images/avatar/banner/festival.png';
const HandDrawingBannerImage = '/images/avatar/banner/hand-drawing.png';
const FlatBannerImage = '/images/avatar/banner/flat.png';
const HipsterBannerImage = '/images/avatar/banner/hipster.png';
const PaintBannerImage = '/images/avatar/banner/paint.png';
const MinimalBannerImage = '/images/avatar/banner/minimal.png';
const PlainBannerImage = '/images/avatar/banner/plain.png';
const PopularImage1 = '/images/avatar/popular/1.png';
const PopularImage2 = '/images/avatar/popular/2.png';
const PopularImage3 = '/images/avatar/popular/3.png';
const PopularImage4 = '/images/avatar/popular/4.png';

export function AvatarCollections(props: IProps) {
  // Banner
  const AnimalClick = () => {
    props.AnimalClick();
    props.backBool(false);
  };
  const EmojiClick = () => {
    props.EmojiClick();
    props.backBool(false);
  };
  const FestivalClick = () => {
    props.FestivalClick();
    props.backBool(false);
  };
  const HandDrawingClick = () => {
    props.HandDrawingClick();
    props.backBool(false);
  };
  const FlatClick = () => {
    props.FlatClick();
    props.backBool(false);
  };
  const HispterClick = () => {
    props.HispterClick();
    props.backBool(false);
  };
  const PaintClick = () => {
    props.PaintClick();
    props.backBool(false);
  };
  const MinimalClick = () => {
    props.MinimalClick();
    props.backBool(false);
  };
  const PlainClick = () => {
    props.PlainClick();
    props.backBool(false);
  };
  // Popular
  const Popular1Click = () => {
    props.getURL(PopularImage1);
    props.backBool(true);
    props.show();
  };
  const Popular2Click = () => {
    props.getURL(PopularImage2);
    props.backBool(true);
    props.show();
  };
  const Popular3Click = () => {
    props.getURL(PopularImage3);
    props.backBool(true);
    props.show();
  };
  const Popular4Click = () => {
    props.getURL(PopularImage4);
    props.backBool(true);
    props.show();
  };

  return (
    <div className="relative box-border flex w-full flex-col  space-y-2 p-3 text-white">
      {/* Heading */}
      <div className="flex items-center space-x-2">
        <PhotoIcon className="h-6" />
        <h6 className="text-center text-sm font-medium">Start exploring</h6>
      </div>
      {/* Main */}
      <div className="relative box-border w-full space-y-[7px]">
        <div className="relative w-full space-y-[7px] sm:flex sm:space-x-[6px] sm:space-y-0">
          <Button
            aria-label="animal-banner-button"
            disableFocusRipple
            onClick={AnimalClick}
            className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff80 !important',
              },
            }}
          >
            <Image
              width={1920}
              height={500}
              className="rounded-md"
              src={AnimalBannerImage}
              blurDataURL={BlurDataUrl}
              placeholder="blur"
              alt=""
            />
          </Button>
          <Button
            aria-label="emoji-banner-button"
            disableFocusRipple
            onClick={EmojiClick}
            className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff80 !important',
              },
            }}
          >
            <Image
              width={1920}
              height={500}
              className="rounded-md"
              src={EmojiBannerImage}
              blurDataURL={BlurDataUrl}
              placeholder="blur"
              alt=""
            />
          </Button>
        </div>
        <div className="relative w-full space-y-[7px] sm:flex sm:space-x-[6px] sm:space-y-0">
          <Button
            aria-label="festival-banner-button"
            disableFocusRipple
            onClick={FestivalClick}
            className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff80 !important',
              },
            }}
          >
            <Image
              width={1920}
              height={500}
              className="rounded-md"
              src={FestivalBannerImage}
              blurDataURL={BlurDataUrl}
              placeholder="blur"
              alt=""
            />
          </Button>
          <Button
            aria-label="hand-drawing-banner-button"
            disableFocusRipple
            onClick={HandDrawingClick}
            className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff80 !important',
              },
            }}
          >
            <Image
              width={1920}
              height={500}
              className="rounded-md"
              src={HandDrawingBannerImage}
              blurDataURL={BlurDataUrl}
              placeholder="blur"
              alt=""
            />
          </Button>
        </div>
        <div className="relative w-full space-y-[7px] sm:flex sm:space-x-[6px] sm:space-y-0">
          <Button
            aria-label="flat-banner-button"
            disableFocusRipple
            onClick={FlatClick}
            className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff80 !important',
              },
            }}
          >
            <Image
              width={1920}
              height={500}
              className="rounded-md"
              src={FlatBannerImage}
              blurDataURL={BlurDataUrl}
              placeholder="blur"
              alt=""
            />
          </Button>
          <Button
            aria-label="hipster-banner-button"
            disableFocusRipple
            onClick={HispterClick}
            className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff80 !important',
              },
            }}
          >
            <Image
              width={1920}
              height={500}
              className="rounded-md"
              src={HipsterBannerImage}
              blurDataURL={BlurDataUrl}
              placeholder="blur"
              alt=""
            />
          </Button>
        </div>
        <div className="relative w-full space-y-[7px] sm:flex sm:space-x-[6px] sm:space-y-0">
          <Button
            aria-label="paint-banner-button"
            disableFocusRipple
            onClick={PaintClick}
            className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff80 !important',
              },
            }}
          >
            <Image
              width={1920}
              height={500}
              className="rounded-md"
              src={PaintBannerImage}
              blurDataURL={BlurDataUrl}
              placeholder="blur"
              alt=""
            />
          </Button>
          <Button
            aria-label="minimal-banner-button"
            disableFocusRipple
            onClick={MinimalClick}
            className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff80 !important',
              },
            }}
          >
            <Image
              width={1920}
              height={500}
              className="rounded-md"
              src={MinimalBannerImage}
              blurDataURL={BlurDataUrl}
              placeholder="blur"
              alt=""
            />
          </Button>
        </div>
        <div className="relative w-full space-y-[7px] sm:flex sm:space-x-[6px] sm:space-y-0">
          <Button
            aria-label="plain-banner-button"
            disableFocusRipple
            onClick={PlainClick}
            className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
            sx={{
              '.MuiTouchRipple-child': {
                backgroundColor: '#ffffff80 !important',
              },
            }}
          >
            <Image
              width={1920}
              height={500}
              className="rounded-md"
              src={PlainBannerImage}
              blurDataURL={BlurDataUrl}
              placeholder="blur"
              alt=""
            />
          </Button>
          <div className="relative flex w-full space-x-[6px] sm:max-w-[50%]">
            <Button
              aria-label="popular-image-1-button"
              disableFocusRipple
              onClick={Popular1Click}
              className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#ffffff80 !important',
                },
              }}
            >
              <Image
                width={500}
                height={550}
                className="rounded-md"
                src={PopularImage1}
                blurDataURL={BlurDataUrlSquare}
                placeholder="blur"
                alt=""
              />
            </Button>
            <Button
              aria-label="popular-image-2-button"
              disableFocusRipple
              onClick={Popular2Click}
              className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#ffffff80 !important',
                },
              }}
            >
              <Image
                width={500}
                height={550}
                className="rounded-md"
                src={PopularImage2}
                blurDataURL={BlurDataUrlSquare}
                placeholder="blur"
                alt=""
              />
            </Button>
            <Button
              aria-label="popular-image-3-button"
              disableFocusRipple
              onClick={Popular3Click}
              className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#ffffff80 !important',
                },
              }}
            >
              <Image
                width={500}
                height={550}
                className="rounded-md"
                src={PopularImage3}
                blurDataURL={BlurDataUrlSquare}
                placeholder="blur"
                alt=""
              />
            </Button>
            <Button
              aria-label="popular-image-4-button"
              disableFocusRipple
              onClick={Popular4Click}
              className="relative flex w-full cursor-default rounded-md p-0 opacity-100 transition-opacity hover:opacity-50"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#ffffff80 !important',
                },
              }}
            >
              <Image
                width={500}
                height={550}
                className="rounded-md"
                src={PopularImage4}
                blurDataURL={BlurDataUrlSquare}
                placeholder="blur"
                alt=""
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
