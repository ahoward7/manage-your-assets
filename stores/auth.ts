import type { FetchError } from 'ofetch'
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
  email: '',
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
    unauthorizedGoogleAccount: false,
    registerAccountFailed: false,
    passwordsNotMatching: false,
    invalidPassword: false,
  })

  // Login
  async function login(loginFormData: LoginForm) {
    try {
      const loggedInUser = await authStoreApi.login(loginFormData)

      if (!loggedInUser) {
        return
      }

      user.value = loggedInUser
      profile.value = await profileApi.get({ user: loggedInUser._id })
      loginInfo.value.isLoggedIn = true

      if (!profile.value.completed) {
        navigateTo('/edit-profile')
        return
      }

      navigateTo('/')

      return loggedInUser
    }
    catch (error: any) {
      const fetchError = error as FetchError<any>

      switch (fetchError.response?.status) {
        case 401:
          loginInfo.value.invalidPassword = true
          break
        case 404:
          loginInfo.value.noAccountExists = true
          break
        case 409:
          loginInfo.value.onlyGoogleAccountExists = true
          break
        default:
          console.error('Login Failed: Could not communicate with API', error)
      }
    }
  }

  async function register(loginFormData: LoginForm) {
    try {
      const loggedInUser = await authStoreApi.register(loginFormData)

      if (!loggedInUser) {
        return
      }

      user.value = loggedInUser
      profile.value = await profileApi.get({ user: loggedInUser._id })
      loginInfo.value.isLoggedIn = true

      navigateTo('/edit-profile')

      return loggedInUser
    }
    catch (error: any) {
      const fetchError = error as FetchError<any>

      switch (fetchError.response?.status) {
        case 409:
          loginInfo.value.accountAlreadyExists = true
          break
        case 400:
          loginInfo.value.registerAccountFailed = true
          break
        default:
          console.error('Register Failed: Could not communicate with API', error)
      }
    }
  }

  async function setProfile(profileData: Profile) {
    profile.value = profileData
  }

  async function updateProfile(profileData: Profile) {
    try {
      const newProfile = await profileApi.put(profileData)
      profile.value = newProfile
      return newProfile
    }
    catch (error) {
      console.error('Update Profile Failed: Could not communicate with API', error)
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
      unauthorizedGoogleAccount: false,
      registerAccountFailed: false,
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
    login,
    register,
    setProfile,
    updateProfile,
    reset,
  }
})
