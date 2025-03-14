import type { AsyncData } from '#app'
import type { FetchError } from 'ofetch'

class BaseApi<T extends Record<string, any>> {
  constructor(public endpoint: string) {}

  async get(query: { [key: string]: any }): Promise<T> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'GET',
      query,
    }) as T
  }

  async getMany(query: { [key: string]: any }): Promise<T[]> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'GET',
      query,
    }) as T[]
  }

  async useGetMany(query: { [key: string]: any }): Promise<AsyncData<T[], FetchError | null>> {
    return await useFetch(`/${this.endpoint}`, {
      method: 'GET',
      query,
    })
  }

  async post(body: T): Promise<T> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'POST',
      body,
    }) as T
  }

  async put(body: T): Promise<T> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'PUT',
      body,
    }) as T
  }

  async delete(query: { [key: string]: any }): Promise<T> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'DELETE',
      query,
    }) as T
  }
}

class AuthApi {
  async login(loginInfo: LoginForm): Promise<User> {
    const { email, password } = loginInfo

    return await $fetch('/auth/login', {
      method: 'POST',
      body: { email, password },
    }) as User
  }

  async register(loginInfo: LoginForm): Promise<User> {
    return await $fetch('/auth/register', {
      method: 'POST',
      body: loginInfo,
    }) as User
  }

  async getProfile(userId: string): Promise<Profile> {
    return await $fetch('/auth/profile', {
      method: 'GET',
      query: {
        user: userId,
      },
    }) as Profile
  }

  async useGetProfile(userId: string): Promise<AsyncData<Profile, FetchError | null>> {
    return await useFetch(`/auth/profile`, {
      method: 'GET',
      query: {
        user: userId,
      },
    })
  }

  async updateProfile(profile: Profile): Promise<Profile> {
    return await $fetch('/auth/profile', {
      method: 'PUT',
      body: profile,
    }) as Profile
  }

  async user(id: string): Promise<User> {
    return await $fetch('/auth/user', {
      method: 'PUT',
      body: { id },
    }) as User
  }
}

export const useAuthApi = () => new AuthApi()

class AssetApi<T extends Record<string, any>> extends BaseApi<T> {
  async import(body: T): Promise<T> {
    return await $fetch(`/${this.endpoint}/import`, {
      method: 'POST',
      body,
    }) as T
  }
}

export const assetApi = new AssetApi<Record<string, any>>('asset')
export const authApi = new AuthApi()
export const userApi = new BaseApi<User>('user')
