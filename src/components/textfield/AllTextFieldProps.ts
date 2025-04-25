import { MouseEvent, KeyboardEvent, ChangeEvent, FocusEvent } from 'react';

export interface IconNumberTextFieldProps {
  id?: string;
  value: string;
  placeholder?: string;
  icon: string;
  type?: string;
  dataPhonecode?: string;
  error?: boolean;
  valid?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onkeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onkeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface IconPasswordTextFieldProps {
  id?: string;
  value: string;
  placeholder: string;
  icon: string;
  error?: boolean;
  valid?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onkeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onkeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface IconTextFieldProps {
  id?: string;
  value: string;
  placeholder?: string;
  icon: string;
  type?: string;
  error?: boolean;
  valid?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onkeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onkeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface NumberTextFieldProps {
  id?: string;
  value: string;
  placeholder?: string;
  type?: string;
  dataPhonecode?: string;
  error?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onkeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onkeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface PlainTextFieldProps {
  id?: string;
  value: string;
  placeholder: string;
  type: string;
  error?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onkeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onkeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface PasswordTextFieldProps {
  id?: string;
  value: string;
  placeholder: string;
  error?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onkeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onkeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface OTPTextFieldProps {
  id?: string;
  value: string;
  areaLabel?: string;
  onClick: (event: MouseEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onkeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onkeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}
