import { Skeleton } from 'utils/ExportMui';

interface IProps {
  ClassName?: string;
}

const backgroundColor = '#FFFFFF1F';

function SetupConfirmEmailVerifySkeleton(props: IProps) {
  return (
    <div
      className={`${props.ClassName} flex w-full flex-col items-center justify-center md:flex-row`}
    >
      <div className="relative flex h-full w-full items-center justify-center pb-7 pt-20 md:ml-14 md:p-14">
        <div className="flex h-[125px] w-[200px] md:h-full md:w-full md:items-center md:justify-center">
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ backgroundColor: backgroundColor, maxHeight: 350 }}
          />
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center space-y-3 p-5 md:p-14">
        <div className="flex w-full max-w-[350px] flex-col items-center justify-center -space-y-3 md:max-w-none">
          <Skeleton
            variant="text"
            width="90%"
            height={50}
            sx={{ backgroundColor: backgroundColor }}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center">
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
        <div className="flex w-full flex-col justify-start space-y-3 pt-3">
          <Skeleton
            variant="rectangular"
            width={160}
            height={30}
            sx={{ backgroundColor: backgroundColor }}
          />
          <Skeleton
            variant="rectangular"
            width={160}
            height={30}
            sx={{ backgroundColor: backgroundColor }}
          />
          <Skeleton
            variant="rectangular"
            width={160}
            height={30}
            sx={{ backgroundColor: backgroundColor }}
          />
        </div>
      </div>
    </div>
  );
}

export default SetupConfirmEmailVerifySkeleton;
