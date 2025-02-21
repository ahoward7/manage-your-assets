import type { CredentialResponse } from 'vue3-google-signin'

class ModelApi<T extends MongoModel> {
  constructor(private endpoint: ModelEndpoint) {}

  async get(query: { [key: string]: string }): Promise<T> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'GET',
      query,
    }) as T
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

  async delete(query: { [key: string]: string }): Promise<T> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'DELETE',
      query,
    }) as T
  }
}

class AuthApi {
  async googleLogin(googleResponse: CredentialResponse): Promise<Account> {
    const publicConfig = useRuntimeConfig().public

    return await $fetch(`${publicConfig.base_url}/auth/google`, {
      method: 'POST',
      body: googleResponse,
    }) as Account
  }

  async login(email: string, password: string): Promise<Account> {
    const publicConfig = useRuntimeConfig().public

    return await $fetch(`${publicConfig.base_url}/auth/login`, {
      method: 'POST',
      body: { email, password },
    }) as Account
  }

  async register(user: User, account: Account): Promise<Account> {
    const publicConfig = useRuntimeConfig().public

    return await $fetch(`${publicConfig.base_url}/auth/register`, {
      method: 'POST',
      body: { user, account },
    }) as Account
  }

  async user(id: string): Promise<User> {
    const publicConfig = useRuntimeConfig().public

    return await $fetch(`${publicConfig.base_url}/auth/user`, {
      method: 'PUT',
      body: { id },
    }) as User
  }
}

export const useAuthApi = () => new AuthApi()

export const userApi = new ModelApi<User>('user')
export const accountApi = new ModelApi<Account>('account')
export const profileApi = new ModelApi<Profile>('profile')
export const authApi = new AuthApi()
