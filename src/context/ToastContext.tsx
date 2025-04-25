'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ToastDark to prevent SSR issues
const ToastDark = dynamic(() => import('components/toast/ToastDark'), {
  ssr: false,
});

export type ToastType = 'Success' | 'Error' | 'Info' | 'Warning';

interface ToastState {
  Open: boolean;
  Type: ToastType;
  MessageTitle: string;
  MessageDescription: string;
  onClose: (open: boolean) => void;
}

interface ToastContextProps {
  showToast: (type: ToastType, title: string, description: string) => void;
}

const initialToastState: ToastState = {
  Open: false,
  Type: 'Success',
  MessageTitle: '',
  MessageDescription: '',
  onClose: () => {},
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastState>(initialToastState);

  const handleClose = (open: boolean) => {
    setToast({
      ...toast,
      Open: open,
    });
  };

  const showToast = (type: ToastType, title: string, description: string) => {
    setToast({
      Open: true,
      Type: type,
      MessageTitle: title,
      MessageDescription: description,
      onClose: handleClose,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastDark
        Toast={toast}
        HideDuration={4}
        SlideDirection="up"
        Vertical="bottom"
        Horizontal="right"
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
