import { create } from 'zustand';

interface IToastHook {
  Toast: ToastSettingType;
  setToast: Dispatch<ToastSettingType>;
}

export const ToastHook = create<IToastHook>()((set) => ({
    Toast: { Show: false, Title: '', Description: '', Type: '' },
    setToast: (value) => set(() => ({ Toast: value })),
  }));