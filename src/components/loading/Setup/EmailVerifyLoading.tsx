import { Skeleton } from 'utils/ExportMui';

interface IProps {
  ClassName?: string;
}

const backgroundColor = '#FFFFFF1F';

function SetupEmailVerifySkeleton(props: IProps) {
  return (
    <div
      className={`${props.ClassName} flex w-full flex-col items-center justify-center space-y-3`}
    >
      <div className="flex w-full flex-col">
        <Skeleton
          variant="text"
          width="100%"
          height={30}
          sx={{ backgroundColor: backgroundColor }}
        />
        <Skeleton
          variant="text"
          width="100%"
          height={30}
          sx={{ backgroundColor: backgroundColor }}
        />
        <Skeleton
          variant="text"
          width="70%"
          height={30}
          sx={{ backgroundColor: backgroundColor }}
        />
      </div>
      <div className="flex w-full flex-col space-y-3 pt-3">
        <Skeleton
          variant="rectangular"
          width={160}
          height={30}
          sx={{ backgroundColor: backgroundColor }}
        />
      </div>
    </div>
  );
}

export default SetupEmailVerifySkeleton;
