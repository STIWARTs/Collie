import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import moment, { Moment } from 'moment';
import SelectDayHeader from './selectDay/SelectDayHeader';
import WeekNames from './selectDay/WeekNames';

interface IProps {
  year: string;
  month: string;
  day: string;
  setDay: (day: string) => void;
  setMonth: (month: string) => void;
  setYear: (year: string) => void;
}

function SelectDay(props: IProps) {
  const [value, setValue] = useState(
    moment(props.year + '-' + props.month, 'YYYY-MM'),
  );
  const [calender, setCalender] = useState<Moment[][] | never[]>([]);

  const startDay = value.clone().startOf('month').startOf('week');
  const endDay = value.clone().endOf('month').startOf('week');

  const isSelected = (day: Moment) => {
    return value.isSame(day, 'day');
  };

  const afterTaday = (day: Moment) => {
    return day.isAfter(new Date(), 'day');
  };

  const isBefore1 = (day: Moment) => {
    return day.isSame(beforeMonth(), 'day');
  };

  const isBefore2 = (day: Moment) => {
    return day.isBefore(beforeMonth(), 'day');
  };

  const isAfter1 = (day: Moment) => {
    return day.isSame(afterMonth(), 'day');
  };

  const isAfter2 = (day: Moment) => {
    return day.isAfter(afterMonth(), 'day');
  };

  const isthisMonth = () => {
    return value.isSame(new Date(), 'month');
  };

  // previous year
  const prevYear = () => {
    return value.clone().subtract(1, 'year').format('YYYY');
  };

  // next year
  const nextYear = () => {
    return value.clone().add(1, 'year').format('YYYY');
  };

  // Last date of previous month
  const beforeMonth = () => {
    return prevMonth().endOf('month');
  };

  // First date of next month
  const afterMonth = () => {
    return nextMonth().startOf('month');
  };

  // previous month
  const prevMonth = () => {
    return value.clone().subtract(1, 'month');
  };

  // next month
  const nextMonth = () => {
    return value.clone().add(1, 'month');
  };

  const currentMonth = () => {
    return value.format('MMM');
  };

  const currentYear = () => {
    return value.format('YYYY');
  };

  const prevMonthClick = () => {
    setValue(prevMonth());
    if (props.month.toLowerCase() === 'jan') props.setYear(prevYear());
    props.setMonth(prevMonth().format('MMM'));
    props.setDay(prevMonth().endOf('month').format('DD'));
    setValue(prevMonth().endOf('month'));
  };

  const nextMonthClick = () => {
    setValue(nextMonth());
    if (props.month.toLowerCase() === 'dec') props.setYear(nextYear());
    props.setMonth(nextMonth().format('MMM'));
    props.setDay(nextMonth().startOf('month').format('DD'));
    setValue(nextMonth().startOf('month'));
  };

  const disableDay = 'opacity-30 select-none pointer-events-none touch-none';

  const dayStyles = (day: Moment) => {
    if (afterTaday(day)) return disableDay;
    if (isBefore1(day)) return disableDay;
    if (isBefore2(day)) return disableDay;
    if (isAfter1(day)) return disableDay;
    if (isAfter2(day)) return disableDay;
    return isSelected(day)
      ? 'bg-[#ffffff1a] hover:bg-[#ffffff1a]'
      : 'bg-transparent hover:bg-white/5';
  };

  useEffect(() => {
    const day = startDay.clone().subtract(1, 'day');
    const a = [];
    while (day.isBefore(endDay, 'day')) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, 'day').clone()),
      );
    }
    setCalender(a);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    props.setDay('01');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <m.div
      className="relative box-border h-full w-full px-5 pt-5"
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.25 }}
    >
      <SelectDayHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        isthisMonth={isthisMonth()}
        prevMonthClick={prevMonthClick}
        nextMonthClick={nextMonthClick}
      />
      <WeekNames value={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']} />
      <div className="relative h-full w-full text-center">
        {calender.map((week, idx) => (
          <div key={idx} className="relative grid grid-cols-7">
            {week.map((day, idx) => (
              <button
                onClick={() => {
                  setValue(day);
                  props.setDay(day.format('DD'));
                }}
                className={`${'relative m-1 box-border inline-block cursor-default rounded-md py-3 text-center text-[13px] text-white transition-colors duration-200 ease-in-out'} 
                ${dayStyles(day)}`}
                key={idx}
              >
                {day.format('D')}
              </button>
            ))}
          </div>
        ))}
      </div>
    </m.div>
  );
}

export default SelectDay;
