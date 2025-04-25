/* eslint-disable @typescript-eslint/no-empty-function */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface IProps {
  children: React.ReactNode;
  show: boolean;
  onClose: VoidType;
  disableClickAwayClose?: true;
}

function DialogContainerDark(props: IProps) {
  return (
    <Transition appear show={props.show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={props.disableClickAwayClose ? () => {} : props.onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="relative h-auto w-auto transform overflow-auto scroll-smooth rounded-2xl bg-[#202020] text-center align-middle  shadow-2xl transition-all">
                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DialogContainerDark;
