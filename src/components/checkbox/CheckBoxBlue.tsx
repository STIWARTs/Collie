import { Checkbox, alpha } from '@mui/material';
import Image from 'next/image';

interface IProps {
  Checked: boolean;
  OnCnange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CheckBoxBlue(props: IProps) {
  return (
    <Checkbox
      checked={props.Checked}
      onChange={props.OnCnange}
      sx={{
        '&': {
          bgcolor: 'transparent',
          borderWidth: 0,
          borderRadius: '6px',
          height: 18,
          width: 18,
          padding: 0,
          margin: 0,
        },
        '&:hover': {
          bgcolor: 'transparent',
          borderRadius: '2px',
          borderWidth: 0,
          padding: 0,
          margin: 0,
          boxShadow: `${alpha('#ffffff', 0.1)} 0 0 0 6px`,
        },
        '&.Mui-checked': {
          color: '#0084FF',
          bgcolor: '#ffffff',
        },
      }}
      disableRipple
      color="default"
      icon={
        <Image
          height={18}
          width={18}
          className="opacity-50"
          src="/icons/unChecked.svg"
          alt=""
        />
      }
      inputProps={{ 'aria-label': 'Privary Policy Checkbox' }}
    />
  );
}

export default CheckBoxBlue;
