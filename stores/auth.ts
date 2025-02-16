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

    const existingAccount = await accountApi.get({ email: account.value.email })

    if (existingAccount?._id) {
      account.value = existingAccount

      const existingUser = await userApi.get({ _id: existingAccount.user })
      user.value = existingUser

      return
    }

    await prepareAccount()
    await accountApi.post(account.value)
  }

  async function myaLogin() {
    const existingAccount = await accountApi.get({ email: account.value.email })

    if (existingAccount?._id) {
      account.value = existingAccount

      const existingUser = await userApi.get({ _id: existingAccount.user })
      user.value = existingUser

      return
    }

    await prepareAccount()
    await accountApi.post(account.value)
  }

  async function prepareAccount() {
    prepareUser()

    const postedUser = await userApi.post(user.value)

    if (!postedUser?._id) {
      return
    }

    user.value._id = postedUser._id
    account.value.user = postedUser._id
  }

  // PROFILE
  function prepareProfile() {
    if (!user.value._id) {
      return
    }

    profile.value.user = user.value._id
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
    googleLogin,
    myaLogin,
    prepareAccount,
    prepareProfile,
    reset,
  }
})
