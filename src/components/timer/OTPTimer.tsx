import { useTimer } from 'react-timer-hook';

interface IProps {
  min: number;
  sec: number;
  resend: () => void;
}

function OTPTimer(props: IProps) {
  const time = new Date();
  const GetMin = props.min * 60;
  const GetSec = props.sec;
  const SetTime = GetMin + GetSec;
  time.setSeconds(time.getSeconds() + SetTime);
  const { seconds, minutes } = useTimer({
    expiryTimestamp: time,
    onExpire: () => props.resend(),
    autoStart: true,
  });

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <label className="flex text-[13px] font-normal text-white/75">
          {'Resend OTP in '}
          <label className="pl-1 text-[13px] font-normal text-white/75">
            {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
            {' min'}
          </label>
        </label>
      )}
    </div>
  );
}

export default OTPTimer;
