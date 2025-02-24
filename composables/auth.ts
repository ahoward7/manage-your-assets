import type { AuthCodeFlowSuccessResponse } from 'vue3-google-signin'

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
  async googleLogin(googleResponse: AuthCodeFlowSuccessResponse): Promise<User> {
    const { access_token } = googleResponse
    return await $fetch('/auth/google', {
      method: 'POST',
      body: { access_token },
    }) as User
  }

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

  async user(id: string): Promise<User> {
    return await $fetch('/auth/user', {
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
