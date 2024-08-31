import { VueElement } from 'vue';
import { ToastOptions } from 'vue3-toastify';

export type VForm = VueElement & {
  validate: () => boolean;
  resetValidation: () => boolean;
  reset: () => void;
};

export interface CustomToastOptions extends ToastOptions {
  allowDuplicates?: boolean;
}
