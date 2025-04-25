import { useState, useEffect } from 'react';

export default function useScreenSize() {
  const [LargeScreen, setLargeScreen] = useState(false);
  const [MediumLargeScreen, setMediumLargeScreen] = useState(false);
  const [MediumScreen, setMediumScreen] = useState(false);
  const [SmallMediumScreen, setSmallMediumScreen] = useState(false);
  const [SmallScreen, setSmallScreen] = useState(false);
  const getScreenWidth = () => {
    if (window) {
      const LargeSize = window.matchMedia('Screen and (min-width: 1520px)');
      const MediumLargeSize = window.matchMedia(
        'Screen and (min-width: 1300px) and (max-width: 1520px)'
      );
      const MediumSize = window.matchMedia(
        'Screen and (min-width: 1040px) and (max-width: 1300px)'
      );
      const SmallMediumSize = window.matchMedia(
        'Screen and (min-width: 830px) and (max-width: 1040px)'
      );
      const SmallSize = window.matchMedia('Screen and (max-width: 555px)');
      if (LargeSize.matches) setLargeScreen(true);
      else setLargeScreen(false);
      if (MediumLargeSize.matches) setMediumLargeScreen(true);
      else setMediumLargeScreen(false);
      if (MediumSize.matches) setMediumScreen(true);
      else setMediumScreen(false);
      if (SmallMediumSize.matches) setSmallMediumScreen(true);
      else setSmallMediumScreen(false);
      if (SmallSize.matches) setSmallScreen(true);
      else setSmallScreen(false);
    }
  };
  useEffect(() => {
    getScreenWidth();
  }, []);
  useEffect(() => {
    window.addEventListener('resize', getScreenWidth);
    return () => window.removeEventListener('resize', getScreenWidth);
  });
  return {
    LargeScreen,
    MediumLargeScreen,
    MediumScreen,
    SmallMediumScreen,
    SmallScreen,
  };
}
