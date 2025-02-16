import type { CredentialResponse } from 'vue3-google-signin'
import jwtDecode from 'jwt-decode'
import { defineStore } from 'pinia'

const initialUser: User = {
  email: '',
  firstName: '',
  lastName: '',
  image: '',
}

const initialAccount: Account = {
  user: '',
  client: 'mya',
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  password: '',
}

const initialProfile: Profile = {
  user: '',
  role: '',
  supervisor: '',
  employees: [],
  completed: false,
}

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User> = ref(initialUser)
  const account: Ref<Account> = ref(initialAccount)
  const profile: Ref<Profile> = ref(initialProfile)

  // USER
  function prepareUser() {
    user.value.email = account.value.email
    user.value.firstName = account.value.firstName
    user.value.lastName = account.value.lastName
    user.value.image = account.value.image || ''
  }

  async function getUser(_id: string): Promise<User> {
    return await $fetch<User>('/user', {
      method: 'GET',
      query: {
        _id,
      },
    })
  }

  async function postUser(): Promise<User> {
    return await $fetch<User>('/user', {
      method: 'POST',
      body: user.value,
    })
  }

  // ACCOUNT
  function setAccountFromGoogleResponse(response: CredentialResponse) {
    const { email, given_name, family_name, picture }: GoogleJWT = jwtDecode(response.credential || '')

    account.value.client = 'google'
    account.value.firstName = given_name
    account.value.lastName = family_name
    account.value.email = email
    account.value.image = picture || ''
  }

  async function googleLogin(response: CredentialResponse) {
    setAccountFromGoogleResponse(response)

    const existingAccount = await getAccount(account.value.email)

    if (existingAccount?._id) {
      account.value = existingAccount

      const existingUser = await getUser(existingAccount.user)
      user.value = existingUser

      return
    }

    await prepareAccount()
    await postAccount()
  }

  async function myaLogin() {
    const existingAccount = await getAccount(account.value.email)

    if (existingAccount?._id) {
      account.value = existingAccount

      const existingUser = await getUser(existingAccount.user)
      user.value = existingUser

      return
    }

    await prepareAccount()
    await postAccount()
  }

  async function prepareAccount() {
    prepareUser()

    const postedUser = await postUser()

    if (!postedUser?._id) {
      return
    }

    user.value._id = postedUser._id
    account.value.user = postedUser._id
  }

  async function getAccount(email: string): Promise<Account> {
    return await $fetch<Account>('/account', {
      method: 'GET',
      query: {
        email,
      },
    })
  }

  async function postAccount(): Promise<Account> {
    return await $fetch<Account>('/account', {
      method: 'POST',
      body: account.value,
    })
  }

  // PROFILE
  function prepareProfile() {
    if (!user.value._id) {
      return
    }

    profile.value.user = user.value._id
  }

  async function getProfile(user: string): Promise<Profile> {
    return await $fetch<Profile>('/profile', {
      method: 'GET',
      query: {
        user,
      },
    })
  }

  async function postProfile(): Promise<Profile> {
    return await $fetch<Profile>('/profile', {
      method: 'POST',
      body: profile.value,
    })
  }

  function reset() {
    user.value = initialUser
    account.value = initialAccount
    profile.value = initialProfile
  }

  return {
    user,
    account,
    profile,
    prepareUser,
    getUser,
    postUser,
    googleLogin,
    myaLogin,
    prepareAccount,
    getAccount,
    postAccount,
    prepareProfile,
    getProfile,
    postProfile,
    reset,
  }
})
