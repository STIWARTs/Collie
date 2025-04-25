import { OTPTextFieldProps } from './AllTextFieldProps';

function OTPTextFieldDark(props: OTPTextFieldProps) {
  return (
    <input
      id={props.id ?? props.areaLabel}
      maxLength={1}
      autoCorrect="off"
      autoComplete="off"
      tabIndex={1}
      onChange={props.onChange}
      onKeyUp={props.onkeyUp}
      onKeyDown={props.onkeyDown}
      onClick={props.onClick}
      value={props.value}
      className={`${props.className} ${'h-[50px] w-[40px] items-center rounded-lg bg-[#0f0f0f] text-center font-[600] text-white outline-none'}`}
      aria-label={props.areaLabel}
      type="tel"
    />
  );
}

export default OTPTextFieldDark;
