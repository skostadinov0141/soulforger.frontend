export const useConfirmationDialogStore = defineStore('ConfirmationDialogStore', () => {
  const isOpen: Ref<boolean> = ref(false);
  const title: Ref<string> = ref('');
  const message: Ref<string> = ref('');
  const onConfirm: () => void = () => {};
  const onCancel: () => void = () => {};

  return {
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
  };
});
