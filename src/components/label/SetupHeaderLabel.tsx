interface IProps {
  children: React.ReactNode;
  ClassName?: string;
}

function SetupHeaderLabel(props: IProps) {
  return (
    <h1
      className={`${props.ClassName} line-clamp-2 w-full text-left text-[25px] font-[700] text-white md:text-[30px]`}
    >
      {props.children}
    </h1>
  );
}

export default SetupHeaderLabel;
