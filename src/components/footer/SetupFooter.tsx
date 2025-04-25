import Link from 'next/link';
import {
  Privacy_Policy_Link,
  Terms_Conditions_Link,
} from 'routers/RouterLinks';

interface IProps {
  ClassName?: string;
  ButtonLabel: string;
}

function SetupFooter(props: IProps) {
  return (
    <div
      className={`${props.ClassName} flex h-14 w-full flex-col space-y-1 py-2`}
    >
      <div className="flex w-full space-x-1">
        <p className="flex items-center text-[13px] font-normal tracking-wide text-white opacity-[0.75]">
          Choosing
        </p>
        <label className="flex items-center whitespace-nowrap text-[13px] font-bold tracking-wide text-white">
          {props.ButtonLabel}
        </label>
        <p className="flex items-center truncate text-[13px] font-normal tracking-wide text-white opacity-[0.75]">
          means that you agree to the
        </p>
        <Link
          href={Privacy_Policy_Link}
          className="hidden cursor-pointer items-center whitespace-nowrap text-[13px] font-medium tracking-wide text-sky-400 underline-offset-2 hover:underline xs-435:flex md:hidden md-1000:flex"
        >
          priavcy policy
        </Link>
        <p className="hidden items-center whitespace-nowrap text-[13px] font-normal tracking-wide text-white opacity-[0.75] xs-470:flex md:hidden">
          and
        </p>
        <Link
          href={Terms_Conditions_Link}
          className="hidden cursor-pointer items-center whitespace-nowrap text-[13px] font-medium tracking-wide text-sky-400 underline-offset-2 hover:underline sm-600:flex md:hidden"
        >
          terms and conditions
        </Link>
      </div>
      <div className="flex space-x-1 xs-435:-ml-1 md:ml-0 md-1000:-ml-1">
        <Link
          href={Privacy_Policy_Link}
          className="flex cursor-pointer items-center whitespace-nowrap text-[13px] font-medium tracking-wide text-sky-400 underline-offset-2 hover:underline xs-435:hidden md:flex md-1000:hidden"
        >
          priavcy policy
        </Link>
        <p className="flex items-center whitespace-nowrap text-[13px] font-normal tracking-wide text-white opacity-[0.75] xs-470:hidden md:flex">
          and
        </p>
        <Link
          href={Terms_Conditions_Link}
          className="flex cursor-pointer items-center whitespace-nowrap text-[13px] font-medium tracking-wide text-sky-400 underline-offset-2 hover:underline sm-600:hidden md:flex"
        >
          terms and conditions
        </Link>
      </div>
    </div>
  );
}

export default SetupFooter;
