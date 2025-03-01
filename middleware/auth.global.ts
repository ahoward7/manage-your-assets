export default defineNuxtRouteMiddleware((to) => {
  const { user } = useUserSession()
  const authStore = useAuthStore()

  const sessionUser = user.value as User

  if (sessionUser.email) {
    authStore.loginInfo.isLoggedIn = true

    if (to.path === '/login')
      return navigateTo('/')
  }

  else {
    authStore.loginInfo.isLoggedIn = false

    if (to.path !== '/login')
      return navigateTo('/login')
  }
})
