interface IProps {
  children: React.ReactNode;
  ClassName?: string;
}

function SetupHeaderDescription(props: IProps) {
  return (
    <p
      className={`${props.ClassName} line-clamp-2 w-full text-left text-[15px] font-normal text-white/75`}
    >
      {props.children}
    </p>
  );
}

export default SetupHeaderDescription;
