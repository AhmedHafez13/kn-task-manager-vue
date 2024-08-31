import type { CustomToastOptions } from '@/types/global.types';
import { AxiosError } from 'axios';
import { getAllToast, toast, type ToastType } from 'vue3-toastify';

export const useAppToaster = (generalOptions: CustomToastOptions = {}) => {
  const prepareToastMessage = (
    type: ToastType,
    message: string,
    options: CustomToastOptions = {},
  ) => {
    options = {
      containerId: 'global',
      autoClose: 3000,
      transition: toast.TRANSITIONS.SLIDE,
      position: toast.POSITION.BOTTOM_LEFT,
      allowDuplicates: false,
      type,
      ...generalOptions,
      ...options,
    };
    return { message, options };
  };

  const isDuplicateMessage = (formalizedMessage: string, type: ToastType) => {
    const currentToasts = getAllToast();
    for (const toast of currentToasts) {
      if ((toast.content as string) === formalizedMessage && toast.type === type) {
        return true;
      }
    }
    return false;
  };

  /** Shows a toast message of type info */
  const showGeneric = (type: ToastType, message: string, options: CustomToastOptions = {}) => {
    const formalized = prepareToastMessage(type, message, options);
    if (!formalized.options.allowDuplicates && isDuplicateMessage(formalized.message, type)) {
      return;
    }
    toast(formalized.message, formalized.options);
  };

  /** Shows a toast message of Info success */
  const info = (message: string, options: CustomToastOptions = {}) => {
    showGeneric(toast.TYPE.INFO, message, options);
  };

  /** Shows a toast message of type success */
  const success = (message: string, options: CustomToastOptions = {}) => {
    showGeneric(toast.TYPE.SUCCESS, message, options);
  };

  /** Shows a toast message of type warning */
  const warning = (message: string, options: CustomToastOptions = {}) => {
    showGeneric(toast.TYPE.WARNING, message, options);
  };

  /** Shows a toast message of type error */
  const error = (message: string | unknown | AxiosError, options: CustomToastOptions = {}) => {
    showGeneric(toast.TYPE.ERROR, message as string, options);
  };

  const dismissAllToasts = () => {
    toast.clearAll();
  };
  return {
    info,
    success,
    warning,
    error,
    dismissAllToasts,
  };
};
