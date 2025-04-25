import styled from '@emotion/styled';
import { Tab } from '@mui/material';

interface StyledTabProps {
  label: string;
  icon: React.ReactElement;
}

const StyledTab = styled((props: StyledTabProps) => <Tab {...props} />)(() => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: 14,
  color: '#ffffff90',
  '&.Mui-selected': {
    color: 'rgb(56 189 248)',
  },
  '.MuiTouchRipple-child': {
    backgroundColor: '#ffffff50 !important',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#ffffff00 !important',
  },
}));

function SelectAvatarTabItem(props: StyledTabProps) {
  return <StyledTab {...props} />;
}

export default SelectAvatarTabItem;
