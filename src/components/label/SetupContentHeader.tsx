interface IProps {
  ClassName?: string;
  children: React.ReactNode;
  Animation?: AuthAnimationType;
}

function SetupContentHeader(props: IProps) {
  return (
    <div className={`${props.ClassName} h-7 w-full justify-start space-y-3`}>
      {/* <div className="w-full justify-start">
          <Image height={30} width={125} src="/agewear_full_white.svg" alt="" />
        </div> */}
      <h2 className="w-full text-left text-[25px] font-[600] text-white md:text-[30px]">
        {props.children}
      </h2>
    </div>
  );
}

export default SetupContentHeader;
