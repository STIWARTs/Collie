import { Skeleton } from 'utils/ExportMui';

interface IProps {
  ClassName?: string;
}

const backgroundColor = '#FFFFFF1F';

function PhoneEmailLoadingSkeleton(props: IProps) {
  return (
    <div
      className={`${props.ClassName} flex h-[350px] w-full flex-col space-y-[25px]`}
    >
      <div className="flex w-full flex-col mt-[2px]">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={63}
          sx={{ backgroundColor: backgroundColor }}
        />
        <div className="mt-[28px] flex w-full flex-col space-y-6">
          <Skeleton
            variant="rectangular"
            width={166}
            height={19}
            sx={{ backgroundColor: backgroundColor }}
          />
          <Skeleton
            variant="rectangular"
            width={100}
            height={19}
            sx={{ backgroundColor: backgroundColor }}
          />
        </div>
        <div className="mt-[25px] w-full">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={30}
            sx={{ backgroundColor: backgroundColor }}
          />
        </div>
        <div className="mt-[25px] flex w-full flex-col space-y-2.5">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={15}
            sx={{ backgroundColor: backgroundColor }}
          />
          <Skeleton
            variant="rectangular"
            width="50%"
            height={15}
            sx={{ backgroundColor: backgroundColor }}
          />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Skeleton
          variant="rectangular"
          width={175}
          height={38}
          sx={{ backgroundColor: backgroundColor }}
        />
      </div>
    </div>
  );
}

export default PhoneEmailLoadingSkeleton;
