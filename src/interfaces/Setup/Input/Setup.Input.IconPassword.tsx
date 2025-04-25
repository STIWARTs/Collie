'use client';

import IconPasswordTextFieldDark from 'components/textfield/IconPasswordTextFieldDark';
import { ToastHook } from 'hooks/global/Hooks.Toast';
import { useState } from 'react';

interface IProps {
  Value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  ValidateValue: boolean;
  HandleSubmit: VoidType;
}

function SetupIconPasswordTextField({
  Value,
  setValue,
  ValidateValue,
  HandleSubmit,
}: IProps) {
  const [ValueError, setValueError] = useState(false);
  const { Toast, setToast } = ToastHook();

  const ValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const ValueKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
      Title: 'Invalid password',
      Description: 'Please check your password.',
      Type: 'Error',
    });
  };

  return (
    <IconPasswordTextFieldDark
      placeholder="Password"
      icon="/icons/password.svg"
      value={Value}
      onChange={ValueChange}
      onkeyUp={ValueKeyUp}
      onBlur={ValueBlur}
      error={ValueError}
      valid={ValidateValue}
    />
  );
}

export default SetupIconPasswordTextField;
