export const useConfirmationDialogStore = defineStore('ConfirmationDialogStore', () => {
  const isOpen: Ref<boolean> = ref(false);
  const title: Ref<string> = ref('');
  const message: Ref<string> = ref('');
  const onConfirm: Ref<() => void> = ref<() => void>(() => {});
  const onCancel: Ref<() => void> = ref<() => void>(() => {});

  return {
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
  };
});
