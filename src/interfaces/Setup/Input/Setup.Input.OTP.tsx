/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import OTPTextFieldDark from 'components/textfield/OTPTextFieldDark';
import {
  ClickToFocus,
  InputChangeFocus,
  InputNumberOnly,
} from 'functions/UIAlgorithms';

interface IProps {
  OTP1: string;
  setOTP1: Dispatch<string>;
  OTP2: string;
  setOTP2: Dispatch<string>;
  OTP3: string;
  setOTP3: Dispatch<string>;
  OTP4: string;
  setOTP4: Dispatch<string>;
  OTP5: string;
  setOTP5: Dispatch<string>;
  OTP6: string;
  setOTP6: Dispatch<string>;
  HandleSubmit: VoidType;
  Loading: boolean;
}

function SetupOTPTextField({
  OTP1,
  setOTP1,
  OTP2,
  setOTP2,
  OTP3,
  setOTP3,
  OTP4,
  setOTP4,
  OTP5,
  setOTP5,
  OTP6,
  setOTP6,
  HandleSubmit,
  Loading,
}: IProps) {
  const OTP1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP1(event.target.value.trim());
  };
  const OTP2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP2(event.target.value.trim());
  };
  const OTP3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP3(event.target.value.trim());
  };
  const OTP4Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP4(event.target.value.trim());
  };
  const OTP5Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP5(event.target.value.trim());
  };
  const OTP6Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP6(event.target.value.trim());
  };

  const OTPClick = (event: React.MouseEvent<HTMLInputElement>) => {
    ClickToFocus(event);
  };

  const NumberOnly = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Backspace') InputNumberOnly(event);
  };

  const ChangeFocus = (event: React.KeyboardEvent<HTMLInputElement>) => {
    InputChangeFocus(event);
    if (event.key === 'Enter') HandleSubmit();
  };

  return (
    <div className="flex items-center justify-center">
      {[...Array(6)].map((_, index) => (
        <OTPTextFieldDark
          key={index}
          onClick={OTPClick}
          areaLabel={`OTP${index + 1}`}
          value={eval(`OTP${index + 1}`)}
          onChange={eval(`OTP${index + 1}Change`)}
          onkeyDown={NumberOnly}
          onkeyUp={ChangeFocus}
          className={index == 3 ? 'ml-8' : index > 0 ? 'ml-2' : 'ml-0'}
        />
      ))}
    </div>
  );
}

export default SetupOTPTextField;
