import type { $Fetch } from 'nitropack'
import type { UseFetchOptions } from '#app'

export interface UseApiOptions {
  auth: boolean
}

export function useApi(options: UseApiOptions) {
  function server<T>(
    url: string | (() => string),
    options?: UseFetchOptions<T>,
  ) {
    return useFetch(`http://localhost:3001${url}`, {
      ...options,
    })
  }

  function client<T>(): $Fetch<T> {
    return $fetch.create<T>({
      baseURL: 'http://localhost:3001',
    })
  }

  return { server, client }
}
