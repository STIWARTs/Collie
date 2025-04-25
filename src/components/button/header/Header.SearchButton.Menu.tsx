import { IconButton } from '@mui/material';
import Image from 'next/image';
import { RefObject, useState } from 'react';
import useNavigateList from 'functions/KeyboardNavigationList';
import { SearchContentProps } from 'contents/home/search/Home.Search';

export interface HeaderSearchButtonMenuProps {
  Search: string;
  SearchRef: RefObject<HTMLInputElement>;
  ContainerRef: RefObject<HTMLDivElement>;
  SearchMenu: boolean;
  GetEmptySearch: boolean;
  setSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  ContentArray: SearchContentProps[];
}

function HeaderSearchButtonMenu(props: HeaderSearchButtonMenuProps) {
  const [Data, setData] = useState(props.ContentArray);

  const removeItem = (index: number) => {
    if (index !== -1) {
      setData(Data.filter((o, i) => index !== i));
      if (props.Search === Data[index].Name) props.setSearch('');
    }
  };

  const { activeIndex, itemProps } = useNavigateList({
    vertical: true,
    list: Data,
    GetEmptySearch: props.GetEmptySearch,
    EmptySearch: (value) => props.setSearch(value),
    onSelect: (value) =>
      value && value.Name ? props.setSearch(value.Name) : props.setSearch(''),
  });

  return (
    <div
      className={`${
        props.SearchMenu ? 'block' : 'hidden'
      } absolute top-[45px] z-10 w-full rounded-lg bg-[#1A1A1ABD] px-1.5 py-2.5 text-white shadow-2xl backdrop-blur-[50px]`}
    >
      {Data.map((value, idx) => (
        <div
          key={value.Id}
          className={` ${
            activeIndex === idx ? 'bg-[#ffffff15]' : 'bg-transparent'
          }
        flex h-[40px] w-full cursor-default items-center rounded-lg p-1`}
          {...itemProps(value)}
        >
          <div className="ml-2 block h-5 pr-4 opacity-70">
            <Image
              height={18}
              width={18}
              style={{
                minHeight: 18,
                minWidth: 18,
              }}
              src={value.Icon}
              alt=""
            />
          </div>
          <div className="w-full items-center overflow-hidden pr-1">
            <p className="block truncate text-left text-[13px] font-[400px] tracking-wide">
              {value.Name}
            </p>
          </div>
          {value.Type == 'previous-search' && (
            <IconButton
              onPointerDown={() => removeItem(idx)}
              className={`${activeIndex === idx ? 'flex' : 'hidden'} 
                  m-0 h-[30px] w-[30px] cursor-pointer items-center justify-center p-0 opacity-70 hover:bg-[#ffffff30]`}
              style={{
                borderRadius: 4,
              }}
              sx={{
                '.MuiTouchRipple-child': {
                  borderRadius: 0,
                },
              }}
            >
              <Image
                height={17}
                width={17}
                style={{
                  minHeight: 17,
                  minWidth: 17,
                }}
                src={value.DeleteIcon}
                alt=""
              />
            </IconButton>
          )}
        </div>
      ))}
    </div>
  );
}

export default HeaderSearchButtonMenu;
