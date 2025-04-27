import { useRef, useState, useEffect } from 'react';
import { GalleryCarouselContentProps } from '../../contents/gallery/Gallery.Carousel';
import dynamic from 'next/dynamic';
import {
  GalleryCarouselDesktopProps,
  GalleryCarouselMobileProps,
} from './GalleryCarousel/GalleryCarousel.MultiScreen';
import { useScreenDimensions } from '../../hooks/useScreenDimensions';

const GalleryCarouselMobile = dynamic<GalleryCarouselMobileProps>(
  () =>
    import('./GalleryCarousel/GalleryCarousel.MultiScreen').then(
      (x) => x.GalleryCarouselMobile,
    ),
  { ssr: false },
);

const GalleryCarouselDesktop = dynamic<GalleryCarouselDesktopProps>(
  () =>
    import('./GalleryCarousel/GalleryCarousel.MultiScreen').then(
      (x) => x.GalleryCarouselDesktop,
    ),
  { ssr: false },
);

interface IProps {
  ContentArray: GalleryCarouselContentProps[];
}

function GalleryCarousel(props: IProps) {
  const ContainerRef = useRef<HTMLDivElement>(null);
  const [CarouselState, setCarouselState] = useState(0);
  const [BannerTextTransition, setBannerTextTransition] = useState('open');
  const { isMobile } = useScreenDimensions();
  const [isClient, setIsClient] = useState(false);

  // Make sure the component is mounted before rendering anything that depends on client-side features
  useEffect(() => {
    setIsClient(true);

    // Force refresh of images when component mounts
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return null; // Return nothing during SSR
  }

  // Log the content array for debugging
  console.log('Gallery Carousel Content:', props.ContentArray);

  if (isMobile) {
    console.log('Rendering mobile carousel');
    return <GalleryCarouselMobile ContentArray={props.ContentArray} />;
  }

  console.log('Rendering desktop carousel');
  return (
    <GalleryCarouselDesktop
      AutoPlay={true}
      Duration={5}
      ConstraintRef={ContainerRef}
      ThumbnailArray={props.ContentArray}
      CarouselState={CarouselState}
      setCarouselState={setCarouselState}
      setBannerTextTransition={setBannerTextTransition}
      ContentArray={props.ContentArray}
      ElementRef={ContainerRef}
      BannerTextTransition={BannerTextTransition}
    />
  );
}

export default GalleryCarousel;
