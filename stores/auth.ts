import type { CredentialResponse } from 'vue3-google-signin'
import { defineStore } from 'pinia'

// Initial state
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

const initialLoginForm: LoginForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User> = ref({ ...initialUser })
  const account: Ref<Account> = ref({ ...initialAccount })
  const profile: Ref<Profile> = ref({ ...initialProfile })
  const loginForm: Ref<LoginForm> = ref({ ...initialLoginForm })
  const mode: Ref<AuthMode> = ref('login')
  const googleAccountExistsWithoutMyaAccount: Ref<boolean> = ref(false)
  const noAccountExists: Ref<boolean> = ref(false)
  const passwordsNotMatching: Ref<boolean> = ref(false)

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
  async function createAccountFromGoogle(googleAccount: GoogleAccount) {
    const newUser = userFromGoogleAccount(googleAccount)
    await createUserAndAccount(newUser, googleAccount)
  }

  async function createAccount(accountData: Account) {
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
        const googleAccountWithPassword = { ...googleAccount, password: 'SET_BY_GOOGLE' }
        await createAccountFromGoogle(googleAccountWithPassword)
      }
    }
    catch (error) {
      console.error('Google Login failed:', error)
    }
  }

  function verifyGoogleEmail(response: CredentialResponse) {
    const googleAccount: GoogleAccount = accountFromGoogleResponse(response)
    return googleAccount.email === loginForm.value.email
  }

  // Local login (mya)
  function checkPassword(account: Account, loginInfo: LoginForm) {
    return account.password === loginInfo.password
  }

  function confirmPassword() {
    return loginForm.value.password === loginForm.value.confirmPassword
  }

  function passwordSetByGoogle(account: Account) {
    return account.password === 'SET_BY_GOOGLE'
  }

  function setMyaAccountCreationFromGoogleAccount(account: Account) {
    loginForm.value.firstName = account.firstName
    loginForm.value.lastName = account.lastName
    googleAccountExistsWithoutMyaAccount.value = true
    mode.value = 'google'
  }

  async function patchAccountPassword(account: Account, newPassword: string): Promise<Account | undefined> {
    try {
      return await accountApi.put({ ...account, password: newPassword })
    }
    catch (error) {
      console.error('Error updating account password:', error)
    }
  }

  async function myaLogin(loginInfo: LoginForm) {
    try {
      const potentialAccount = await getAccountByEmail(loginInfo.email)

      if (!potentialAccount) {
        if (mode.value !== 'create') {
          noAccountExists.value = true
          mode.value = 'create'
          return
        }

        await createAccount(account.value)
        return
      }

      if (googleAccountExistsWithoutMyaAccount.value) {
        if (!confirmPassword()) {
          passwordsNotMatching.value = true
          return
        }

        const patchedAccount = await patchAccountPassword(potentialAccount, loginInfo.password)

        if (!patchedAccount) {
          console.error('Failed to patch account password')
          return
        }

        await fillExistingInformation(patchedAccount)
        return
      }

      if (passwordSetByGoogle(potentialAccount)) {
        setMyaAccountCreationFromGoogleAccount(potentialAccount)
        return
      }

      if (!checkPassword(potentialAccount, loginInfo)) {
        console.error('Invalid password')
        return
      }

      await fillExistingInformation(potentialAccount)
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
    loginForm,
    mode,
    googleAccountExistsWithoutMyaAccount,
    noAccountExists,
    passwordsNotMatching,
    googleLogin,
    verifyGoogleEmail,
    confirmPassword,
    myaLogin,
    reset,
  }
})
