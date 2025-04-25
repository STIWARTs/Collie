interface IProps {
  setHeaderDates: string;
}

function DatePickerDialogHeader(props: IProps) {
  return (
    <div className="relative block w-full whitespace-nowrap bg-[#151515] text-left  text-lg text-white">
      <h6 className="px-3 py-1 text-[11px] opacity-50 ">
        Choose your Date of Birth
      </h6>
      <h6 className="px-7 pb-4 text-2xl font-semibold">
        {props.setHeaderDates}
      </h6>
    </div>
  );
}

export default DatePickerDialogHeader;
