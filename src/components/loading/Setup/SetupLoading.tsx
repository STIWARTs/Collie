import { Skeleton } from 'utils/ExportMui';

interface IProps {
  ClassName?: string;
}

const backgroundColor = '#FFFFFF1F';

function SetupLoadingSkeleton(props: IProps) {
  return (
    <div className={`${props.ClassName} flex w-full`}>
      <div className="ml-14 hidden h-full w-full items-center justify-center md:flex md:p-14">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ backgroundColor: backgroundColor, maxHeight: 350 }}
        />
      </div>
      <div className="flex h-full w-full flex-col p-5 md:-mt-3 md:p-14">
        <div className="flex w-full flex-col space-y-4">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={30}
            sx={{ backgroundColor: backgroundColor }}
          />
          <Skeleton
            variant="rectangular"
            width="50%"
            height={30}
            sx={{ backgroundColor: backgroundColor }}
          />
        </div>
        <div className="mt-8 flex w-full flex-col space-y-2">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={15}
            sx={{ backgroundColor: backgroundColor }}
          />
          <Skeleton
            variant="rectangular"
            width="70%"
            height={15}
            sx={{ backgroundColor: backgroundColor }}
          />
        </div>
        <div className="mt-8 flex w-full justify-start">
          <Skeleton
            variant="rectangular"
            width="30%"
            height={30}
            sx={{ backgroundColor: backgroundColor }}
          />
        </div>
        <div className="flex min-h-[300px] w-full justify-start" />
        <div className="mt-2.5 flex w-full justify-end">
          <Skeleton
            variant="rectangular"
            width={175}
            height={38}
            sx={{ backgroundColor: backgroundColor }}
          />
        </div>
      </div>
    </div>
  );
}

export default SetupLoadingSkeleton;
