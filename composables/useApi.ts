import type { $Fetch } from 'nitropack';
import type { FetchError } from 'ofetch';
import type { UseFetchOptions } from '#app';

export interface UseApiOptions {
  auth: boolean
}

export function useApi(_options: UseApiOptions) {
  function server<T>(
    url: string | (() => string),
    options?: UseFetchOptions<T>,
  ) {
    return useFetch(`http://localhost:3001${url}`, {
      ...options,
    });
  }

  function client<T>(): $Fetch<T> {
    return $fetch.create<T>({
      baseURL: 'http://localhost:3001',
    });
  }

  function handleApiError(error: FetchError) {
    if (error.response?.status === 401) {
      // Redirect to login page
    }
  }

  return { server, client, handleApiError };
}
