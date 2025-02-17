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

export const userApi = new ModelApi<User>('user')
export const accountApi = new ModelApi<Account>('account')
export const profileApi = new ModelApi<Profile>('profile')
