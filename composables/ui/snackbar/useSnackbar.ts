export function useSnackbar() {
  const store = useSnackbarStore();

  function error(
    message: string = 'Fehler',
    timeout: number = 2000,
  ) {
    store.mode = 'error';
    store.message = message;
    store.timeout = timeout;
    store.open = true;
  }

  function success(
    message: string = 'Erfolg',
    timeout: number = 2000,
  ) {
    store.mode = 'success';
    store.message = message;
    store.timeout = timeout;
    store.open = true;
  }

  function warning(
    message: string = 'Warnung',
    timeout: number = 2000,
  ) {
    store.mode = 'warning';
    store.message = message;
    store.timeout = timeout;
    store.open = true;
  }

  function info(
    message: string = 'Information',
    timeout: number = 2000,
  ) {
    store.mode = 'info';
    store.message = message;
    store.timeout = timeout;
    store.open = true;
  }

  return {
    error,
    success,
    warning,
    info,
  };
}
