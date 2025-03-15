export default defineNuxtRouteMiddleware((to) => {
  const { user } = useUserSession()
  const { user: storeUser, loginInfo, profile } = storeToRefs(useAuthStore())

  if (storeUser.value.email) {
    return
  }

  const sessionUser = user.value as User

  if (!sessionUser) {
    loginInfo.value.isLoggedIn = false

    if (to.path !== '/login') {
      return navigateTo('/login')
    }

    return
  }

  loginInfo.value.isLoggedIn = true

  if (!storeUser.value.email) {
    storeUser.value = sessionUser
  }

  if (!profile.value.completed) {
    if (to.path !== '/profile') {
      return navigateTo('/profile')
    }
  }

  if (to.path === '/login') {
    return navigateTo('/')
  }
})
