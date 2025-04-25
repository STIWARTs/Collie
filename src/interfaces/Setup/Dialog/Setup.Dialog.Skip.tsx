import DialogContainerDark from 'components/dialog/DialogContainerDark';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

function SetupSkipDialog(props: SetupSkipDialogProps) {
  const router = useRouter();

  const handleContinue = () => {
    props.onClose();
    router.push('/');
  };

  return (
    <DialogContainerDark
      show={props.Open}
      onClose={props.onClose}
      disableClickAwayClose
    >
      <div className="relative flex h-full w-full max-w-[400px] flex-col items-center justify-center space-y-4 overflow-hidden p-5">
        <h5 className="flex truncate text-xl font-bold tracking-wide text-white">
          Are you sure ?
        </h5>
        <h6 className="flex space-x-1 px-5 text-sm font-normal text-white/75">
          It is important to add your details to get personalized results. You
          can do this later in the Manage My Account section.
        </h6>
        <div className="flex w-full space-x-2 pt-10">
          <div className="flex h-10 w-full">
            <Button
              disableFocusRipple
              onClick={props.onClose}
              className="button-text-lower w-full cursor-default truncate rounded-lg bg-transparent px-7 py-2 text-sm font-medium tracking-wide text-red-400 transition-all hover:bg-white/5"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#ffffff80 !important',
                },
              }}
            >
              Cancel
            </Button>
          </div>
          <div className="flex h-10 w-full">
            <Button
              disableFocusRipple
              onClick={handleContinue}
              className="button-text-lower w-full cursor-default truncate rounded-lg bg-dark-blue px-7 py-2 text-sm font-medium tracking-wide text-sky-400 transition-all hover:bg-dark-blue/70"
              sx={{
                '.MuiTouchRipple-child': {
                  backgroundColor: '#38bdf880 !important',
                },
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </DialogContainerDark>
  );
}

export default SetupSkipDialog;
