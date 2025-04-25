import { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  FilledInputProps,
  TextField,
  TextFieldProps,
  alpha,
  styled,
} from '@mui/material';
import Image from 'next/image';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { IconPasswordTextFieldProps } from './AllTextFieldProps';

const CustomTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<FilledInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: '#ffffffb3',
    display: 'block',
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontSize: '13px',
    textTransform: 'unset',
    letterSpacing: 0.5,
    transform: 'translate(67px, 23px) scale(1)',
    '&.Mui-error': {
      color: '#ffffffb3',
    },
  },
  '& label.Mui-focused': {
    color: '#ffffffb3',
    transform: 'translate(67px, 12px) scale(0.90)',
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(67px, 12px) scale(0.90)',
  },
  '& .MuiFilledInput-root': {
    height: 63,
    borderRadius: 12,
    fontWeight: 600,
    fontSize: '14px',
    letterSpacing: '0.025em',
    // fontFamily: ['Poppins', 'sans-serif'].join(','),
    color: '#ffffff',
    border: '1px solid #ffffff50',
    overflow: 'hidden',
    paddingLeft: 54,
    paddingRight: 8,
    paddingTop: 4,
    backgroundColor: 'transparent',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#ffffff',
    },
    '&:before': {
      transition: 'none !important',
      borderBottom: '0 !important',
    },
    '&:after': {
      transition: 'none !important',
      borderBottom: '0 !important',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha('#ffffff', 0.25)} 0 0 0 2px`,
      borderColor: '#ffffffb3',
      color: '#ffffff',
    },
    '&.Mui-error': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha('#FF2020', 0.25)} 0 0 0 0px`,
      borderColor: '#CE0000',
      color: '#ffffff',
      '&:before': {
        borderBottom: 0,
      },
      '&:after': {
        borderBottom: 0,
      },
    },
  },
}));

interface State {
  showPassword: boolean;
}

function IconPasswordTextFieldDark(props: IconPasswordTextFieldProps) {
  const [values, setValues] = useState<State>({ showPassword: false });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <div className="relative mt-[2px] flex w-full flex-col">
      <div className="pointer-events-none -mb-[46px] ml-[20px] mt-[16px] flex cursor-text touch-none">
        <Image
          height={30}
          width={30}
          className="opacity-50"
          src={props.icon}
          alt=""
        />
      </div>
      <CustomTextField
        id={props.id}
        aria-label="password-textfield"
        className="w-full"
        label={props.placeholder}
        onChange={props.onChange}
        onKeyUp={props.onkeyUp}
        onKeyDown={props.onkeyDown}
        value={props.value}
        error={props.error}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        variant="filled"
        autoComplete="off"
        autoCapitalize="off"
        type={values.showPassword ? 'text' : 'password'}
        // inputProps={{
        //   maxLength: 16,
        // }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {props.valid && (
                <div className="pointer-events-none mb-1 mr-2 flex cursor-text touch-none">
                  <CheckCircleIcon className="h-6 w-6 text-green-400" />
                </div>
              )}
              <IconButton
                disableRipple
                aria-label="toggle-password-visibility"
                onClick={handleClickShowPassword}
                onPointerDown={handleMouseDownPassword}
                className="passwordEyeButton z-20 mb-[4px] h-11 w-11"
                style={{
                  borderRadius: 8,
                }}
              >
                {values.showPassword ? (
                  <EyeSlashIcon
                    height={22}
                    width={22}
                    className="text-white opacity-50"
                  />
                ) : (
                  <EyeIcon
                    height={22}
                    width={22}
                    className="text-white opacity-50"
                  />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default IconPasswordTextFieldDark;
