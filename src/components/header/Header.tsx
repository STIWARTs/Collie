'use client';

import { useState } from 'react';
import { HomePageHook } from 'hooks/target/Hooks.Page.Home';
import { HeaderNavMenuProps } from './assets/Header.Nav.Menu';
import dynamic from 'next/dynamic';
import { HeaderNav } from './assets/Header.Nav';
import HeaderSearchButton from '../button/header/Header.SearchButton';
import HeaderNotificationButton from '../button/header/Header.NotificationButton';
import { NFTCollectionDesktopButton } from '../button/header/NFTCollectionDesktopButton';

// Dynamically import cart-related components
// const CartButton = dynamic(() => import('../cart/CartButton'), { ssr: false });
// const WishlistButton = dynamic(() => import('../cart/WishlistButton'), {
//   ssr: false,
// });

const HeaderNavMenu = dynamic<HeaderNavMenuProps>(
  () => import('./assets/Header.Nav.Menu'),
  { ssr: false },
);

const HeaderUserButton = dynamic(
  () => import('../button/header/Header.UserButton'),
  { ssr: false },
);

function Header() {
  const { HomePage, setHomePage } = HomePageHook();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const NavMenuOpen = Boolean(anchorEl);

  const handleNavMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="fixed top-0 z-[999] flex h-[70px] w-full flex-col items-center justify-center bg-[#0f0f0f] pr-[278px]">
      <div className="flex w-full items-center space-x-2.5">
        <div className="flex w-full items-center space-x-2.5 xl-1765:justify-between">
          {/* Nav Bar [ Discover, Offers, Collections ] */}
          <div className="flex items-center">
            <HeaderNav
              Value={HomePage}
              setValue={setHomePage}
              onValueChange={(
                value: 'Discover' | 'Offers' | 'Collections' | 'NFT Collection',
              ) => setHomePage(value)}
            />
          </div>
          {/* Search Button */}
          <div className="flex w-full items-center xl-1765:max-w-[600px]">
            <div className="flex h-full w-full max-w-[600px] items-center justify-center xl-1765:-ml-[200px]">
              <HeaderSearchButton />
              <NFTCollectionDesktopButton
                onValueChange={(value) => setHomePage(value)}
              />
            </div>
          </div>
          {/* Notification and User Button - removed cart and wishlist */}
          <div className="flex items-center space-x-2.5">
            <HeaderNotificationButton />
            {/* Removing WishlistButton and CartButton */}
            <HeaderUserButton />
          </div>
        </div>
      </div>
      <HeaderNavMenu
        anchorEl={anchorEl}
        open={NavMenuOpen}
        onClose={handleNavMenuClose}
        Value={HomePage}
        onValueChange={(value) => setHomePage(value)}
      />
    </div>
  );
}

export default Header;
