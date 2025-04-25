'use client';

import { useEffect, useState } from 'react';
import { Slide, SlideProps } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ToastDarkContentProps } from './ToastDarkContent';
import dynamic from 'next/dynamic';

const ToastDarkContent = dynamic<ToastDarkContentProps>(
  () => import('./ToastDarkContent'),
  { ssr: false },
);

export interface ToastDarkProps {
  Toast: {
    Open: boolean;
    Type: 'Success' | 'Error' | 'Info' | 'Warning';
    MessageTitle: string;
    MessageDescription: string;
    onClose: (open: boolean) => void;
  };
  HideDuration: number;
  SlideDirection: 'up' | 'down' | 'left' | 'right';
  Vertical: 'top' | 'bottom';
  Horizontal: 'left' | 'center' | 'right';
}

function ToastDark(props: ToastDarkProps) {
  const SlideTransition = (prop: SlideProps) => {
    return (
      <Slide
        {...prop}
        style={{ marginTop: 0, paddingTop: 0 }}
        direction={props.SlideDirection}
      />
    );
  };

  const [state, setState] = useState<{
    Open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    >;
  }>({
    Open: false,
    Transition: SlideTransition,
  });

  const handleClose = () => {
    setState({
      ...state,
      Open: false,
    });
    props.Toast.onClose(false);
  };

  useEffect(() => {
    if (state.Open === props.Toast.Open) {
      return;
    }
    setState({
      ...state,
      Open: props.Toast.Open,
    });
  }, [props.Toast.Open, state]);

  return (
    <>
      {props.Toast.Type === 'Error' && (
        <ToastDarkContent
          Open={state.Open}
          Color="bg-dark-red"
          Icon="/icons/x-circle-thin.svg"
          MessageTitle={props.Toast.MessageTitle}
          MessageDescription={props.Toast.MessageDescription}
          HideDuration={props.HideDuration}
          onClose={handleClose}
          Transition={state.Transition}
          Vertical={props.Vertical}
          Horizontal={props.Horizontal}
        />
      )}
      {props.Toast.Type === 'Success' && (
        <ToastDarkContent
          Open={state.Open}
          Color="bg-dark-green"
          Icon="/icons/check-circle-thin.svg"
          MessageTitle={props.Toast.MessageTitle}
          MessageDescription={props.Toast.MessageDescription}
          HideDuration={props.HideDuration}
          onClose={handleClose}
          Transition={state.Transition}
          Vertical={props.Vertical}
          Horizontal={props.Horizontal}
        />
      )}
      {props.Toast.Type === 'Info' && (
        <ToastDarkContent
          Open={state.Open}
          Color="bg-dark-blue"
          Icon="/icons/alert-circle-thin.svg"
          MessageTitle={props.Toast.MessageTitle}
          MessageDescription={props.Toast.MessageDescription}
          HideDuration={props.HideDuration}
          onClose={handleClose}
          Transition={state.Transition}
          Vertical={props.Vertical}
          Horizontal={props.Horizontal}
        />
      )}
      {props.Toast.Type === 'Warning' && (
        <ToastDarkContent
          Open={state.Open}
          Color="bg-dark-orange"
          Icon="/icons/alert-triangle-thin.svg"
          MessageTitle={props.Toast.MessageTitle}
          MessageDescription={props.Toast.MessageDescription}
          HideDuration={props.HideDuration}
          onClose={handleClose}
          Transition={state.Transition}
          Vertical={props.Vertical}
          Horizontal={props.Horizontal}
        />
      )}
    </>
  );
}

export default ToastDark;
