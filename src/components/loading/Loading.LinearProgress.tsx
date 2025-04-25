/* eslint-disable @typescript-eslint/no-empty-interface */
import { LinearProgress, linearProgressClasses, styled } from '@mui/material';

const LoadingLinearProgressUI = styled(LinearProgress)(() => ({
  height: 3,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#00000000',
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: '#ffffff90',
  },
}));

interface IProps {
  backDrop?: true;
}

function LoadingLinearProgress({ backDrop }: IProps) {
  return (
    <div
      className={`${
        backDrop
          ? 'absolute top-0 z-10 h-full w-full bg-secondary-theme/50'
          : 'absolute top-[50%] w-full'
      }`}
    >
      <LoadingLinearProgressUI
        sx={{
          color: '#202020',
        }}
      />
    </div>
  );
}

export default LoadingLinearProgress;
