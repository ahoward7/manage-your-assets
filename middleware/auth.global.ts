export default defineNuxtRouteMiddleware((to) => {
  const { user } = useUserSession()
  const authStore = useAuthStore()

  const sessionUser = user.value as User

  if (!sessionUser) {
    authStore.loginInfo.isLoggedIn = false

    if (to.path !== '/login') {
      return navigateTo('/login')
    }

    return
  }

  authStore.loginInfo.isLoggedIn = true

  if (!authStore.user.email) {
    authStore.user = sessionUser
  }

  if (to.path === '/login') {
    return navigateTo('/')
  }
})
