'use client';

import { useState } from 'react';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { InputNumberOnly } from 'functions/UIAlgorithms';
import IconNumberTextFieldDark from 'components/textfield/IconNumberTextFieldDark';

interface IProps {
  Value: string;
  setValue: Dispatch<string>;
  ValidateValue: boolean;
  HandleSubmit: VoidType;
}

function SetupIconNumberTextField({
  Value,
  setValue,
  ValidateValue,
  HandleSubmit,
}: IProps) {
  const [ValueError, setValueError] = useState(false);
  const { Toast, setToast } = ToastHook();

  const ValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value.slice(-10);
    event.target.maxLength = 10;
    setValue(event.target.value);
  };

  const PhoneKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (ValidateValue) {
      ValidValue();
    }
    if (event.key === 'Enter') {
      if (ValidateValue) {
        HandleSubmit();
      } else {
        InvalidValue();
      }
    }
  };

  const ValueKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Backspace') InputNumberOnly(event);
  };

  const ValueBlur = () => {
    if (ValidateValue) {
      ValidValue();
    } else {
      setValueError(true);
    }
  };

  const ValidValue = () => {
    setValueError(false);
    setToast({ ...Toast, Show: false });
  };

  const InvalidValue = () => {
    setValueError(true);
    setToast({
      Show: true,
      Title: 'Invalid phone number',
      Description: 'Please check your phone number.',
      Type: 'Error',
    });
  };

  return (
    <IconNumberTextFieldDark
      type="tel"
      dataPhonecode="+91"
      placeholder="Phone Number"
      icon="/icons/phone.svg"
      value={Value.slice(-10)}
      onChange={ValueChange}
      onkeyDown={ValueKeyDown}
      onkeyUp={PhoneKeyUp}
      onBlur={ValueBlur}
      error={ValueError}
      valid={ValidateValue}
    />
  );
}

export default SetupIconNumberTextField;
