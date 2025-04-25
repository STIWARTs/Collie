'use client';

import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import { HeaderMobileSearchButton } from '../button/header/mobile/Header.Mobile.SearchButton';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { MobileLogo } from '../logo/CompanyLogo';
import { HeaderMobileSearchProps } from './assets/Header.Mobile.Search';
import { SearchMobileContent } from '../../contents/home/search/Home.Search';
import { HomePageHook } from 'hooks/target/Hooks.Page.Home';
import HeaderNavMobile from './assets/Header.Nav.Mobile';
import { NFTCollectionButton } from '../button/header/mobile/NFTCollectionButton';

const HeaderMobileSearch = dynamic<HeaderMobileSearchProps>(
  () => import('./assets/Header.Mobile.Search'),
  { ssr: false },
);

const HeaderMobileUserButton = dynamic(
  () =>
    import('../button/header/mobile/Header.Mobile.UserButton').then((mod) => ({
      default: mod.HeaderMobileUserButton,
    })),
  { ssr: false },
);

function HeaderMobile() {
  const { HomePage, setHomePage } = HomePageHook();

  useEffect(() => {
    history.pushState('', document.title, window.location.pathname);
  }, []);

  return (
    <>
      <div className="z-[999] box-border flex w-full items-center overflow-hidden bg-primary-theme px-3 pb-2 text-white">
        <div className="flex">
          <MobileLogo onValueChange={(value) => setHomePage(value)} />
        </div>
        <div className="flex w-full items-center justify-end">
          <HeaderMobileSearchButton />
          <NFTCollectionButton onValueChange={(value) => setHomePage(value)} />
          <IconButton className="mx-5 p-0">
            <Image height={22} width={22} src="/icons/bell-2.svg" alt="" />
          </IconButton>
          <HeaderMobileUserButton />
        </div>
      </div>
      <HeaderMobileSearch ContentArray={SearchMobileContent} />
      <HeaderNavMobile
        Value={HomePage}
        onValueChange={(value) => setHomePage(value)}
      />
    </>
  );
}

export default HeaderMobile;
