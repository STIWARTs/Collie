'use client';

import { ToastHook } from 'hooks/global/Hooks.Toast';
import { useState } from 'react';
import IconTextFieldDark from 'components/textfield/IconTextFieldDark';

interface IProps {
  Type: 'Email' | 'Name';
  Value: string;
  setValue: Dispatch<string>;
  ValidateValue: boolean;
  HandleSubmit: VoidType;
}

function SetupIconTextField({
  Type,
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
      Title: Type === 'Email' ? 'Invalid email' : 'Field empty',
      Description:
        Type === 'Email'
          ? 'Please check your email address.'
          : 'Please enter a your full name.',
      Type: 'Error',
    });
  };

  return (
    <IconTextFieldDark
      type={Type === 'Email' ? 'email' : 'text'}
      placeholder={Type === 'Email' ? 'Email Address' : 'Full Name'}
      icon={Type === 'Email' ? '/icons/email.svg' : '/icons/user.svg'}
      value={Value}
      onChange={ValueChange}
      onkeyUp={ValueKeyUp}
      onBlur={ValueBlur}
      error={ValueError}
      valid={ValidateValue}
    />
  );
}

export default SetupIconTextField;
