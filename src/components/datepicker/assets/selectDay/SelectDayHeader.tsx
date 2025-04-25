import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { m } from 'framer-motion';

interface IProps {
  currentMonth: () => void;
  currentYear: () => void;
  isthisMonth: boolean;
  prevMonthClick: () => void;
  nextMonthClick: () => void;
}

function SelectDayHeader(props: IProps) {
  const MonthAndYear = () => {
    return props.currentMonth() + ', ' + props.currentYear();
  };
  return (
    <div className="flex w-full justify-between">
      <h6 className="px-2.5 pb-3 text-xs font-medium text-white">
        {MonthAndYear()}
      </h6>
      <div className="relative -mr-2 -mt-2 block">
        <div className="flex space-x-3">
          <m.button
            onClick={props.prevMonthClick}
            whileTap={{ scale: 0.9 }}
            className="relative block cursor-default rounded-md bg-[#ffffff1a] p-[4px] text-white opacity-100 hover:opacity-75"
          >
            <ChevronUpIcon className="h-[16px] text-white" />
          </m.button>
          <m.button
            onClick={props.nextMonthClick}
            whileTap={{ scale: props.isthisMonth ? 1 : 0.9 }}
            disabled={props.isthisMonth}
            className="relative block cursor-default rounded-md bg-[#ffffff1a] p-[4px] text-white opacity-100 hover:opacity-75 disabled:opacity-50"
          >
            <ChevronDownIcon className="h-[16px] text-white" />
          </m.button>
        </div>
      </div>
    </div>
  );
}

export default SelectDayHeader;
