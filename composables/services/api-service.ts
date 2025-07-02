import type { $Fetch } from 'nitropack';

export function useApi() {
  function publicClient<T>(): $Fetch<T> {
    const baseURL = useRuntimeConfig().public.apiBaseUrl;
    return $fetch.create<T>({
      baseURL,
    });
  }

  return {
    publicClient,
  };
}
