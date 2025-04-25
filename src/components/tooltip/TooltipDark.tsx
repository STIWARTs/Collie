import { TooltipProps, Tooltip, tooltipClasses } from '@mui/material';
import styled from '@emotion/styled';

const TooltipDark = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    enterDelay={500}
    disableInteractive
  />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#353535',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#353535',
    fontSize: 12,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 6,
    textAlign: 'justify',
  },
}));

export default TooltipDark;
