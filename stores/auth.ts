import type { CredentialResponse } from 'vue3-google-signin'
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
  function userFromGoogleAccount(googleAccount: GoogleAccount): User {
    return {
      email: googleAccount.email,
      firstName: googleAccount.firstName,
      lastName: googleAccount.lastName,
      image: googleAccount.image || '',
    }
  }

  // ACCOUNT
  async function fillExistingInformation(existingAccount: Account) {
    account.value = existingAccount

    const existingUser = await userApi.get({ _id: existingAccount.user })
    user.value = existingUser
  }

  async function createNewAccount(googleAccount: GoogleAccount) {
    const newUser = userFromGoogleAccount(googleAccount)
    const userWithId = await userApi.post(newUser)
    user.value = userWithId

    account.value = { ...googleAccount, user: userWithId._id || '' }
    await accountApi.post(account.value)
  }

  async function googleLogin(response: CredentialResponse) {
    const googleAccount: GoogleAccount = accountFromGoogleResponse(response)
    const email = googleAccount.email || ''

    const potentialAccount = await accountApi.get({ email })

    if (potentialAccount) {
      fillExistingInformation(potentialAccount)
    }
    else {
      createNewAccount(googleAccount)
    }
  }

  async function myaLogin() {
    const existingAccount = await accountApi.get({ email: account.value.email })

    if (existingAccount?._id) {
      account.value = existingAccount

      const existingUser = await userApi.get({ _id: existingAccount.user })
      user.value = existingUser

      return
    }

    await accountApi.post(account.value)
  }

  // PROFILE
  function prepareProfile() {
    if (!user.value._id) {
      return
    }

    profile.value.user = user.value._id
  }

  // OTHER
  function reset() {
    user.value = initialUser
    account.value = initialAccount
    profile.value = initialProfile
  }

  return {
    user,
    account,
    profile,
    googleLogin,
    myaLogin,
    prepareProfile,
    reset,
  }
})
