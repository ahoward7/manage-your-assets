import nuxtStorage from 'nuxt-storage'

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  // const userFromLocalStorage = nuxtStorage.localStorage.getData('mya-auth-account')

  // if (userFromLocalStorage) {
  //   authStore.loginWithToken(userFromLocalStorage)
  // }
})
