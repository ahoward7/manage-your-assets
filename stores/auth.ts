import type { CredentialResponse } from 'vue3-google-signin'
import { defineStore } from 'pinia'

// ✅ Define initial state values
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
  const user: Ref<User> = ref({ ...initialUser })
  const account: Ref<Account> = ref({ ...initialAccount })
  const profile: Ref<Profile> = ref({ ...initialProfile })

  // API calls
  async function getUserById(userId: string): Promise<User | null> {
    try {
      return await userApi.get({ _id: userId })
    }
    catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  async function getAccountByEmail(email: string): Promise<Account | null> {
    try {
      return await accountApi.get({ email })
    }
    catch (error) {
      console.error('Error fetching account:', error)
      return null
    }
  }

  async function createUserAndAccount(newUser: User, newAccount: Account | GoogleAccount) {
    try {
      const userWithId = await userApi.post(newUser)
      user.value = userWithId
      account.value = { ...newAccount, user: userWithId._id || '' }
      await accountApi.post(account.value)
    }
    catch (error) {
      console.error('Error creating user and account:', error)
    }
  }

  // User transformation functions
  function userFromGoogleAccount(googleAccount: GoogleAccount): User {
    return {
      email: googleAccount.email,
      firstName: googleAccount.firstName,
      lastName: googleAccount.lastName,
      image: googleAccount.image || '',
    }
  }

  function userFromAccount(accountData: Account): User {
    return {
      email: accountData.email,
      firstName: accountData.firstName,
      lastName: accountData.lastName,
      image: accountData.image || '',
    }
  }

  // Handle existing accounts
  async function fillExistingInformation(existingAccount: Account) {
    account.value = existingAccount

    const existingUser = await getUserById(existingAccount.user)
    if (existingUser) {
      user.value = existingUser
    }
  }

  // Create new accounts
  async function createNewAccountFromGoogle(googleAccount: GoogleAccount) {
    const newUser = userFromGoogleAccount(googleAccount)
    await createUserAndAccount(newUser, googleAccount)
  }

  async function createNewAccount(accountData: Account) {
    const newUser = userFromAccount(accountData)
    await createUserAndAccount(newUser, accountData)
  }

  // Google login
  async function googleLogin(response: CredentialResponse) {
    try {
      const googleAccount: GoogleAccount = accountFromGoogleResponse(response)
      if (!googleAccount.email) {
        console.error('Invalid Google account response')
        return
      }

      const potentialAccount = await getAccountByEmail(googleAccount.email)

      if (potentialAccount) {
        await fillExistingInformation(potentialAccount)
      }
      else {
        await createNewAccountFromGoogle(googleAccount)
      }
    }
    catch (error) {
      console.error('Google Login failed:', error)
    }
  }

  // Local login (mya)
  async function myaLogin() {
    try {
      const potentialAccount = await getAccountByEmail(account.value.email)

      if (potentialAccount) {
        await fillExistingInformation(potentialAccount)
      }
      else {
        await createNewAccount(account.value)
      }
    }
    catch (error) {
      console.error('Mya login failed:', error)
    }
  }

  function reset() {
    user.value = { ...initialUser }
    account.value = { ...initialAccount }
    profile.value = { ...initialProfile }
  }

  return {
    user,
    account,
    profile,
    googleLogin,
    myaLogin,
    reset,
  }
})
