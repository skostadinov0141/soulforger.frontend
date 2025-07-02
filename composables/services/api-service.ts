import type { $Fetch } from 'nitropack';

export function useApi() {
  /**
   * Creates a public client for API requests.
   * @template T - The type of the response data.
   * @returns A $Fetch instance configured with the base URL from runtime config.
   */
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
