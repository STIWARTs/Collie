import { Button, styled } from '@mui/material';
import Image from 'next/image';

interface IProps {
  show: () => void;
  getURL: (value: string) => void;
  backBool: (value: boolean) => void;
}

const Input = styled('input')({
  display: 'none',
});

function FromComputer(props: IProps) {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      props.getURL(URL.createObjectURL(file));
      props.show();
      props.backBool(true);
    }
  };

  return (
    <div className="box-border flex h-full w-full flex-col items-center justify-center space-y-4 overflow-auto scroll-smooth p-6 text-white">
      {/* Heading */}
      <div className="space-y-1">
        <h6 className="text-md w-full text-center font-[600] tracking-wide">
          Upload your Image
        </h6>
        <h6 className="w-full text-center text-sm font-normal text-white/75">
          Only PNG, JPG and JPGE files are allowed
        </h6>
      </div>
      {/* Main */}
      <label
        htmlFor="UploadImageInput"
        className="flex w-full items-center justify-center"
      >
        <Input
          onChange={handleUpload}
          accept="image/*"
          id="UploadImageInput"
          type="file"
        />
        <Button
          aria-label="from-computer-button"
          disableRipple
          disableFocusRipple
          disableTouchRipple
          sx={{ border: '2px dashed #FFFFFF60' }}
          component="span"
          className="button-text-lower w-full max-w-[350px] cursor-default rounded-md bg-transparent p-6 text-[#ffffff80] transition-colors hover:bg-primary-theme/30 focus:outline-none active:outline-none"
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <Image
              height={75}
              width={75}
              src="/vectors/image-pickup.svg"
              alt=""
            />
            <h6 className="text-sm tracking-wide text-sky-400">
              Choose a file to upload
            </h6>
          </div>
        </Button>
      </label>
      {/* Bottom */}
      <div className="flex flex-col pb-6">
        <h6 className="w-full text-center text-[13px] font-normal text-white/75">
          After upload you can edit your image like
        </h6>
        <h6 className="w-full text-center text-[13px] font-normal text-white/75">
          Cropping, Rotating, etc.
        </h6>
      </div>
    </div>
  );
}

export default FromComputer;
