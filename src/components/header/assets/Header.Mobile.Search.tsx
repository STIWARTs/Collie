/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { SearchContentProps } from 'contents/home/search/Home.Search';
import Image from 'next/image';

export interface HeaderMobileSearchProps {
  ContentArray: SearchContentProps[];
}

function HeaderMobileSearch(props: HeaderMobileSearchProps) {
  const [Search, setSearch] = useState('');
  const SearchRef = useRef<HTMLInputElement>(null);
  const [Data, setData] = useState(props.ContentArray);

  const removeItem = (index: number) => {
    if (index !== -1) setData(Data.filter((o, i) => index !== i));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // const removeHash = () => {
  //   history.pushState('', document.title, window.location.pathname);
  // };

  const clearSearch = () => {
    setSearch('');
    SearchRef.current?.focus();
  };

  const BackClick = () => {
    // if (SearchButtonState.show) {
    //   removeHash();
    //   SearchRef.current?.blur();
    //   setSearchButtonState({ show: false });
    // }
  };

  const SearchBlur = () => {
    // if (SearchButtonState.show) SearchRef.current?.blur();
  };

  // useEffect(() => {
  //   function handleBackButtonPressed(event: PopStateEvent) {
  //     event.preventDefault();
  //     if (SearchButtonState.show) {
  //       removeHash();
  //       SearchRef.current?.blur();
  //       setSearchButtonState({ show: false });
  //       setSearch('');
  //     }
  //   }
  //   window.addEventListener('popstate', handleBackButtonPressed);
  //   return () => {
  //     window.removeEventListener('popstate', handleBackButtonPressed);
  //   };
  // }, [SearchButtonState.show, setSearchButtonState]);

  useEffect(() => {
    function DetectScroll() {
      if (window.scrollY === 0) SearchRef.current?.focus();
    }
    window.addEventListener('scroll', DetectScroll);
    return () => {
      window.removeEventListener('scroll', DetectScroll);
    };
  });

  // useEffect(() => {
  //   if (SearchButtonState.show) SearchRef.current?.focus();
  // }, [SearchButtonState.show]);

  return (
    <div
      id="search"
      className={`${
        () => {}
        // SearchButtonState.show ? 'flex flex-col' : 'hidden'
      } absolute top-0 z-[999] w-full bg-primary-theme`}
    >
      <div className="sticky-top z-10 flex w-full bg-primary-theme">
        <div
          id="mobile-header-search-button"
          aria-label="mobile-search-button"
          className="button-text-lower block w-full cursor-text items-center justify-start border-b-2 border-[#252525] p-2 text-white"
        >
          <div className="flex items-center">
            <IconButton
              onClick={BackClick}
              aria-label="mobile-search-left-arrow-button"
              className="group ml-[2px] cursor-default bg-transparent transition-all hover:bg-[#ffffff15]"
            >
              <Image
                height={20}
                width={20}
                src="/icons/arrow-left.svg"
                className="opacity-70 group-hover:opacity-100"
                alt=""
              />
            </IconButton>
            <input
              ref={SearchRef}
              id="mobile-search-text-field"
              aria-label="mobile-search-text-field"
              value={Search}
              onChange={handleSearch}
              autoCorrect="off"
              autoComplete="off"
              placeholder="Search by Products & Collections"
              className="mx-3 flex h-full w-full truncate bg-transparent pb-[14px] pt-[12px] text-[14px] text-white outline-none placeholder:text-[13px] placeholder:text-[#ffffffad]"
            />
            {Search === '' ? (
              <IconButton
                aria-label="mobile-search-right-arrow-button"
                className="mr-[2px] cursor-default bg-transparent p-2.5 opacity-70 transition-all"
              >
                <Image
                  height={19}
                  width={19}
                  src="/icons/search-white.svg"
                  alt=""
                />
              </IconButton>
            ) : (
              <IconButton
                aria-label="mobile-search-clear-button"
                onClick={clearSearch}
                className="mr-[2px] cursor-default bg-transparent p-2.5 opacity-70 transition-all"
              >
                <Image
                  height={19}
                  width={19}
                  src="/icons/x-white-2.svg"
                  alt=""
                />
              </IconButton>
            )}
          </div>
        </div>
      </div>
      <div
        onTouchMove={SearchBlur}
        className="max-h-full w-full overflow-y-auto bg-primary-theme p-2"
      >
        {Data.map((value, idx) => (
          <Button
            key={value.Id}
            className="
          button-text-lower flex h-[35px] w-full cursor-default items-center rounded-xl bg-transparent px-2 py-7 text-white"
          >
            <div className="ml-1 block h-5 pr-3.5 opacity-70">
              <Image height={18} width={18} src={value.Icon} alt="" />
            </div>
            <div className="w-full items-center overflow-hidden pl-2 pr-1">
              <p className="block truncate text-left text-[13px] font-normal opacity-75">
                {value.Name}
              </p>
            </div>
            {value.Type == 'previous-search' ? (
              <div
                onPointerDown={() => removeItem(idx)}
                className="
                m-0 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[50%] p-0 opacity-70 hover:bg-transparent"
              >
                <Image height={17} width={17} src={value.DeleteIcon} alt="" />
              </div>
            ) : (
              <div
                className="
                m-0 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[50%] p-0 opacity-70 hover:bg-transparent"
              >
                <Image height={22} width={22} src={value.DeleteIcon} alt="" />
              </div>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default HeaderMobileSearch;
