import { Tabs } from '@mui/material';
import styled from '@emotion/styled';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    variant="fullWidth"
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& ': {
    width: '100%',
    height: 70,
  },
  '& .MuiTabs-indicator': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: 'rgb(56 189 248)',
  },
});

function SelectAvatarTabs(props: StyledTabsProps) {
  return <StyledTabs {...props} />;
}

export default SelectAvatarTabs;
