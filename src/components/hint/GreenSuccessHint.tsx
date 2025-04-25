import Image from 'next/image';

interface IProps {
  Label: string;
}

function GreenSuccessHint(props: IProps) {
  return (
    <div className="flex w-full justify-start">
      <div className="flex items-center space-x-1 rounded-md bg-[#00B46090] py-1 pl-1 pr-2">
        <div className="mt-1 h-full min-w-[15px] items-start">
          <Image height={15} width={15} src="/icons/success-color.svg" alt="" />
        </div>
        <p className="block text-[13px] font-normal text-white">
          {props.Label}
        </p>
      </div>
    </div>
  );
}

export default GreenSuccessHint;
