interface IProps {
  value: Array<string>;
}

function WeekNames(props: IProps) {
  return (
    <div className="relative grid grid-cols-7">
      {props.value.map((value) => (
        <div
          key={value}
          className="m-1 flex justify-center text-[12px] text-white opacity-60"
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export default WeekNames;
