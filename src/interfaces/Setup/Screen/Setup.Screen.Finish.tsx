'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SetupHeaderLabel from 'components/label/SetupHeaderLabel';
import SetupSubmitButton from 'components/button/Setup/SetupSubmitButton';

function SetupFinishScreen(props: SetupFinishScreenProps) {
  const router = useRouter();

  const handleFinish = () => {
    router.push('/');
  };

  return (
    <div
      className={`${props.ClassName} relative flex w-full flex-col items-center justify-center space-y-7 p-5 md:p-14`}
    >
      <div className="relative flex w-full items-center justify-center pt-14 md:pt-0">
        <Image
          height={275} //320
          width={600} //700
          src="/vectors/register-finish-1.svg"
          alt="register-finish"
          className="text-xs text-white"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center space-y-4">
        <div className="relative flex items-center space-x-5">
          <Image
            height={30}
            width={30}
            src="/icons/check-circle-green.svg"
            alt=""
          />
          <SetupHeaderLabel>You are all set</SetupHeaderLabel>
        </div>
        <div className="flex w-full max-w-[550px] flex-col space-y-3">
          <p className="ml-0 line-clamp-2 w-full text-center text-[15px] font-normal text-white/75 md:ml-3">
            &quot;The only way to do great work is to love what you do.&quot;
          </p>
          <p className="ml-0 line-clamp-2 w-full text-right text-[15px] font-normal text-white/75 md:ml-3">
            - Steve Jobs
          </p>
        </div>
      </div>
      <div className="relative flex h-full w-full items-end justify-end p-5 md:absolute md:p-14">
        <SetupSubmitButton Disabled={false} onClick={handleFinish}>
          Finish
        </SetupSubmitButton>
      </div>
    </div>
  );
}

export default SetupFinishScreen;
