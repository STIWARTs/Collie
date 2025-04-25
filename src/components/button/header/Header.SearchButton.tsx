import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { HeaderSearchButtonMenuProps } from './Header.SearchButton.Menu';
import { IconButton } from '@mui/material';
import { SearchContent } from 'contents/home/search/Home.Search';

const HeaderSearchButtonMenu = dynamic<HeaderSearchButtonMenuProps>(
  () => import('./Header.SearchButton.Menu'),
  { ssr: false },
);

function HeaderSearchButton() {
  const [SearchMenuOpen, setSearchMenuOpen] = useState(false);
  const [Search, setSearch] = useState(
    'Search by product, category, collection and more',
  );
  const SearchRef = useRef<HTMLInputElement>(null);
  const ContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      event.currentTarget.setSelectionRange(
        event.currentTarget.value.length,
        event.currentTarget.value.length,
      );
    }
  };

  const SearchClick = () => {
    if (SearchMenuOpen == false) {
      if (Search == 'Search by product, category, collection and more') {
        setSearch('');
      }
      setSearchMenuOpen(true);
      SearchRef.current?.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ContainerRef.current &&
        !ContainerRef.current.contains(event.target as Node)
      ) {
        if (SearchMenuOpen == true) {
          if (Search == '')
            setSearch('Search by product, category, collection and more');
          setSearchMenuOpen(false);
        }
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ContainerRef, SearchMenuOpen, Search]);

  return (
    <div
      ref={ContainerRef}
      className="relative mx-auto flex w-full max-w-[600px] flex-col"
    >
      <div
        id="desktop-header-search-button"
        aria-label="desktop-search-button"
        onClick={SearchClick}
        className={`${
          SearchMenuOpen ? 'bg-[#202020]' : 'bg-[#202020] hover:bg-[#252525]'
        } button-text-lower relative block w-full cursor-text items-center justify-start overflow-hidden rounded-lg pl-[5px] text-white`}
      >
        <div className="flex items-center">
          <input
            ref={SearchRef}
            aria-label="search-text-field"
            value={Search}
            onChange={handleSearch}
            onKeyDown={handleSearchKeyDown}
            autoCorrect="off"
            autoComplete="off"
            className={`${
              Search != 'Search by product, category, collection and more'
                ? 'text-[14px] text-white'
                : 'text-[13px] text-[#ffffffad]'
            } mr-2 flex h-full w-full truncate bg-transparent pb-[12px] pl-[10px] pt-[10px] outline-none`}
          />
          <IconButton
            aria-label="desktop-search-clear-button"
            onClick={() => setSearch('')}
            className={`${
              Search === '' || !SearchMenuOpen ? 'hidden' : ''
            } group cursor-default rounded-md bg-transparent p-2 hover:bg-[#ffffff15]`}
            sx={{
              '.MuiTouchRipple-child': {
                borderRadius: '4px',
                backgroundColor: '#ffffff50 !important',
              },
            }}
          >
            <Image
              height={18}
              width={18}
              style={{
                minHeight: 18,
                minWidth: 18,
              }}
              src="/icons/x-white-2.svg"
              className="opacity-70 group-hover:opacity-100"
              alt=""
            />
          </IconButton>
          <IconButton
            aria-label="desktop-search-button"
            className="group mr-1 cursor-default rounded-md bg-transparent p-2 hover:bg-[#ffffff15]"
            sx={{
              '.MuiTouchRipple-child': {
                borderRadius: '4px',
                backgroundColor: '#ffffff50 !important',
              },
            }}
          >
            <Image
              height={16}
              width={16}
              style={{
                minHeight: 16,
                minWidth: 16,
              }}
              src="/icons/search-white-2.svg"
              className="opacity-60 group-hover:opacity-90"
              alt=""
            />
          </IconButton>
        </div>
        {SearchMenuOpen && (
          <div className="absolute bottom-0 -ml-[5px] h-[2px] w-full bg-white opacity-40" />
        )}
      </div>
      <HeaderSearchButtonMenu
        Search={Search}
        SearchRef={SearchRef}
        ContainerRef={ContainerRef}
        SearchMenu={SearchMenuOpen}
        GetEmptySearch={Search === '' ? true : false}
        setSearchMenu={setSearchMenuOpen}
        setSearch={setSearch}
        ContentArray={SearchContent}
      />
    </div>
  );
}

export default HeaderSearchButton;
