import { useState } from 'react';
import { m } from 'framer-motion';
import moment from 'moment';

interface IProps {
  setMonth: (month: string) => void;
}

const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function SelectMonth(props: IProps) {
  const [selected, setSelected] = useState<string>(
    moment().endOf('month').format('MMM'),
  );

  const dayStyles = (month: string) => {
    return selected == month
      ? 'bg-[#ffffff1a] hover:bg-[#ffffff1a]'
      : 'bg-transparent hover:bg-white/5';
  };

  return (
    <m.div
      className="scroll grid h-full grid-cols-3 items-center justify-center p-5"
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.25 }}
    >
      {Months.map((month) => (
        <button
          onClick={() => {
            setSelected(month);
            props.setMonth(month);
          }}
          key={month}
          className={`${'m-1 cursor-default rounded-md p-4 text-[13px] text-white transition-colors duration-150 ease-in-out'} ${dayStyles(
            month,
          )}`}
        >
          {month}
        </button>
      ))}
    </m.div>
  );
}

export default SelectMonth;
