import Image from 'next/image';
import { Button } from '@mui/material';

export function HeaderMobileSearchButton() {
  const SearchClick = () => {
    // if (!SearchButtonState.show) {
    //   router.push({ hash: 'search' });
    //   setSearchButtonState({ show: true });
    // }
  };

  return (
    <Button
      id="mobile-header-search-button"
      aria-label="mobile-search-button"
      onClick={SearchClick}
      className="button-text-lower z-10 m-0 flex w-[92px] min-w-[92px] cursor-text items-center justify-start rounded-full bg-[#202020] p-0 outline-none hover:bg-[#202020]"
    >
      <div className="ml-[11px] flex h-[16px] w-[16px] justify-center opacity-60">
        <Image src="/icons/search-white-2.svg" height={16} width={16} alt="" />
      </div>
      <label className="mx-2 flex h-full w-full truncate bg-transparent pb-[12px] pt-[10px] text-[13px] font-normal text-[#ffffffad]">
        Search
      </label>
    </Button>
  );
}
