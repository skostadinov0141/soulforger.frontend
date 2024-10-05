import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('SnackbarStore', () => {
  const open: Ref<boolean> = ref(false);
  const mode: Ref<'error' | 'success' | 'warning' | 'info'> = ref('info');
  const message: Ref<string> = ref('');
  const timeout: Ref<number> = ref(5000);

  return {
    open,
    mode,
    message,
    timeout,
  };
});
