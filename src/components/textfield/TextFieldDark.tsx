import {
  FilledInputProps,
  TextField,
  TextFieldProps,
  alpha,
  styled,
} from '@mui/material';
import { PlainTextFieldProps } from './AllTextFieldProps';

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
    transform: 'translate(26px, 23px) scale(1)',
    '&.Mui-error': {
      color: '#ffffffb3',
    },
  },
  '& label.Mui-focused': {
    color: '#ffffffb3',
    transform: 'translate(26px, 12px) scale(0.90)',
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(26px, 12px) scale(0.90)',
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
    paddingLeft: 13,
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

function TextFieldDark(props: PlainTextFieldProps) {
  return (
    <div className="mt-[2px] flex w-full flex-col">
      <CustomTextField
        id={props.id}
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
        type={props.type}
      />
    </div>
  );
}

export default TextFieldDark;
