import {
  FilledInputProps,
  TextField,
  TextFieldProps,
  alpha,
  styled,
} from '@mui/material';
import Image from 'next/image';
import { IconTextFieldProps } from './AllTextFieldProps';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

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
    paddingRight: 34,
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

function IconTextFieldDark(props: IconTextFieldProps) {
  return (
    <div className="relative mt-[2px] flex w-full flex-col">
      <div className="-mb-[46px] ml-[20px] mt-[16px] flex cursor-text">
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
        className="w-full"
        label={props.placeholder}
        onChange={props.onChange}
        onKeyUp={props.onkeyUp}
        onKeyDown={props.onkeyDown}
        value={props.value}
        type={props.type}
        error={props.error}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        variant="filled"
        autoCorrect="off"
        autoComplete="off"
      />
      {props.valid && (
        <div className="pointer-events-none absolute right-4 mt-5 flex cursor-text touch-none">
          <CheckCircleIcon className="h-6 w-6 text-green-400" />
        </div>
      )}
    </div>
  );
}

export default IconTextFieldDark;
