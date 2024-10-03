import { useConfirmationDialogStore } from '~/composables/ui/confirmation-dialog/useConfirmationDialogStore';

export function useConfirmationDialog() {
  function open(
    title: string = 'Bestätigen',
    message: string = 'Möchtest du die Aktion wirklich ausführen?',
    onConfirm: () => void = () => {},
    onCancel: () => void = () => {},
  ) {
    useConfirmationDialogStore().title = title;
    useConfirmationDialogStore().message = message;
    useConfirmationDialogStore().onConfirm = onConfirm;
    useConfirmationDialogStore().onCancel = onCancel;
    useConfirmationDialogStore().isOpen = true;
  }

  function close() {
    useConfirmationDialogStore().isOpen = false;
  }

  return { open, close };
}
