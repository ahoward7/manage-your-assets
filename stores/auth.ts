import type { AuthCodeFlowSuccessResponse } from 'vue3-google-signin'
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
  client: 'mya',
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  password: '',
  confirmPassword: '',

}

const authStoreApi = useAuthApi()

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User> = ref({ ...initialUser })
  const account: Ref<Account> = ref({ ...initialAccount })
  const profile: Ref<Profile> = ref({ ...initialProfile })
  const loginForm: Ref<LoginForm> = ref({ ...initialLoginForm })
  const mode: Ref<AuthMode> = ref('login')

  const loginInfo = ref({
    isLoggedIn: false,
    noAccountExists: false,
    accountAlreadyExists: false,
    onlyGoogleAccountExists: false,
    passwordsNotMatching: false,
    invalidPassword: false,
  })

  // Login
  async function googleLogin(response: AuthCodeFlowSuccessResponse) {
    try {
      const googleAccount = await authStoreApi.googleLogin(response)
      console.log('Google Account', googleAccount)
    }
    catch (error) {
      console.error('Google Login Failed: Can\'t communicate with the API', error)
    }
  }

  async function login(loginInfo: LoginForm) {
    try {
      const user = await authStoreApi.login(loginInfo)
      return user
    }
    catch (error) {
      console.error('MYA Login Failed: Could not communicate with API', error)
    }
  }

  async function loginWithToken(token: string) {
    console.log('Logging in with token', token)
  }

  async function register(loginInfo: LoginForm) {
    try {
      const newAccount = await authStoreApi.register(loginInfo)
      return newAccount
    }
    catch (error) {
      console.error('Register Failed: Could not communicate with API', error)
    }
  }

  function reset(toUrl?: string) {
    user.value = { ...initialUser }
    account.value = { ...initialAccount }
    profile.value = { ...initialProfile }
    loginForm.value = { ...initialLoginForm }
    loginInfo.value = {
      isLoggedIn: false,
      noAccountExists: false,
      accountAlreadyExists: false,
      onlyGoogleAccountExists: false,
      passwordsNotMatching: false,
      invalidPassword: false,
    }
    mode.value = 'login'

    if (toUrl)
      navigateTo(toUrl)
  }

  return {
    user,
    account,
    profile,
    loginForm,
    loginInfo,
    mode,
    googleLogin,
    login,
    register,
    loginWithToken,
    reset,
  }
})
