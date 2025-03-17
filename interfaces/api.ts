import type { AsyncData } from '#app'
import type { FetchError } from 'ofetch'

export interface QueryParams {
  [key: string]: any
}

export type GenericObject = Record<string, any>
export type FetchReturn<T = any> = Promise<T>
export type AsyncDataReturn<T> = AsyncData<T, FetchError | null>
export type UseFetchReturn<T = any> = Promise<AsyncDataReturn<T>>
