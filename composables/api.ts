class BaseApi<T extends GenericObject> {
  constructor(public endpoint: string) {}

  async get(query: QueryParams): FetchReturn<T> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'GET',
      query,
    })
  }

  async getMany(query: QueryParams): FetchReturn<T[]> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'GET',
      query,
    })
  }

  async useGet(query: QueryParams): UseFetchReturn<T> {
    return await useFetch(`/${this.endpoint}`, {
      method: 'GET',
      query,
    }) as AsyncDataReturn<T>
  }

  async useGetMany(query: QueryParams): UseFetchReturn<T[]> {
    return await useFetch(`/${this.endpoint}`, {
      method: 'GET',
      query,
    })
  }

  async post(body: T): FetchReturn<T> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'POST',
      body,
    })
  }

  async put(body: T): FetchReturn<T> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'PUT',
      body,
    })
  }

  async delete(query: QueryParams): FetchReturn<T> {
    return await $fetch(`/${this.endpoint}`, {
      method: 'DELETE',
      query,
    })
  }
}

class AuthApi {
  async login(loginInfo: LoginForm): FetchReturn<User> {
    const { email, password } = loginInfo

    return await $fetch('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
  }

  async register(loginInfo: LoginForm): FetchReturn<User> {
    return await $fetch('/auth/register', {
      method: 'POST',
      body: loginInfo,
    })
  }

  async user(id: string): FetchReturn<User> {
    return await $fetch('/auth/user', {
      method: 'PUT',
      body: { id },
    })
  }
}

export const useAuthApi = () => new AuthApi()

class AssetApi<T extends GenericObject> extends BaseApi<T> {
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
export const profileApi = new BaseApi<Profile>('profile')
